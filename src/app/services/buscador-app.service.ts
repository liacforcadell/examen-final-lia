import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asegurado } from '../models/asegurado.model';
import { CuotasPendientes } from '../models/cuotas-pendientes.model';
import { ResponseHTTP } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})

export class BuscadorAppService {
  urlBase = `https://www.hostcatedral.com/api/appAranceles/public/`;
  headers = new HttpHeaders();
  constructor(private http: HttpClient) {}

  getAsegurado(nroDocumento: string): Observable<ResponseHTTP<Asegurado>> {
    const nombreController = 'getAsegurado/';
    return this.http.get<ResponseHTTP<Asegurado>>(`${this.urlBase}${nombreController}${nroDocumento}`, {
      headers,
    });
  }
  getCuotasPendientes(idAsegurado: string): Observable<ResponseHTTP<CuotasPendientes>> {
    const nombreController = 'getCuotasPendientes/';
    return this.http.get<ResponseHTTP<CuotasPendientes>>(`${this.urlBase}${nombreController}${idAsegurado}`, {
      headers,
    });
  }

  pagarCuota(data: any): Observable<any> {
    const nombreController = 'pagarCuota';
    const formData = new FormData();
    formData.append('contrato_id', data.contrato_id);
    formData.append('nro_cuota', data.nro_cuota);
    formData.append('monto_cuota', data.monto_cuota);

    return this.http.post(`${this.urlBase}${nombreController}`, formData);
  }

}

export const headers = { 'Content-Type': 'application/json;charset=utf-8' };
