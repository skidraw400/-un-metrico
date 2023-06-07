value = 0;

MinRange = 1;
MaxRange = 24;

let SettingsHiddenToggle = document.getElementById("settings-tohide");
let GlobalInput = document.getElementById("global");
let QuestionText = document.getElementById("question");
let Body = document.getElementById("body");

function toggleSettings() {

    if (SettingsHiddenToggle.style.display === "none") {
        SettingsHiddenToggle.style.display = "block";
    } else {
        SettingsHiddenToggle.style.display = "none";
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
    while (oldvalue == value && lock < 5) {
        let source = 5*(Number.parseFloat(
            MinRange + Math.floor(Math.random() * (MaxRange - MinRange)))
            .toFixed(0));
        QuestionText.innerHTML = source + "mph";
        Body.style.backgroundColor = getRandomDarkColor();
        value = Number.parseFloat(source * 1.609344).toFixed(0);
        lock++;
    }
}

const animation = [
    { transform: "translate(4px, 0px)" },
    { transform: "translate(-6px, 0px)" },
    { transform: "translate(-2px, 0px)" },
    { transform: "translate(6px, 0px)" },
    { transform: "translate(1px, 0px)" },
    { transform: "translate(-4px, 0px)" },
    { transform: "translate(-7px, 0px)" },
    { transform: "translate(5px, 0px)" },
    { transform: "translate(-3px, 0px)" },
    { transform: "translate(6px, 0px)" },
    { transform: "translate(9px, 0px)" }
];

const newspaperTiming = {
    duration: 300,
    iterations: 1,
};

function GetValue() {
    if (Math.floor(GlobalInput.value) == value) {
        SetValue();
        GlobalInput.value = "";
    } else {
        GlobalInput.animate(animation, newspaperTiming);
        setTimeout(function () {
            GlobalInput.value = "";
        }, 200);
    }
}

GlobalInput.addEventListener("keyup", function (event) {
    if (event.key === "," || event.key === ".") {
        GlobalInput.value = GlobalInput.value.slice(0, -1);
        GetValue();
    }
    if (event.key === "Enter") {
        GetValue();
    }
});
