import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MenuController, ModalController, ToastController} from "@ionic/angular";
import {AppGlobals} from "../../services/variablesGlobales";
import {Storage} from "@ionic/storage";
import {CarritoServicioService} from "../../services/carrito-servicio.service";
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private controlador: MenuController, private globales: AppGlobals,
  private toast:ToastController,private storage:Storage,private carrito:CarritoServicioService,
              private appLauncher:AppLauncher,private platform:Platform, private iab:InAppBrowser) {}

  login: string;
  nombre: string = this.globales.user.nombre;

  ngOnInit() {
    this.login = 'Login';
  }

  ionWillOpen() {
    this.nombre = this.globales.user.nombre;
    if (this.globales.logeado) {
      this.login = 'Logout'
    }else{
      this.login = 'Login'
    }
  }


  pushLogin() {
    if (this.login == 'Login') {
      this.router.navigate(['login']);
      this.controlador.toggle();
    } else {
      this.globales.logeado = false;
      this.globales.user = {
        id :0,
        nombre :'',
        apellidos:'',
        telefono:'',
        correo:'',
        contrasenya:'',
        creado_en: ''
      };
      this.globales.productosCarrito = 0;
      this.carrito.lineasCarrito = [];
      this.storage.set('usuario',this.globales.user);
      this.storage.set('logueado',this.globales.logeado);
      this.storage.set('carrito', 0);
      this.router.navigate(['inicio']);
      this.controlador.toggle();
    }
  }
  pushDatos(){
    if (this.nombre != ''){
      this.router.navigate(['cuenta']);
      this.controlador.toggle();
    }else{
      this.router.navigate(['login']);
      this.controlador.toggle();
    }
  }
  pushPlatos(){
    this.router.navigate(['platos']);
    this.controlador.toggle();
  }
  pushInicio(){
    this.router.navigate(['inicio']);
    this.controlador.toggle();
  }
  pushTupper(){
    this.router.navigate(['tuppers']);
    this.controlador.toggle();
  }
  pushDieta(){
    this.router.navigate(['dieta-personal']);
    this.controlador.toggle();
  }
  pushCuenta(){
    if (this.globales.logeado) {
      this.router.navigate(['cuenta']);
      this.controlador.toggle();
    }else{
      this.router.navigate(['login']);
      this.controlador.toggle();
      this.toastRegistroNecesario();
    }
  }
  pushContacto(){
    this.router.navigate(['contacto']);
    this.controlador.toggle();
  }
  pushPlanSemnal(){
    this.router.navigate(['plansemanal']);
    this.controlador.toggle();
  }

  async toastRegistroNecesario() {
    const toast = await this.toast.create({
      message: '<strong>Debes iniciar sesion primero</strong>',
      duration: 2000,
      position:"bottom",
      color:"danger"
    });
    toast.present();
  }
  openSocial(social:string){
    let uri:string;
    let pack:string;
    let url:string
    const options: AppLauncherOptions = {};
    switch (social) {
      case 'insta':
        uri = 'instagram://user?username=the_ff_companyy';
        pack = 'com.instagram.android';
        url = 'https://www.instagram.com/the_ff_companyy/?hl=es';
        break;
      case 'face':
        uri ='fb://profile/102526661293958';
        pack =  'com.facebook.katana';
        url = 'https://www.facebook.com/The_Company-102526661293958';
        break;
      case 'twitter':
        uri = 'twitter://user?screen_name=TheFFCompany2';
        pack = 'com.twitter.android';
        url = 'https://twitter.com/TheFFCompany2';
        break;
    }
    if(this.platform.is('ios')) {
      options.uri = uri;
    } else {
      options.uri = uri;
      options.packageName = pack
    }

    this.appLauncher.canLaunch(options)
        .then((canLaunch: boolean) => this.appLauncher.launch(options))
        .catch((error: any) =>{
          this.iab.create(url, '_system');
        });
  }
}
