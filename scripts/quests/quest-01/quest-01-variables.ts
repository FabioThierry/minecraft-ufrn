import { Vector3, TicksPerSecond, TeleportOptions } from "@minecraft/server";
import { SUL_AZIMUTE } from "../../global/index";

import { Step } from "./quest-01-objetos";

// Tempo de espera para cada nova mensagem de texto
export const ESPERAR = TicksPerSecond * 1;

// Tag para ser verificada
export const TAG_QUEST = "Q01_DESAFIO";

// Localização do botão que inicia a quest
export const BTN_START_QUEST_01_LOCATION: Vector3 = {
  //TODO colocar em objetos
  x: 321,
  y: 60,
  z: 322,
};
// Variaveis para o desafio da rosa dos ventos para a Quest Direções
const X_ROSA_DOS_VENTOS = 310.5;
const Y_ROSA_DOS_VENTOS = 60;
const Z_ROSA_DOS_VENTOS = 314.5;

// Objeto centro Rosa dos ventos
export const ROSA_DOS_VENTOS: Vector3 = {
  //TODO colocar em objetos
  x: X_ROSA_DOS_VENTOS,
  y: Y_ROSA_DOS_VENTOS,
  z: Z_ROSA_DOS_VENTOS,
};
export const BTN_NORTE: Vector3 = {
  x: 310,
  y: 60,
  z: 309,
};
export const BTN_LESTE: Vector3 = {
  x: 315,
  y: 60,
  z: 314,
};
export const BTN_SUL: Vector3 = {
  x: 310,
  y: 60,
  z: 319,
};
export const BTN_OESTE: Vector3 = {
  x: 305,
  y: 60,
  z: 314,
};

export const steps: Step[] = [
  { action: 2, wait: ESPERAR },
  { action: 1, wait: ESPERAR },
  { action: null, wait: ESPERAR }, // Ação nula, apenas espera
];

export const azimute: TeleportOptions = {
  rotation: { x: 0, y: 0 },
};
