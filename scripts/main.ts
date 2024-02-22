import { system, world } from "@minecraft/server";
import { gameTick } from "./export/index";
import { mensagemQuebrarBloco } from "./export/desenvolvimento"; //* Apenas para testes
import { questDirecoesDesafio } from "./quests/quest-01/quest-01-main"; //* Apenas para testes

questDirecoesDesafio();
mensagemQuebrarBloco();
// system.run(gameTick);
