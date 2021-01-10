import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ToastController} from "@ionic/angular";
import {lineasCarrito, Plato} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppGlobals} from "../../services/variablesGlobales";
import {CarritoServicioService} from "../../services/carrito-servicio.service";

@Component({
  selector: 'app-infoplato',
  templateUrl: './infoplato.page.html',
  styleUrls: ['./infoplato.page.scss'],
})
export class InfoplatoPage implements OnInit {
  id:string;
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
    tipoplato:''
  };
  linea:lineasCarrito = {
    id:0,
    tipo_producto:'platos',
    precio:0,
    cantidad:1,
    tupperid:null,
    platoid:0,
    usuarioid:0,
  };
  raciones:number;
  constructor(private servicio:DataService,private router: Router, private ruta:ActivatedRoute,private nav:NavController,
              private toast:ToastController,private globales:AppGlobals,private carritoServicio:CarritoServicioService) { }

  ngOnInit() {
    this.id = this.ruta.snapshot.paramMap.get('plato');

    this.servicio.getPlato(this.id).subscribe(
        res => {
          this.plato = res;
        }, error => {
          console.error(error);
        }
    );

  }

  aceptado(){
  if (this.globales.logeado) {
    if (this.raciones <= 0 || this.raciones > 10 || this.raciones == null) {
      this.globales.presentToast('Nº de tuppers erroneo');
    } else {
      this.anyadePlato(this.plato);
    }
  }else{
    this.globales.presentToast('Debes iniciar sesion antes');
    this.router.navigate(['login']);
  }
  }
  cancelado(){
    this.nav.back();
  }
  anyadePlato(plato:Plato){
    if (this.globales.logeado) {
      var nuevo: boolean = true;

        for (const linea of this.carritoServicio.lineasCarrito) {
          if (linea.platoid === plato.id) {
            nuevo = false;
            if (linea.cantidad + this.raciones > 10) {
              this.carritoServicio.cantidadMaxima();
            } else {
              delete linea.nombrePlato;
              delete linea.foto;
              delete linea.infoTupper;
              linea.cantidad += this.raciones;
              this.servicio.modificaLineaDeCarrito(linea.id, linea).subscribe(
                  res => {
                    this.carritoServicio.cargaCantidadProductos();
                      this.nav.back();
                  }
              );
            }
            break;
          }
    }
      if (nuevo) {
        delete this.linea.id;
        this.linea.platoid = plato.id;
        this.linea.precio = plato.precio;
        this.linea.cantidad = this.raciones;
        this.linea.usuarioid = this.globales.user.id;

        this.carritoServicio.creaLineaCarrito(this.linea);
        this.nav.back();
      }
    }else{
      this.globales.presentToast('Necesario login para continuar');
      this.router.navigate(['login']);
    }

  }
}
