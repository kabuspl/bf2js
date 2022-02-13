const bf2js = {
    convert: function(code) {
        let jsCode = "function bf(i=''){let j=0,p=0,m=[],o='';m[0]=0;"
        for (let i = 0; i < code.length; i++) {
            switch (code[i]) {
                case "<":
                    jsCode += "p--;if(m[p]==undefined)m[p]=0;";
                    break;
                case ">":
                    jsCode += "p++;if(m[p]==undefined)m[p]=0;";
                    break;
                case "+":
                    jsCode += "m[p]++;";
                    break;
                case "-":
                    jsCode += "m[p]--;";
                    break;
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
                default:
                    break;
            }
        }
        jsCode += "return o;}";
        return jsCode;
    }
}