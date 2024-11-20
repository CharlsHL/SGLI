import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  ventasChart: any;
  productosMasVendidos = [
    { nombre: 'Producto A', cantidad: 120 },
    { nombre: 'Producto B', cantidad: 95 },
    { nombre: 'Producto C', cantidad: 78 }
  ];
  estadoServicios = [
    { servicio: 'Reparación de Laptop', estado: 'Finalizado' },
    { servicio: 'Cambio de Pantalla', estado: 'En Proceso' },
    { servicio: 'Mantenimiento General', estado: 'Pendiente' }
  ];

  ngOnInit() {
    this.cargarGraficoVentas();
  }

  cargarGraficoVentas() {
    const ctx = document.getElementById('ventasChart') as HTMLCanvasElement;
    this.ventasChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2024-11-01', '2024-11-02', '2024-11-03', '2024-11-04', '2024-11-05'],
        datasets: [{
          label: 'Ventas',
          data: [150, 200, 180, 220, 300],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true }
        }
      }
    });
  }
}