import { Location } from "./Location.js";

export class LocationsList
{
    constructor(api, pages_retriever)
    {
        this._api = api;
        this._pages_retriever = pages_retriever;
    }

    async getAllLocations()
    {
        let data = await this._api.sendAction("get-locations");

        let result = [];

        for (let location_data of data)
        {
            result.push(new Location(this._pages_retriever, location_data.name, location_data.logo, location_data.position, location_data.visit_code));
        }

        return result;
    }
}


