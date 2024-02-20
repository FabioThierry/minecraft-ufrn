import { world } from "@minecraft/server";
import * as mc from "@minecraft/server";

let overworld = world.getDimension("overworld");
export function spawnNPC() {
  let novaEntidade = overworld.spawnEntity("minecraft:npc", { x: 323.29, y: 59.0, z: 321.48 });
  return novaEntidade.addTag("quest.inicial.ativa");
}
