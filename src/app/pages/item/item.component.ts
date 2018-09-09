import { ProductoDescripcion } from './../../interfaces/producto-descripion.interface';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor(private route: ActivatedRoute,
              private productoService: ProductosService) { }

  ngOnInit() {

    this.route.params.subscribe(parametros => {
      this.productoService.getProducto(parametros['id'])
        .subscribe((resp: ProductoDescripcion) => {
          this.producto = resp;
          this.id = parametros['id'];
        });
    });
  }

}
