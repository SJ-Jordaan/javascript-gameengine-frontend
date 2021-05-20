(()=>{"use strict";class e{constructor(e,t){this.x=e,this.y=t,this.distanceTo=this.distanceTo.bind(this)}distanceTo(e){return Math.sqrt(Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2))}}const t={character:"character",surface:"surface",background:"background"};Object.freeze(t);class i extends PIXI.Sprite{constructor(i,n){super(i),this.name=n.toLowerCase(),this.interactive=!0,this.buttonMode=!0,this.type=t.surface,this.anchor.set(.5),this.vertexPoints={topLeft:new e(this.x,this.y),topRight:new e(this.x+this.getBounds().width,this.y),bottomLeft:new e(this.x,this.y+this.getBounds().height),bottomRight:new e(this.x+this.getBounds().width,this.y+this.getBounds().height)},this.on("pointerdown",this.onDragStart).on("pointerup",this.onDragEnd).on("pointerupoutside",this.onDragEnd).on("pointermove",this.onDragMove),this.onDragStart=this.onDragStart.bind(this),this.onDragEnd=this.onDragEnd.bind(this),this.onDragMove=this.onDragMove.bind(this),this.updateVertexPoints=this.updateVertexPoints.bind(this),this.snapToEdge=this.snapToEdge.bind(this),this.snapToVertex=this.snapToVertex.bind(this),this.getSiblings=this.getSiblings.bind(this),this.transformEntity=this.transformEntity.bind(this)}updateVertexPoints(){this.vertexPoints={topLeft:new e(this.x,this.y),topRight:new e(this.x+this.getBounds().width,this.y),bottomLeft:new e(this.x,this.y+this.getBounds().height),bottomRight:new e(this.x+this.getBounds().width,this.y+this.getBounds().height)}}snapToEdge(e){"design"===this.parent.mode&&!0===this.parent.edgeSnap&&this.parent.children.filter((e=>e.x!==this.x&&e.y!==this.y)).forEach((i=>{i.type===t.surface&&(Math.abs(this.getBounds().top-i.getBounds().bottom)<e&&this.x<=i.getBounds().right&&this.x>=i.getBounds().left?(this.x=i.x,this.y=i.y+i.getBounds().height):Math.abs(this.getBounds().bottom-i.getBounds().top)<e&&this.x<=i.getBounds().right&&this.x>=i.getBounds().left?(this.x=i.x,this.y+=Math.abs(this.getBounds().bottom-i.getBounds().top)):Math.abs(this.getBounds().right-i.getBounds().left)<e&&this.y<=i.getBounds().bottom&&this.y>=i.getBounds().top?(this.y=i.y,this.x+=Math.abs(this.getBounds().right-i.getBounds().left)):Math.abs(this.getBounds().left-i.getBounds().right)<e&&this.y<=i.getBounds().bottom&&this.y>=i.getBounds().top&&(this.y=i.y,this.x=i.x+i.getBounds().width))}))}snapToVertex(e){"design"===this.parent.mode&&!0===this.parent.vertexSnap&&this.parent.children.filter((e=>e.x!==this.x&&e.y!==this.y)).forEach((i=>{i.type!==t.surface&&(this.vertexPoints.topLeft.distanceTo(i.vertexPoints.bottomRight)<=e?(this.x=i.x+i.getBounds().width,this.y=i.y+i.getBounds().height):this.vertexPoints.topRight.distanceTo(i.vertexPoints.bottomLeft)<=e?(this.x=i.x-this.getBounds().width,this.y=i.y+this.getBounds().height):this.vertexPoints.bottomRight.distanceTo(i.vertexPoints.topLeft)<=e?(this.x=i.x-this.getBounds().width,this.y=i.y-this.getBounds().height):this.vertexPoints.bottomLeft.distanceTo(i.vertexPoints.topRight)<=e&&(this.x=i.x+i.getBounds().width,this.y=i.y-this.getBounds().height))}))}setEntityType(e){this.type=t[e]}getSiblings(){return this.parent.children.filter((e=>e.name!==this.name))}transformX(e){this.x+=e,this.updateVertexPoints()}transformY(e){this.y+=e,this.updateVertexPoints()}transformEntity(e,t){this.transformX(e),this.transformY(t)}rotateEntity(e){this.setTransform(this.position.x,this.position.y,this.scale.x,this.scale.y,e),this.setTransform(this.position.x,this.position.y,this.scale.x,this.scale.y,e)}scaleEntity(e,t){this.setTransform(this.position.x,this.position.y,e,t,this.rotation)}onDragStart(e){this.parent.setSelectedEntityName(this.name),this.data=e.data,this.alpha=.5,this.dragging=!0,this.offX=this.x-this.data.getLocalPosition(this.parent).x,this.offY=this.y-this.data.getLocalPosition(this.parent).y}onDragEnd(){this.parent.setSelectedEntityName(this.name),this.alpha=1,this.dragging=!1,this.data=null}onDragMove(){if(this.dragging){const e=this.data.getLocalPosition(this.parent);this.x=e.x+this.offX,this.y=e.y+this.offY,this.updateVertexPoints(),this.snapToEdge(this.parent.snapDistance),this.snapToVertex(this.parent.snapDistance)}}}class n extends i{constructor(e,i,n=0,s=0){super(e,i),this.setTransform(n,s),this.anchor.set(.5),this.type=t.character,this.mass=0,this.acceleration=0,this.onSurface=this.onSurface.bind(this)}onSurface(){let e=!1;return this.type===t.surface&&(e=!0),this.getSiblings().forEach((i=>{i.type===t.surface&&function(e,t){const i=e.getBounds(),n=t.getBounds();return i.x<n.x+n.width&&i.x+i.width>n.x&&i.y<n.y+n.height&&i.y+i.height>n.y}(this,i)&&(e=!0)})),e}}class s extends PIXI.Container{constructor(e,t,i){super(),this.name=e,this.width=t,this.height=i,this.edgeSnap=!0,this.vertexSnap=!0,this.snapDistance=20,this.gravity=8,this.selectedEntityName,this.entitySelectedEvent=new CustomEvent("entityChanged",{detail:{changed:!0}}),this.enableVertexSnap=this.enableVertexSnap.bind(this),this.disableVertexSnap=this.disableVertexSnap.bind(this),this.enableEdgeSnap=this.enableEdgeSnap.bind(this),this.disableEdgeSnap=this.disableEdgeSnap.bind(this),this.setGravity=this.setGravity.bind(this)}enableEdgeSnap(){this.edgeSnap=!0}disableEdgeSnap(){this.edgeSnap=!1}enableVertexSnap(){this.vertexSnap=!0}disableVertexSnap(){this.vertexSnap=!1}setGravity(e){this.gravity=e}addChild(e){super.addChild(e),window.dispatchEvent(this.entitySelectedEvent)}setSelectedEntityName(e){window.dispatchEvent(this.entitySelectedEvent),this.selectedEntityName=e}getSelectedEntity(){return this.children.find((e=>e.name==this.selectedEntityName))}getEntityChangeEvent(){this.entitySelectedEvent}}const r={design:"design",play:"play",paused:"Paused"};Object.freeze(r);class a{constructor(e){this.name=e,this.TextureCache=PIXI.utils.TextureCache,this.scenes=[],this.currentSceneIndex=0,this.mode=r.design,this.addBackground=this.addBackground.bind(this),this.play=this.play.bind(this),this.init=this.init.bind(this),this.stop=this.stop.bind(this),this.update=this.update.bind(this)}init(e,t,i){let n=new s(i,e,t);n.mode=this.mode,n.visible=!0,this.scenes.push(n)}getSceneAtIndex(e){if("number"==typeof e&&e<this.scenes.length)return this.scenes[e]}setCurrentSceneIndex(e){"number"==typeof e&&e<this.scenes.length&&(console.log(this.currentSceneIndex),this.currentSceneIndex=e,console.log(this.currentSceneIndex))}getSceneIndex(e){const t=this.scenes.findIndex((t=>{if(console.log(`${t.name} vs ${e}`),t.name===e)return!0}));if(t>-1)return t}getCurrentScene(){return this.scenes[this.currentSceneIndex]}setGameMode(e){this.mode=r[e],this.scenes[this.currentSceneIndex].mode=this.mode}addBackground(e){if(null!=e){let t=new i(e);this.scenes[this.currentSceneIndex].addChild(t)}}play(e){this.update(e)}stop(){}update(e){this.scenes[this.currentSceneIndex].children.forEach((t=>{t instanceof n&&(t.transformX(1),function(e,t){!1===e.onSurface()&&e.y+e.width/2<e.parent._height&&(e.y=e.y+.5*e.parent.gravity*Math.pow(t,2))}(t,e))}))}}const o={MOUSE:{UP:"mouseup",DOWN:"mousedown",CLICK:"click",DOUBLECLICK:"dblclick"},KEYBOARD:{KEYDOWN:"keydown",KEYPRESS:"keypress",KEYUP:"keyup"},FORM:{FOCUS:"focus",BLUR:"blur",CHANGE:"change",SUBMIT:"submit"},WINDOW:{SCROLL:"scroll",RESIZE:"resize",HASHCHANGE:"hashchange",LOAD:"load",UNLOAD:"unload"}};Object.freeze(o);const d=o;class h{constructor(){}set title(e){if("string"!=typeof e)throw TypeError("Provided Title is not of type String");this._title=e}get title(){return this._title}set bodyText(e){if("string"!=typeof e)throw TypeError("Provided Body Text is not of type String");this._bodyText=e}set buttons(e){Array.isArray(e)&&e.forEach((e=>{if(!(e instanceof c))throw TypeError("Provided Array should have elements of type Button")})),this._buttons=e}set image(e){if("string"!=typeof e)throw TypeError("Provided Image is not of type String");this._image=e}set header(e){if("string"!=typeof e)throw TypeError("Provided Header Text is not of type String");this._header=e}set center(e){if("boolean"!=typeof e)throw TypeError("Provided Center is not of type Boolean");this._center=e}set colour(e){if(!(e instanceof l))throw TypeError("Provided Colour is not of type Colour");this._colour=e}set whiteText(e){if("boolean"!=typeof e)throw TypeError("Provided White Text Value is not of type Boolean");this._whiteText=e}get bodyText(){return this._bodyText}get buttons(){return this._buttons}get image(){return this._image}get header(){return this._header}get center(){return this._center}get colour(){return this._colour}get whiteText(){return this._whiteText}}class c{constructor(e,t,i,n,s){this.title=e,this.id=t,this.action=i,this.colour=n,this.fontSize=s}}class l{constructor(e,t,i,n){if("number"!=typeof e||"number"!=typeof t||"number"!=typeof i||"number"!=typeof n)throw new"Provided Colour is not of type Number";this.red=e,this.green=t,this.blue=i,this.alpha=n}colourToString(){return`rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`}}var u={Primary:new l(2,117,216,1),Secodnary:new l(92,184,92,1),Dark:new l(41,43,44,1),Danger:new l(217,83,79,1),Light:new l(247,247,247,1)},g={Small:"10px",Smaller:"12px",Medium:"16px",Larger:"20px",Large:"24px"};Object.freeze(u),Object.freeze(g);const m={designing:"Designing",playing:"Playing",paused:"Paused"};Object.freeze(m),(new class{constructor(){this.loader=new PIXI.Loader,this.stage=new PIXI.Container,this.currentGameIndex=0,this.games=[],this._entityContainerId="entities",this._entities=document.getElementById(this._entityContainerId),this._posForm=document.getElementById("positionForm"),this._rotForm=document.getElementById("rotationForm"),this._scaleForm=document.getElementById("scaleForm"),this._filtEntForm=document.getElementById("filterEntitiesForm"),this._scenesList=document.getElementById("activeScene"),this._changeSceneForm=document.getElementById("changeSceneForm"),this._createSceneForm=document.getElementById("createSceneForm"),this._entityType=document.getElementById("entityType"),this.currentMode=m.designing,this.init=this.init.bind(this),this.loadTexturesFromLocal=this.loadTexturesFromLocal.bind(this),this.createGame=this.createGame.bind(this),this.loadDefaultAssets=this.loadDefaultAssets.bind(this),this.createGameEntity=this.createGameEntity.bind(this),this.addTestObjects=this.addTestObjects.bind(this),this.render=this.render.bind(this),this.playGame=this.playGame.bind(this),this.stopGame=this.stopGame.bind(this)}addTestObjects(){const e=new i(PIXI.utils.TextureCache.redTile,"red");e.x=20,e.y=20,this.games[this.currentGameIndex].scenes[0].addChild(e);const t=new i(PIXI.utils.TextureCache.blackTile,"black");t.x=20,t.y=20,this.games[this.currentGameIndex].scenes[0].addChild(t);const n=new i(PIXI.utils.TextureCache.yellowTile,"yellow");n.x=20,n.y=20,this.games[this.currentGameIndex].scenes[0].addChild(n);const s=new i(PIXI.utils.TextureCache.brownTile,"brown");s.x=20,s.y=20,this.games[this.currentGameIndex].scenes[0].addChild(s);const r=new i(PIXI.utils.TextureCache.greenTile,"green");r.x=20,r.y=20,this.games[this.currentGameIndex].scenes[0].addChild(r)}filterEntities(){document.getElementById("entities"),this._filtEntForm.addEventListener(d.FORM.SUBMIT,(e=>{e.preventDefault();const t=new FormData(e.target),i={};for(let e of t.entries())i[e[0]]=e[1];console.log(`Filtering By: ${i.type}`)}))}addScenes(){this._scenesList&&(this._scenesList.innerHTML="",this.games[0].scenes.forEach((e=>{let t=document.createElement("option");t.text=e.name,t.value=e.name,this._scenesList.add(t)})))}changeScene(){this._changeSceneForm.addEventListener(d.FORM.SUBMIT,(e=>{e.preventDefault();const t=new FormData(e.target),i={};for(let e of t.entries())i[e[0]]=e[1];if(i){const e=this.games[this.currentGameIndex].getSceneIndex(i.activeScene);e&&e>-1&&(this.games[this.currentGameIndex].currentGameIndex=e,console.log(this.games[this.currentGameIndex].scenes),this.games[this.currentGameIndex].scenes.forEach((t=>{this.games[this.currentGameIndex].scenes.findIndex((e=>{if(e.name===t.name)return!0}))!==e?t.visible=!1:(console.log(t),t.visible=!0)})))}}))}createScene(){this._createSceneForm.addEventListener(d.FORM.SUBMIT,(e=>{e.preventDefault();const t=new FormData(e.target),i={};for(let e of t.entries())i[e[0]]=e[1];if(i){const e=!1;if(i?.sceneGravity?!i?.sceneHeight&&parseFloat(i?.sceneHeight)>0?(alert("Scene Creation Failed, no height selected!"),e=!0):!i?.sceneWidth&&parseFloat(i?.sceneWidth)>0?(alert("Scene Creation Failed, no width selected!"),e=!0):i?.sceneName||(alert("Scene Creation Failed, no name provided!"),this.games[this.currentGameIndex].getSceneIndex(i.sceneName)>-1&&alert("Scene Creation Failed, scene name already exists!"),e=!0):(alert("Scene Creation Failed, no gravity selected!"),e=!0),e)return;this.games[this.currentGameIndex].init(i.sceneWidth,i.sceneHeight,i.sceneName),this.stage.addChild(this.games[this.currentGameIndex].getSceneAtIndex(this.games[this.currentGameIndex].getSceneIndex(i.sceneName))),this.addScenes(),confirm(`Scene ${i.sceneName} created Succesfully!`)}}))}initializeScenes(){this.addScenes(),this.changeScene(),this.createScene()}initializeEntitySettings(){const e=this.games[this.currentGameIndex].getCurrentScene();window.addEventListener("entityChanged",(t=>{if(e){const t=e.children.findIndex((t=>{if(t.name===e.selectedEntityName)return!0}));t>-1&&(document.getElementById("xPosition").value=e.children[t].transform.position.x.toFixed(2),document.getElementById("yPosition").value=e.children[t].transform.position.y.toFixed(2),document.getElementById("xScale").value=e.children[t].transform.scale.x.toFixed(2),document.getElementById("yScale").value=e.children[t].transform.scale.y.toFixed(2),document.getElementById("rotationDeg").value=e.children[t].transform.rotation.toFixed(2))}})),this._posForm.addEventListener(d.FORM.SUBMIT,(t=>{t.preventDefault();const i=new FormData(t.target),n={};for(let e of i.entries())n[e[0]]=e[1];if(i||alert("Invalid form submitted"),e){const t=e.children.findIndex((t=>{if(t.name===e.selectedEntityName)return!0}));t>-1&&e.children[t].transformEntity(parseFloat(n.x),parseFloat(n.y))}})),this._rotForm.addEventListener(d.FORM.SUBMIT,(t=>{t.preventDefault();const i=new FormData(t.target),n={};for(let e of i.entries())n[e[0]]=e[1];if(i||alert("Invalid form submitted"),e){const t=e.children.findIndex((t=>{if(t.name===e.selectedEntityName)return!0}));t>-1&&e.children[t].rotateEntity(this.degrees_to_radians(parseFloat(n.degrees)))}})),this._scaleForm.addEventListener(d.FORM.SUBMIT,(t=>{t.preventDefault();const i=new FormData(t.target),n={};for(let e of i.entries())n[e[0]]=e[1];if(i||alert("Invalid form submitted"),e){const t=e.children.findIndex((t=>{if(t.name===e.selectedEntityName)return!0}));t>-1&&e.children[t].scaleEntity(parseFloat(n.x),parseFloat(n.y))}}))}degrees_to_radians(e){return e*(Math.PI/180)}init(){const e=PIXI.autoDetectRenderer({antalias:!0,autoDensity:!0,resolution:window.devicePixelRatio||1,width:900,height:600});this.renderer=e,document.getElementById("engine-view").appendChild(e.view),document.querySelector("#upload-button").addEventListener("change",this.loadTexturesFromLocal,!1),document.querySelector("#create-sprite-button").addEventListener("click",this.createGameEntity,!1),document.querySelector("#play-button").addEventListener("click",this.playGame,!1),document.querySelector("#stop-button").addEventListener("click",this.stopGame,!1),this.loader.baseUrl="/public/assets/",this.loadDefaultAssets(),this.createGame("Test Game"),this.games[this.currentGameIndex].scenes.forEach((e=>{this.stage.addChild(e)})),this.initializeEntitySettings(),this.filterEntities(),this.initializeScenes(),PIXI.Ticker.shared.add(this.render)}render(e){this.renderer.clear(),"play"===this.games[this.currentGameIndex].mode&&this.games[this.currentGameIndex].play(e),this.renderer.render(this.stage)}loadDefaultAssets(){this.loader.add("blueTile","images/blueTile.png").add("brownTile","images/brownTile.png").add("blackTile","images/blackTile.png").add("greenTile","images/greenTile.png").add("yellowTile","images/yellowTile.png").add("redTile","images/redTile.png").add("whiteTile","images/whiteTile.png").add("orangeTile","images/orangeTile.png").add("background","images/background.jpg"),this.loadEntityToWorkspace("blueTile","images/blueTile.png"),this.loader.onComplete.add(this.addTestObjects),this.loader.load()}loadEntityToWorkspace(e,t){const i="/public/assets/"+t,n=new class{constructor(){var e=document.head,t=document.createElement("link");e.innerHTML.indexOf("dynamic-card.css")<=-1&&(t.type="text/css",t.rel="stylesheet",t.href="/public/scripts/view-components/cards/styling/dynamic-card.css",e.appendChild(t))}createInlineCard(e){if(!(e instanceof h))throw new TypeError("Provided Card is not of type Card");const t=document.createElement("section");if(t.id="inline-card-object",t.classList.add("dynamic-inline-card"),e.colour&&(t.style.backgroundColor=e.colour.colourToString()),e.image){const i=document.createElement("img");i.id="inline-card-image",i.src=e.image,t.appendChild(i)}const i=document.createElement("div");if(i.id="inline-card-content",i.classList.add("dynamic-inline-card-content"),e.title){const t=document.createElement("a");t.id="card-body-title",t.innerHTML=e.title,i.appendChild(t)}return e.buttons&&Array.isArray(e.buttons)&&e.buttons.forEach((e=>{const t=document.createElement("button");t.onclick=e.action,t.innerHTML=e.title,t.id=e.id,t.classList.add("dynamic-card-button-sm"),t.style.backgroundColor=e.colour.colourToString(),t.style.fontSize=e.fontSize,t.style.marginLeft="auto",i.appendChild(t)})),t.appendChild(i),t}createGenericCard(e){if(!(e instanceof h))throw new TypeError("Provided Card is not of type Card");const t=document.createElement("section");if(t.id="card-object",t.classList.add("dynamic-card"),e.colour&&(t.style.backgroundColor=e.colour.colourToString()),e.image){const i=document.createElement("img");i.classList.add("dynamic-card-image"),i.id="card-image",i.src=e.image,t.appendChild(i)}if(e.header){const i=document.createElement("div");i.id="card-body-header",i.classList.add("dynamic-card-header"),i.innerHTML=e.header,e.center&&(i.style.textAlign="center"),e.whiteText&&(i.style.color=u.Light.colourToString()),t.appendChild(i)}const i=document.createElement("div");if(i.classList.add("dynamic-card-container"),e.title){const t=document.createElement("h3");t.id="card-body-title",t.innerHTML=e.title,t.classList.add("dynamic-card-title"),e.center&&(t.style.textAlign="center"),e.whiteText&&(t.style.color=u.Light.colourToString()),i.appendChild(t)}if(e.bodyText||e.buttons&&Array.isArray(e.buttons)){if(e.bodyText){const t=document.createElement("p");t.id="card-body-text",t.innerText=e.bodyText,t.classList.add("dynamic-card-text"),e.center&&(t.style.textAlign="center"),e.whiteText&&(t.style.color=u.Light.colourToString()),i.appendChild(t)}e.buttons&&Array.isArray(e.buttons)&&e.buttons.length>0&&i.appendChild(this.createButtonContainer(e.buttons,e.center))}if(t.appendChild(i),e.footer){const i=document.createElement("div");i.id="card-body-footer",i.classList.add("dynamic-card-footer"),i.innerHTML=e.footer,e.center&&(i.style.textAlign="center"),e.whiteText&&(i.style.color=u.Light.colourToString()),t.appendChild(i)}return t}createButtonContainer(e,t=!1){if(!Array.isArray(e))throw"Provided Buttons object is not of type Array";const i=document.createElement("div");return i.id="card-body-buttons-container",i.classList.add("dynamic-card-button-container"),t&&(i.style.justifyContent="center"),e.forEach((e=>{const t=document.createElement("button");t.onclick=e.action,t.innerHTML=e.title,t.id=e.id,t.classList.add("dynamic-card-button"),t.style.backgroundColor=e.colour.colourToString(),t.style.fontSize=e.fontSize,i.appendChild(t)})),i}},s=new h;s.title=e,s.image=i,s.colour=u.Light;var r=new Array;const a=new c;a.title="Add",a.id=e,a.colour=u.Primary,a.fontSize=g.Smaller,a.action=e=>{e.preventDefault();const t=e.target.id;console.log("BUTTON PRESSED"),this.createGameEntity(PIXI.utils.TextureCache[t])},r.push(a),s.buttons=r;let o=n.createInlineCard(s);this._entities.appendChild(o)}loadTexturesFromLocal(e){let t=e.target,i=t.files;for(let e=0;e<i.length;e++){let i=new FileReader;i.onload=()=>{const n=new Image;n.src=i.result;let s=new PIXI.BaseTexture(n.src);PIXI.Texture.addToCache(s,t.files[e].name)},i.readAsDataURL(t.files[e])}}createGame(e){let t=new a(e);t.init(this.renderer.view.width,this.renderer.view.height,"gameScene"),this.games.push(t)}deleteGame(e){}saveGame(){}createGameEntity(e=PIXI.utils.TextureCache.blueTile){const t=this.games[this.currentGameIndex].scenes[0].children.length;console.log(this._entityType),console.log(this._entityType.value);const i=new n(e,"untitled"+t);i.x=this.renderer.screen.width/2,i.y=this.renderer.screen.height/2,this.games[this.currentGameIndex].getCurrentScene().setSelectedEntityName(i.name),this.games[this.currentGameIndex].scenes[0].addChild(i)}playGame(){this.games[this.currentGameIndex].setGameMode("play")}stopGame(){this.games[this.currentGameIndex].setGameMode("design")}}).init()})();