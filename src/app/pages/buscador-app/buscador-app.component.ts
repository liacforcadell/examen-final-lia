import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { Mascota } from 'src/app/models/mascota.model';
import { Vacuna } from 'src/app/models/vacuna.model';
import { BuscadorAppService } from 'src/app/services/buscador-app.service';

@Component({
  selector: 'app-buscador-app',
  templateUrl: './buscador-app.component.html',
  styleUrls: ['./buscador-app.component.css'],
})
export class BuscadorAppComponent {
  URLImagen: string = 'http://www.hostcatedral.com/api/publicacion/';

  listaClientes: Cliente[] = [];
  listaMascotasCliente: Mascota[] = [];
  listaVacunasMascota: Vacuna[] = [];
  selectedMascota!: Mascota;
  selectedCliente!: Cliente;

  constructor(
    private buscadorService: BuscadorAppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.buscadorService.getListaClientes().subscribe({
      next: (response: Cliente[]) => {
        this.listaClientes = response;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  cargarMascotas(idCliente: number) {
    this.buscadorService.getMascotasPorCliente(idCliente).subscribe({
      next: (response: Mascota[]) => {
        this.listaMascotasCliente = response;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  verHistorial() {
    const idMascostaSeleccionada = +this.selectedMascota.MascotaID;
    this.buscadorService.getVacunasPorMascota(idMascostaSeleccionada).subscribe({
      next: (response: Vacuna[]) => {
        this.listaVacunasMascota = response;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  // Tipo: 1 - cliente o 2 - mascota
  optionSelectedCliente(event: any, propiedadNombre: string, tipo: number) {
    const id = event.detail.value[propiedadNombre];
    this.listaVacunasMascota = [];

    +tipo === 1 ? this.searchMascotas(id) : this.searchVacunas(id);
  }

  searchMascotas(id: number) {
    this.listaMascotasCliente = [];
    this.cargarMascotas(id);
  }

  searchVacunas(id: number) {
    this.cargarMascotas(id);
  }

  irPaginaProducto(producto: Mascota) {
    // this.router.navigate(['producto', producto]);
  }
}
