import {Component, ContentChild, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AppGlobals} from "../../services/variablesGlobales";
import {DataService} from "../../services/data.service";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";

import {CarritoServicioService} from "../../services/carrito-servicio.service";
import {IonIcon} from "@ionic/angular";


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})



export class InicioPage implements OnInit {



  @Input() logeado: boolean = false;
  lineasCarrito: any = Array();



  constructor(private usuario: AppGlobals, private servicio: DataService, private router: Router, private carrito:CarritoServicioService, private storage:Storage) {

  }

  async ngOnInit() {
    await this.cargaUsuario();
  }
  async cargaUsuario(){
    this.usuario.user = await this.storage.get('usuario');
    this.usuario.logeado = await this.storage.get('logueado');
    this.carrito.cargaCarrito();
  }
  async doRefresh( event ){
   this.carrito.cargaCarrito(event);
  }

  pushTuppers(){
    this.router.navigate(['tuppers']);
  }
  pushPlatos(){
    this.router.navigate(['platos']);
  }
  pushDieta(){
    this.router.navigate(['dieta-personal']);
  }
  pushSemanal(){
    this.router.navigate(['plansemanal']);
  }

}
