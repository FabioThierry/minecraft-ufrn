import {
  NORTE_AZIMUTE,
  SUL_AZIMUTE,
  LESTE_AZIMUTE,
  OESTE_AZIMUTE,
  ROSA_DOS_VENTOS,
  ARRAY_ORIENTACOES,
} from "../global/index";
import {
  EntityQueryOptions,
  Vector2,
  Vector3,
  world,
  TeleportOptions,
  system,
  TicksPerSecond,
} from "@minecraft/server";

// DECLARAÇÃO DE VARIAVEIS
const tpVector2: Vector2 = {
  x: NORTE_AZIMUTE,
  y: 180,
};
const azimute: TeleportOptions = {
  rotation: { x: 0, y: SUL_AZIMUTE },
};

const btnStartQuest1Location: Vector3 = {
  x: 321,
  y: 60,
  z: 322,
};

const esperar1segundo = TicksPerSecond * 1;
const tagQuest = "tagQuest1";
interface Step {
  action: number | null;
  wait: number;
}
// TODO REMOVE HARDCODE
export function questDirecoesDesafio() {
  var oritentacao: string = "nao";
  //Filtragem para selecionar apenas o jogador que possuir a tag da missão que será realizada
  world.afterEvents.buttonPush.subscribe((botao) => {
    let playerPress = botao.dimension.getPlayers();
    let playerFilter = playerPress.filter((data) => {
      const tagsGet = data.getTags();
      return tagsGet.find((tag) => tag == tagQuest) !== undefined;
    });
    let jG = playerFilter[0];
    let localizacaobotao = botao.block.location;
    // console.warn(`${localizacaobotao.x} ${localizacaobotao.y} ${localizacaobotao.z}`);

    //* Funções para criar Randomizar a direção dos jogadores e Resetar o jogador ao centro da rosa dos ventos
    function randomAzimute<T>(arr: T[]): number {
      return Math.floor(Math.random() * arr.length);
    }
    function resetCentro() {
      azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[randomAzimute(ARRAY_ORIENTACOES)] };
      botao.source.teleport(ROSA_DOS_VENTOS, azimute);
    }

    //* Randomizar escolha do da direção
    function randomDirection() {
      let cardeais = ["NORTE", "SUL", "LESTE", "OESTE"];
      let numero = Math.floor(Math.random() * cardeais.length);
      return cardeais[numero];
    }
    //* Funcao para adicionar nova mensagem
    function newDirectionMessage() {
      jG.runCommand(`/title @s[tag=${tagQuest}] title ${oritentacao}`);
      jG.runCommand(`/title @s[tag=${tagQuest}] subtitle Aperte o botão para direção ${oritentacao}`);
    }
    //* Funcao acertou o botao
    function correctDirection() {
      oritentacao = randomDirection();
      jG.runCommand(`/title @s[tag=${tagQuest}] actionbar Parabéns!\nVocê acertou a direção`);
      system.runTimeout(() => {
        newDirectionMessage();
        resetCentro();
      }, esperar1segundo);
    }
    function wrongDirection() {
      jG.runCommand(
        `/title @s[tag=${tagQuest}] actionbar Que pena!\nVocê apertou o botão da direção errada\nA direção correta é o ${oritentacao}`
      );
    }

    /// * TELEPORTS
    if (jG !== undefined) {
      //Verificador de Botão inicial da Missão
      if (
        localizacaobotao.x === btnStartQuest1Location.x &&
        localizacaobotao.y === btnStartQuest1Location.y &&
        localizacaobotao.z === btnStartQuest1Location.z
      ) {
        jG.runCommand(`/title @s[tag=${tagQuest}] title Quest Direções`);
        // jG.runCommand(`/title @s[tag=${tagQuest}] subtitle Quest Direções`);
        jG.runCommand(`/title @s[tag=${tagQuest}] actionbar Iniciando desafio em 3 ...`);
        // TODO tentar diminuir esse código com um loop
        //? system.runTimeout(() => {
        //?   jG.runCommand(`/title @s[tag=${tagQuest}] actionbar 2 ...`);
        //?   system.runTimeout(() => {
        //?     jG.runCommand(`/title @s[tag=${tagQuest}] actionbar 1 ...`);
        //?     system.runTimeout(() => {
        //?       oritentacao = "NORTE";
        //?       newDirectionMessage();
        //?       resetCentro();
        //?     }, esperar1segundo);
        //?   }, esperar1segundo);
        //? }, esperar1segundo);
        //Sequencia para executar mensagens mensagens a cada segundo
        function runSequence(steps: Step[], currentIndex: number): void {
          if (currentIndex < steps.length) {
            const step = steps[currentIndex];
            system.runTimeout(() => {
              jG.runCommand(`/title @s[tag=${tagQuest}] actionbar ${step.action ?? ""} ...`);
              runSequence(steps, currentIndex + 1);
            }, step.wait);
          } else {
            oritentacao = "NORTE";
            newDirectionMessage();
            resetCentro();
          }
        }

        const steps: Step[] = [
          { action: 2, wait: esperar1segundo },
          { action: 1, wait: esperar1segundo },
          { action: null, wait: esperar1segundo }, // Ação nula, apenas espera
        ];

        runSequence(steps, 0);
      }

      // else {
      // console.error("O botão não foi encontrado, corrija a localização da variavel do tipo Vector3");
      // }

      if (localizacaobotao.x === 310 && localizacaobotao.y === 60 && localizacaobotao.z === 309) {
        if (oritentacao === "NORTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (localizacaobotao.x === 315 && localizacaobotao.y === 60 && localizacaobotao.z === 314) {
        if (oritentacao === "LESTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (localizacaobotao.x === 310 && localizacaobotao.y === 60 && localizacaobotao.z === 319) {
        if (oritentacao === "SUL") {
          correctDirection();
        } else {
          wrongDirection();
        }
      } else if (localizacaobotao.x === 305 && localizacaobotao.y === 60 && localizacaobotao.z === 314) {
        if (oritentacao === "OESTE") {
          correctDirection();
        } else {
          wrongDirection();
        }
      }
    } else {
      console.error("Não Foi possivel selecionar o jogador");
    }

    // console.warn(botao.source.typeId);
    // console.warn("Função Quest Direções está rodando");

    // * Filtragem do Jogador
    // Selecionar todos os jogadores online
    let players = world.getAllPlayers();
    // Selecionar apenas os jogadores que possuem a tag "tagQuest1"
    const jogador_filtrado = players.filter((jogador) => {
      const tags = jogador.getTags();
      return tags.find((tag) => tag === "tagQuest1") !== undefined;
    });
    let playerQuest = jogador_filtrado[0];

    // console.warn(jogador_filtrado[0].id + "<= jogadores"); // Log

    // Filtro para escolher o npc
    const opcoes: EntityQueryOptions = {
      families: ["npc"],
      name: "will",
    };

    // Dar /tp no player com a quest
    // let entidadeNpc = world.getDimension("overworld").getEntities(opcoes);
    // console.warn(entidadeNpc.map((entidade) => entidade.nameTag));
    // if (entidadeNpc !== undefined) {
    //   //adicionar comando para o player realizar o teleport para o meio da rosa dos ventos
    //   playerQuest.teleport({ x: X_ROSA_DOS_VENTOS, y: Y_ROSA_DOS_VENTOS, z: Z_ROSA_DOS_VENTOS }); //TODO Adicionar direction
    // } else {
    //   console.warn("O NPCs Will não está pronto!");
    // }
  });
}
