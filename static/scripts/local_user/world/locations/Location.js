export class Location
{
    constructor(pages_retriever, name, logo, position, visit_code)
    {
        this._pages_retriever = pages_retriever;
        this._name = name;
        this._logo = logo;
        this._position = position;
        this._visit_code = visit_code;
    }
    
    async getPage()
    {
        return await this._pages_retriever.getLocationPage(this._name);
    }

    get name()
    {
        return this._name;
    }

    get logo()
    {
        return this._logo;
    }

    get position()
    {
        return this._position;
    }

    get visit_code()
    {
        return this._visit_code;
    }
}