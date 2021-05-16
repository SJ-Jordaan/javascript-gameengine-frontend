import {CoreEngine} from "./coreEngine";
import { Entity } from "./entity";

const engine = new CoreEngine();
engine.init();

//This is for testing...proper resource management needed
engine.loadAsset("tile", "/public/images/tile.png").load((loader, resources) => {
    const tileTexture = resources.tile.texture;
    const entity = new Entity(tileTexture, 50, 50);
    engine.scene.addEntity(entity);

    const entity_2 = new Entity(tileTexture, 150, 300);
    engine.scene.addEntity(entity_2);

    const entity_3 = new Entity(tileTexture, 300, 150);
    engine.scene.addEntity(entity_3);

    const entity_4 = new Entity(tileTexture, 250, 20);
    engine.scene.addEntity(entity_4);

    const entity_5 = new Entity(tileTexture, 500, 220);
    engine.scene.addEntity(entity_5);

    const entity_6 = new Entity(tileTexture, 430, 120);
    engine.scene.addEntity(entity_6);
});