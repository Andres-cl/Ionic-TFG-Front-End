import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Pregunta} from "../../interfaces/modelos";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  preguntas:any = Array();

  constructor(private servicio: DataService) { }

  ngOnInit() {
    this.cargaPreguntas();
  }


   async cargaPreguntas( event? ){
    this.servicio.getPreguntas().subscribe(
        res =>{
          this.preguntas = res;
        },error => {console.log('error en faq'); if (event != null) event.target.complete();},()=> {
            if (event != null) event.target.complete();
        }
    )
  }
  dorefresh( event ){
   this.cargaPreguntas(event);
  }
  getColor(indice:Pregunta){
    var prueba = this.preguntas.indexOf(indice);
    if (prueba % 2 != 0){
      return COLORS.GREY;
    }else{
      return COLORS.WHITE
    }
  }

}
enum COLORS {
  GREY= '#E0E0E0',
  WHITE = '#fff'
}
