import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {HTTP } from "@ionic-native/http/ngx";
import {AppGlobals} from "../../services/variablesGlobales";
import {Usuarios} from "../../interfaces/modelos";

@Component({
  selector: 'app-recupera-contrasenya',
  templateUrl: './recupera-contrasenya.page.html',
  styleUrls: ['./recupera-contrasenya.page.scss'],
})
export class RecuperaContrasenyaPage implements OnInit {

  correo:string='';
  nombre:string;
  contrasenya:string;
  constructor(private modal:ModalController, private servicio:DataService, private alertController:AlertController, private cordova:HTTP, private usuario: AppGlobals) {
  }

  ngOnInit() {
  }

  enviar(form?:NgForm) {
    this.servicio.compruebaCorreo(this.correo).subscribe(
        (res:Usuarios) => {
          this.nombre = res.nombre;
          this.contrasenya = res.contrasenya;
          this.mandaEmail(this.correo,this.nombre, this.contrasenya);
        },error => {
          this.presentAlertError('El Correo introducido no se corresponde con ningun usuario registrado');
        }, () => {form.resetForm();}
    )
  }

  cancelado(){
    this.modal.dismiss();
  }

  mandaEmail(para:string, nombre:string, contrasenya:string) {
    let _auth = btoa('api:'+this.usuario.mailgunApiKey);
    let headers = {
      'Authorization': 'Basic ' + _auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    let body = {
      from: 'FF Company <theffcompany2@gmail.com>',
      to: para,
      subject: 'Recuperación de contraseña FF',
      html: "<html><body>Hola "+nombre+ ", aqui te dejamos la informacion de inicio de sesion de tu cuenta: <br>Correo: <b>"+ para+ "</b> <br> Contraseña: <b>"+ contrasenya+"</b> </body></html>"
    };

    let url = 'https://api.mailgun.net/v3/' + this.usuario.mailgunUrl+ '/messages';
    return this.cordova.post(url, body, headers).then(data => {
      this.modal.dismiss();
      this.presentAlertSuccess('Revisa tu correo, te hemos mandado un mail con tu informacion de inicio de sesión.')

    }).catch(error => {
      this.usuario.presentAlertError('Error','Ha habido algun problema enviando el correo. Prueba de nuevo en unos insantes');
    });
  }


  async presentAlertError(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
  async presentAlertSuccess(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Listo!',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
