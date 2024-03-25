import { system, world, Player, Vector3, ButtonPushAfterEvent } from "@minecraft/server";
import { gameTick } from "./export/index";
import {} from "./export/desenvolvimento"; //* Apenas para testes
import { QuestDirecoesDesafio } from "./quests/quest-01/quest-01-main"; //* Apenas para testes
import { ButtonHandler } from "./quests/quest-01/quest-01-debug";

// const buttonHandler = new ButtonHandler();
// const quest1 = new QuestDirecoesDesafio();

system.run(gameTick);

// const testeAsync = async () => {
//   console.log("teste");
// };

// const display_dialogue = async (player: Player) => {
//   player.onScreenDisplay.setActionBar("TESTE  ");
//   system.runTimeout(() => {
//     player.onScreenDisplay.setActionBar("tESTE 2");
//     system.runTimeout(() => {
//       player.onScreenDisplay.setActionBar("tESTE3");
//     }, 20 * 5);
//   }, 20 * 5);

//   // await delay(3000);
//   // await delay(3000);
// };

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
// //

// const START_TICK = 100;

// const intialPrisonCoord: Vector3 = { x: 218, y: -8, z: 190 };

// // global variables
// let curTick = 0;
// playerBtn;

// // function gameTick() {
// //   try {
// //     curTick++;

// //     if (curTick > START_TICK && curTick % 20 === 0) {
// //       // let noobs = world.getPlayers({ excludeTags: ["wasImprisoned"] });
// //       // console.warn("Teste Gametick");
// //       // for (let noobPlayer of noobs) {
// //       //   noobPlayer.teleport(intialPrisonCoord, {
// //       //     facingLocation: { x: intialPrisonCoord.x + 3, y: intialPrisonCoord.y - 1, z: intialPrisonCoord.z },
// //       //   });
// //       //   noobPlayer.addTag("wasImprisoned");
// //       // }
// //       // let inv = player.getComponent("inventory") as EntityInventoryComponent;
// //       // inv.container.addItem(new ItemStack("diamond_sword"));
// //       // inv.container.addItem(new ItemStack("dirt", 64));
// //       let playerBtn = world.afterEvents.buttonPush.subscribe((event) => {
// //         // console.warn(event);
// //         console.warn(event.block.x);
// //       });
// //       console.warn("playerBtn.name");
// //     }

// //     if (curTick > START_TICK && curTick % 60 === 0) {
// //       console.warn("playerBtn.name");
// //     }

// //     if (curTick === START_TICK) {
// //     }
// //   } catch (e) {
// //     console.warn("Tick error: " + e);
// //   }

// //   system.run(gameTick);
// // }
