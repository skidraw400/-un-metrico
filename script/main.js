// (re)declaring html locations
const el = {}
function SetElements() {
    el.s_acc = document.getElementById('acc');
    el.s_units = document.getElementById('units');
    el.s_que = document.getElementById('question');
    el.s_ans = document.getElementById('answerinput');
    el.s_theme = document.getElementById('theme');
    el.s_maincolor = document.getElementById('i_maincolor');
    el.s_bgcolor = document.getElementById('i_bgcolor');
    el.s_hidelogo = document.getElementById('i_hidelogo');
    el.last = document.getElementById('menulast');
    el.logo = document.getElementById('menulogo');
}

// preferences
let pref = {
    "accuracy": 0,
    "units": 0,
    "maincolor": "#FFFFFF",
    "bgcolor": "dynamic",
    "hidelogo": 0
}

function SavePref() {
    localStorage.setItem("accuracy", el.s_acc.value);
    localStorage.setItem("units", el.s_units.value);
    if (el.s_hidelogo.checked == true) {
        localStorage.setItem("hidelogo", 1);
    } else {
        localStorage.setItem("hidelogo", 0);
    }
    if (el.s_theme.selectedIndex != 0) {
        if (el.s_theme.value == 1) {
            localStorage.setItem("maincolor", "#000000");
            localStorage.setItem("bgcolor", "dynamic");
        } else if (el.s_theme.value == 2) {
            localStorage.setItem("maincolor", "#FFFFFF");
            localStorage.setItem("bgcolor", "#212529");
        } else if (el.s_theme.value == 3) {
            localStorage.setItem("maincolor", "#212529");
            localStorage.setItem("bgcolor", "#FFFFFF");
        } else if (el.s_theme.value == 4) {
            localStorage.setItem("maincolor", "#FFFFFF");
            localStorage.setItem("bgcolor", "#000000");
        } else if (el.s_theme.value == 5) {
            localStorage.setItem("maincolor", "#e0d8b4");
            localStorage.setItem("bgcolor", "#2a3001");
        }
    } else {
        if (el.s_maincolor.value != "") {
            localStorage.setItem("maincolor", el.s_maincolor.value);
        }
        if (el.s_bgcolor.value != "") {
            localStorage.setItem("bgcolor", el.s_bgcolor.value);
        }
        console.log("maincolor: ", localStorage.getItem("maincolor"));
    }
    ReadPref();
    SetValue();
}

function ReadPref() {
    if (localStorage.getItem('accuracy') !== null) {
        pref.accuracy = localStorage.getItem('accuracy');
    }
    console.log("accuracy", pref.accuracy);
    el.s_acc.selectedIndex = pref.accuracy;

    if (localStorage.getItem('units') !== null) {
        pref.units = localStorage.getItem('units');
    }
    console.log("units", pref.units);
    el.s_units.selectedIndex = pref.units;

    if (localStorage.getItem('maincolor') !== null) {
        pref.maincolor = localStorage.getItem('maincolor');
    }
    console.log("maincolor", pref.maincolor);

    if (localStorage.getItem('bgcolor') !== null) {
        pref.bgcolor = localStorage.getItem('bgcolor');
    }
    console.log("bgcolor", pref.bgcolor);

    if (localStorage.getItem("hidelogo") !== null) {
        pref.hidelogo = localStorage.getItem("hidelogo");
    }
    if (pref.hidelogo == 1) {
        el.s_hidelogo.checked = true;
        el.logo.innerHTML = "";
    } else {
        el.s_hidelogo.checked = false;
        el.logo.innerHTML = "(un)metrico";
    }
    console.log("hidelogo", pref.hidelogo);
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
    answer = Math.round((value + firstModifier) * multiplier + secModifier);
    el.s_que.innerHTML = value + name;
    console.log("value", value, "answer", answer);
    if (answer < 0) {
        console.log("negative");
        SetValue();
    }
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
        setTimeout(function () {
            el.s_ans.value = "";
        }, 300);
    }
    console.log(input, answer);
}

// generate page background
function Generate_Background() {
    var bgcolor = '#';
    var color = '#';
    if (pref.bgcolor == "dynamic") {
        for (var i = 0; i < 6; i++) {
            bgcolor += Math.floor(Math.random() * 10);
        }
        color = "#FFFFFF";
    } else {
        color = pref.maincolor;
        bgcolor = pref.bgcolor;
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