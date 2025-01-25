export const SKILL_TYPE_HARD_SKILL          = 0
export const SKILL_TYPE_SOFT_SKILL          = 1
export const SKILL_TYPE_TONGUE_LANGAGE      = 2
export const SKILL_TYPE_COMPUTER_LANGAGE    = 3

export class Skill
{
    constructor(name, type, logo)
    {
        this._name = name;
        this._type = type;
        this._logo = logo;
    }

    get name()
    {
        return this._name;
    }

    get type()
    {
        return this._type;
    }

    get logo()
    {
        return this._logo;
    }

}