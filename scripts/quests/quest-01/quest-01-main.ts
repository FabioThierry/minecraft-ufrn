import { world, system, Entity, ButtonPushAfterEvent, TeleportOptions } from "@minecraft/server";
import { TAG_QUEST, WAIT, steps, azimute } from "./quest-01-variables";
import { Step } from "./quest-01-objetos";
//import { randomDirectionCardeais, newDirectionMessage, resetCentro } from "./quest-01-functions";
import { SelectedButtons } from "../../utils/classes/SelectedButtons";
import { ARRAY_ORIENTACOES, randomArray } from "../../global/index";
import { ROSA_DOS_VENTOS } from "./quest-01-variables";
import { IButtonHandler } from "./quest-01-debug";
// global variables
let orientation: string = "";
let correctDirectionCounter: number = 0;
let wrongDirectionCounter: number = 0;

export class QuestDirecoesDesafio {
  public player?: Entity;
  private playerId: string | undefined;
  private currentPlayerId: string | undefined;
  private curretTag: string | undefined;
  private isPlaying: boolean = false;
  private btnStart: SelectedButtons;
  private btnNorth: SelectedButtons;
  private btnSouth: SelectedButtons;
  private btnEast: SelectedButtons;
  private btnWest: SelectedButtons;
  private btnLoc: SelectedButtons;

  constructor() {
    this.btnStart = new SelectedButtons({ x: 327, y: -13, z: 294 });
    this.btnNorth = new SelectedButtons({ x: 316, y: -13, z: 281 });
    this.btnSouth = new SelectedButtons({ x: 316, y: -13, z: 291 });
    this.btnEast = new SelectedButtons({ x: 321, y: -13, z: 286 });
    this.btnWest = new SelectedButtons({ x: 311, y: -13, z: 286 });
    this.btnLoc = new SelectedButtons({ x: 0, y: 0, z: 0 });
    world.afterEvents.buttonPush.subscribe(this.handleButtonPush.bind(this));
  }

  private handleButtonPush(btn: ButtonPushAfterEvent) {
    this.playerId = btn.source.id;
    this.player = btn.source;
    this.currentPlayerId = btn.source.id;
    this.btnLoc = new SelectedButtons(btn.block.location);
    btn.source.getTags().filter((tag_string = TAG_QUEST) => {
      return (this.curretTag = tag_string); // Melhorar o retorno
    });
    console.warn(this.curretTag); // Log
    if (this.player !== undefined && this.playerId !== undefined && TAG_QUEST === this.curretTag) {
      if (verifyLocation(this.btnLoc, this.btnStart)) {
        if (!this.isPlaying) {
          this.player.runCommand(`/title @s[tag=${TAG_QUEST}] title Quest Direções`);
          this.player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Iniciando desafio em 3 ...`);

          //this.executarSequencia(steps, 0);
          this.isPlaying = true;
          correctDirectionCounter = 0;
          wrongDirectionCounter = 0;
        } else {
          this.player.runCommand(
            `/title @s[tag=${TAG_QUEST}] actionbar Já possui um jogador realizando essa missão\n Espere ele terminar para tentar novamente `
          );
        }
      }
      // Verificação do botão Norte
      //   if (verifyLocation(this.btnLoc, this.btnNorth)) {
      //     handleDirectionButton("NORTE");
      //   }

      //   // Verificação do botão Leste
      //   if (verifyLocation(this.btnLoc, this.btnEast)) {
      //     handleDirectionButton("LESTE");
      //   }

      //   // Verificação do botão Sul
      //   if (verifyLocation(this.btnLoc, this.btnSouth)) {
      //     handleDirectionButton("SUL");
      //   }

      //   // Verificação do botão Oeste
      //   if (verifyLocation(this.btnLoc, this.btnWest)) {
      //     handleDirectionButton("OESTE");
      //   }
      // }
      // Você pode fazer o que quiser com o retorno da callback aqui
      // Por exemplo, você pode chamar métodos da própria classe ou de outras classes
    }
  }
}

// inner handleDirectionButton

//? Declaration Functions
function verifyLocation(obj1: SelectedButtons, obj2: SelectedButtons): boolean {
  if (
    obj1.location.x === obj2.location.x &&
    obj1.location.y === obj2.location.y &&
    obj1.location.z === obj2.location.z
  ) {
    return true;
  } else {
    return false;
  }
}

// TODO: Adicionar um assync await
function runSequence(steps: Step[], index: number, player: Entity, btn: ButtonPushAfterEvent): void {
  if (index < steps.length) {
    const step = steps[index];
    system.runTimeout(() => {
      player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar ${step.action ?? ""} ...`);
      runSequence(steps, index + 1, player, btn);
    }, step.wait);
  } else {
    orientation = "NORTE";
    newDirectionMessage(player, TAG_QUEST, orientation);
    resetCentro(azimute, btn);
  }
}

// ? Importado de outro módulo
function resetCentro(azimute: TeleportOptions, botao: ButtonPushAfterEvent): void {
  azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[randomArray(ARRAY_ORIENTACOES)] };
  botao.source.teleport(ROSA_DOS_VENTOS, azimute);
}

// FUNÇÃO PARA RANDOMIZAR A ESCOLHA DO PONTO CARDEAL
function randomDirectionCardeais() {
  let cardeais = ["NORTE", "SUL", "LESTE", "OESTE"];
  let numero = Math.floor(Math.random() * cardeais.length);
  return cardeais[numero];
}
// FUNÇÃO PARA ADICIONAR UMA NOVA MENSAGEM
function newDirectionMessage(jogador: Entity, tagquest: string, oritentacao: string) {
  jogador.runCommand(`/title @s[tag=${tagquest}] title ${oritentacao}`);
  jogador.runCommand(`/title @s[tag=${tagquest}] subtitle Aperte o botão para direção ${oritentacao}`);
}
function wrongDirection(player: Entity) {
  wrongDirectionCounter++;
  player.runCommand(
    `/title @s[tag=${TAG_QUEST}] actionbar Que pena!\nVocê apertou o botão da direção errada\nA direção correta é o ${orientation}`
  );
}
function correctDirection(player: Entity) {
  orientation = randomDirectionCardeais();
  correctDirectionCounter++;
  console.warn(correctDirectionCounter);

  player.runCommand(`/title @s[tag=${TAG_QUEST}] actionbar Parabéns!\nVocê acertou a direção`);
  system.runTimeout(() => {
    newDirectionMessage(player, TAG_QUEST, orientation);
    //resetCentro(azimute, btn);
  }, WAIT);
}
function handleDirectionButton(direction: string, player: Entity) {
  if (orientation === direction) {
    correctDirection(player);
  } else {
    wrongDirection(player);
  }
}

// resetCentro(azimute: TeleportOptions, botao: ButtonPushAfterEvent): void {
//   azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[randomArray(ARRAY_ORIENTACOES)] };
//   botao.source.teleport(ROSA_DOS_VENTOS, azimute);
// }
