import * as mc from "@minecraft/server";

export function givePlayerElytra() {
  let players = mc.world.getAllPlayers();

  const equipment = players[0].getComponent("equippable") as mc.EntityEquippableComponent;
  equipment.setEquipment(mc.EquipmentSlot.Chest, new mc.ItemStack("minecraft:elytra"));

  // console.warn(players[0].successCount);
}
