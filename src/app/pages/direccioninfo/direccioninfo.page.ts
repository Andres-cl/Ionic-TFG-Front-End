import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalController} from "@ionic/angular";
import {Direccion} from "../../interfaces/modelos";

@Component({
  selector: 'app-direccioninfo',
  templateUrl: './direccioninfo.page.html',
  styleUrls: ['./direccioninfo.page.scss'],
})
export class DireccioninfoPage implements OnInit {

@Input() id:number;

  direccion:Direccion = {
    id : 0,
    nombre_via: 'hola',
    ciudad : '',
    pais : '',
    cod_postal: 0,
    usuarioid : 0,
    numero : ''
  };
  constructor(private servicio: DataService, private modalctrl: ModalController) { }

  ngOnInit() {
    this.servicio.getDireccion(this.id).subscribe(
        res => {
          this.direccion = res;
        },error => console.log(error)
    )
  }
  guardar() {
    if (this.direccion.numero != '' && this.direccion.nombre_via != '' && this.direccion.cod_postal <99999 && this.direccion.pais != '' && this.direccion.ciudad != '') {
      this.servicio.modificaDireccion(this.direccion.id, this.direccion).subscribe(
          res => {
            this.modalctrl.dismiss();
          }, error1 => {
            console.log(error1)
          }
      )
    }else{
      console.log('error');
    }
  }

  cancelado(){
    this.modalctrl.dismiss();
  }

}
