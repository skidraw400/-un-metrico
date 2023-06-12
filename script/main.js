// (re)declaring html locations
const PageElement = {}
function SetElements() {
    PageElement.s_acc = document.getElementById('acc');
    PageElement.s_units = document.getElementById('units');
    PageElement.s_que = document.getElementById('question');
    PageElement.s_ans = document.getElementById('answerinput');
    PageElement.s_theme = document.getElementById('theme');
    PageElement.s_maincolor = document.getElementById('i_maincolor');
    PageElement.s_bgcolor = document.getElementById('i_bgcolor');
    PageElement.s_hidelogo = document.getElementById('i_hidelogo');
    PageElement.last = document.getElementById('menulast');
    PageElement.logo = document.getElementById('menulogo');
}

// preferences
const Preference = {
    "accuracy": 0,
    "units": 0,
    "maincolor": "#FFFFFF",
    "bgcolor": "dynamic",
    "hidelogo": 0
}

function SavePref() {
    localStorage.setItem("accuracy", PageElement.s_acc.value);
    localStorage.setItem("units", PageElement.s_units.value);
    if (PageElement.s_hidelogo.checked == true) {
        localStorage.setItem("hidelogo", 1);
    } else {
        localStorage.setItem("hidelogo", 0);
    }
    if (PageElement.s_theme.selectedIndex != 0) {
        if (PageElement.s_theme.value == 1) {
            localStorage.setItem("maincolor", "#000000");
            localStorage.setItem("bgcolor", "dynamic");
        } else if (PageElement.s_theme.value == 2) {
            localStorage.setItem("maincolor", "#FFFFFF");
            localStorage.setItem("bgcolor", "#212529");
        } else if (PageElement.s_theme.value == 3) {
            localStorage.setItem("maincolor", "#212529");
            localStorage.setItem("bgcolor", "#FFFFFF");
        } else if (PageElement.s_theme.value == 4) {
            localStorage.setItem("maincolor", "#FFFFFF");
            localStorage.setItem("bgcolor", "#000000");
        } else if (PageElement.s_theme.value == 5) {
            localStorage.setItem("maincolor", "#e0d8b4");
            localStorage.setItem("bgcolor", "#2a3001");
        }
    } else {
        if (PageElement.s_maincolor.value != "") {
            localStorage.setItem("maincolor", PageElement.s_maincolor.value);
        }
        if (PageElement.s_bgcolor.value != "") {
            localStorage.setItem("bgcolor", PageElement.s_bgcolor.value);
        }
    }
    ReadPref();
    SetValue();
}

function ReadPref() {
    if (localStorage.getItem('accuracy') !== null) {
        Preference.accuracy = localStorage.getItem('accuracy');
    }
    PageElement.s_acc.selectedIndex = Preference.accuracy;

    if (localStorage.getItem('units') !== null) {
        Preference.units = localStorage.getItem('units');
    }
    PageElement.s_units.selectedIndex = Preference.units;

    if (localStorage.getItem('maincolor') !== null) {
        Preference.maincolor = localStorage.getItem('maincolor');
    }

    if (localStorage.getItem('bgcolor') !== null) {
        Preference.bgcolor = localStorage.getItem('bgcolor');
    }

    if (localStorage.getItem("hidelogo") !== null) {
        Preference.hidelogo = localStorage.getItem("hidelogo");
    }
    if (Preference.hidelogo == 1) {
        PageElement.s_hidelogo.checked = true;
        PageElement.logo.innerHTML = "";
    } else {
        PageElement.s_hidelogo.checked = false;
        PageElement.logo.innerHTML = "(un)metrico";
    }
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
    if (answer) PageElement.last.innerHTML = "Last: " + answer;
    let values = CalculateValue(Preference.units, 0, 100);
    let value = values[0];
    const sourceUnit = values[2];
    answer = values[1];
    PageElement.s_que.innerHTML = value + sourceUnit;
    console.log("value", value, "answer", answer);
    Generate_Background();
}

function GetValue() {
    let input = PageElement.s_ans.value.replace(/\D/g, '');
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
        PageElement.s_ans.value = "";
    } else {
        PageElement.s_ans.animate(animation, animationTiming);
        setTimeout(() => {
            PageElement.s_ans.value = "";
        }, 300);
    }
}

// generate page background
function Generate_Background() {
    var bgcolor = '#';
    var color = '#';
    if (Preference.bgcolor == "dynamic") {
        for (var i = 0; i < 6; i++) {
            bgcolor += Math.floor(Math.random() * 10);
        }
        color = "#FFFFFF";
    } else {
        color = Preference.maincolor;
        bgcolor = Preference.bgcolor;
    }
    PageElement.s_que.style.color = color;
    PageElement.s_ans.style.color = color;
    document.body.style.backgroundColor = bgcolor;
}

function AddInputListener() {
    PageElement.s_ans.addEventListener("keyup", function (event) {
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