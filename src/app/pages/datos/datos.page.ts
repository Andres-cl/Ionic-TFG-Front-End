import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Codigo, Usuarios} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {AppGlobals} from "../../services/variablesGlobales";
import {log} from "util";
import {Router} from "@angular/router";
import {ModalController, PopoverController} from "@ionic/angular";
import {DatosinfoPage} from "../datosinfo/datosinfo.page";
import {PopinfoComponent} from "../../components/popinfo/popinfo.component";
import {InfoNutricionalComponent} from "../../components/info-codigo/info-nutricional.component";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {

  user:Usuarios = {
    id :0,
    nombre :'',
    apellidos:'',
    telefono:'',
    correo:'',
    contrasenya:'',
    creado_en: ''
  };
  codigo:string;
  constructor(private servicio:DataService,private globales:AppGlobals,private router:Router, private modalctrl: ModalController,private popover:PopoverController, private storage:Storage) { }

  ngOnInit() {

  }
  cargaDatosUser( event? ){
      this.servicio.getUsuario(this.globales.user.id).subscribe(
          res => {
              this.user = res;
              this.globales.user = this.user;
              this.storage.set('usuario',this.user);
              this.getCodigoPromocional(this.user.promocionalid);
          }, error => {
              console.log(error, 'error');
              if (event != null) event.target.complete();
          },() => {if (event != null) event.target.complete();}
      );
  }
  ionViewWillEnter(){
      this.cargaDatosUser();
  }
    dorefresh( event ){
        this.cargaDatosUser(event);
    }
  async abrirModal() {
      const modal = await this.modalctrl.create({
          component: DatosinfoPage,
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

  getCodigoPromocional(id:number){
          this.servicio.getCodigoPromocionalPorId(id).subscribe(
              (res:Codigo) =>{
                  this.codigo = res.codigo;
              }
          )
  }
    async popInfoCodigo( evento ){
        const popover = await this.popover.create({
            component:InfoNutricionalComponent,
            componentProps:{'id':this.globales.user.promocionalid},
            event: evento,
            mode:'md',
            cssClass: 'pop-over-styletwo',
        });
        await popover.present();
    }


}




