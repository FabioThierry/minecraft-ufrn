import { ButtonPushAfterEvent, Player, TeleportOptions } from "@minecraft/server";
import { ARRAY_ORIENTACOES, randomArray } from "../../global/index";
import { ROSA_DOS_VENTOS } from "./quest-01-variables";

// FUNÇÃO PARA RANDOMIZAR A DIREÇÃO DOS JOGADORES E RESETAR O JOGADOR AO CENTRO DA ROSA DOS VENTOS
export function resetCentro(azimute: TeleportOptions, botao: ButtonPushAfterEvent): void {
  azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[randomArray(ARRAY_ORIENTACOES)] };
  botao.source.teleport(ROSA_DOS_VENTOS, azimute);
}

// FUNÇÃO PARA RANDOMIZAR A ESCOLHA DO PONTO CARDEAL
export function randomDirectionCardeais() {
  let cardeais = ["NORTE", "SUL", "LESTE", "OESTE"];
  let numero = Math.floor(Math.random() * cardeais.length);
  return cardeais[numero];
}
// FUNÇÃO PARA ADICIONAR UMA NOVA MENSAGEM
export function newDirectionMessage(jogador: Player, tagquest: string, oritentacao: string) {
  jogador.runCommand(`/title @s[tag=${tagquest}] title ${oritentacao}`);
  jogador.runCommand(`/title @s[tag=${tagquest}] subtitle Aperte o botão para direção ${oritentacao}`);
}
