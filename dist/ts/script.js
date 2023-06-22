/**
 * (un)metrico TypeScript main source code
 * © 2023 skidraw400 <skidraw400@gmail.com>
 * @author skidraw400
 */
// enable for strict error checking
var debug = true;
// variables
var settings = {
    "accuracyIndex": "1",
    "unitsIndex": "0",
    "mainColor": "random-light",
    "bgColor": "#212529",
    "hideLogo": "false"
};
var ids = [
    "question", "answerinput",
    "acc", "units", "theme",
    "i_maincolor", "i_bgcolor",
    "i_hidelogo", "menulast",
    "menulogo", "ts-primary",
    "ts-background"
];
var pageElements = [];
ids.forEach(function (element) {
    if (document.getElementById(element))
        pageElements[element] = document.getElementById(element);
    else if (debug)
        throw new Error("NOT FOUND: " + element);
});
console.debug("elements: ", pageElements);
// helpers
function boolToStr(x) {
    if (x)
        return "true";
    return "false";
}
function strToBool(x) {
    if (x === "true")
        return true;
    return false;
}
// settings
function downloadSettings() {
    for (var key in settings) {
        settings[key] = localStorage.getItem(key) || settings[key];
    }
}
function uploadSettings() {
    for (var key in settings) {
        localStorage.setItem(key, settings[key]);
    }
}
function syncSettings() {
    pageElements["acc"].selectedIndex = Number(settings.accuracyIndex);
    console.debug("accuracy (converted)", settings.accuracyIndex, Number(settings.accuracyIndex));
    pageElements["units"].selectedIndex = Number(settings.unitsIndex);
    console.debug("units (converted)", settings.unitsIndex, Number(settings.unitsIndex));
    pageElements["i_maincolor"].value = settings.mainColor;
    console.debug("maincolor", settings.mainColor);
    pageElements["i_bgcolor"].value = settings.bgColor;
    console.debug("bgcolor", settings.bgColor);
    (pageElements["i_hidelogo"] = strToBool(settings.hideLogo));
    console.debug("hidelogo (converted)", settings.hideLogo, strToBool(settings.hideLogo));
}
function printSettings() {
    console.debug(settings);
}
// ui
//  apply settings
function drawUI() {
    if (strToBool(settings.hideLogo) === true)
        pageElements["menulogo"].innerHTML = "";
}
