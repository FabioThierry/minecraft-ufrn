import { ButtonPushAfterEvent, world } from "@minecraft/server";

export interface IButtonHandler {
  handleButtonPush(btn: ButtonPushAfterEvent): void;
}
export class ButtonHandler implements IButtonHandler {
  constructor() {
    // Assinando o evento
    world.afterEvents.buttonPush.subscribe(this.handleButtonPush.bind(this));
  }

  handleButtonPush(btn: ButtonPushAfterEvent) {
    console.warn(btn.block.location.x);
    // Você pode fazer o que quiser com o retorno da callback aqui
    // Por exemplo, você pode chamar métodos da própria classe ou de outras classes
    this.someMethod(btn.source.location);
  }

  someMethod(location: any) {
    // Método de exemplo para demonstração
    console.warn("Localização do botão:", location);
  }
}

// Criando uma instância da classe ButtonHandler para começar a lidar com os eventos de botão
