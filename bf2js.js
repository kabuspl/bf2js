const bf2js = {
    convert: function(code) {
        let jsCode = "function bf(i=''){let j=0,p=0,m=[],o='';m[0]=0;"
        let optimized = [];
        for (let i = 0; i < code.length; i++) {
            if (/^[\<\>\+\-\.\,\[\]]/.test(code[i])) {
                if (i > 0 && optimized.at(-1).function == code[i])
                    optimized.at(-1).count++;
                else
                    optimized.push({ function: code[i], count: 1 });
            }
        }
        console.log(optimized);
        for (let fun of optimized) {
            if (/^[\<\>\+\-]/.test(fun.function)) {
                switch (fun.function) {
                    case "<":
                        jsCode += "p-=" + fun.count + ";if(m[p]==undefined)m[p]=0;";
                        break;
                    case ">":
                        jsCode += "p+=" + fun.count + ";if(m[p]==undefined)m[p]=0;";
                        break;
                    case "+":
                        jsCode += "m[p]+=" + fun.count + ";";
                        break;
                    case "-":
                        jsCode += "m[p]-=" + fun.count + ";";
                        break;
                }
            } else {
                for (let i = 0; i < fun.count; i++) {
                    switch (fun.function) {
                        case ".":
                            jsCode += "o+=String.fromCharCode(m[p]);";
                            break;
                        case ",":
                            jsCode += "m[p]=i.charCodeAt(j);j++;";
                            break;
                        case "[":
                            jsCode += "while(m[p]){";
                            break;
                        case "]":
                            jsCode += "}";
                            break;
                    }
                }
            }
        }
        jsCode += "return o;}";
        return jsCode;
    }
}