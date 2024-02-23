import { world } from "@minecraft/server";

export function mensagemQuebrarBloco() {
  // world.sendMessage("Hello, World!");

  world.afterEvents.playerBreakBlock.subscribe(function callbak(dados) {
    dados.player.runCommand(`/tell @s acabei de quebrar um bloco e recebi uma tag ${dados.player.addTag("vandalo")}`);
  });
}
