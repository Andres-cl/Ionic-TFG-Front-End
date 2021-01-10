import {Component, Input, OnInit} from '@angular/core';
import {Codigo} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-info-nutricional',
  templateUrl: './info-pedido.component.html',
  styleUrls: ['./info-pedido.component.scss'],
})
export class InfoNutricionalComponent implements OnInit {

  @Input() id:number;
  codigo:Codigo = {
    id :0,
    descuento:0,
    preciominimo:0,
    codigo:'',
    validez:new Date()
  };
  constructor(private service:DataService) { }

  ngOnInit() {
    this.cargaCodigo();
  }
  cargaCodigo(){
    this.service.getCodigoPromocionalPorId(this.id).subscribe(
        (code:Codigo) => {
          this.codigo = code;

          if (this.codigo.validez!=null){
            this.codigo.validez = new Date(this.codigo.validez);
          }
        }
    )
  }

}
