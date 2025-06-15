import { Country } from "./Country.js";

export class CountriesList
{
    constructor(api, pages_retriever)
    {
        this._api = api;
        this._pages_retriever = pages_retriever;
    }

    async getAllCountries()
    {
        let data = await this._api.sendAction("get-countries");

        let result = [];

        for (let country_data of data)
        {
            result.push(new Country(this._pages_retriever, country_data.name, country_data.visit_code, country_data.shape));
        }

        return result;
    }
}


