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
import { world, system, Entity } from "@minecraft/server";
import { SelectedButtons } from "../../utils/classes/SelectedButtons";
// DECLARAÇÃO DE VARIAVEIS
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

// * FUNÇÃO PRINCIPAL DO DESAFIO
export function questDirecoesDesafio() {
  // FILTRAGEM PARA SELECIONAR APENAS O JOGADOR QUE POSSUIR A TAG DA MISSÃO QUE SERÁ REALIZADA
  // APERTAR QUALQUER BOTÃO -> SELECIONAR APENAS UM JOGADOR COM A TAG DA QUEST -> PEGAR A LOCALIZAÇÃO DO BOTÃO
  world.afterEvents.buttonPush.subscribe((btn) => {
    // VARIAVEIS APÓS APERTAR O BOTÃO
    playerId = btn.source.id;
    player = btn.source;
    currentPlayerId = btn.source.id;
    console.warn(`\\${btn.block.location.x} \\ ${btn.block.location.y} \\ ${btn.block.location.z}`);
    const btnLoc = new SelectedButtons(btn.block.location);
    // FILTRO PARA PEGAR A TAG
    btn.source.getTags().filter((tag_string = TAG_QUEST) => {
      return (curretTag = tag_string);
    });
    //? LOGS
    //? console.warn(currentPlayerId + " <= playercurrent id");
    //? console.warn(playerId + " <= player id");
    //? console.warn(curretTag + " <= tag name ");

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
    function VerifyLocation(ob1: SelectedButtons, ob2: SelectedButtons): boolean {
      if (ob1.location.x === ob2.location.x && ob1.location.y === ob2.location.y && ob1.location.z === ob2.location.z) {
        return true;
      } else {
        return false;
      }
    }
    // * VERIFICADORES DE LOCALIZAÇÃO DE BOTÃO
    // TODO RESOLVER PROBLEMA: JOGADORES PODEM INTERCALAR AO APERTAR OS BOTÕES
    if (player !== undefined && playerId !== undefined && TAG_QUEST === curretTag) {
      // BOTÃO DE INICIO DA QUEST
      if (VerifyLocation(btnLoc, btnStart)) {
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
      if (VerifyLocation(btnLoc, btnNorth)) {
        if (orientation === "NORTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (VerifyLocation(btnLoc, btnEast)) {
        if (orientation === "LESTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (VerifyLocation(btnLoc, btnSouth)) {
        if (orientation === "SUL") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (VerifyLocation(btnLoc, btnWest)) {
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
