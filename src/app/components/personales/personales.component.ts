import { Component } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Chart } from 'chart.js';  // Asegúrate de importar Chart.js correctamente
@Component({
  selector: 'app-personales',
  standalone: false,
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.css']
})
export class PersonalesComponent {
  progresoForm: FormGroup;
  progresoData: any[] = [];  // Para almacenar los datos obtenidos de Firestore
  chart: any;  // Para almacenar el gráfico de Chart.js

  constructor(private db: Firestore, private fb: FormBuilder) {
    this.progresoForm = this.fb.group({
      peso: [''],
      altura: [''],
      medidas: this.fb.group({
        cintura: [''],
        pecho: [''],
        cadera: ['']
      }),
      foto: ['']
    });

    this.loadProgresoData(); // Llamamos a la función de carga de datos
  }

  // Guardar los datos en Firestore
  async onSubmit() {
    const progreso = this.progresoForm.value;

    try {
      const progresoCollection = collection(this.db, 'progresos');
      await addDoc(progresoCollection, progreso);
      alert('Datos guardados con éxito');
      this.progresoForm.reset();
      this.loadProgresoData();  // Cargar los datos después de guardar
    } catch (error) {
      alert('Hubo un error al guardar los datos: ' + error);
    }
  }

  // Cargar los datos de progreso desde Firestore
  async loadProgresoData() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'progresos'));
      this.progresoData = [];
      querySnapshot.forEach((doc) => {
        this.progresoData.push(doc.data());
      });

      console.log('Datos cargados:', this.progresoData);
      this.generateChart(); // Después de cargar los datos, generar el gráfico

    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  }

  // Generar gráfico con los datos de progreso
  generateChart() {
    // Si ya existe un gráfico, destrúyelo antes de crear uno nuevo
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.progresoData.map(data => `Semana ${this.progresoData.indexOf(data) + 1}`);
    const pesos = this.progresoData.map(data => data.peso);
    const imcValues = this.progresoData.map(data => this.calcularIMC(data.peso, data.altura));

    // Crear el gráfico
    this.chart = new Chart('chartCanvas', {
      type: 'line',  // Tipo de gráfico
      data: {
        labels: labels,  // Las etiquetas (e.g. "Semana 1", "Semana 2", etc.)
        datasets: [
          {
            label: 'Peso (kg)',  // Etiqueta para la línea del peso
            data: pesos,  // Los datos del peso
            borderColor: 'rgba(75, 192, 192, 1)',  // Color de la línea del peso
            fill: false,  // No rellenar el área debajo de la línea
          },
          {
            label: 'IMC',  // Etiqueta para la línea del IMC
            data: imcValues,  // Los datos del IMC
            borderColor: 'rgba(255, 99, 132, 1)',  // Color de la línea del IMC
            fill: false,  // No rellenar el área debajo de la línea
          }
        ],
      },
      options: {
        responsive: true,  // Hacer que el gráfico sea responsivo
        scales: {
          y: {
            beginAtZero: true  // Empezar el eje Y desde cero
          }
        }
      }
    });
  }

  // Calcular el IMC
  calcularIMC(peso: number, altura: number) {
    return (peso / (altura * altura)).toFixed(2);  // Fórmula del IMC
  }
}
