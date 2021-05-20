
/*
<div id="overlay">
            <div class="loader"></div>
        </div>
 */
class Loader {
    constructor() {
        this.body = document.body;

        const overlay = document.createElement("div")
        overlay.id = "overlay"
        const overlayInner = document.createElement("div");
        overlayInner.classList.add("loader")
        overla.appendChild(overlayInner)

        if (this.body.innerHTML.indexOf("overlay") <= -1) {
            this.body.appendChild(overlay);
        }
    }

    toggleLoadOverlay(toggleStatus) {
        if (toggleStatus) {

            document.getElementById("overlay").style.display = "block";
        } else {
            document.getElementById("overlay").style.display = "none";
        }
    }
}

export default Loader;