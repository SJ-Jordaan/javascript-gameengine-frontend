(()=>{"use strict";class t extends PIXI.Sprite{constructor(t,i=0,e=0){super(PIXI.Texture.from(t)),this.x=i,this.y=e,this.interactive=!0,this.buttonMode=!0,this.anchor.set(.5),this.on("pointerdown",this.onDragStart).on("pointerup",this.onDragEnd).on("pointerupoutside",this.onDragEnd).on("pointermove",this.onDragMove)}onDragStart(t){this.data=t.data,this.alpha=.5,this.dragging=!0}onDragEnd(){this.alpha=1,this.dragging=!1,this.data=null}onDragMove(){if(this.dragging){const t=this.data.getLocalPosition(this.parent);this.x=t.x,this.y=t.y}}}class i extends PIXI.Container{constructor(t,i){super(),this.width=t,this.height=i}init(){let i=new t("/public/images/tile.png");this.addChild(i);let e=new t("/public/images/tile.png",100,100);this.addChild(e);let n=new t("/public/images/tile.png",200,200);this.addChild(n);let s=new t("/public/images/tile.png",50,50);this.addChild(s)}}(new class{constructor(t=800,i=600){this.app=new PIXI.Application({width:t,height:i,backgroundColor:11184810,resolution:window.devicePixelRatio||1,autoResize:!0})}init(){document.getElementById("engine-view").appendChild(this.app.view);const t=new i(800,600);t.init(),this.app.stage.addChild(t)}gameLoop(){}}).init()})();