import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {AppGlobals} from "../../services/variablesGlobales";
import {lineasCarrito, Plato} from "../../interfaces/modelos";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {CarritoServicioService} from "../../services/carrito-servicio.service";

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {

lineasCarrito : any = Array();
  plato:Plato = {
    id: 0,
    nombre: '',
    descripcion : '',
    foto: '',
    precio: 0,
    proteinas:0,
    grasas:0,
    hidratos:0,
    calorias:0,
    familiaId:0,
    tipoplato:'',
    valoracion: 0
  };

  constructor(private servicio:DataService,private globales:AppGlobals,private router:Router, private pop:PopoverController,private carrito:CarritoServicioService) { }

  ngOnInit() {
    this.cargaCarrito();
  }

   cargaCarrito(){
     if (this.globales.logeado){
       this.carrito.cargaInfoLineasCarrito();
     }
  }
  tramitarPedido(){
      this.router.navigate(['resumen-carrito']);
      this.pop.dismiss();
  }
  pushIniciarSesion(){
    this.pop.dismiss();
    this.router.navigate(['login']);
  }
}
