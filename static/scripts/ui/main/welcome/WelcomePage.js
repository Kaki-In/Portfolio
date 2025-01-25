import { appendChild, Component } from "../../components/Component.js";
import { Image } from "../../components/Image.js";
import { APPEAR_OBSERVER, observeAppearition, resetAppearition } from "../../utils/animate-observer.js";
import { ComputerLanguagesSection } from "./sections/ComputerLanguagesSection.js";
import { PersonnalBackgroundSection } from "./sections/PersonnalBackgroundSection.js";
import { HardSkillsSection } from "./sections/HardSkillsSection.js";
import { SoftSkillsSection } from "./sections/SoftSkillsSection.js";
import { TongueLanguagesSection } from "./sections/TongueLanguagesSecttion.js";

export class WelcomePage extends Component
{
    constructor(local_user, notifications)
    {
        let { div, title, intro_text } = createWelcomePage(local_user, notifications);
        super(div);

        local_user.translator.multiTranslate((hello, intro) => {
            title.innerHTML = hello;
            intro_text.innerHTML = intro;
        }, "common.hello", "welcome.intro");
    }
}


function createWelcomePage(local_user, notifications)
{
    let div = document.createElement("div");
    div.id = "welcome";

    let intro_div = div.appendChild(document.createElement("div"));
    intro_div.classList.add("intro-section");

    let intro_text_div = intro_div.appendChild(document.createElement("div"))
    intro_text_div.classList.add("intro-texts");

    let title = intro_text_div.appendChild(document.createElement("h1"));

    let intro_text = intro_text_div.appendChild(document.createElement("p"));
    intro_text.classList.add("intro");

    let intro_image = appendChild(intro_div, new Image("/static/images/my-face.png"));
    intro_image.element.classList.add("bordered");

    let hard_skills_section = appendChild(div, new HardSkillsSection(local_user, notifications));
    let soft_skills_section = appendChild(div, new SoftSkillsSection(local_user, notifications));
    let tongue_language_section = appendChild(div, new TongueLanguagesSection(local_user, notifications));
    let computer_language_section = appendChild(div, new ComputerLanguagesSection(local_user, notifications));

    let pers_background = appendChild(div, new PersonnalBackgroundSection(local_user, notifications));

    observeAppearition(intro_div);
    observeAppearition(hard_skills_section.element);
    observeAppearition(soft_skills_section.element);
    observeAppearition(tongue_language_section.element);
    observeAppearition(computer_language_section.element);
    observeAppearition(pers_background.element);

    return {
        div,
        title,
        intro_text
    }
}

