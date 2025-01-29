import { UserInterface } from "./ui/UserInterface.js";
import { LocalUser } from "./local_user/LocalUser.js";
import { ServiceWorkerInstaller } from "./service_worker/installer.js";
import { SwitchHistory } from "./SwitchHistory.js";

export class Platform
{
    constructor()
    {
        this._local_user = new LocalUser();
        this._switch_history = new SwitchHistory();
        this._user_interface = new UserInterface(this._local_user, this._switch_history);
//        this._service_installer = new ServiceWorkerInstaller();
    }
}

