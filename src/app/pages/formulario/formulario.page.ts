import { Component, OnInit } from '@angular/core';
import {Mensaje} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {NgForm} from "@angular/forms";
import {AlertController, ToastController} from "@ionic/angular";
import {AppGlobals} from "../../services/variablesGlobales";
import {Router} from "@angular/router";
import {HTTP} from "@ionic-native/http/ngx";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  mensaje:Mensaje = {
    id:0,
    contenido:'',
    usuarioid:0,
    correo:'',
    telefono:'',
    nombre:''
  };
  constructor(private servicio:DataService ,private toast:ToastController, private globales:AppGlobals,
              private router:Router, private cordova:HTTP, private alertController:AlertController) { }

  ngOnInit() {
  }
  postMensaje(form?:NgForm){
    if (this.globales.logeado){
      if (this.mensaje.contenido != '' && this.mensaje.correo !='' && this.mensaje.telefono != '' && this.mensaje.nombre != ''){
        this.mensaje.usuarioid=this.globales.user.id;
        this.mandaEmail().then(data => {
          this.servicio.creaMensaje(this.mensaje).subscribe(
              res =>{
                this.presentAlertSuccess('Hemos guardado tu consulta y enviado una copia al correo de FF, te responderemos con la máxima brevedad posible');
                form.resetForm();
              }
          )
        }).catch(error => {
          this.globales.presentAlertError('Error','Ha habido algun problema enviando el correo. Prueba de nuevo en unos insantes');
        });
      }
    }else{
      form.resetForm();
      this.router.navigate(['login']);
      this.usuarioNoRegistrado();

    }
  }

  mandaEmail() {
    let _auth = btoa('api:'+this.globales.mailgunApiKey);
    let headers = {
      'Authorization': 'Basic ' + _auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    let body = {
      from: this.mensaje.correo,
      to: 'theffcompany2@gmail.com',
      subject: 'Mensaje del usuario: '+ this.mensaje.nombre+ ' de ffcompany',
      html: "<html><body>Hola admin, aqui te dejamos una nueva consulta: <br><b>CONSULTA:</b><br>"+this.mensaje.contenido+"<br>" +
          " <b>DATOS DEL USUARIO:</b><br>Correo: " +this.mensaje.correo+ " Telefono: " +this.mensaje.telefono+ " " +
          " Nombre y Apellidos: "+this.mensaje.nombre+ " "+this.globales.user.apellidos+".</body></html>"
    };
    let url = 'https://api.mailgun.net/v3/' + this.globales.mailgunUrl+ '/messages';
    return this.cordova.post(url, body, headers);
  }
  async usuarioNoRegistrado() {
    const toast = await this.toast.create({
      message: 'Debes estar registrado para realizar una pregunta',
      duration: 3000,
      position:"bottom",
      color:"danger"
    });
    toast.present();
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
