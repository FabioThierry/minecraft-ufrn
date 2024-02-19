import { system, world } from "@minecraft/server";
import { gameTick } from "./export/index";
import { mensagemQuebrarBloco } from "./export/desenvolvimento"; //* Apenas para testes

mensagemQuebrarBloco();
system.run(gameTick);
