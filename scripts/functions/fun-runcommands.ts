import * as mc from "@minecraft/server";

let comandoEscolhido = "/time set day";

// TODO Necessário adicionar uma forma de pegar apeas um player especifico
export function rodarComando() {
  let players = mc.world.getAllPlayers();

  players[0].runCommand(comandoEscolhido) as mc.CommandResult;
  console.warn("Função rodarComando executada");

  // console.warn(players[0].successCount);
}
