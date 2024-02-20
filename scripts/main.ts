import { system, world } from "@minecraft/server";
import { gameTick } from "./export/index";
import { mensagemQuebrarBloco } from "./export/desenvolvimento"; //* Apenas para testes
import { questDirecoesDesafio } from "./export/quest-direcoes-dev"; //* Apenas para testes

questDirecoesDesafio();
mensagemQuebrarBloco();
//system.run(gameTick);
