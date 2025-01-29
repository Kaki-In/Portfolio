export const EXPERIENCE_TYPE_PERSONNAL      = 0
export const EXPERIENCE_TYPE_PROFESSIONNAL  = 1

export class Experience
{
    constructor(name, type, thumbnail, date_from, date_to)
    {
        this._name = name;
        this._type = type;
        this._thumbnail = thumbnail;
        this._date_from = date_from;
        this._date_to = date_to;
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

}