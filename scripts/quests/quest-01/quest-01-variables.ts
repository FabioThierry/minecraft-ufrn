import { Vector3, TicksPerSecond, TeleportOptions } from "@minecraft/server";

import { Step } from "./quest-01-objetos";

// TEMPO DE ESPERA PARA CADA NOVA MENSAGEM DE TEXTO
export const WAIT = TicksPerSecond * 1;

// TAG PARA SER VERIFICADA
export const TAG_QUEST = "Q01_DESAFIO";

// LOCALIZAÇÃO DO BOTÃO QUE INICIA A QUEST
export const BTN_START_QUEST_01_LOCATION: Vector3 = {
  x: 327,
  y: -13,
  z: 294,
};

// LOCALIZAÇÃO DO BLOCO NO CENTRO DA ROSA DOS VENTOS
export const ROSA_DOS_VENTOS: Vector3 = {
  x: 316.5,
  y: -13,
  z: 286.5,
};
// LOCALIZAÇÃO DO BOTÃO NORTE
export const BTN_NORTE: Vector3 = {
  x: 316,
  y: -13,
  z: 281,
};
// LOCALIZAÇÃO DO BOTÃO LESTE
export const BTN_LESTE: Vector3 = {
  x: 321,
  y: -13,
  z: 286,
};
// LOCALIZAÇÃO DO BOTÃO SUL
export const BTN_SUL: Vector3 = {
  x: 316,
  y: -13,
  z: 291,
};
// LOCALIZAÇÃO DO BOTÃO OESTE
export const BTN_OESTE: Vector3 = {
  x: 311,
  y: -13,
  z: 286,
};
// PASSOS PARA EXECUÇÃO DA FUNÇÃO DE EXIBIÇÃO DE MENSAGENS
export const steps: Step[] = [
  { action: 2, wait: WAIT },
  { action: 1, wait: WAIT },
  { action: null, wait: WAIT },
];

export const azimute: TeleportOptions = {
  rotation: { x: 0, y: 0 },
};
