/**
 * (un)metrico main source code
 * © 2023 skidraw400 <skidraw400@gmail.com>
 * @author skidraw400
 */


// variable for current answer, and for answers streak
let answer;
let streak = 0;

// (re)declaring html locations
const PageElement = {};
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

// js preferences storing
const Preference = {
    "accuracy": 0,
    "units": 0,
    "maincolor": "random-light",
    "bgcolor": "#212529",
    "hidelogo": false
};

// saving js preferences to localstorage
function SavePref() {
    localStorage.setItem("accuracy", PageElement.s_acc.value);
    localStorage.setItem("units", PageElement.s_units.value);
    localStorage.setItem("hidelogo", PageElement.s_hidelogo.checked || ""); // setting an empty string, which will be parsed as false
    localStorage.setItem("maincolor", PageElement.s_maincolor.value);
    localStorage.setItem("bgcolor", PageElement.s_bgcolor.value);
    PageElement.s_theme.selectedIndex = 0;
    ReadPref();
    streak = 0;
    SetValue();
}

// reading js preferences from localstorage to js, also defaults redefinition
function ReadPref() {
    Preference.accuracy = localStorage.getItem('accuracy') || 0;
    PageElement.s_acc.selectedIndex = Preference.accuracy;

    Preference.units = localStorage.getItem('units') || 0;
    PageElement.s_units.selectedIndex = Preference.units;

    Preference.maincolor = localStorage.getItem('maincolor') || "random-light";
    PageElement.s_maincolor.value = Preference.maincolor;

    Preference.bgcolor = localStorage.getItem('bgcolor') || "#212529";
    PageElement.s_bgcolor.value = Preference.bgcolor;

    PreviewTheme();

    Preference.hidelogo = localStorage.getItem("hidelogo") || false;
    PageElement.s_hidelogo.checked = Preference.hidelogo;
    if (Preference.hidelogo) PageElement.o_logo.innerHTML = "";
    else PageElement.o_logo.innerHTML = "(un)metrico";

    console.debug("settings", {
        "accuracy": Preference.accuracy,
        "units": Preference.units,
        "maincolor": Preference.maincolor,
        "bgcolor": Preference.bgcolor,
        "hidelogo": Preference.hidelogo
    });
}

// core code for calculating question and answer
function CalculateValue(unitType, min, max) {
    var sourceUnit, convertedUnit, sourceValue, randomConvertedValue;
    randomConvertedValue = Math.round(Math.random() * (max - min) + min);
    switch (unitType.toString()) {
        case "0":
            convertedUnit = "km/h";
            sourceUnit = "mph";
            sourceValue = randomConvertedValue / 1.60934;
            break;
        case "1":
            convertedUnit = "mph";
            sourceUnit = "km/h";
            sourceValue = randomConvertedValue * 1.60934;
            break;
        case "2":
            convertedUnit = "°C";
            sourceUnit = "°F";
            sourceValue = (randomConvertedValue * 9 / 5) + 32;
            break;
        case "3":
            convertedUnit = "°F";
            sourceUnit = "°C";
            sourceValue = (randomConvertedValue - 32) * 5 / 9;
            break;
        case "4":
            convertedUnit = "cm";
            sourceUnit = "inch";
            sourceValue = randomConvertedValue / 2.54;
            break;
        case "5":
            convertedUnit = "inch";
            sourceUnit = "cm";
            sourceValue = randomConvertedValue * 2.54;
            break;
    }
    return [Math.round(sourceValue), randomConvertedValue, sourceUnit, convertedUnit];
}

// Choosing right range, generating and displaying question

function SetValue() {
    if (answer) PageElement.o_last.innerHTML = "Streak: " + streak + " last: " + answer;
    var min, max;
    switch (Preference.units.toString()) {
        case "0": //answer in km/h
            min = 5;
            max = 250;
            break;
        case "1": //answer in mph
            min = 5;
            max = 150;
            break;
        case "2": //answer in °C
            min = 0;
            max = 250;
            break;
        case "3": //answer in °F
            min = 0;
            max = 500;
            break;
        case "4": //answer in inches
            min = 5;
            max = 40;
            break;
        case "5": //answer in cm
            min = 5;
            max = 100;
            break;
    }
    var calculatedValues = CalculateValue(Preference.units, min, max);
    var value = calculatedValues[0];
    const sourceUnit = calculatedValues[2];
    answer = calculatedValues[1];
    PageElement.i_que.innerHTML = value + sourceUnit;
    console.debug("value", value, "answer", answer);
    SetColors();
}

// verifying input and displaying result
function GetValue() {
    var input = PageElement.i_ans.value.replace(/\D/g, '');
    var acc = 1;
    switch (Preference.accuracy.toString()) {
        case "0": acc = 1; break;
        case "1": acc = 3; break;
        case "2": acc = 5; break;
        case "3": acc = 10; break;
    }
    if (Math.abs(Math.floor(input) - answer) <= acc) {
        streak += 1;
        SetValue();
        PageElement.i_ans.value = "";
    } else {
        PageElement.i_ans.animate(animation, animationTiming);
        setTimeout(function () {
            PageElement.i_ans.value = "";
        }, 300);
    }
}

// Preview theme in preferences
function PreviewTheme() {
    PageElement.ts_background.style.backgroundColor = ResolveColor(PageElement.s_bgcolor.value);
    PageElement.ts_primary.style.color = ResolveColor(PageElement.s_maincolor.value);
}

// Settings - set predefined themes to TextColor and BackgroundColor text inputs
function SetThemeInputs(primary, background) {
    PageElement.s_maincolor.value = primary;
    PageElement.s_bgcolor.value = background;
    PreviewTheme();
}

// Apply theme from preferences to page 
function SetColors() {
    PageElement.i_que.style.color = ResolveColor(Preference.maincolor);
    PageElement.i_ans.style.color = ResolveColor(Preference.maincolor);
    document.body.style.backgroundColor = ResolveColor(Preference.bgcolor);
}

// Define custom color values for i.e. random/custom values
function ResolveColor(color) {
    var answer = color;
    switch (color) {
        case "random-dark": {
            answer = "#";
            for (let i = 0; i < 6; i++) {
                answer += Math.floor(Math.random() * 8);
            }
            break;
        }
        case "random-light": {
            answer = '#';
            let hexLetters = 'BCDEF'.split('');
            for (let i = 0; i < 6; i++) {
                answer += hexLetters[Math.floor(Math.random() * hexLetters.length)];
            }
            break;
        }
        case "random": {
            answer = '#';
            let hexLetters = '0123456789ABCDEF'.split('');
            for (var i = 0; i < 6; i++) {
                answer += hexLetters[Math.floor(Math.random() * hexLetters.length)];
            }
            break;
        }
        default:
            break;
    }
    return answer;
}

// Adding input listener to answer input
function AddInputListener() {
    PageElement.i_ans.addEventListener("keyup", function (event) {
        if (event.key === "," || event.key === "." || event.key === "Enter") {
            GetValue();
        }
    });
}

// Startup tasks
function Startup() {
    SetElements();
    ReadPref();
    SetValue();
    AddInputListener();
}

// wrong answer animation and its timing in js
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