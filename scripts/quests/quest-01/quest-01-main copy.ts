import { world, system, Entity } from "@minecraft/server";
import { TAG_QUEST, WAIT, steps, azimute } from "./quest-01-variables";
import { Step } from "./quest-01-objetos";
import { randomDirectionCardeais, newDirectionMessage, resetCentro } from "./quest-01-functions";
import { SelectedButtons } from "../../utils/classes/SelectedButtons";

// Variables declarations
const btnStart = new SelectedButtons({ x: 327, y: -13, z: 294 });
const btnNorth = new SelectedButtons({ x: 316, y: -13, z: 281 });
const btnSouth = new SelectedButtons({ x: 316, y: -13, z: 291 });
const btnEast = new SelectedButtons({ x: 321, y: -13, z: 286 });
const btnWest = new SelectedButtons({ x: 311, y: -13, z: 286 });

let player: Entity;
let playerId: string;
let currentPlayerId: string;
let curretTag: string;
let orientation: string;
let isPlaying: boolean = false;
let correctDirectionCounter: number;
let wrongDirectionCounter: number;

// * Função principal
export function questDirecoesDesafio() {
  // Filtragem para selecionar apenas o jogador que possui a tag da missão que será realizada
  // Apertar qualquer botão -> Selecionar apenas um jogador com a tag da missão -> Pegar a localização do botão

  world.afterEvents.buttonPush.subscribe((btn) => {
    // Variaveis após apertar o botão
    playerId = btn.source.id; // TODO isso tem que ser dps de pegar o local exato do inicio da missao
    player = btn.source;
    currentPlayerId = btn.source.id;
    const btnLoc = new SelectedButtons(btn.block.location);

    // Filtro para pegar a tag do Jogador
    btn.source.getTags().filter((tag_string = TAG_QUEST) => {
      return (curretTag = tag_string);
    });

    //* Funções
    function correctDirection() {
      orientation = randomDirectionCardeais();
      correctDirectionCounter++;
      console.warn(correctDirectionCounter);

      player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Parabéns!\nVocê acertou a direção`);
      system.runTimeout(() => {
        newDirectionMessage(player, TAG_QUEST, orientation);
        resetCentro(azimute, btn);
      }, WAIT);
    }
    function wrongDirection() {
      wrongDirectionCounter++;
      player.runCommand(
        `/title @s[tag=${TAG_QUEST}] actionbar Que pena!\nVocê apertou o botão da direção errada\nA direção correta é o ${orientation}`
      );
    }
    function VerifyLocation(ob1: SelectedButtons, ob2: SelectedButtons): boolean {
      if (ob1.location.x === ob2.location.x && ob1.location.y === ob2.location.y && ob1.location.z === ob2.location.z) {
        return true;
      } else {
        return false;
      }
    }
    function handleDirectionButton(direction: string) {
      if (orientation === direction) {
        correctDirection();
      } else {
        wrongDirection();
      }
    }

    // * Verificadores de localização de Botão
    if (player !== undefined && playerId !== undefined && TAG_QUEST === curretTag) {
      // BOTÃO DE INICIO DA QUEST
      if (VerifyLocation(btnLoc, btnStart)) {
        if (isPlaying === false) {
          player.runCommand(`/title @s[tag=${TAG_QUEST}] title Quest Direções`);
          player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Iniciando desafio em 3 ...`);

          // FUNÇÃO PARA MOSTRAR SEQUÊNCIA DE MENSAGENS
          function runSequence(steps: Step[], currentIndex: number): void {
            if (currentIndex < steps.length) {
              const step = steps[currentIndex];
              system.runTimeout(() => {
                player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar ${step.action ?? ""} ...`);
                runSequence(steps, currentIndex + 1);
              }, step.wait);
            } else {
              orientation = "NORTE";
              newDirectionMessage(player, TAG_QUEST, orientation);
              resetCentro(azimute, btn);
            }
          }
          runSequence(steps, 0);
          isPlaying = true;
          correctDirectionCounter = 0;
          wrongDirectionCounter = 0;
        } else {
          player.runCommand(
            `/title @s[tag=${TAG_QUEST}] actionbar Já possui um jogador realizando essa missão\n Espere ele terminar para tentar novamente `
          );
        }
      }

      // Verificação do botão Norte
      if (VerifyLocation(btnLoc, btnNorth)) {
        handleDirectionButton("NORTE");
      }

      // Verificação do botão Leste
      if (VerifyLocation(btnLoc, btnEast)) {
        handleDirectionButton("LESTE");
      }

      // Verificação do botão Sul
      if (VerifyLocation(btnLoc, btnSouth)) {
        handleDirectionButton("SUL");
      }

      // Verificação do botão Oeste
      if (VerifyLocation(btnLoc, btnWest)) {
        handleDirectionButton("OESTE");
      }
      // TODO CRIAR ETAPAS DE DESFIOS
      // TODO CRIAR FORMAS DE FINALIZAR A QUEST
      if (correctDirectionCounter >= 5) {
        console.warn("vc ACERTOU 5 vezes");
        console.warn("sua tag da missao foi removida e sua isPlaying = false");
        isPlaying = false;
        player.runCommand(`/tag @s remove ${TAG_QUEST}`);
        player.teleport({ x: 327.35, y: -14.0, z: 291.54 });
      } else if (wrongDirectionCounter >= 5) {
        console.warn("vc ERROU 5 vezes");
        console.warn("sua tag da missao foi removida e sua isPlaying = false");
        player.teleport({ x: 325.52, y: -14.0, z: 285.56 });
        isPlaying = false;
        player.runCommand(`/tag @s remove ${TAG_QUEST}`);
      }
    } else if (TAG_QUEST !== curretTag && VerifyLocation(btnLoc, btnStart)) {
      // player.runCommand(
      //   `/titleraw @s actionbar {"rawtext":[{"text":"§d§o§ Para iniciar a missão você deve falar com o \n§1§o§lCombatente Smith \ud83d\ude18","italic":true}]}`
      // );
      //TODO CRIAR UMA FORMA DISSO PARAR
      system.runInterval(() => {
        player.runCommand(
          `/titleraw @s actionbar {"rawtext":[{"text":"§d§o§ Para iniciar a missão você deve falar com o \n§1§o§lCombatente Smith \ud83d\ude18","italic":true}]}`
        );
      }, 10);
    }
  });
}
