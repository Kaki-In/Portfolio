export const COUNTRY_TYPE_NEVER_VISITED = 0
export const COUNTRY_TYPE_VISITED       = 1
export const COUNTRY_TYPE_BASELAND      = 2

export class Country
{
    constructor(pages_retriever, name, visit_code, shape)
    {
        this._pages_retriever = pages_retriever;
        this._name = name;
        this._visit_code = visit_code;
        this._shape = shape;
    }
    
    async getPage()
    {
        return await this._pages_retriever.getCountryPage(this._name);
    }

    get name()
    {
        return this._name;
    }

    get visit_code()
    {
        return this._visit_code;
    }

    get shape()
    {
        return this._shape;
    }
}