import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Alimento, HuecoPlanSemnal, InfoNutricional, Plato} from "../../interfaces/modelos";
import {ModalController, PopoverController} from "@ionic/angular";
import {RevisionPlatoPlanPage} from "../../pages/revision-plato-plan/revision-plato-plan.page";
import {error} from "util";
import {NutricionalesComponent} from "../nutricionales/nutricionales.component";

@Component({
  selector: 'app-resumen-plan-semanal',
  templateUrl: './resumen-plan-semanal.component.html',
  styleUrls: ['./resumen-plan-semanal.component.scss'],
})
export class ResumenPlanSemanalComponent implements OnInit {

  @Input() planId:number;
  platosPlan :any[] = Array(15);
  lineasPlan :any = Array(15);
  imagenesPlan: string[] = Array(15);
  nutricionales: InfoNutricional[] = Array(5);
  constructor(private servicio:DataService, private modal:ModalController, private pop:PopoverController) { }

  async ngOnInit() {
    this.iniciaNutricionales();
    await this.getInfoPlan();
  }

  async getInfoPlan(){
    this.lineasPlan = await this.servicio.getLineasPlanSemanal(this.planId).toPromise().catch(e => {console.log('error ',e)});
    if (this.lineasPlan.length > 0 ){
      await this.cargaDatos();
      await this.cargaInfoNutricional();
    }
  }
  async cargaInfoNutricional(){
    for (let i=0; i < this.nutricionales.length;i++){
     for (let plato = i ; plato < i+11;plato+=5){
       if (this.platosPlan[plato].plato != undefined){
         this.nutricionales[i].calorias += this.platosPlan[plato].plato.calorias;
         this.nutricionales[i].carbohidratos += this.platosPlan[plato].plato.hidratos;
         this.nutricionales[i].grasas += this.platosPlan[plato].plato.grasas;
         this.nutricionales[i].proteinas += this.platosPlan[plato].plato.proteinas;
       }else{
         for (let lineaTupper of this.platosPlan[plato].alimentos){
           let alimento:any = await this.servicio.getAlimentoId(lineaTupper.alimentoId).toPromise().catch(err => console.log(err));
           if (alimento.tipoalimento === 'extras') {
             this.nutricionales[i].calorias += alimento.calorias;
             this.nutricionales[i].carbohidratos += alimento.hidratos;
             this.nutricionales[i].grasas += alimento.grasas;
             this.nutricionales[i].proteinas += alimento.proteinas;
           }else{
             this.nutricionales[i].calorias += alimento.calorias * (lineaTupper.alimentoC/100);
             this.nutricionales[i].carbohidratos += alimento.hidratos * (lineaTupper.alimentoC/100);
             this.nutricionales[i].grasas += alimento.grasas * (lineaTupper.alimentoC/100);
             this.nutricionales[i].proteinas += alimento.proteinas * (lineaTupper.alimentoC/100);
           }
         }
       }
     }
    }
  };
   async cargaDatos() {
    for (let linea of this.lineasPlan){
      this.platosPlan[linea.posicion] = {};
      if (linea.tupperid != null){
        this.imagenesPlan[linea.posicion] = '/assets/tupperejemplo.jpg';
        this.platosPlan[linea.posicion].alimentos = await this.servicio.getAlsTupper(linea.tupperid).catch(err => {
          console.log('error ', err)
        });
      }else{
        this.platosPlan[linea.posicion].plato = await this.servicio.getPlato(linea.platoid).toPromise().catch(
            err => {console.log('error', err)}
        );
        this.imagenesPlan[linea.posicion] = this.platosPlan[linea.posicion].plato.foto;
      }
    }
  }



  getIndex(row: number, col: number) {
    switch (row) {
      case 0:
        return row + col;
      case 1:
        col += 4;
        return row + col;
      case 2:
        col += 8;
        return row + col;
    }
  }

  getDia(dia: number) {
    switch (dia) {
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
    }
  }

  getComida(i: number) {
    switch (i) {
      case 0:
        return 'Desayuno';
      case 1:
        return 'Comida';
      case 2:
        return 'Cena';
    }
  }
  iniciaNutricionales(){
     //todo es necesario ponerlos a 0??
    this.nutricionales = [{calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
      {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0}];
  }
  async muestraInfo(indicePlan:number){
    let info;
    if (this.platosPlan[indicePlan].plato != null)
      info = {tipo:'plato',plato:this.platosPlan[indicePlan].plato};
    else if (this.platosPlan[indicePlan].alimentos != null)
      info = {tipo:'tupper',alimentos:this.platosPlan[indicePlan].alimentos};

    if (info != undefined){
      const modal = await this.modal.create({
        componentProps:{info: info},
        component: RevisionPlatoPlanPage,
      });
      await modal.present();
    }
  }
  async popNutricionales(dia: number) {
    let diaS = this.getDia(dia);
    const popover = await this.pop.create({
      component: NutricionalesComponent,
      componentProps: {
        dia: diaS,
        nutricion: this.nutricionales[dia - 1]
      },
      cssClass: "mipopover"
    });
    return await popover.present();
  }
}
