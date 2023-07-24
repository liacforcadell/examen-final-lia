import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota.model';
import { Vacuna } from '../models/vacuna.model';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})

export class BuscadorAppService {
  urlBase = `https://www.hostcatedral.com/api/appCatalogoLibro/public/`;

  constructor(private http: HttpClient) {}

  getListaClientes(): Observable<Cliente[]> {
    const nombreController = 'getClientes';
    return this.http.get<Cliente[]>(`${this.urlBase}${nombreController}`, {
      headers,
    });
  }

  getMascotasPorCliente(idCliente: number): Observable<Mascota[]> {
    const nombreController = 'getMascotasPorCliente/';
    return this.http.get<Mascota[]>(`${this.urlBase}${nombreController}${idCliente}`, {
      headers,
    });
  }

  getVacunasPorMascota(idMascota: number): Observable<Vacuna[]> {
    const nombreController = 'getVacunasPorMascota/';
    return this.http.get<Vacuna[]>(`${this.urlBase}${nombreController}${idMascota}`, {
      headers,
    });
  }
}

export const headers = { 'Content-Type': 'application/json;charset=utf-8' };
