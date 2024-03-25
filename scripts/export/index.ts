import { ButtonPushAfterEvent, Player, system, world, Vector3 } from "@minecraft/server";
import { ENTIDADE_NOME, ENTIDADE_TAG } from "../global/index";
import { adicionarTagEntidade, givePlayerElytra, rodarComando, spawnNPC } from "../global/functions/index";
const START_TICK: number = 100;
let curTick: number = 0;
let players: Player[];
let playerBtn: ButtonPushAfterEvent;
// TODO Criar um classe com as informações de cada quest
const btnQuest01: Vector3 = { x: 327, y: -13, z: 294 };

export function gameTick() {
  try {
    curTick++;

    if (curTick > START_TICK && curTick % 20 === 0) {
      // adicionarTagEntidade(ENTIDADE_NOME, ENTIDADE_TAG);
      // givePlayerElytra();
      // rodarComando();
      // spawnNPC();

      // console.warn("teste");
      // console.warn("Funções rodaram nesse tick: " + curTick);

      world.afterEvents.buttonPush.subscribe((e) => {
        // console.warn("|" + e.block.location.x + "|" + e.block.location.y + "|" + e.block.location.z);

        return (playerBtn = e);
      });
      // Verificar Localização do botão
      if (verifyLocation(playerBtn.block.location, btnQuest01)) {
        players = playerBtn.dimension.getPlayers({ tags: ["pindola"] });
        throw new Error("Erro no botão");
      }
      // Selecionar Jogador
      for (let player of players) {
        player.onScreenDisplay.setActionBar("Dialogue Teste para " + player.name);
      }
    }
  } catch (e) {
    console.warn("Tick error: " + e);
  }

  system.run(gameTick);
}

function verifyLocation(obj1: Vector3, obj2: Vector3): boolean {
  if (obj1.x === obj2.x && obj1.y === obj2.y && obj1.z === obj2.z) {
    return true;
  } else {
    return false;
  }
}
