import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: Producto[] = [];

  constructor(private http: HttpClient) {
    console.log('Servicio de infoPagina listo.');

    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer Archivo JSON
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        console.log(resp);
        // console.log(resp['email']);
        this.info = resp;
        this.cargada = true;
      });
  }

  private cargarEquipo() {
    this.http.get('https://html-angular-76e22.firebaseio.com/equipo.json')
      .subscribe((resp: Producto[]) => {
        // console.log(resp);
        this.equipo = resp;
        this.cargada = true;
      });
  }
}
