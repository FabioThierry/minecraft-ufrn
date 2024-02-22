import { ButtonPushAfterEvent, Player, TeleportOptions } from "@minecraft/server";
import { ARRAY_ORIENTACOES, randomArray } from "../../global/index";
import { ROSA_DOS_VENTOS } from "./quest-01-variables";

//* Função para criar Randomizar a direção dos jogadores e Resetar o jogador ao centro da rosa dos ventos
export function resetCentro(azimute: TeleportOptions, botao: ButtonPushAfterEvent): void {
  azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[randomArray(ARRAY_ORIENTACOES)] };
  botao.source.teleport(ROSA_DOS_VENTOS, azimute);
}

//* Randomizar escolha do ponto cardeal
export function randomDirectionCardeais() {
  let cardeais = ["NORTE", "SUL", "LESTE", "OESTE"];
  let numero = Math.floor(Math.random() * cardeais.length);
  return cardeais[numero];
}
//* Funcao para adicionar nova mensagem
export function newDirectionMessage(jogador: Player, tagquest: string, oritentacao: string) {
  jogador.runCommand(`/title @s[tag=${tagquest}] title ${oritentacao}`);
  jogador.runCommand(`/title @s[tag=${tagquest}] subtitle Aperte o botão para direção ${oritentacao}`);
}
