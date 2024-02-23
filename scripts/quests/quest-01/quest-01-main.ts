import {
  BTN_START_QUEST_01_LOCATION,
  TAG_QUEST,
  WAIT,
  steps,
  azimute,
  BTN_NORTE,
  BTN_LESTE,
  BTN_OESTE,
  BTN_SUL,
} from "./quest-01-variables";
import { Step } from "./quest-01-objetos";
import { randomDirectionCardeais, newDirectionMessage, resetCentro } from "./quest-01-functions";
import { world, system } from "@minecraft/server";

// * FUNÇÃO PRINCIPAL DO DESAFIO
export function questDirecoesDesafio() {
  var orientation: string = "";
  // FILTRAGEM PARA SELECIONAR APENAS O JOGADOR QUE POSSUIR A TAG DA MISSÃO QUE SERÁ REALIZADA
  // APERTAR QUALQUER BOTÃO -> SELECIONAR APENAS UM JOGADOR COM A TAG DA QUEST -> PEGAR A LOCALIZAÇÃO DO BOTÃO
  world.afterEvents.buttonPush.subscribe((btn) => {
    let playersPressBtn = btn.dimension.getPlayers();
    let playerFilter = playersPressBtn.filter((data) => {
      let tag = data.getTags();
      return tag.find((tagString) => tagString === TAG_QUEST) !== undefined;
    });
    let player = playerFilter[0];
    let btnLocation = btn.block.location;

    //* FUNÇÕES
    function correctDirection(): void {
      orientation = randomDirectionCardeais();
      player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Parabéns!\nVocê acertou a direção`);
      system.runTimeout(() => {
        newDirectionMessage(player, TAG_QUEST, orientation);
        resetCentro(azimute, btn);
      }, WAIT);
    }
    function wrongDirection() {
      player.runCommand(
        `/title @s[tag=${TAG_QUEST}] actionbar Que pena!\nVocê apertou o botão da direção errada\nA direção correta é o ${orientation}`
      );
    }

    // * VERIFICADORES DE LOCALIZAÇÃO DE BOTÃO
    if (player !== undefined) {
      // BOTÃO DE INICIO DA QUEST
      if (
        btnLocation.x === BTN_START_QUEST_01_LOCATION.x &&
        btnLocation.y === BTN_START_QUEST_01_LOCATION.y &&
        btnLocation.z === BTN_START_QUEST_01_LOCATION.z
      ) {
        console.warn(player.name);
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
      }
      // BOTÕES DOS PONTOS CARDEAIS
      if (btnLocation.x === BTN_NORTE.x && btnLocation.y === BTN_NORTE.y && btnLocation.z === BTN_NORTE.z) {
        if (orientation === "NORTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (btnLocation.x === BTN_LESTE.x && btnLocation.y === BTN_LESTE.y && btnLocation.z === BTN_LESTE.z) {
        if (orientation === "LESTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (btnLocation.x === BTN_SUL.x && btnLocation.y === BTN_SUL.y && btnLocation.z === BTN_SUL.z) {
        if (orientation === "SUL") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (btnLocation.x === BTN_OESTE.x && btnLocation.y === BTN_OESTE.y && btnLocation.z === BTN_OESTE.z) {
        if (orientation === "OESTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      }
    } else {
      console.error(`Não Foi possivel selecionar o jogador, vc não possui a tag ${TAG_QUEST}`);
    }
  });
}
