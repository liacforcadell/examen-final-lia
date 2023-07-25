import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Asegurado } from 'src/app/models/asegurado.model';
import { CuotasPendientes } from 'src/app/models/cuotas-pendientes.model';
import { ResponseHTTP } from 'src/app/models/response.model';
import { BuscadorAppService } from 'src/app/services/buscador-app.service';

@Component({
  selector: 'app-buscador-app',
  templateUrl: './buscador-app.component.html',
  styleUrls: ['./buscador-app.component.css'],
})
export class BuscadorAppComponent {
  // URLImagen: string = 'http://www.hostcatedral.com/api/publicacion/';
  nroDocumento: string = '';
  nombre: string = '';
  planAsegurado: string = '';
  listaCuotasPendientes: CuotasPendientes[] = [];
  asegurado: Asegurado = new Asegurado();

  constructor(
    private buscadorService: BuscadorAppService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
  }

  buscar() {
    this.buscadorService.getAsegurado(this.nroDocumento).subscribe({
      next: (response: ResponseHTTP<Asegurado>) => {
        this.asegurado = response.data[0] || [];
        this.cargarCuotasPendientes(this.asegurado);
      },
      error: (error) => {
        this.presentToast(error.error.message);
        console.error(error);
      },
    });
  }

  cargarCuotasPendientes({asegurado_id}: Asegurado) {
    this.buscadorService.getCuotasPendientes(asegurado_id).subscribe({
      next: (response: ResponseHTTP<CuotasPendientes>) => {
        this.listaCuotasPendientes = response.data || [];
      },
      error: (error: any) => {
        this.presentToast(error.error.message);
        console.error(error);
      },
    });
  }

  confirmarPago() {
    const [primeraCuota] = this.listaCuotasPendientes;

    const pago = {
      contrato_id: primeraCuota?.contrato_cuota_id,
      nro_cuota: primeraCuota?.nro_cuota,
      monto_cuota: primeraCuota?.monto_cuota,
    };

    this.buscadorService.pagarCuota(primeraCuota).subscribe({
      next: (response: any) => {
        this.presentToast(response.message, 'success');
      },
      error: (error: any) => {
        this.presentToast(error.error.message);
        console.error(error);
      },
    });
  }

  async presentToast(message: string = 'Ocurrió un error inesperado', type: string = 'danger') {
    const toast = await this.toastController.create({
      message: message.toUpperCase(),
      duration: 3000,
      color: type,
      position: 'bottom',
    });

    await toast.present();
  }
}
