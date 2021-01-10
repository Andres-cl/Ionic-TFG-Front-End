import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Alimento, AlimentoTupper, InfoNutricional, Plato} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-revision-plato-plan',
  templateUrl: './revision-plato-plan.page.html',
  styleUrls: ['./revision-plato-plan.page.scss'],
})
export class RevisionPlatoPlanPage implements OnInit {

  @Input() info;
  plato:Plato;
  nutricionales:InfoNutricional = {};
  precioTupper:number = 0;
  alimentos: any[] = [];
  extras:Alimento[] = [];
  constructor(private modal:ModalController, private servicio:DataService) { }

  async ngOnInit() {
    await this.cargaInfo();
  }


  async cargaInfo(){
    if (this.info.tipo === 'plato'){
      this.plato = this.info.plato;
    }else{
      await this.getInfoTupper(this.info.alimentos);
    }
  }
  cancelar(){
    this.modal.dismiss();
  }
  async getInfoTupper(lineaTupper:AlimentoTupper[]){
    this.nutricionales = {calorias:0,proteinas:0,carbohidratos:0,grasas:0};
    for (let linea of lineaTupper){
      let alimento:any = await this.servicio.getAlimentoId(linea.alimentoId).toPromise().catch(err => console.log(err));
      if (alimento.tipoalimento === 'extras') {
        this.extras.push(alimento);
        this.nutricionales.calorias += alimento.calorias;
        this.nutricionales.carbohidratos += alimento.hidratos;
        this.nutricionales.grasas += alimento.grasas;
        this.nutricionales.proteinas += alimento.proteinas;
        this.precioTupper += alimento.precio;
      }else{
        this.alimentos.push({alimento:alimento,cantidad:linea.alimentoC});
        this.nutricionales.calorias += alimento.calorias * (linea.alimentoC/100);
        this.nutricionales.carbohidratos += alimento.hidratos * (linea.alimentoC/100);
        this.nutricionales.grasas += alimento.grasas * (linea.alimentoC/100);
        this.nutricionales.proteinas += alimento.proteinas * (linea.alimentoC/100);
        this.precioTupper += alimento.precio * (linea.alimentoC/100);
      }
    }
  }


}
