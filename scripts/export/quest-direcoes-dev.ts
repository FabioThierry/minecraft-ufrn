import {
  NORTE_AZIMUTE,
  SUL_AZIMUTE,
  LESTE_AZIMUTE,
  OESTE_AZIMUTE,
  ROSA_DOS_VENTOS,
  ARRAY_ORIENTACOES,
} from "../global/index";
import { EntityQueryOptions, Vector2, Vector3, world, TeleportOptions } from "@minecraft/server";

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

// TODO REMOVE HARDCODE
export function questDirecoesDesafio() {
  world.afterEvents.buttonPush.subscribe((botao) => {
    let playerPress = botao.dimension.getPlayers();
    let playerFilter = playerPress.filter((data) => {
      const tagsGet = data.getTags();
      return tagsGet.find((tag) => tag == "tagQuest1") !== undefined;
    });

    let jG = playerFilter[0];
    let localizacaobotao = botao.block.location;
    // console.warn(`${localizacaobotao.x} ${localizacaobotao.y} ${localizacaobotao.z}`);
    function randomAzimute<T>(arr: T[]): number {
      return Math.floor(Math.random() * arr.length);
    }
    // let randomAz = ARRAY_ORIENTACOES[randomAzimute(ARRAY_ORIENTACOES)];
    // console.warn(randomAz);
    function resetCentro() {
      azimute.rotation = { x: 0, y: ARRAY_ORIENTACOES[randomAzimute(ARRAY_ORIENTACOES)] };
      botao.source.teleport(ROSA_DOS_VENTOS, azimute);
    }

    /// *TELEPORT
    if (jG !== undefined) {
      if (
        localizacaobotao.x === btnStartQuest1Location.x &&
        localizacaobotao.y === btnStartQuest1Location.y &&
        localizacaobotao.z === btnStartQuest1Location.z
      ) {
        console.warn("Iniciando Missão Quest1");
        resetCentro();
      } else if (localizacaobotao.x === 315 && localizacaobotao.y === 60 && localizacaobotao.z === 314) {
        world.sendMessage("Apertou o Botão da direção: LESTE");
        resetCentro();
      } else if (localizacaobotao.x === 310 && localizacaobotao.y === 60 && localizacaobotao.z === 319) {
        world.sendMessage("Apertou o Botão da direção: SUL");
        resetCentro();
      } else if (localizacaobotao.x === 305 && localizacaobotao.y === 60 && localizacaobotao.z === 314) {
        world.sendMessage("Apertou o Botão da direção: OESTE");
        resetCentro();
      } else if (localizacaobotao.x === 310 && localizacaobotao.y === 60 && localizacaobotao.z === 309) {
        world.sendMessage("Apertou o Botão da direção: NORTE");
        resetCentro();
      } else {
        console.error("botao nao foi encontrado");
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
