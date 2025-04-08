import { AfterViewInit, Component } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personales',
  standalone: false,
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.css']
})
export class PersonalesComponent implements AfterViewInit {
  progresoForm: FormGroup;
  progresoData: any[] = [];
  editIndex: number | null = null; // Indice del elemento que se está editando
  editId: string | null = null; // ID del documento que se está editando

  constructor(private db: Firestore, private fb: FormBuilder, private router: Router) {
    this.progresoForm = this.fb.group({
      peso: [''],
      altura: [''],
      cintura: [''],
      pecho: [''],
      cadera: [''],
      semana: ['']
    });

    this.loadProgresoData();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      console.log('Componente cargado en el cliente');
    } else {
      console.log('Estamos en el servidor');
    }
  }

  // Navegación
  goToInicio() { this.router.navigate(['/inicio']); }
  goToClases() { this.router.navigate(['/clases']); }
  goToActividades() { this.router.navigate(['/actividades']); }
  goToEntrenadores() { this.router.navigate(['/entrenadores']); }
  goToGim() { this.router.navigate(['/gim']); }
  goToLista() { this.router.navigate(['/lista']); }

  // Método para guardar o editar un registro
  async onSubmit() {
    const progreso = this.progresoForm.value;
    try {
      if (this.editIndex === null) {
        // Guardar nuevo registro
        const progresoCollection = collection(this.db, 'progresos');
        await addDoc(progresoCollection, progreso);
        alert('Datos guardados con éxito');
      } else {
        // Editar registro existente
        const progresoDocRef = doc(this.db, 'progresos', this.editId!);
        await updateDoc(progresoDocRef, progreso);
        alert('Datos actualizados con éxito');
      }
      this.progresoForm.reset();
      this.loadProgresoData(); // Actualizar la vista después de guardar o editar
      this.editIndex = null;
      this.editId = null;
    } catch (error) {
      alert('Hubo un error al guardar los datos: ' + error);
    }
  }

  // Cargar los datos de Firestore
  async loadProgresoData() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'progresos'));
      this.progresoData = [];
      querySnapshot.forEach((doc) => {
        this.progresoData.push({ ...doc.data(), id: doc.id });
      });

      // Calcular el progreso de peso después de cargar los datos
      this.calculateProgresoPeso();
    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  }

  // Calcular el progreso de peso basado en los registros
  calculateProgresoPeso() {
    if (this.progresoData.length > 1) {
      // Ordenamos por semana de forma ascendente para asegurar que el orden es correcto
      this.progresoData.sort((a, b) => a.semana - b.semana);
      
      // Recorremos los datos para calcular el progreso de peso
      for (let i = 1; i < this.progresoData.length; i++) {
        const currentPeso = parseFloat(this.progresoData[i].peso);
        const previousPeso = parseFloat(this.progresoData[i - 1].peso);
        const progresoPeso = currentPeso - previousPeso;
        this.progresoData[i].progresoPeso = progresoPeso.toFixed(2); // Guardamos el progreso de peso en el registro
      }
    }
  }

  // Editar un registro
  editProgreso(index: number) {
    const progreso = this.progresoData[index];
    this.progresoForm.setValue({
      peso: progreso.peso,
      altura: progreso.altura,
      cintura: progreso.cintura,
      pecho: progreso.pecho,
      cadera: progreso.cadera,
      semana: progreso.semana
    });
    this.editIndex = index;
    this.editId = progreso.id;
  }

  // Eliminar un registro
  async deleteProgreso(index: number) {
    const progreso = this.progresoData[index];
    try {
      const progresoDocRef = doc(this.db, 'progresos', progreso.id);
      await deleteDoc(progresoDocRef);
      alert('Registro eliminado con éxito');
      this.loadProgresoData(); // Actualizar la vista después de eliminar
    } catch (error) {
      alert('Hubo un error al eliminar los datos: ' + error);
    }
  }
}
