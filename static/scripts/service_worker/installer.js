import { EventHandler } from "../events/EventHandler.js";

export class ServiceWorkerInstaller
{

    constructor()
    {
        this._key = null;
        this._started = false;

        this._events = {
            subscription_created: new EventHandler()
        }
    }

    addEventListener(name, func)
    {
        this._events[name].connect(func);
    }

    get key()
    {
        return this._key;
    }

    set key(key)
    {
        this._key = key;
    }

    async start()
    {
        const permission = await Notification.requestPermission();

        if (permission === "granted")
        {
            await this.registerServiceWorker();
        } else {
            setTimeout(() => {this.start()}, 60000);
        }
    }

    async registerServiceWorker()
    {
        const registration = await navigator.serviceWorker.register("/static/service_worker/service.js");
        let subscription = await registration.pushManager.getSubscription();
        if (!subscription) {
            subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(this._key)
            });
        }

        await this.saveSubscription(subscription);
    }

    async saveSubscription(subscription)
    {
        this._events.subscription_created.emit(subscription);
    }

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
