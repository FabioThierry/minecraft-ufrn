import { Player, system, world } from "@minecraft/server";

const testeAsync = async () => {
  console.log("teste");
};

const display_dialogue = async (dialogue: object, player: Player) => {
  player.onScreenDisplay.setActionBar("TESTE  ");
  system.runTimeout(() => {
    player.onScreenDisplay.setActionBar("tESTE 2");
    system.runTimeout(() => {
      player.onScreenDisplay.setActionBar("tESTE3");
    }, 20 * 5);
  }, 20 * 5);

  // await delay(3000);
  // await delay(3000);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let playerBtn = world.afterEvents.buttonPush.subscribe((event) => {
  console.log(event);
  event.block.x;
});
console.warn(playerBtn.name);
