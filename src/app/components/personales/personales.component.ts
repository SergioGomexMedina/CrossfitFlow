import { AfterViewInit, Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-personales',
  standalone: false,
  templateUrl: './personales.component.html',
  styleUrls: ['./personales.component.css'],
})
export class PersonalesComponent implements AfterViewInit {
  progresoForm: FormGroup;
  progresoData: any[] = [];
  editIndex: number | null = null;
  editId: string | null = null;

  // NUEVO: Avatares
  avatares = [
    'assets/avatar/negroavatar.png',
    'assets/avatar/image (3).jpg',
    'assets/avatar/image (2).jpg',
    'assets/perfil.webp',
  ];

  constructor(
    private db: Firestore,
    private fb: FormBuilder,
    private router: Router,
    private users: UserService
  ) {
    this.progresoForm = this.fb.group({
      peso: [''],
      altura: [''],
      cintura: [''],
      pecho: [''],
      cadera: [''],
      semana: [''],
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

  seleccionarAvatar(ruta: string) {
    this.users.setAvatar(ruta);
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
      if (this.editIndex === null) {
        const progresoCollection = collection(this.db, 'progresos');
        await addDoc(progresoCollection, progreso);
        alert('Datos guardados con éxito');
      } else {
        const progresoDocRef = doc(this.db, 'progresos', this.editId!);
        await updateDoc(progresoDocRef, progreso);
        alert('Datos actualizados con éxito');
      }
      this.progresoForm.reset();
      this.loadProgresoData();
      this.editIndex = null;
      this.editId = null;
    } catch (error) {
      alert('Hubo un error al guardar los datos: ' + error);
    }
  }

  async loadProgresoData() {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'progresos'));
      this.progresoData = [];
      querySnapshot.forEach((doc) => {
        this.progresoData.push({ ...doc.data(), id: doc.id });
      });
      this.calculateProgresoPeso();
    } catch (error) {
      console.log('Error al cargar los datos: ', error);
    }
  }

  calculateProgresoPeso() {
    if (this.progresoData.length > 1) {
      this.progresoData.sort((a, b) => a.semana - b.semana);
      for (let i = 1; i < this.progresoData.length; i++) {
        const currentPeso = parseFloat(this.progresoData[i].peso);
        const previousPeso = parseFloat(this.progresoData[i - 1].peso);
        const progresoPeso = currentPeso - previousPeso;
        this.progresoData[i].progresoPeso = progresoPeso.toFixed(2);
      }
    }
  }

  editProgreso(index: number) {
    const progreso = this.progresoData[index];
    this.progresoForm.setValue({
      peso: progreso.peso,
      altura: progreso.altura,
      cintura: progreso.cintura,
      pecho: progreso.pecho,
      cadera: progreso.cadera,
      semana: progreso.semana,
    });
    this.editIndex = index;
    this.editId = progreso.id;
  }

  async deleteProgreso(index: number) {
    const progreso = this.progresoData[index];
    try {
      const progresoDocRef = doc(this.db, 'progresos', progreso.id);
      await deleteDoc(progresoDocRef);
      alert('Registro eliminado con éxito');
      this.loadProgresoData();
    } catch (error) {
      alert('Hubo un error al eliminar los datos: ' + error);
    }
  }
}
