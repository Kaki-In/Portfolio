export class DivTranslator
{
    constructor(translator)
    {
        this._translator = translator;
    }

    getNeededTranslations(element)
    {
        let translated_elements = {};

        if (element.getAttribute("translated") !== null)
        {
            let translation = element.textContent;

            if (!Object.keys(translated_elements).includes(translation))
            {
                translated_elements[translation] = [];
            }

            translated_elements[translation].push(element);
        }

        for (let child of (element.children || []))
        {
            let sub_translations = this.getNeededTranslations(child);
            
            for (let translation of Object.keys(sub_translations))
            {
                if (!Object.keys(translated_elements).includes(translation))
                {
                    translated_elements[translation] = [];
                }

                sub_translations[translation].forEach(element => {
                    translated_elements[translation].push(element);
                });
    
            }
        }

        return translated_elements;

    }

    translate(element)
    {
        let translated_elements = this.getNeededTranslations(element);

        let translations = Object.keys(translated_elements);

        if (translations.length > 0)
        {
            this._translator.multiTranslate((...args) => {
                for (let i = 0; i < translations.length ; ++i)
                {
                    let translation = translations[i];

                    for (let translated_element of translated_elements[translation])
                    {
                        translated_element.innerHTML = args[i];
                    }
                }
            }, ...translations);
        }
    }
}