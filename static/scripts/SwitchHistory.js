import { EventHandler } from "./events/EventHandler.js";

export class SwitchHistory
{
    constructor()
    {
        this._events = {
            push: new EventHandler(),
            pop: new EventHandler()
        }

        window.addEventListener('popstate', (event) => {
            this._events.pop.emit();
        });
    }

    addEventListener(name, func)
    {
        this._events[name].connect(func);
    }

    get path()
    {
        let pathname = window.location.pathname;
        return this.properpath(pathname)?this.properpath(pathname).split("/"):[];
    }

    properpath(pathname)
    {
        let path = pathname.split('/');
        
        let index;

        while ((index = path.indexOf('')) != -1)
        {
            path.splice(index, 1);
        }

        let result_pathname = '';

        for (let sub_path of path)
        {
            if (result_pathname) result_pathname += "/";
            result_pathname += sub_path
        }

        return result_pathname;
    }


    /*
    propertpath(pathname)
    {
        let path=pathname.split('/');
        let index;
        while(index=path.indexOf('')!=- 1){
            path.splice(index,1);
        };

        let result_pathname='';

        for(let sub_path of path){

            if(result_pathname)result_pathname+="/";
            result_pathname+=sub_path;

        };

        return result_pathname;
    }
    */
    get state()
    {
        let state = {};

        let search_data = new URL(window.location).searchParams;

        for (let key of search_data.keys())
        {
            try {
                state[key] = JSON.parse(search_data.get(key));
            } catch (exc) {
                state[key] = search_data.get(key);
            }
        }

        for (let key of Object.keys(window.history.state || {}))
        {
            state[key] = (window.history.state || {})[key];
        }

        return state;
    }

    goForward()
    {
        history.forward();
    }

    goBack()
    {
        history.back();
    }

    pushState(path, state)
    {
        let pathname = this.properpath(path);
        let new_url = new URL("https://" + window.location.hostname + "/" + pathname);

        for (let key of Object.keys(state))
        {
            new_url.searchParams.set(key, state[key]);
        }

        window.history.pushState(state, null, "/" + pathname + new_url.search);

        this._events.push.emit(pathname, state);
    }
}