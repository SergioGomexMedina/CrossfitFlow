import { Component } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-personales',
  standalone: false,
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.css']
})
export class PersonalesComponent {
  progresoForm: FormGroup;
  progresoData: any[] = [];
  chart: any;
  imagenPerfilUrl: string | null = null; // Nueva propiedad para la imagen

  constructor(private db: Firestore, private fb: FormBuilder, private router: Router) {
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

    this.loadProgresoData();
  }

  goToInicio() {
    this.router.navigate(['/inicio']);
  }
  goToClases() {
    this.router.navigate(['/clases']);
  }
  goToActividades() {
    this.router.navigate(['/actividades']);
  }
  goToEntrenadores() {
    this.router.navigate(['/entrenadores']);
  }
  goToGim() {
    this.router.navigate(['/gim']);
  }
  goToLista() {
    this.router.navigate(['/lista']);
  }

  async onSubmit() {
    const progreso = this.progresoForm.value;

    try {
      const progresoCollection = collection(this.db, 'progresos');
      await addDoc(progresoCollection, progreso);
      alert('Datos guardados con éxito');
      this.progresoForm.reset();
      this.imagenPerfilUrl = null; // Limpiar imagen después de guardar
      this.loadProgresoData();
    } catch (error) {
      alert('Hubo un error al guardar los datos: ' + error);
    }
  }

  async loadProgresoData() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'progresos'));
      this.progresoData = [];
      querySnapshot.forEach((doc) => {
        this.progresoData.push(doc.data());
      });

      console.log('Datos cargados:', this.progresoData);
      this.generateChart();
    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  }

  generateChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.progresoData.map((_, i) => `Semana ${i + 1}`);
    const pesos = this.progresoData.map(data => data.peso);
    const imcValues = this.progresoData.map(data => this.calcularIMC(data.peso, data.altura));

    this.chart = new Chart('chartCanvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Peso (kg)',
            data: pesos,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
          {
            label: 'IMC',
            data: imcValues,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  calcularIMC(peso: number, altura: number) {
    return (peso / (altura * altura)).toFixed(2);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenPerfilUrl = URL.createObjectURL(file);

      // Cambiar imagen en el navbar con alt="perfil"
      const navbarImg = document.querySelector('img[alt="perfil"]') as HTMLImageElement;
      if (navbarImg) {
        navbarImg.src = this.imagenPerfilUrl;
      }
    }
  }
}
