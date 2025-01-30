export class CssParser
{
    constructor()
    {

    }

    split_content(data)
    {
        while (data.endsWith(" "))
            data = data.substring(0, data.length-1);

        if (data === "") return [];
        else return [data];
    }

    split_css(data)
    {
        data = data.replaceAll("\n", " ").replaceAll("\t", " ");

        while (data.includes("  ")) data = data.replaceAll("  ", " ");

        let result = [""];
        let brackets = 0;

        let intermediate_data;
        let inside_comment = false;

        for (let i = 0; i < data.length; ++i)
        {
            let char = data[i];

            if (inside_comment)
            {
                if (char === "*" && data[i+1] === "/")
                {
                    inside_comment = false;
                    i += 1;
                }
                continue;
            } else if (char === "/" && data[i+1] === "*") {
                inside_comment = true;
                i += 1;
                continue;
            }

            if (brackets === 0)
            {
                if (char === " ")
                {
                    if (result[result.length - 1].length)
                    {
                        result[result.length - 1] += " ";
                    } else {
                        continue;
                    }
                } else if (char === "{"){
                    intermediate_data = "";
                    brackets += 1;
                } else {
                    result[result.length - 1] += char;
                }
            } else {
                if (char === " ")
                {
                    if (intermediate_data.length)
                    {
                        intermediate_data += " ";
                    } else {
                        continue;
                    }
                } else if (char === "{") {
                    brackets += 1;
                    intermediate_data += "{";
                } else if (char === "}") {
                    brackets -= 1;

                    if (brackets === 0)
                    {
                        while (result[result.length - 1].endsWith(" ")) result[result.length -1] = result[result.length - 1].substring(0, result[result.length - 1].length - 1);

                        if (result[result.length - 1].startsWith("@media"))
                        {
                            result.push(this.split_css(intermediate_data));
                        } else {
                            result.push(this.split_content(intermediate_data));
                        }

                        result.push("");
                    } else {
                        intermediate_data += "}";
                    }
                } else {
                    intermediate_data += char;
                }
            }
        }

        while (result[result.length-1] === "") result.splice(-1);
        while (result[result.length-1] && result[result.length-1].constructor === String && result[result.length-1].endsWith(" ")) result[result.length-1] = result[result.length-1].substring(0, result[result.length-1].length-1);

        return result;
    }

    parseSplitted(name, splitted)
    {
        let result = "";

        let terminal = true;
        for (let element of splitted)
        {
            if (element.constructor === Array)
            {
                terminal = false;
            }
        }

        for (let element of splitted)
        {
            if (element.constructor === Array)
            {
                if (element.length > 0) result += " {\n  " + this.parseSplitted(name, element).replaceAll("\n", "\n  ") + "\n}\n\n";
                else result += " { /* this style is empty */}\n"
            } else {
                if (element.startsWith("@")) {
                    result += element;
                } else if (terminal) {
                    result += element + "\n";
                } else {
                    result += name + " " + element ;
                }
            }
        }

        return result;

    }

    parse(name, data)
    {
        let splitted = this.split_css(data);

        return this.parseSplitted(name, splitted);
    }
}