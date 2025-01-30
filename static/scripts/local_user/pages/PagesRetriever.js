export class PagesRetriever
{
    constructor(host)
    {
        this._host = host;
    }

    async getPage(prefix, name, extension)
    {
        try {
            let data = await fetch(this._host + "/" + prefix + "/" + name + "/index." + extension, {cache: 'reload'});

            if (!data.ok)
            {
                console.warn("couldn't fetch : server answered respond with a status of " + data.status , { prefix, name, extension});
                return "";
            }
            
            return await data.text();
        } catch (exc) {
            console.warn(exc);
            return "";
        }
    }

    async getPageData(prefix, name)
    {
        return {
            html: await this.getPage(prefix, name, "html"),
            css: await this.getPage(prefix, name, "css"),
            javascript: await this.getPage(prefix, name, "js")
        }
    }

    async getExperiencePage(name)
    {
        return await this.getPageData("experiences", name);
    }

    async getProjectPage(name)
    {
        return await this.getPageData("projects", name);
    }
}


