export const PROJECT_TYPE_PERSONNAL         = 0
export const PROJECT_TYPE_SCOLAR            = 1
export const PROJECT_TYPE_PROFESSIONNAL     = 2

export class Project
{
    constructor(pages_retriever, name, type, thumbnail, date_from, date_to, finished, location)
    {
        this._pages_retriever = pages_retriever;
        this._name = name;
        this._type = type;
        this._thumbnail = thumbnail;
        this._date_from = date_from;
        this._date_to = date_to;
        this._finished = finished;
        this._location = location;
    }

    async getPage()
    {
        return await this._pages_retriever.getProjectsPage(this._name);
    }

    get name()
    {
        return this._name;
    }

    get type()
    {
        return this._type;
    }

    get thumbnail()
    {
        return this._thumbnail;
    }

    get date_from()
    {
        return this._date_from;
    }

    get date_to()
    {
        return this._date_to;
    }

    get finished()
    {
        return this._finished;
    }

    get location()
    {
        return this._location;
    }

}