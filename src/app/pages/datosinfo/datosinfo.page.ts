import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AppGlobals} from "../../services/variablesGlobales";
import {Usuarios} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {error} from "util";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-datosinfo',
  templateUrl: './datosinfo.page.html',
  styleUrls: ['./datosinfo.page.scss'],
})
export class DatosinfoPage implements OnInit {

  @Input() nombre;
  @Input() apellidos;
  @Input() mail;
  @Input() telefono;

  user:Usuarios = {
    id:0,
    nombre:'',
    apellidos:'',
    telefono:'',
    correo:'',
    contrasenya:'',
    creado_en: ''
  };

  constructor(private modal:ModalController, private globales:AppGlobals, private servicio: DataService) { }

  ngOnInit() {
    this.servicio.getUsuario(this.globales.user.id).subscribe(
        res =>{
          this.user = res;
        }
    )
  }
  guardar() {
    if (this.user.nombre != '' && this.user.apellidos != '' && this.user.correo != '' && this.user.telefono != '') {
      this.user.creado_en = new Date(this.user.creado_en).toLocaleDateString().split('/').reverse().join('/').replace('/','-').replace('/','-');
      this.servicio.modificaUsusario(this.user.id, this.user).subscribe(
          res => {
            this.modal.dismiss();
          }, error1 => {
            console.log(error1)
          }
      )
    }else{
      console.log('error');
    }
  }

  cancelado(){
    this.modal.dismiss();
  }

}
