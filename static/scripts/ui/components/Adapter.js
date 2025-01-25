import { appendChild, Component, removeChild } from "./Component.js"; 

let n = 0;

export class Adapter extends Component {

    constructor() {
        super(document.createComment("Nothing to display..."));
        this._content = null;
        this._comment = document.createComment("Nothing to display...");
    }

    get content() {
        return this._content;
    }

    set content(content) {
        if (this._content !== null) this._content.parent = null;
        
        super.element = content?content.element:this._comment;

        this._content = content;
    }

    get element()
    {
        return this._content?this._content.element:this._comment;
    }

    set element(element)
    {
        this._content.element = element;
    }

    set parent(parent)
    {
        if (parent === undefined) {
            throw new TypeError('parent cannot be undefined; would you write "null"?')
        }

        this.__parent__ = parent;

        if (this._content !== null)
        {
            this._content.parent = parent;
        }
    }

    get parent()
    {
        return super.parent;
    }

}