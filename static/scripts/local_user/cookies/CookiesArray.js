import { CookiesObject } from "./CookiesObject.js";

export class CookiesArray { 

    constructor(key, shelve) {
        this._key = key;
        this._shelve = shelve;

        if (this.data == undefined) {
            this.data = [];
        }
    }

	get data () {
        return this._shelve.get(this._key);
	}
	
	set data (value) {
        this._shelve.set(this._key, value);
	}

	get (index) {
		return this.data[index];
	}

	set (index, value) {
		let data = this.data;
		data[index] = value;
		this.data = data;
	}

    push(element) {
		let data = this.data;
		data.push(element);
		this.data = data;
    }

    splice(fromindex, numindexs) {
		let data = this.data;
		data.splice(fromindex, numindexs);
		this.data = data;
    }

    pop() {
		let data = this.data;
		let result = data.pop;
		this.data = data;
        return result;
    }

    sort() {
		let data = this.data;
		data.sort();
		this.data = data;
    }

    indexOf(element) {
        return this.data.indexOf(element);
    }

    includes(element) {
        return this.data.includes(element);
    }

    get length () {
        return this.data.length;
    }

    reverse() {
		let data = this.data;
		data.reverse();
		this.data = data;
    }

    filter(func) {
        return this.data.filter(func);
    }

    map(func) {
        return this.data.map(func);
    }

    createArray(index) {
        if (index === undefined) {
            this.push(undefined);
            index = this.length - 1
        } 
        return new CookiesArray(index, this);
    }

    createObject(index) {
        if (index === undefined) {
            this.push(undefined);
            index = this.length - 1
        } 
        return new CookiesObject(index, this);
    }

}