import { system, world } from "@minecraft/server";
import { adicionarTagEntidade } from "./addtags";
import { givePlayerElytra } from "./giveitems";
import { rodarComando } from "./runcommands";

// Variaveis Globais
const ENTIDADE_NOME: string = "will";
const ENTIDADE_TAG: string = "quest.will";
const START_TICK: number = 100;
let curTick: number = 0;

function gameTick() {
  try {
    curTick++;

    if (curTick === START_TICK) {
      adicionarTagEntidade(ENTIDADE_NOME, ENTIDADE_TAG);
      givePlayerElytra();
      rodarComando();
      console.warn("Funções rodaram nesse tick: " + curTick);
    }
  } catch (e) {
    console.warn("Tick error: " + e);
  }

  system.run(gameTick);
}

system.run(gameTick);

//! Códigos antigos
// function mainTick() {
//   if (system.currentTick % 100 === 0) {
//     console.warn("Hello starter! Tick: " + system.currentTick);
//   }

//   system.run(mainTick);
// }
// system.runInterval(mainTick);
