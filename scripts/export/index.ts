import { ButtonPushAfterEvent, Player, system, world, Vector3 } from "@minecraft/server";
import { verifyLocation } from "../utils/functions/verifyLocation";
const START_TICK = 100;
let curTick = 0;
let players: Player[];
let playerBtn: ButtonPushAfterEvent;
let fistDialogues = false;
// TODO Criar um classe com as informações de cada quest
const btnQuest01: Vector3 = { x: 327, y: -13, z: 294 };

export function gameTick() {
  try {
    curTick++;

    if (curTick > START_TICK && curTick % 20 === 0) {
      world.afterEvents.buttonPush.subscribe((e) => {
        // console.warn(e.block.z);
        return (playerBtn = e);
      });

      // Verificar Localização do botão
      if (verifyLocation(playerBtn.block.location, btnQuest01)) {
        players = playerBtn.dimension.getPlayers({ tags: ["pindola"] });
      }
      // Selecionar Jogador
      for (let player of players) {
        if (!fistDialogues) {
          fistDialogues = true;
          execDisplayDialogues(player, "olar marilene", "ola pindola de borboleta");
        }
      }
    }
  } catch (e) {
    console.warn("Tick error: " + e);
  }

  system.run(gameTick);
}

function displayDialogues(msg: string, delay: number, player: Player) {
  return new Promise((resolve) => {
    system.runTimeout(() => {
      resolve(player.onScreenDisplay.setActionBar(`Rádio para: ${player.name} => ${msg}`));
      return;
    }, delay);
  });
}

async function execDisplayDialogues(player: Player, msg1: string, msg2: string) {
  await displayDialogues(msg1, 200, player);
  await displayDialogues(msg2, 200, player);
}
