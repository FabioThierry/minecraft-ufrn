import { world } from "@minecraft/server";

export function mensagemQuebrarBloco() {
  world.sendMessage("Hello, World!");

  world.afterEvents.playerBreakBlock.subscribe(function callbak(dados) {
    world.sendMessage(`Hello, World! ${dados.player.addTag("clicou.no.chao")}`);
  });
}
