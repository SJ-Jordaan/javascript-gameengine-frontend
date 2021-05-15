const app = new PIXI.Application({
    backgroundColor: 0x1099bb, 
    resolution: window.devicePixelRatio || 1,
});

const engineView = document.getElementById("engine-view");
engineView.appendChild(app.view);