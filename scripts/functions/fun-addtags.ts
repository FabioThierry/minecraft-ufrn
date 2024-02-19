// Imports da API do Minecraft
import { world, Entity } from "@minecraft/server";

export function adicionarTagEntidade(nomeEntidade: string, nomeTag: string) {
  const overworld = world.getDimension("overworld");
  const entidadeArray = overworld.getEntities({ name: nomeEntidade });

  if (entidadeArray.length > 0) {
    const entidade = entidadeArray[0] as Entity;
    entidade.addTag(nomeTag);
    console.warn("Log: Tag " + nomeTag + " adicionada na entidade " + nomeEntidade); // Log
  } else {
    console.error("Entidade com nome " + nomeEntidade + " não encontrado."); // NPC não encontrado
  }
}
