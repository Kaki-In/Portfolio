import { appendChild, Component } from "../../components/Component.js";
import { Image } from "../../components/Image.js";
import { APPEAR_OBSERVER, observeAppearition, resetAppearition } from "../../utils/animate-observer.js";
import { ComputerLanguagesSection } from "./sections/skills/ComputerLanguagesSection.js";
import { HardSkillsSection } from "./sections/skills/HardSkillsSection.js";
import { SoftSkillsSection } from "./sections/skills/SoftSkillsSection.js";
import { TongueLanguagesSection } from "./sections/skills/TongueLanguagesSecttion.js";
import { PersonnalBackgroundSection } from "./sections/experiences/PersonnalBackgroundSection.js";
import { ProfessionnalBackgroundSection } from "./sections/experiences/ProfessionnalBackgroundSection.js";
import { EsriMap } from "../../components/Map.js";
import { CountriesSection } from "./sections/countries/CountriesSection.js";
import { SchoolBackgroundSection } from "./sections/experiences/SchoolBackgroundSection.js";
import { PersonnalProjectsSection } from "./sections/projects/PersonnalProjectsSection.js";
import { ProfessionnalProjectsSection } from "./sections/projects/ProfessionalProjectSection.js";
import { ScolarProjectsSection } from "./sections/projects/ScolarProjectsSection.js";

export class WelcomePage extends Component
{
    constructor(local_user, notifications, switch_history)
    {
        let { div, title, intro_text } = createWelcomePage(local_user, notifications, switch_history);
        super(div);

        local_user.translator.multiTranslate((hello, intro) => {
            title.innerHTML = hello;
            intro_text.innerHTML = intro;
        }, "common.hello", "welcome.intro");
    }
}


function createWelcomePage(local_user, notifications, switch_history)
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

    let hard_skills_section = appendChild(div, new HardSkillsSection(local_user, notifications, switch_history));
    let soft_skills_section = appendChild(div, new SoftSkillsSection(local_user, notifications, switch_history));
    let tongue_language_section = appendChild(div, new TongueLanguagesSection(local_user, notifications, switch_history));
    let computer_language_section = appendChild(div, new ComputerLanguagesSection(local_user, notifications, switch_history));

    let prof_background = appendChild(div, new ProfessionnalBackgroundSection(local_user, notifications, switch_history));
    let pers_background = appendChild(div, new PersonnalBackgroundSection(local_user, notifications, switch_history));

    let pers_projects = appendChild(div, new PersonnalProjectsSection(local_user, notifications, switch_history));
    let scolar_projects = appendChild(div, new ScolarProjectsSection(local_user, notifications, switch_history));
    let prof_projects = appendChild(div, new ProfessionnalProjectsSection(local_user, notifications, switch_history));

    let map = appendChild(div, new CountriesSection("common.title.visited-countries", "810d2ec0386d4e30b3144cfd22e6781c", local_user, notifications, switch_history));

    let school_background = appendChild(div, new SchoolBackgroundSection(local_user, notifications, switch_history));
    
    observeAppearition(intro_div);
    observeAppearition(hard_skills_section.element);
    observeAppearition(soft_skills_section.element);
    observeAppearition(tongue_language_section.element);
    observeAppearition(computer_language_section.element);
    observeAppearition(prof_background.element);
    observeAppearition(pers_background.element);
    observeAppearition(prof_projects.element);
    observeAppearition(scolar_projects.element);
    observeAppearition(pers_projects.element);
    observeAppearition(school_background.element);
    observeAppearition(map.element);

    return {
        div,
        title,
        intro_text
    }
}

