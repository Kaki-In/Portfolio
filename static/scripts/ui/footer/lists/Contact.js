 import { FooterList } from "../../components/FooterList.js";

export class ContactMeFooterList extends FooterList
{
    constructor(local_user) 
    {
        super("Me contacter");

        this._mobile_link = this.addLink("", "tel:+33749364049");
        this._mail_link = this.addLink("", "mailto:eden @ mifamofi . net");
        this._address_link = this.addLink("Adresse : 16, rue du Moulin, 68120 Richwiller", "https://maps.app.goo.gl/szS5yiAFYVqrdLzD6");

        local_user.translator.multiTranslate((contact, mail, mobile, location) => {
            this.title = contact;

            this._mobile_link.innerHTML = mobile;
            this._mail_link.innerHTML = mail;
            this._address_link.innerHTML = location;
        }, "common.title.contact-me", "contacts.email", "contacts.mobile", "contacts.location");
    }
}


