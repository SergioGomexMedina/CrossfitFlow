import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  planes: ('Anual' | 'Mensual' | 'Mensual Premium' | 'Semanal')[] = ['Anual', 'Mensual', 'Mensual Premium', 'Semanal'];

  disponibilidad: Record<'Anual' | 'Mensual' | 'Mensual Premium' | 'Semanal', { dia: string; horario: string }[]> = {
    'Anual': [
      { dia: 'Lunes', horario: '06:00 AM - 10:00 PM' },
      { dia: 'Martes', horario: '06:00 AM - 10:00 PM' },
      { dia: 'Miércoles', horario: '06:00 AM - 10:00 PM' },
      { dia: 'Jueves', horario: '06:00 AM - 10:00 PM' },
      { dia: 'Viernes', horario: '06:00 AM - 10:00 PM' },
      { dia: 'Sábado', horario: '08:00 AM - 06:00 PM' },
      { dia: 'Domingo', horario: 'Cerrado' }
    ],
    'Mensual': [
      { dia: 'Lunes', horario: '08:00 AM - 08:00 PM' },
      { dia: 'Martes', horario: '08:00 AM - 08:00 PM' },
      { dia: 'Miércoles', horario: '08:00 AM - 08:00 PM' },
      { dia: 'Jueves', horario: '08:00 AM - 08:00 PM' },
      { dia: 'Viernes', horario: '08:00 AM - 08:00 PM' },
      { dia: 'Sábado', horario: '10:00 AM - 04:00 PM' },
      { dia: 'Domingo', horario: 'Cerrado' }
    ],
    'Mensual Premium': [
      { dia: 'Lunes', horario: '06:00 AM - 11:00 PM' },
      { dia: 'Martes', horario: '06:00 AM - 11:00 PM' },
      { dia: 'Miércoles', horario: '06:00 AM - 11:00 PM' },
      { dia: 'Jueves', horario: '06:00 AM - 11:00 PM' },
      { dia: 'Viernes', horario: '06:00 AM - 11:00 PM' },
      { dia: 'Sábado', horario: '08:00 AM - 08:00 PM' },
      { dia: 'Domingo', horario: '08:00 AM - 08:00 PM' }
    ],
    'Semanal': [
      { dia: 'Lunes', horario: '09:00 AM - 06:00 PM' },
      { dia: 'Martes', horario: '09:00 AM - 06:00 PM' },
      { dia: 'Miércoles', horario: '09:00 AM - 06:00 PM' },
      { dia: 'Jueves', horario: '09:00 AM - 06:00 PM' },
      { dia: 'Viernes', horario: '09:00 AM - 06:00 PM' },
      { dia: 'Sábado', horario: 'Cerrado' },
      { dia: 'Domingo', horario: 'Cerrado' }
    ]
  };

  planSeleccionado: 'Anual' | 'Mensual' | 'Mensual Premium' | 'Semanal' = this.planes[0];


  cambiarPlan(plan: 'Anual' | 'Mensual' | 'Mensual Premium' | 'Semanal') {
    this.planSeleccionado = plan;
  }
}
