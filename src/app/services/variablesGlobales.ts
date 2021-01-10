import { Injectable } from '@angular/core';
import {Usuarios} from "../interfaces/modelos";
import {Storage} from "@ionic/storage";
import {DataService} from "./data.service";
import {AlertController, ToastController} from "@ionic/angular";

@Injectable()
export class AppGlobals {

    constructor(private storage:Storage, private toastController: ToastController, private alertController:AlertController){}

     logeado : boolean = false;
     user : Usuarios = {
          id :0,
          nombre :'',
          apellidos:'',
          telefono:'',
          correo:'',
          contrasenya:'',
          creado_en: '',
          promocionalid:null
     };
     productosCarrito : number = 0;
     mailgunApiKey : string = '81530dc8752fa7273e8d777af332bfac-aa4b0867-032e1a2b';
     mailgunUrl: string = 'ffcompany.business';


    async presentToast(mensaje:string) {
        const toast = await this.toastController.create({
            message: mensaje,
            color:"danger",
            duration: 2000
        });
        toast.present();
    }
    async presentAlertError(header:string, mensaje:string) {
        const alert = await this.alertController.create({
            header: header,
            message: mensaje,
            buttons: ['OK']
        });
        await alert.present();
    }



}
