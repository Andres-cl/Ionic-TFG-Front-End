import { Component, OnInit } from '@angular/core';
import {Usuarios} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {InicioPage} from "../inicio/inicio.page";
import {AppGlobals} from "../../services/variablesGlobales";
import {Router} from "@angular/router";
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {DatosinfoPage} from "../datosinfo/datosinfo.page";
import {RecuperaContrasenyaPage} from "../recupera-contrasenya/recupera-contrasenya.page";
import {Storage} from "@ionic/storage";
import {NgForm} from "@angular/forms";
import {CarritoServicioService} from "../../services/carrito-servicio.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:Usuarios = {
    id :0,
    nombre :'',
    apellidos:'',
    telefono:'',
    correo:'',
    contrasenya:'',
    creado_en: ''
  };
  loading:any;
    lineasCarrito : any = Array();
  constructor(private servicio:DataService,private carrito:CarritoServicioService, private globales:AppGlobals,private router:Router,
              private toast: ToastController, private modalctrl: ModalController, private storage:Storage, private loadingController:LoadingController) { }

  ngOnInit() {
  }
    async presentLoading(){
        this.loading = await this.loadingController.create({
            duration:20000,
            message:'Espere...'
        });
        await this.loading.present();
        this.loading.onDidDismiss().then(() => {

        })
    }

  async login(form?:NgForm){
      await this.presentLoading();
    this.servicio.compruebaUsuario(this.user.correo,this.user.contrasenya).subscribe(
        res =>{
          this.user = res;
          this.globales.logeado = true;
          this.globales.user = this.user;
          this.storage.set('usuario',this.user);
          this.storage.set('logueado',true);
            this.loading.dismiss();
            //todo estas son las lineas nuevas hasta lo siguiente comentado
            this.servicio.getLineas(this.user.id).subscribe(
                (res:any[]) =>{
                    if (res.length>0){
                        this.carrito.lineasCarrito = res;
                        this.carrito.cargaCantidadProductos();
                    }
                    this.router.navigate(['inicio']);
                    form.resetForm();
                } ,error => {console.log('error ',error)}
            );
        },error =>{
          this.servicio.compruebaCorreo(this.user.correo).subscribe(
              res => {
                  this.toastContrasenyaMal();
                  form.form.get('contraseña').reset();
                  this.loading.dismiss();
              },error1 => {
                  this.toastCorreoMal();
                  form.form.get('contraseña').reset();
                  form.form.get('email').reset();
                  this.loading.dismiss();
              }
          )
        }
    );
  }
    async modalRecupera() {
      //todo revisar funcion entera
        const modal = await this.modalctrl.create({
            component: RecuperaContrasenyaPage,
            componentProps: {
                nombre: this.user.nombre,
                apellidos: this.user.apellidos,
                telefono: this.user.telefono,
                correo: this.user.correo
            }
        });

        await modal.present();

        modal.onDidDismiss().then(
            () => this.servicio.getUsuario(this.globales.user.id).subscribe(
                res => {
                    this.user = res;
                }, error => {
                    console.log(error);
                }
            )
        );
    }

    async toastCorreoMal() {
        const toast = await this.toast.create({
            message: '<strong>No existe cuenta con dicho email</strong>',
            duration: 4000,
            position:"bottom",
            color:"danger"
        });
        toast.present();
    }
    async toastContrasenyaMal() {
        const toast = await this.toast.create({
            message: '<strong>Contraseña erronea</strong>',
            duration: 4000,
            position:"bottom",
            color:"danger"
        });
        toast.present();
    }
}
