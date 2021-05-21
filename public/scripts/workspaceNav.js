import EventType from "/public/scripts/common/constants/eventType.js";

function workspaceNavigation() {
    const sceneSettings = document.getElementById("sceneSettings");
    const entityExplorer = document.getElementById("entityExplorer");
    const settingsBar = document.getElementById("settingsBar");
    const main = document.getElementById("main");

    const entitySideBarToggleOn = document.getElementById("entitySidebarToggleOn");
    const sceneSettingsToggleOn = document.getElementById("sceneSettingsToggleOn");

    const settingsBarToggleOn = document.getElementById("settingsBarToggleOn");
    const settingsBarToggleOff = document.getElementById("settingsBarToggleOff");

    settingsBarToggleOn.addEventListener(EventType.MOUSE.CLICK, (event) => {
        settingsBar.style.width = "300px";
        main.style.marginRight = "300px";
        settingsBarToggleOn.style.background = "gray";
    });

    settingsBarToggleOff.addEventListener(EventType.MOUSE.CLICK, (event) => {
        settingsBar.style.width = "0px";
        main.style.marginRight = "0px";
        settingsBarToggleOn.style.background = "black";
    });

    entitySideBarToggleOn.addEventListener(EventType.MOUSE.CLICK, (event) => {
        if (entityExplorer.style.width.indexOf("250") > -1) {
            entityExplorer.style.zIndex = 5;
            sceneSettings.style.zIndex = 4;
        } else {
            entityExplorer.style.width = "300px";
            entityExplorer.style.zIndex = 5;
            sceneSettings.style.zIndex = 4;
        }
        main.style.marginLeft = "300px";
        entitySideBarToggleOn.style.background = "gray";
        sceneSettingsToggleOn.style.background = "black";
    });

    sceneSettingsToggleOn.addEventListener(EventType.MOUSE.CLICK, (event) => {
        if (sceneSettings.style.width.indexOf("250") > -1) {
            sceneSettings.style.zIndex = 5;
            entityExplorer.style.zIndex = 4;
        } else {
            sceneSettings.style.width = "300px";
            sceneSettings.style.zIndex = 5;
            entityExplorer.style.zIndex = 4;
        }
        main.style.marginLeft = "300px";

        sceneSettingsToggleOn.style.background = "gray";
        entitySideBarToggleOn.style.background = "black";
    });

    const sceneSettingsToggleOff = document.getElementById("sceneSettingsToggleOff");
    sceneSettingsToggleOff.addEventListener(EventType.MOUSE.CLICK, (event) => {
        closeMenus();
    });

    const entitySideBarToggleOff = document.getElementById("entitySidebarToggleOff");
    entitySideBarToggleOff.addEventListener(EventType.MOUSE.CLICK, (event) => {
        closeMenus();
    });

    function closeMenus() {
        sceneSettings.style.width = "0px";
        entityExplorer.style.width = "0px";
        main.style.marginLeft = "0px";
        entitySideBarToggleOn.style.background = "black";
        sceneSettingsToggleOn.style.background = "black";
    }
}

export default workspaceNavigation;
