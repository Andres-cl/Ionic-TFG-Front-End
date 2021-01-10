import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AppGlobals} from "../../services/variablesGlobales";
import {Direccion} from "../../interfaces/modelos";
import {IonButton, IonContent, ModalController, ToastController} from "@ionic/angular";
import {formatNumber} from "@angular/common";
import {DatosinfoPage} from "../datosinfo/datosinfo.page";
import {DireccioninfoPage} from "../direccioninfo/direccioninfo.page";

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  @ViewChild('button', {static: false}) button;
  @ViewChild(IonContent, {static: false}) private content:IonContent;
  direccion:Direccion = {
    id : 0,
    nombre_via: '',
    ciudad : '',
    pais : '',
    cod_postal: 0,
    usuarioid : 0,
    numero : ''
  };
  codpostal:string;
  direcciones: any = Array();
  anyadir : boolean = false;
  constructor(private servicio:DataService, private globales:AppGlobals, private toastController:ToastController, private modalctrl: ModalController) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
      this.cargaDirecciones();
  }

   cargaDirecciones( event? ){
      this.servicio.getDirecciones(this.globales.user.id).subscribe(
          res => {
              this.direcciones = res;
          },error => {
              console.log('error en direcciones');
              if (event != null) event.target.complete();
          },() => {
              if (event != null) event.target.complete();
          }
      )
  }

  muestraanyadeDireccion(){
    this.anyadir = true;
    this.button.disabled = true;
  }
    cancelado(){
    this.anyadir = false;
    this.button.disabled = false;
    }
  anyadeDireccion(){
    this.direccion.cod_postal = Number.parseInt(this.codpostal);
    if (this.direccion.cod_postal.toString().length<=5){
      this.direccion.usuarioid = this.globales.user.id;
    this.servicio.creaDireccion(this.direccion).subscribe(
        res => {
          this.anyadir = false;
          this.button.disabled = false;
          this.servicio.getDirecciones(this.globales.user.id).subscribe(
              res => {
                this.direcciones = res;
              }
          )
        }
    )
    }else{
      this.toastcodpostalmal();
    }
  }
  borraDireccion(id:number){
    this.servicio.eliminaDireccion(id).subscribe(
        res => {
          this.servicio.getDirecciones(this.globales.user.id).subscribe(
              res => {
                this.direcciones = res;
              }
          )
        }
    )
  }
    async actualizarDireccion(id:number) {
        const modal = await this.modalctrl.create({
            component: DireccioninfoPage,
            componentProps: {
               id: id
            }
        });

        await modal.present();

        modal.onDidDismiss().then(
            () =>  this.servicio.getDirecciones(this.globales.user.id).subscribe(
                res => {
                    this.direcciones = res;
                }
            )
        );
    }
  dorefresh(event){
      this.cargaDirecciones(event);
  }
  async toastcodpostalmal() {
    const toast = await this.toastController.create({
      message: '<strong>Formato de codigo postal erroneo</strong>',
      duration: 4000,
      position:"top",
      color:"danger"
    });
    toast.present();
  }
    scroll(){
        setTimeout(() => {
            this.content.scrollToBottom(1000);
        },500);
    }
}
