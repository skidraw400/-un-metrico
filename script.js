value = 0;

const Element = {
    SettingsToggle: document.getElementById("settings-tohide"),
    AnswerInput: document.getElementById("global"),
    QuestionText: document.getElementById("question"),
    Body: document.getElementById("body"),
    Difference: document.getElementById("diff"),
    PrecisionOption: document.getElementById("requiredprecision")
}

let precision = Element.PrecisionOption.value;

let MinRange = 1;
let MaxRange = 120;

function toggleSettings() {

    if (Element.SettingsToggle.style.display === "none") {
        Element.SettingsToggle.style.display = "block";
    } else {
        Element.SettingsToggle.style.display = "none";
    }
}

function getRandomDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

function SetValue() {
    let oldvalue = value;
    let lock = 0;
    precision = Element.PrecisionOption.value;
    while (oldvalue == value && lock < 5) {
        let source = precision*(Number.parseFloat(
            MinRange + Math.floor(Math.random() * (MaxRange/precision - MinRange)))
            .toFixed(0));
        Element.QuestionText.innerHTML = source + "mph";
        Element.Body.style.backgroundColor = getRandomDarkColor();
        value = Number.parseFloat(source * 1.609344).toFixed(0);
        lock++;
    }
}

const animation = [
    { transform: "translate(14px, 0px)" },
    { transform: "translate(-16px, 0px)" },
    { transform: "translate(-2px, 0px)" },
    { transform: "translate(16px, 0px)" },
    { transform: "translate(1px, 0px)" },
    { transform: "translate(-14px, 0px)" },
    { transform: "translate(-17px, 0px)" },
    { transform: "translate(15px, 0px)" },
    { transform: "translate(-13px, 0px)" },
    { transform: "translate(16px, 0px)" },
    { transform: "translate(19px, 0px)" }
];

const newspaperTiming = {
    duration: 300,
    iterations: 1,
};

function GetValue() {
    Element.Difference.innerHTML = Math.abs(Element.AnswerInput.value - value);
    console.log("Precision: ", precision, "Range: ", MaxRange/precision, "difference" , Math.abs(Element.AnswerInput.value - value), "answer", value);
    if (Math.abs(Element.AnswerInput.value - value) <= precision) {
        SetValue();
        Element.AnswerInput.value = "";
    } else {
        Element.AnswerInput.animate(animation, newspaperTiming);
        setTimeout(function () {
            Element.AnswerInput.value = "";
        }, 200);
    }
}

Element.AnswerInput.addEventListener("keyup", function (event) {
    if (event.key === "," || event.key === ".") {
        Element.AnswerInput.value = AnswerInput.value.slice(0, -1);
        GetValue();
    }
    if (event.key === "Enter") {
        GetValue();
    }
});
