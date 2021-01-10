import {Component, NgZone, OnInit} from '@angular/core';
import {Usuarios} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController, ModalController, ToastController} from "@ionic/angular";
import {AppGlobals} from "../../services/variablesGlobales";
import {HTTP} from "@ionic-native/http/ngx";
import {DietaPersonalAlimentosPage} from "../dieta-personal-alimentos/dieta-personal-alimentos.page";
import {PoliticaPrivacidadPage} from "../politica-privacidad/politica-privacidad.page";

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.page.html',
  styleUrls: ['./registrer.page.scss'],
})
export class RegistrerPage implements OnInit {

  user:Usuarios = {
    id :0,
    nombre :'',
    apellidos:'',
    telefono:'',
    correo:'',
    contrasenya:'',
    creado_en: new Date().toLocaleDateString()
  };
  privacidadok:boolean = false;
  tratamientosDatos:boolean = false;
  captchaok:boolean = false;
  contrasenya2:string='';
  constructor(private servicio:DataService, private router: Router,private zone:NgZone,private alertController:AlertController,private toastController : ToastController,
              private globales:AppGlobals,private cordova:HTTP, private modal:ModalController) { }

  ngOnInit() {
  }


  async toastContrasenyaMal() {
    const toast = await this.toastController.create({
      message: '<strong>Las contraseñas no coinciden</strong>',
      duration: 4000,
      position:"top",
      color:"danger"
    });
    toast.present();
  }
  async alertaInfoContrasenya() {
    this.globales.presentAlertError('Contraseñas', 'Las contraseñas deben tener al menos 8 caracteres,' +
        ' entre los cuales algún número, mayúsculas y minúsculas')
  }
  async correoRepetido() {
    const alert = await this.alertController.create({
      header: 'Correo',
      message: 'Has utilizado un correo ya registrado',
      buttons: ['OK'],
      animated:true,
      backdropDismiss:true,
      translucent:true
    });

    await alert.present();
  }
  async openPrivacidad(){
    const modal = await this.modal.create({
      component: PoliticaPrivacidadPage,
    });

    await modal.present();
  }


  registrarse(form?: NgForm){
    delete this.user.id;
    if (this.contrasenya2 == this.user.contrasenya) {
    this.servicio.compruebaCorreo(this.user.correo).subscribe(
        res =>{
          this.correoRepetido();
          form.form.get('email').reset();
        }, error => {
            this.user.creado_en = new Date().toLocaleDateString().split('/').reverse().join('/').replace('/','-').replace('/','-');
            let numeros =  this.user.creado_en.split('-');
            numeros.forEach(num => {
              if (num.length === 1 )
                num = '0'+num;
            });
            this.user.creado_en = numeros.join('-');
            this.servicio.creaUsuario(this.user).subscribe(
                res => {
                  this.globales.presentAlertError('Registrado!','Enhorabuena, ya formas parte del equipo! Pronto recibirás un correo de confirmación.')
                  this.mandaEmail(this.user.correo,this.user.nombre);
                  form.resetForm();
                  this.router.navigate(['/login']);
                }, error => console.log(error)
            )
        }
    )
    }else{
      this.toastContrasenyaMal();
      form.form.get('contraseña').reset();
      form.form.get('contraseña2').reset();
    }

  }
  captchaResuelto(){
    this.zone.run(() => {
      this.captchaok = true;
    });
  }

  mandaEmail(para:string, nombre:string) {

    let _auth = btoa('api:'+this.globales.mailgunApiKey);
    let headers = {
      'Authorization': 'Basic ' + _auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    let variables = {nombre: nombre};

    let body = {
      from: 'FF Company <theffcompany2@gmail.com>',
      to: para,
      subject: 'Registro FF Company',
      template : 'registro',
      "h:X-Mailgun-Variables": JSON.stringify(variables)
    };

    let url = 'https://api.mailgun.net/v3/' + this.globales.mailgunUrl+ '/messages';
    return this.cordova.post(url, body, headers).then(data => {
    }).catch(error => {
      this.globales.presentAlertError('Error','Ha habido algun problema enviando el correo. Prueba de nuevo en unos insantes');
    });
  }

}
