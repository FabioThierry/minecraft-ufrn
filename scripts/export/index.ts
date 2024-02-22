import { system } from "@minecraft/server";
import { ENTIDADE_NOME, START_TICK, ENTIDADE_TAG } from "../global/index";
import { adicionarTagEntidade, givePlayerElytra, rodarComando, spawnNPC } from "../global/functions/index";

let curTick: number = 0;
export function gameTick() {
  try {
    curTick++;

    if (curTick === START_TICK) {
      adicionarTagEntidade(ENTIDADE_NOME, ENTIDADE_TAG);
      givePlayerElytra();
      rodarComando();
      spawnNPC();
      console.warn("Funções rodaram nesse tick: " + curTick);
    }
  } catch (e) {
    console.warn("Tick error: " + e);
  }

  system.run(gameTick);
}
