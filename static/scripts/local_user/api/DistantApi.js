export class DistantAPI
{
    constructor(api_url)
    {
        this._api_url = api_url;
    }

    async sendAction(name, payload)
    {
        let url = new URL(this._api_url + "/" + name + "?");

        for (let payload_name of Object.keys(payload || {}))
        {
            url.searchParams.set(payload_name, payload[payload_name]);
        }

        let data = await fetch(url);

        if (!data.ok)
        {
            throw new Error("couldn't fetch : returned a status " + data.status);
        }

        return await data.json();
    }
}

