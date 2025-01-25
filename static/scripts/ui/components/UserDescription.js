import { Component, appendChild } from "./Component.js";
import { Image } from "./Image.js";
import { EventHandler } from "../../events/EventHandler.js";

export class UserDescription extends Component {

    constructor() {
        let description = createDescription();

        super(description.element);

        this._images = description.images;
        this._title = description.title;
        this._attributes = description.attributes;
        this._description_div = description.description;
        this._renderer = description.image_integration;

    }

    async prepare(account, local_user) {
        let name = await account.name;
        this.title = name;

        const options = {
            autoResize: !0,
            canvas: {
                width: 200,
                height: 350
            },
            render: {
                taa: !0
            },
            controls: {
                enabled: !0,
                zoom: !1,
                rotate: !0,
                pan: !0
            },
            forceContext: !0
        };

        this._skinRender = new SkinRender(options, this._renderer);

        $( this._renderer ).on("skinRender", (event) => {
            this.updateSkinRender(local_user, event)
        });

        this._target = {
            x: 0,
            y: 0,
            speed: 49,
            accuracy: 0.01
        }

        let description = await account.description;
        this.attributes.appendChild(document.createElement("li")).textContent = description.description;

        let string = "";
        let last_connection = (await account.last_connection).last_connection / 60000;
        let time = new Date().getTime() / 60000;

        if (time - last_connection < 1)
        {
            string = "En ligne";
        } else if (time - last_connection < 60 )
        {
            string = "Hors ligne depuis " + Math.floor(time - last_connection) + " minutes";
        } else if (time - last_connection < 60 * 24)
        {
            string = "Hors ligne depuis " + Math.floor((time - last_connection) / 60) + " heures";
        } else if (time - last_connection < 60 * 24 * 30)
        {
            string = "Hors ligne depuis " + Math.floor((time - last_connection) / (60 * 24)) + " jours";
        } else if (time - last_connection < 60 * 24 * 365)
        {
            string = "Hors ligne depuis " + Math.floor((time - last_connection) / (60 * 24 * 30)) + " mois";
        } else 
        {
            string = "Hors ligne depuis " + Math.floor((time - last_connection) / (60 * 24 * 365)) + " ans";
        }
        this.attributes.appendChild(document.createElement("li")).textContent = string;

        if ((await account.isAdmin).isAdmin)
        {
            let div_info = this._description_div.appendChild(document.createElement("div"));
            div_info.classList.add("lil-attribute");
            div_info.classList.add("admin");
            div_info.title = "Cet utilisateur est un administrateur";
        }
    }

    get skinRender()
    {
        return this._skinRender;
    }

    async updateSkinRender(user, event)
    {
        const actualTime = new Date();
        if (event.detail.playerModel)
        {
//            event.detail.playerModel.rotation.y += (actualTime.getTime() - this._lastTime.getTime()) / 50 / 180 * Math.PI;
            this._lastTime = actualTime;
            event.detail.playerModel.children[0].rotation.y = (event.detail.playerModel.children[0].rotation.y * this._target.speed + this._target.y) / (this._target.speed + 1);
            event.detail.playerModel.children[0].rotation.x = (event.detail.playerModel.children[0].rotation.x * this._target.speed + this._target.x) / (this._target.speed + 1);

            if (Math.abs(event.detail.playerModel.children[0].rotation.y - this._target.y) < this._target.accuracy && Math.abs(event.detail.playerModel.children[0].rotation.x - this._target.x) < this._target.accuracy)
            {
                this._target = {
                    x: Math.random() * Math.PI / 3 - Math.PI / 6,
                    y: Math.random() * Math.PI / 3 - Math.PI / 6,
                    speed: Math.floor(Math.random() * 100) + 1,
                };
                this._target.accuracy = Math.random() * this._target.speed / 500;
            };

            event.detail.playerModel.children[2].rotation.x = Math.cos(actualTime.getTime() / 5 / 180 * Math.PI) * Math.PI / 3;
            event.detail.playerModel.children[3].rotation.x = -Math.cos(actualTime.getTime() / 5 / 180 * Math.PI) * Math.PI / 3;
            event.detail.playerModel.children[4].rotation.x = Math.cos(actualTime.getTime() / 5 / 180 * Math.PI - Math.PI / 6) * Math.PI / 5;
            event.detail.playerModel.children[5].rotation.x = -Math.cos(actualTime.getTime() / 5 / 180 * Math.PI - Math.PI / 6) * Math.PI / 5;
//            event.detail.playerModel.children[3].rotation.z = .1;
//            event.detail.playerModel.children[6].rotation.x = .1;
        };
        this._lastTime = actualTime;
    }

    get title () {
        return this._title.textContent;
    }

    set title (title) {
        this._title.textContent = title;
    }

    get attributes()
    {
        return this._attributes;
    }
}

function createDescription() {
    let descriptive_content = document.createElement("div");
    descriptive_content.classList.add("user-element");

    let image_part = descriptive_content.appendChild(document.createElement("div"));
    image_part.classList.add("userImage");

    let description = descriptive_content.appendChild(document.createElement("div"));
    description.classList.add("user-description");

    let title = description.appendChild(document.createElement("h1"));

    let attributes = description.appendChild(document.createElement("ul"));

    return {
        element: descriptive_content,
        description: description,
        image_integration: image_part,
        title: title,
        attributes: attributes
    };
}

