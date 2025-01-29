import { Component } from "./Component.js";

export class SVGAnimation extends Component
{
    constructor(svg_text)
    {
        let parent = document.createElement("div");
        parent.innerHTML = svg_text;

        let element = parent.children[0];
        parent.removeChild(element);

        let animations = [];

        let animates_elements = element.getElementsByTagName('animate');
        let animate_motions = element.getElementsByTagName('animateMotion');
        let animate_transform = element.getElementsByTagName('animateTransform');

        let prepare = (animation) => 
        {
            if ((animation.getAttribute('begin') || '0s') === '0s' && (animation.getAttribute("dur") === "0s" || animation.getAttribute("dur") === "indefinite"))
            {
                return;
            }
            
            let anim_object = {};
            anim_object.animation = animation;

            let begin_data = animation.getAttribute('begin') || "0.000s";

            anim_object.delay = parseFloat(begin_data.substring(0, begin_data.length - 1));

            anim_object.timeout = null;

            animation.setAttribute('begin', "indefinite");

            animations.push(anim_object);
        }

        for (let element of animates_elements) prepare(element);
        for (let element of animate_motions) prepare(element);
        for (let element of animate_transform) prepare(element);

        super(element);

        this._animations = animations;
        
    }

    start()
    {
        for (let animation_object of this._animations)
        {
            animation_object.timeout = setTimeout(() => {
                animation_object.animation.beginElement();
            }, animation_object.delay * 1000);
        }
    }
}


