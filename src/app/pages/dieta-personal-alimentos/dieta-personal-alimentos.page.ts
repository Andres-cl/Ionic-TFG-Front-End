import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalController} from "@ionic/angular";
import {Alimento} from "../../interfaces/modelos";

@Component({
  selector: 'app-dieta-personal-alimentos',
  templateUrl: './dieta-personal-alimentos.page.html',
  styleUrls: ['./dieta-personal-alimentos.page.scss'],
})
export class DietaPersonalAlimentosPage implements OnInit {

  alimentos:any = Array();
  checked: boolean[] = Array();
  @Input() tipo:string;
  constructor(private servicio:DataService, private modal: ModalController) { }

  ngOnInit() {
    this.cargaInfo();
  }
  cargaInfo(){
    if (this.tipo === 'alimentos'){
      this.servicio.getAlimentos().subscribe(
          res => {
            this.alimentos = res;
            this.checked.length = this.alimentos.length;
          }
      )
    }else{
      this.servicio.getAllPlatos().subscribe(
          res => {
            this.alimentos = res;
            this.checked.length = this.alimentos.length;
          }
      )
    }
  }
  aceptar(){
    var listaAlimentos:Alimento[] = Array();

    for (let i : number = 0; i < this.checked.length;i++){
      if (this.checked[i] === true){
        listaAlimentos.push(this.alimentos[i]);
      }
    }
    this.modal.dismiss({
      'lista': listaAlimentos
    });
  }
  cancelar(){
    this.modal.dismiss();
  }

}
