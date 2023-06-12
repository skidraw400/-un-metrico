// (re)declaring html locations
const PageElement = {}
function SetElements() {
    PageElement.i_que = document.getElementById('question');
    PageElement.i_ans = document.getElementById('answerinput');
    PageElement.s_acc = document.getElementById('acc');
    PageElement.s_units = document.getElementById('units');
    PageElement.s_theme = document.getElementById('theme');
    PageElement.s_maincolor = document.getElementById('i_maincolor');
    PageElement.s_bgcolor = document.getElementById('i_bgcolor');
    PageElement.s_hidelogo = document.getElementById('i_hidelogo');
    PageElement.o_last = document.getElementById('menulast');
    PageElement.o_logo = document.getElementById('menulogo');
    PageElement.ts_primary = document.getElementById('ts-primary');
    PageElement.ts_background = document.getElementById('ts-background');
}

// preferences
const Preference = {
    "accuracy": 0,
    "units": 0,
    "maincolor": "#FFFFFF",
    "bgcolor": "dynamic",
    "hidelogo": false
}

function SavePref() {
    localStorage.setItem("accuracy", PageElement.s_acc.value);
    localStorage.setItem("units", PageElement.s_units.value);
    localStorage.setItem("hidelogo", PageElement.s_hidelogo.checked || ""); // setting an empty string, which will be parsed as false
    localStorage.setItem("maincolor", PageElement.s_maincolor.value);
    localStorage.setItem("bgcolor", PageElement.s_bgcolor.value);
    PageElement.s_theme.selectedIndex = 0;
    ReadPref();
    SetValue();
}

function ReadPref() {
    Preference.accuracy = localStorage.getItem('accuracy') || 0;
    PageElement.s_acc.selectedIndex = Preference.accuracy;

    Preference.units = localStorage.getItem('units') || 0;
    PageElement.s_units.selectedIndex = Preference.units;

    Preference.maincolor = localStorage.getItem('maincolor') || "#FFFFFF";
    PageElement.s_maincolor.value = Preference.maincolor;

    Preference.bgcolor = localStorage.getItem('bgcolor') || "dynamic";
    PageElement.s_bgcolor.value = Preference.bgcolor;

    PreviewTheme();

    Preference.hidelogo = localStorage.getItem("hidelogo") || false;
    PageElement.s_hidelogo.checked = Preference.hidelogo;
    if (Preference.hidelogo) PageElement.o_logo.innerHTML = "";
    else PageElement.o_logo.innerHTML = "(un)metrico";

    console.log("settings", {
        "accuracy": Preference.accuracy,
        "units": Preference.units,
        "maincolor": Preference.maincolor,
        "bgcolor": Preference.bgcolor,
        "hidelogo": Preference.hidelogo
    })
}


function CalculateValue(unitType, min, max) {
    let sourceUnit, convertedUnit, sourceValue, randomConvertedValue;
    randomConvertedValue = Math.round(Math.random() * (max - min) + min);
    if (unitType == 0) {
        convertedUnit = "km/h";
        sourceUnit = "mph";
        sourceValue = randomConvertedValue / 1.60934;
    } else if (unitType == 1) {
        convertedUnit = "mph";
        sourceUnit = "km/h";
        sourceValue = randomConvertedValue * 1.60934;
    } else if (unitType == 2) {
        convertedUnit = "°C";
        sourceUnit = "°F";
        sourceValue = (randomConvertedValue * 9 / 5) + 32;
    } else if (unitType == 3) {
        convertedUnit = "°F";
        sourceUnit = "°C";
        sourceValue = (randomConvertedValue - 32) * 5 / 9;
    }
    return [Math.round(sourceValue), randomConvertedValue, sourceUnit, convertedUnit];
}

// Generating question
let answer;
function SetValue() {
    if (answer) PageElement.o_last.innerHTML = "Last: " + answer;
    let values = CalculateValue(Preference.units, 0, 100);
    let value = values[0];
    const sourceUnit = values[2];
    answer = values[1];
    PageElement.i_que.innerHTML = value + sourceUnit;
    console.log("value", value, "answer", answer);
    SetColors();
}

function GetValue() {
    let input = PageElement.i_ans.value.replace(/\D/g, '');
    let acc = 1;
    if (Preference.accuracy == 0) {
        acc = 1;
    } else if (Preference.accuracy == 1) {
        acc = 3;
    } else if (Preference.accuracy == 2) {
        acc = 5;
    } else if (Preference.accuracy == 3) {
        acc = 10;
    }
    if (Math.abs(Math.floor(input) - answer) <= acc) {
        SetValue();
        PageElement.i_ans.value = "";
    } else {
        PageElement.i_ans.animate(animation, animationTiming);
        setTimeout(() => {
            PageElement.i_ans.value = "";
        }, 300);
    }
}

function PreviewTheme() {
    PageElement.ts_background.style.backgroundColor = ResolveColor(PageElement.s_bgcolor.value);
    PageElement.ts_primary.style.color = ResolveColor(PageElement.s_maincolor.value);
}

function SetThemeInputs(primary, background) {
    PageElement.s_maincolor.value = primary;
    PageElement.s_bgcolor.value = background;
    PreviewTheme();
}

function SetColors() {
    PageElement.i_que.style.color = ResolveColor(Preference.maincolor);
    PageElement.i_ans.style.color = ResolveColor(Preference.maincolor);
    document.body.style.backgroundColor = ResolveColor(Preference.bgcolor);
}


function ResolveColor(color) {
    if (color != "dynamic") return color;
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

function AddInputListener() {
    PageElement.i_ans.addEventListener("keyup", function (event) {
        if (event.key === "," || event.key === "." || event.key === "Enter") {
            GetValue();
        }
    });
}

function Startup() {
    SetElements();
    ReadPref();
    SetValue();
    AddInputListener();
}

const animation = [
    { transform: "translate(50px, 0px)" },
    { transform: "translate(-50px, 0px)" },
    { transform: "translate(50px, 0px)" },
    { transform: "translate(-50px, 0px)" },
    { transform: "translate(50px, 0px)" },
    { transform: "translate(0px, 0px)" },
];
const animationTiming = {
    duration: 300,
    iterations: 1,
};