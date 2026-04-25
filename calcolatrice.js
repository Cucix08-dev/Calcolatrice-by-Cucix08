const buttons = document.querySelectorAll(".button");
const operazione = document.querySelectorAll(".operazione");
let risultato = document.getElementById("risultato");
const body = document.getElementById("background")

const mode = document.getElementById("mode");
let darkTheme = true;

let textRisultato = "";

let isElevato = false;

function removeErrorText(text){
    return (text == "Errore" || text == "Indeterminato" || text == "Numero troppo grande")? "" : text;
}


let trasparenteApplicata = false;

setInterval(() => {
    if (textRisultato === "" && !trasparenteApplicata) {
        operazione.forEach(op => op.classList.add("trasparente"));
        trasparenteApplicata = true;
    }
    else if (textRisultato !== "" && trasparenteApplicata) {
        operazione.forEach(op => op.classList.remove("trasparente"));
        trasparenteApplicata = false;
    }
}, 100);

document.getElementById('mode').addEventListener('click', () => {
    darkTheme = !darkTheme
    if (darkTheme){
        mode.classList.add("dark");
        mode.classList.remove("light");
        mode.innerHTML = "Dark"
        body.classList.add("dark");
        body.classList.remove("light");
    }
    else{
        mode.classList.remove("dark");
        mode.classList.add("light");
        mode.innerHTML = "Light"
        body.classList.remove("dark")
        body.classList.add("light")
    }
});

buttons.forEach(el => {
    el.addEventListener("click", () => {
        switch (el.id) {
            case "AC":
                textRisultato = "";
                break;

            case "C":
                textRisultato = removeErrorText(textRisultato);
                textRisultato = textRisultato.slice(0, -1);
                break;
        
            case "potenza":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato += "^";
                }
                isElevato = true;
                break;

            case "sqrt":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(Math.sqrt(eval(textRisultato)));
                }
                break;

            case "negate":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(-Number(textRisultato));
                }
                break;

            case "log":
                textRisultato = removeErrorText(textRisultato);
                if(textRisultato !== ""){
                    textRisultato = String(Math.log10(Number(textRisultato)))
                }
                break;

            case ",":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== ""){
                    textRisultato += ".";
                }
                break;

            case "potenza^2":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato += "^2";
                    isElevato = true;
                }
                break;

            case "cos":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(Math.cos(Number(textRisultato)));
                }
                break;

            case "sin":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(Math.sin(Number(textRisultato)));
                }
                break;

            case "tan":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(Math.tan(Number(textRisultato)));
                }
                break;

            case "cot":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(1/Math.tan(Number(textRisultato)));
                }
                break;

            case "sec":
                textRisultato = removeErrorText(textRisultato);
                if (textRisultato !== "") {
                    textRisultato = String(1/Math.cos(Number(textRisultato)));
                }
                break;

            case "pi":
                textRisultato = String(Math.PI);
                break;

            case "e":
                textRisultato = String(Math.E);
                break;

            case "=":
                textRisultato = removeErrorText(textRisultato);
                if (isElevato) {
                    let potenza = textRisultato.indexOf("^")
                    let x = textRisultato.substring(0, potenza)
                    let y = textRisultato.substring(potenza + 1)

                    textRisultato = String(Math.pow(Number(x), Number(y)))
                    
                    if (Number(x) == 0 && Number(y) == 0){
                        textRisultato = "Indeterminato";
                    }

                    isElevato = false;
                }
                else if (isElevato == false && textRisultato !== ""){
                    try{
                        textRisultato = String(eval(String(textRisultato)))
                    }
                    catch (e) {
                        textRisultato = ""
                    }
                }
                break;

            default:
                textRisultato = removeErrorText(textRisultato);
                if(textRisultato !== "" || Number(el.id) >= 0 && Number(el.id) <= 9){
                    textRisultato += el.innerHTML;
                }
                break;
        }

        if (textRisultato == String(NaN)) {
            textRisultato = "Errore";
        }
        else if (textRisultato == Infinity){
            textRisultato = "Numero troppo grande"
        }

        risultato.value = textRisultato
    });
});
