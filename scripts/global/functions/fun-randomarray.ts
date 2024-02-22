// Função para randomizar um array
export function randomArray<T>(arr: T[]): number {
  return Math.floor(Math.random() * arr.length);
}
