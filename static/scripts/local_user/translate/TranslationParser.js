export class TranslationParser
{
    constructor()
    {

    }

    parse(text)
    {
        let cut_data = this.cut(text);

        for (let i=0; i < cut_data.length ; ++i)
        {
            let word = cut_data[i];

            if (i % 2 == 1 && word.includes(":"))
            {
                let data_info = word.substring(0, word.indexOf(":"));
                let data_arg = word.substring(word.indexOf(":")+1);

                if (data_info === "emphase")
                {
                    cut_data[i] = `<span class='emphase'>${this.parse(data_arg)}</span>`;
                } else if (data_info === "highlight") {
                    cut_data[i] = `<span class='highlighted'>${this.parse(data_arg)}</span>`;
                } else if (data_info === "not translated") {
                    cut_data[i] = `<span class='not-translated' title='this text could not be translated'>${this.parse(data_arg)}</span>`;
                } else if (data_info === "hide") {
                    cut_data[i] = `<span class='hidden'>${this.parse(data_arg)}</span>`;
                } else {
                    cut_data[i] = data_arg ;
                }
            }
        }
        
        return cut_data.join('');
    }

    cut(text)
    {
        let result = [""];
        let inside = 0;

        for (let char of text)
        {
            if (char === "<")
            {
                char = "&lt;";
            }

            if (char === ">")
            {
                char = "&gt;";
            }

            if (char == "{") {
                if (inside === 0) result.push( "" );
                else result[result.length - 1] = result[result.length - 1] + "{";
                inside += 1;
            } else if (inside > 0 && char === "}")
            {
                inside -= 1;
                if (inside === 0) result.push( "" );
                else result[result.length - 1] = result[result.length - 1] + "}";
            } else {
                result[result.length - 1] = result[result.length - 1]  + char;
            }
        }

        return result;
    }
}
