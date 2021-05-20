/*
<div id="overlay">
            <div class="loader"></div>
        </div>
 */
class LoadOverlay {
    constructor() {
        var body = document.body;

        const overlay = document.createElement("div");
        overlay.id = "overlay";
        const overlayInner = document.createElement("div");
        overlayInner.classList.add("loader");
        overlay.appendChild(overlayInner);

        if (!document.getElementById("overlay")) {
            body.appendChild(overlay);
        }
    }

    toggleLoadOverlay(toggleStatus) {
        const elem = document.getElementById("overlay");
        if (toggleStatus && elem) {
            console.log(elem);
            elem.style.display = "block";
        } else {
            console.log(elem);
            elem.style.display = "none";
        }
    }
}

export default LoadOverlay;
