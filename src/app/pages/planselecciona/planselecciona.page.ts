import {Component, Input, OnInit} from '@angular/core';
import {Plato, PlatosPlanSemanal} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {ModalController} from "@ionic/angular";
import {TupperPlanPage} from "../tupper-plan/tupper-plan.page";

@Component({
  selector: 'app-planselecciona',
  templateUrl: './planselecciona.page.html',
  styleUrls: ['./planselecciona.page.scss'],
})
export class PlanseleccionaPage implements OnInit {

  @Input() indice;
  @Input() plato;
  platos:Plato[];
  platoSeleccionado:Plato = null;
  lineaPlan:PlatosPlanSemanal = {
    id:0,
    platoid:null,
    tupperid:null,
    posicion:null,
    semanalid:null
  };
  constructor(private servicio:DataService, private modal:ModalController, private modal2:ModalController) { }

  ngOnInit() {
    if (this.plato != null)
      this.platoSeleccionado = this.plato;
    this.cargaPlatos();
  }

  cargaPlatos( event? ){
    this.servicio.getAllPlatos().subscribe(
        (res: Plato[]) => {
          this.platos = res;
        },error => { if (event != null) event.target.complete()},() => {
          if (event != null){event.target.complete();}
        }
    )
  }
  doRefresh(event){
    this.cargaPlatos(event);
  }
  anyadePlato(){
   // todo tambien se puede hacer asi -->  this.modal.dismiss(this.platoSeleccionado);
    this.lineaPlan.posicion = this.indice;
    this.lineaPlan.platoid = this.platoSeleccionado.id;
    this.modal.dismiss({'linea':this.lineaPlan,'plato':this.platoSeleccionado,'alimentos':null});
  }
  Cancelar(){
    this.modal.dismiss();
  }
  async abreTupperPage(){
    const modal = await this.modal2.create({
      id: 'tupper',
      componentProps:
          {
            indice:this.indice
          }
      ,
      component: TupperPlanPage,
    });

    await modal.present();
    const {data} = await modal.onWillDismiss();
    if (data != null){
      this.modal.dismiss(data);
    }
  }

}
