import { CookiesArray } from "./CookiesArray.js";

export class CookiesObject {

    constructor(key, shelve) {
        this._key = key;
        this._shelve = shelve;

		if (this.data == undefined) {
            this.data = {};
        }
    }

	get data () {
        return this._shelve.get(this._key);
	}
	
	set data (value) {
        this._shelve.set(this._key, value);
	}

	get (name) {
		return this.data[name];
	}

	set (name, value) {
		let data = this.data;
		data[name] = value;
		this.data = data;
	}

	createArray(name) {
		return new CookiesArray(name, this);
	}

	createObject(name) {
		return new CookiesObject(name, this);
	}

}