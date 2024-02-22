import {
  BTN_START_QUEST_01_LOCATION,
  TAG_QUEST,
  ESPERAR,
  steps,
  azimute,
  BTN_NORTE,
  BTN_LESTE,
  BTN_OESTE,
  BTN_SUL,
} from "./quest-01-variables";
import { Step } from "./quest-01-objetos";
import { randomDirectionCardeais, newDirectionMessage, resetCentro } from "./quest-01-functions";
import { Vector2, world, TeleportOptions, system, Vector3 } from "@minecraft/server";

// DECLARAÇÃO DE VARIAVEIS

// TODO REMOVE HARDCODE
export function questDirecoesDesafio() {
  var oritentacao: string = "nao";
  // Filtragem para selecionar apenas o jogador que possuir a tag da missão que será realizada
  // Apertar qualquer botão => Selecionar apenas um jogador com a tag da quest => Pegar a localizacao do botao
  world.afterEvents.buttonPush.subscribe((botao) => {
    let playerPress = botao.dimension.getPlayers();
    let playerFilter = playerPress.filter((data) => {
      const tagsGet = data.getTags();
      return tagsGet.find((tag) => tag === TAG_QUEST) !== undefined;
    });
    let jG = playerFilter[0];
    let localizacaobotao = botao.block.location;

    //* Declaração de funções para acertar do que fazer quando acertar ou errar
    function correctDirection(): void {
      oritentacao = randomDirectionCardeais();
      jG.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Parabéns!\nVocê acertou a direção`);
      system.runTimeout(() => {
        newDirectionMessage(jG, TAG_QUEST, oritentacao);
        resetCentro(azimute, botao);
      }, ESPERAR);
    }
    function wrongDirection() {
      jG.runCommand(
        `/title @s[tag=${TAG_QUEST}] actionbar Que pena!\nVocê apertou o botão da direção errada\nA direção correta é o ${oritentacao}`
      );
    }

    // * Verificar Botões
    if (jG !== undefined) {
      // Verificador de Botão inicial da Missão
      if (
        localizacaobotao.x === BTN_START_QUEST_01_LOCATION.x &&
        localizacaobotao.y === BTN_START_QUEST_01_LOCATION.y &&
        localizacaobotao.z === BTN_START_QUEST_01_LOCATION.z
      ) {
        jG.runCommand(`/title @s[tag=${TAG_QUEST}] title Quest Direções`);
        jG.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Iniciando desafio em 3 ...`);
        // Função de sequencia de runTimeout para mostrar mensagens de texto no HUD
        function runSequence(steps: Step[], currentIndex: number): void {
          if (currentIndex < steps.length) {
            const step = steps[currentIndex];
            system.runTimeout(() => {
              jG.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar ${step.action ?? ""} ...`);
              runSequence(steps, currentIndex + 1);
            }, step.wait);
          } else {
            oritentacao = "NORTE";
            newDirectionMessage(jG, TAG_QUEST, oritentacao);
            resetCentro(azimute, botao);
          }
        }
        runSequence(steps, 0);
      }
      // Verifiar botões das orientações espaciais
      if (
        localizacaobotao.x === BTN_NORTE.x &&
        localizacaobotao.y === BTN_NORTE.y &&
        localizacaobotao.z === BTN_NORTE.z
      ) {
        if (oritentacao === "NORTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (
        localizacaobotao.x === BTN_LESTE.x &&
        localizacaobotao.y === BTN_LESTE.y &&
        localizacaobotao.z === BTN_LESTE.z
      ) {
        if (oritentacao === "LESTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (
        localizacaobotao.x === BTN_SUL.x &&
        localizacaobotao.y === BTN_SUL.y &&
        localizacaobotao.z === BTN_SUL.z
      ) {
        if (oritentacao === "SUL") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (
        localizacaobotao.x === BTN_OESTE.x &&
        localizacaobotao.y === BTN_OESTE.y &&
        localizacaobotao.z === BTN_OESTE.z
      ) {
        if (oritentacao === "OESTE") {
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
