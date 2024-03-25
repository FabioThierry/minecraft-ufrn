import { Vector3 } from "@minecraft/server";

export function verifyLocation(obj1: Vector3, obj2: Vector3): boolean {
  if (obj1.x === obj2.x && obj1.y === obj2.y && obj1.z === obj2.z) {
    return true;
  } else {
    return false;
  }
}
