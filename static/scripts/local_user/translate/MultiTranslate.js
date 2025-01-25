export class MultiTranslator
{
    constructor(func, ...translated_texts)
    {
        this._func = func;
        this._translations = translated_texts;

        for (let translated_text of translated_texts)
        {
            translated_text.addEventListener("change", () => {
                this.translate();
            });
        }

        this.translate();
    }

    translate()
    {
        let results = [];

        for (let translation of this._translations)
        {
            results.push(translation.actual_translation);
        }

        this._func(...results);
    }
}
