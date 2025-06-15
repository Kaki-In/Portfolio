import { COUNTRY_TYPE_BASELAND, COUNTRY_TYPE_NEVER_VISITED, COUNTRY_TYPE_VISITED } from "../../../../../local_user/world/countries/Country.js";
import { appendChild, Component } from "../../../../components/Component.js";
import { ImageComponent } from "../../../../components/Image.js";
import { EsriMap } from "../../../../components/Map.js";

export class CountriesSection extends Component
{
    constructor(title, map_id, local_user, notifications, switch_history)
    {
        let { div, title: title_element, map } = createCountriesSection(map_id, local_user, notifications, switch_history);

        super(div);

        this._map = map;

        local_user.translator.multiTranslate((title) => {
            title_element.innerHTML = title;
        }, title);

        map.addEventListener("displayed", async () => {this.prepare(local_user, notifications, switch_history)});

    }

    async prepare(local_user, notifications, switch_history) 
    {
        while (!(this._map.map.basemap)) await new Promise((resolve, reject) => {setTimeout(resolve, 100)});

        this._map.map.basemap.referenceLayers = [this._map.map.basemap.referenceLayers.items[0]];
        this._map.map.basemap.baseLayers = [];

        this._map.map.ground = 'world-elevation';
        this._map.map.ground.surfaceColor = '#000000';
        this._map.map.ground.opacity = 1;

        this._map.view.environment = {
            background: {
              type: "color",
              color: [0, 0, 0, 1]
            },
            atmosphereEnabled: false
        }

        await this.prepareCountries(local_user, notifications, switch_history);
        await this.prepareLocations(local_user, notifications, switch_history);
    }
        
    async prepareCountries(local_user, notifications, switch_history)
    {

        this._landsLayer = new ESRI.GraphicsLayer();
        this._map.map.add(this._landsLayer);

        let countries = await local_user.world.countries.getAllCountries();
        let translations = {
            "common.countries": [(translation) => {this._landsLayer.title = translation;}]
        };

        for (let country of countries) 
        {
            let new_translations = this.addCountry(country);
            for (let key of Object.keys(new_translations)) 
            {
                if (!Object.keys(translations).includes(key))
                {
                    translations[key] = [];    
                }
                translations[key].push(new_translations[key]);
            }
        }

        let keys = Object.keys(translations);

        local_user.translator.multiTranslate((...args) => {
            for (let index=0;index < args.length;++index)
            {
                let key = keys[index];

                for (let define_func of translations[key])
                {
                    define_func(args[index]);
                }
            }
        }, ...keys);
    }

    addCountry(country)
    {
        if (country.visit_code == COUNTRY_TYPE_NEVER_VISITED) return {};

        let coordinates = country.shape;

        const polygon = {
            type: 'polygon',
            rings: coordinates
        };

        let simpleFillSymbol;
        if (country.visit_code == COUNTRY_TYPE_VISITED)
        {
            simpleFillSymbol = {
                type: "simple-fill",
                color: [255, 0, 0, 1],
                outline: {
                    color: [0, 0, 0, 0.4],
                    width: 0.5
                }
            };
        }
        else if (country.visit_code == COUNTRY_TYPE_BASELAND)
        {
            simpleFillSymbol = {
                type: "simple-fill",
                color: [255, 255, 255, 1],
                outline: {
                    color: [0, 0, 0, 0.4],
                    width: 0.5
                }
            };
        }

        let {div, description_text} = createCountryThumbnail();

        const popupTemplate = {
            title: "{Name}",
            content: div
        };

        const attributes = {
            Name: country.name
        };

        const polygonGraphic = new ESRI.Graphic({
            geometry: polygon,
            symbol: simpleFillSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate

        });

        this._landsLayer.add(polygonGraphic);
        
        return {
            ['countries.'+country.name]: (name) => {polygonGraphic.attributes.Name = name;},
            ['countries.'+country.name+".description"]: (description) => {description_text.innerHTML = description;},
        }
    }

    async prepareLocations(local_user, notifications, switch_history)
    {

        this._locationsLayer = new ESRI.GraphicsLayer();
        this._map.map.add(this._locationsLayer);

        let locations = await local_user.world.locations.getAllLocations();
        let translations = {
            "common.locations": [(translation) => {this._locationsLayer.title = translation;}]
        };

        for (let location of locations) 
        {
            let new_translations = this.addLocation(location);
            for (let key of Object.keys(new_translations)) 
            {
                if (!Object.keys(translations).includes(key))
                {
                    translations[key] = [];    
                }
                translations[key].push(new_translations[key]);
            }
        }

        let keys = Object.keys(translations);

        local_user.translator.multiTranslate((...args) => {
            for (let index=0;index < args.length;++index)
            {
                let key = keys[index];

                for (let define_func of translations[key])
                {
                    define_func(args[index]);
                }
            }
        }, ...keys);
    }

    addLocation(location)
    {
        const point = {
            //Create a point
            type: "point",
            longitude: location.position.longitude,
            latitude: location.position.latitude
        };

        let simpleMarkerSymbol;
        switch (location.visit_code)
        {
            case COUNTRY_TYPE_NEVER_VISITED:
                simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: [0, 0, 0],
                    outline: {
                        color: [255, 0, 0],
                        width: 1
                    }
                };
                break;
                
            case COUNTRY_TYPE_VISITED:
                simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: [255, 0, 0],
                    outline: {
                        color: [255, 255, 255],
                        width: 1
                    }
                };
                break;
                
            case COUNTRY_TYPE_BASELAND:
                simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: [255, 255, 255],
                    outline: {
                        color: [0, 0, 0],
                        width: 1
                    }
                };
                break;
                
    
        }

        let {div, image, description_text} = createLocationThumbnail();

        const popupTemplate = {
            title: "{Name}",
            content: div
        };

        const attributes = {
            Name: location.name
        };

        const pointGraphic = new ESRI.Graphic({
            geometry: point,
            symbol: simpleMarkerSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate

        });

        this._locationsLayer.add(pointGraphic);
        image.base64 = location.logo;
        
        return {
            ['locations.'+location.name]: (name) => {pointGraphic.attributes.Name = name;},
            ['locations.'+location.name+".description"]: (description) => {description_text.innerHTML = description;},
        }
    }

}

function createCountryThumbnail()
{
    let div = document.createElement("div");
    div.classList.add("country-thumbnail");
    
    let description_text = div.appendChild(document.createElement("p"));

    return {div, description_text};
}

function createLocationThumbnail()
{
    let div = document.createElement("div");
    div.classList.add("location-thumbnail");

    let image = appendChild(div, new ImageComponent())
    let description_text = div.appendChild(document.createElement("p"));

    return {div, image, description_text};
}

function createCountriesSection(map_id)
{
    let div = document.createElement("div");
    div.classList.add("countries-section");

    let title = div.appendChild(document.createElement("h2"));

    let map = appendChild(div, new EsriMap(map_id));

    return {
        div,
        title,
        map
    }
}

