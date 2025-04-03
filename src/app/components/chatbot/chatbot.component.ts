import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  standalone: false,
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  chatAbierto = false; 
  mensajes = [{ texto: '¡Hola!,te voy a ayudar a tener una dieta saludable. ¿Cuál es tu edad?', tipo: 'bot' }];
  mensajeUsuario: string = '';
  estado: number = 0;
  edad!: number;
  peso!: number;
  altura!: number;

  toggleChat() {
    this.chatAbierto = !this.chatAbierto;
  }

  procesarMensaje() {
    let respuesta = this.mensajeUsuario.trim();
    if (!respuesta) return;

    this.mensajes.push({ texto: respuesta, tipo: 'usuario' });

    switch (this.estado) {
      case 0:
        this.edad = parseInt(respuesta);
        if (isNaN(this.edad) || this.edad < 5 || this.edad > 100) {
          this.mensajes.push({ texto: 'Por favor, ingresa una edad válida (5-100 años).', tipo: 'bot' });
          return;
        }
        this.mensajes.push({ texto: 'Genial, ahora dime tu peso en kg.', tipo: 'bot' });
        this.estado++;
        break;

      case 1:
        this.peso = parseFloat(respuesta);
        if (isNaN(this.peso) || this.peso < 20 || this.peso > 300) {
          this.mensajes.push({ texto: 'Por favor, ingresa un peso válido (20-300 kg).', tipo: 'bot' });
          return;
        }
        this.mensajes.push({ texto: 'Ahora dime tu altura en metros (ej: 1.75).', tipo: 'bot' });
        this.estado++;
        break;

      case 2:
        this.altura = parseFloat(respuesta);
        if (isNaN(this.altura) || this.altura < 1.0 || this.altura > 2.5) {
          this.mensajes.push({ texto: 'Por favor, ingresa una altura válida (1.0 - 2.5 m).', tipo: 'bot' });
          return;
        }
        let imc = this.calcularIMC(this.peso, this.altura);
        let consejo = this.obtenerConsejo(imc);
        this.mensajes.push({ texto: `Tu IMC es: ${imc.toFixed(2)}`, tipo: 'bot' }); 
        this.mensajes.push({ texto: consejo, tipo: 'bot' });
        this.mensajes.push({ texto: '¡Gracias por usar Flowchat!', tipo: 'bot' });
        this.estado = 0;
        break;
    }
    this.mensajeUsuario = '';
  }

  calcularIMC(peso: number, altura: number): number {
    return peso / (altura * altura);
  }

  obtenerConsejo(imc: number): string {
    if (imc < 18.5) {
      return 'Tienes bajo peso. Te recomiendo una dieta rica en proteínas y carbohidratos saludables.';
    } else if (imc >= 18.5 && imc < 24.9) {
      return 'Tienes un peso normal. Mantén una dieta equilibrada con frutas, verduras y proteínas.';
    } else if (imc >= 25 && imc < 29.9) {
      return 'Tienes sobrepeso. Es recomendable una dieta baja en calorías y mayor actividad física.';
    } else {
      return 'Tienes obesidad. Consulta a un nutricionista para una dieta personalizada.';
    }
  }

}
