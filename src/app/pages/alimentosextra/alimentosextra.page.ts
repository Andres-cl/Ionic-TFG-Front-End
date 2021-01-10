import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ModalController} from "@ionic/angular";
import {Alimento} from "../../interfaces/modelos";
import {AppGlobals} from "../../services/variablesGlobales";

@Component({
  selector: 'app-alimentosextra',
  templateUrl: './alimentosextra.page.html',
  styleUrls: ['./alimentosextra.page.scss'],
})
export class AlimentosextraPage implements OnInit {

  extras:any = Array();
  checked: boolean[] = Array();
  cantidad:number = 0;
  @Input() contador;
  constructor(private servicio:DataService, private modal:ModalController, private globales:AppGlobals) { }

  ngOnInit() {
    this.cargaExtras();
  }
  async cargaExtras(){
    this.servicio.getAlimentosCategoria('extras').subscribe(
        (res:Alimento[]) => {
          this.extras = res;
          this.checked.length = this.extras.length;
        }, error => {
          console.error(error);
        }
    );
  }
  aceptar(){
    var listaAlimentos:Alimento[] = Array();

    for (let i : number = 0; i < this.checked.length;i++){
      if (this.checked[i] === true){
        listaAlimentos.push(this.extras[i]);
      }
    }
    if (listaAlimentos.length + this.contador > 3){
      this.globales.presentToast('No puedes exceder in total de 3 extras');
    }else{
      this.modal.dismiss({
        'lista': listaAlimentos
      });
    }
  }
  cancelar(){
    this.modal.dismiss();
  }

}
