import { CookiesArray } from "./CookiesArray.js";
import { CookiesObject } from "./CookiesObject.js";

export class CookiesDatabase {
	constructor (appname) {
		this._name = appname;

		if (this.data === undefined) {
            this.data = {};
        }
	}

	get data () {
		try {
			let cookie = document.cookie.split("; ").find((row) => row.startsWith(this._name + "="));
			if (cookie) {
				let result = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
				return result;
			}
		} catch {
		}
	}

	set data (value) {
		var dateExpiration = new Date();
		var time = dateExpiration.getTime();
		var expireTime = time + 30 * 24 * 3600 * 1000;
		dateExpiration.setTime(expireTime);
		console.log(dateExpiration);

		document.cookie = this._name + "=" + encodeURIComponent(JSON.stringify(value)) + "; expires=" + dateExpiration.toGMTString() + "; path=/; SameSite=None; Secure";
		console.log(this._name + "=" + encodeURIComponent(JSON.stringify(value)) + "; expires=" + dateExpiration.toGMTString() + "; path=/; SameSite=None; Secure");
		return true;
	}

	get (name) {
		return this.data[name] || null;
	}

	set (name, value) {
		let data = this.data;
		data[name] = value;
		this.data = data;
	}

	createObject(name) {
		return new CookiesObject(name, this);
	}

	createArray(name) {
		return new CookiesArray(name, this);
	}

}