import { Adapter } from "../components/Adapter.js";
import { HeaderComponent } from "../components/Header.js";
import { MainHeaderContent } from "./Content.js";

export class HeaderUI extends HeaderComponent
{
    constructor(main_ui, notifications)
    {
        super(new Adapter());
        this.adapter.content = new MainHeaderContent(main_ui, notifications);
    }
}
