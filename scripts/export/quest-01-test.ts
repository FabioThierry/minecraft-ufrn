// import {
//   NORTE_AZIMUTE,
//   SUL_AZIMUTE,
//   LESTE_AZIMUTE,
//   OESTE_AZIMUTE,
//   ROSA_DOS_VENTOS,
//   ARRAY_ORIENTACOES,
// } from "../global/index";
// import {
//   EntityQueryOptions,
//   Vector2,
//   Vector3,
//   world,
//   TeleportOptions,
//   system,
//   TicksPerSecond,
// } from "@minecraft/server";

// // DECLARAÇÃO DE VARIAVEIS
// const tpVector2: Vector2 = {
//   x: NORTE_AZIMUTE,
//   y: 180,
// };
// const azimute: TeleportOptions = {
//   rotation: { x: 0, y: SUL_AZIMUTE },
// };

// const btnStartQuest1Location: Vector3 = {
//   x: 321,
//   y: 60,
//   z: 322,
// };

// const esperar1segundo = TicksPerSecond * 1;
// const tagQuest = "tagQuest1";
// interface Step {
//   action: number | null;
//   wait: number;
// }

// // Função para criar uma mensagem com uma direção aleatória
// function newDirectionMessage(direction: string) {
//   jG.runCommand(`/title @s[tag=${tagQuest}] title Quest Direções`);
//   jG.runCommand(`/title @s[tag=${tagQuest}] subtitle Aperte o botão para a direção ${direction}`);
// }

// // Função para teleportar o jogador para o centro da rosa dos ventos
// function resetCentro() {
//   azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[Math.floor(Math.random() * ARRAY_ORIENTACOES.length)] };
//   botao.source.teleport(ROSA_DOS_VENTOS, azimute);
// }

// // Função para executar uma sequência de ações com intervalos de tempo
// function runSequence(steps: Step[], currentIndex: number) {
//   if (currentIndex < steps.length) {
//     const step = steps[currentIndex];
//     system.runTimeout(() => {
//       jG.runCommand(`/title @s[tag=${tagQuest}] actionbar ${step.action ?? ""} ...`);
//       runSequence(steps, currentIndex + 1);
//     }, step.wait);
//   } else {
//     newDirectionMessage("NORTE");
//     resetCentro();
//   }
// }

// // Função para lidar com a pressão de botões
// world.afterEvents.buttonPush.subscribe((botao) => {
//   let playerPress = botao.dimension.getPlayers();
//   let playerFilter = playerPress.filter((data) => {
//     const tagsGet = data.getTags();
//     return tagsGet.find((tag) => tag == tagQuest) !== undefined;
//   });
//   let jG = playerFilter[0];
//   let localizacaobotao = botao.block.location;

//   // Verifica se o botão inicial da missão foi pressionado
//   if (
//     localizacaobotao.x === btnStartQuest1Location.x &&
//     localizacaobotao.y === btnStartQuest1Location.y &&
//     localizacaobotao.z === btnStartQuest1Location.z
//   ) {
//     jG.runCommand(`/title @s[tag=${tagQuest}] actionbar Iniciando desafio em 3 ...`);

//     const steps: Step[] = [
//       { action: 2, wait: esperar1segundo },
//       { action: 1, wait: esperar1segundo },
//       { action: null, wait: esperar1segundo }, // Ação nula, apenas espera
//     ];

//     runSequence(steps, 0);
//   }

//   // Verifica se o botão de direção foi pressionado e se a direção está correta
//   const directions = ["NORTE", "SUL", "LESTE", "OESTE"];
//   const correctDirection = directions[Math.floor(Math.random() * directions.length)];

//   if (
//     (localizacaobotao.x === 310 &&
//       localizacaobotao.y === 60 &&
//       localizacaobotao.z === 309 &&
//       oritentacao === "NORTE") ||
//     (localizacaobotao.x === 315 &&
//       localizacaobotao.y === 60 &&
//       localizacaobotao.z === 314 &&
//       oritentacao === "LESTE") ||
//     (localizacaobotao.x === 310 && localizacaobotao.y === 60 && localizacaobotao.z === 319 && oritentacao === "SUL") ||
//     (localizacaobotao.x === 305 && localizacaobotao.y === 60 && localizacaobotao.z === 314 && oritentacao === "OESTE")
//   ) {
//     jG.runCommand(`/title @s[tag=${tagQuest}] actionbar Parabéns!\nVocê acertou a direção`);
//     system.runTimeout(() => {
//       oritentacao = correctDirection;
//       newDirectionMessage(correctDirection);
//       resetCentro();
//     }, esperar1segundo);
//   } else {
//     jG.runCommand(
//       `/title @s[tag=${tagQuest}] actionbar Que pena!\nVocê apertou o botão da direção errada\nA direção correta é o ${correctDirection}`
//     );
//   }
// });
