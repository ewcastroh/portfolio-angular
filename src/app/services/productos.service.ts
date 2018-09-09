import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://html-angular-76e22.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    } );

  }

  getProducto(id: string) {
    return this.http.get(`https://html-angular-76e22.firebaseio.com/productos/${id}.json`);
  }

  bucarProducto(termino: string) {

    if (this.productos.length > 0) {
      // Cargar productos
      this.cargarProductos().then(() => {
        // Ejecutar des pués de tener los productos
        // Aplicar el filtro
        this.filtrarProductos(termino);
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos(termino);
    }

    this.productosFiltrados = this.productos.filter(productos => {
      return true;
    });

    console.log(this.productosFiltrados);
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrados = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push(prod);
      }
    });
  }
}
