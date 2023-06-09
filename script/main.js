// (re)declaring html locations
const el = {}
function SetElements() {
    el.s_acc = document.getElementById('acc');
    el.s_units = document.getElementById('units');
    el.s_que = document.getElementById('question');
    el.s_ans = document.getElementById('answerinput');
    el.s_theme = document.getElementById('theme');
    el.last = document.getElementById('menulast');
}

// preferences
let pref = {
    "accuracy": 0,
    "units": 0,
    "theme": 0
}

function SavePref() {
    localStorage.setItem("accuracy", el.s_acc.value);
    localStorage.setItem("units", el.s_units.value);
    localStorage.setItem("theme", el.s_theme.value);
    ReadPref();
    SetValue();
}

function ReadPref() {
    if (localStorage.getItem('accuracy') !== null) {
        pref.accuracy = localStorage.getItem('accuracy');
        console.log(pref.accuracy);
    }
    el.s_acc.selectedIndex = pref.accuracy;
    if (localStorage.getItem('units') !== null) {
        pref.units = localStorage.getItem('units');
        console.log(pref.units);
    }
    el.s_theme.selectedIndex = pref.units;
    if (localStorage.getItem('theme') !== null) {
        pref.theme = localStorage.getItem('theme');
        console.log(pref.theme);
    }
    el.s_theme.selectedIndex = pref.theme;
}

// Generating question
let answer;
function SetValue() {

    if (answer) {
        el.last.innerHTML = "Last: " + answer;
    }

    let name = "";
    let max = 100;
    let min = 0;
    let multiplier = 0;
    let firstModifier = 0;
    let secModifier = 0;
    if (pref.units == 0) {
        name = "mph";
        min = 0;
        max = 125;
        multiplier = 1.6093440006147;
    } else if (pref.units == 1) {
        name = "km/h";
        min = 0;
        max = 200;
        multiplier = 0.621371191999997;
    } else if (pref.units == 2) {
        name = "°F";
        min = 0;
        max = 125;
        multiplier = 0.55555555555555;
        firstModifier = -32;
    } else if (pref.units == 3) {
        name = "°C";
        min = 0;
        max = 125;
        multiplier = 1.8;
        secModifier = 32;
    }
    let value = Math.floor(Math.random() * (min + max)) - min;
    answer = Number.parseFloat((value + firstModifier) * multiplier + secModifier).toFixed(0);
    el.s_que.innerHTML = value + name;
    console.log("value", value, "answer", answer);
    Generate_Background();
}

function GetValue() {
    let input = el.s_ans.value.replace(/\D/g, '');
    let acc = 1;
    if (pref.accuracy == 0) {
        acc = 1;
    } else if (pref.accuracy == 1) {
        acc = 3;
    } else if (pref.accuracy == 2) {
        acc = 5;
    } else if (pref.accuracy == 3) {
        acc = 10;
    }
    if (Math.abs(Math.floor(input) - answer) <= acc) {
        SetValue();
        el.s_ans.value = "";
    } else {
        el.s_ans.animate(animation, animationTiming);
        el.s_ans.value = "";
    }
    console.log(input, answer);
}

// generate page background
function Generate_Background() {
    var bgcolor = '#';
    var color = '#';
    if (pref.theme == 0) {
        for (var i = 0; i < 6; i++) {
            bgcolor += Math.floor(Math.random() * 10);
        }
        color = "#FFFFFF";
    } else if (pref.theme == 1) {
        bgcolor = "#212529";
        color = "#FFFFFF";
    } else if (pref.theme == 2) {
        bgcolor = "#000000";
        color = "#FFFFFF";
    } else if (pref.theme == 3) {
        bgcolor = "#e0d8b4";
        color = "#2a3001";
    }
    el.s_que.style.color = color;
    el.s_ans.style.color = color;
    document.body.style.backgroundColor = bgcolor;
}

function AddInputListener() {
    el.s_ans.addEventListener("keyup", function (event) {
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