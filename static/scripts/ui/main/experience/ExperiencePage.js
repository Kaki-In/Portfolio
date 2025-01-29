import { appendChild, Component } from "../../components/Component.js";
import { SVGAnimation } from "../../components/SVGAnimation.js";

export class ExperiencePage extends Component
{
    constructor(local_user, notifications, switch_history)
    {
        let { div, text } = createExperiencePage();
        super(div);

        local_user.translator.multiTranslate((not_finished_yet) => {
            text.innerHTML = not_finished_yet;
        }, "common.not-finished")
    }
}

function createExperiencePage()
{
    let div = document.createElement("div");
    div.id = "experience";

    let text = div.appendChild(document.createElement("p"));

    let loading_svg = appendChild(div, new SVGAnimation(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
          <ellipse style="fill: rgba(255, 0, 0, 0); stroke: rgb(255, 0, 0); stroke-width: 50px; stroke-miterlimit: 5.03; transform-box: fill-box; transform-origin: 50% 50%; stroke-dasharray: 251.23, 1130.52;" cx="250" cy="250" rx="200" ry="200">
            <animate attributeName="stroke-dasharray" values="1004.9, 251.23;251.23, 1004.9;1004.9, 251.23" begin="0s" dur="2.05s" fill="freeze" keyTimes="0; 0.50008; 1" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" repeatCount="indefinite"></animate>
            <animateTransform type="rotate" additive="sum" attributeName="transform" values="-180;180" begin="0s" dur="0.74s" keyTimes="0; 1" fill="freeze" repeatCount="indefinite"></animateTransform>
            <animateTransform type="rotate" additive="sum" attributeName="transform" values="0;0;-180" dur="2.03s" fill="freeze" keyTimes="0; 0.500337; 1" calcMode="spline" keySplines="0 0 1 1; 0.42 0 0.58 1"></animateTransform>
          </ellipse>
        </svg>
    `));
    loading_svg.element.classList.add("loading");
    loading_svg.start();

    return {
        div,
        text
    }
}

