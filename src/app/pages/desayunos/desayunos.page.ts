import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {lineasCarrito, Plato} from "../../interfaces/modelos";
import {error} from "util";
import {AlertController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AppGlobals} from "../../services/variablesGlobales";

@Component({
  selector: 'app-desayunos',
  templateUrl: './desayunos.page.html',
  styleUrls: ['./desayunos.page.scss'],
})
export class DesayunosPage implements OnInit {

    platos: any = Array();
    plato:Plato = {
        id: 0,
        nombre: '',
        descripcion : '',
        foto: '',
        precio: 0,
        proteinas:0,
        grasas:0,
        hidratos:0,
        calorias:0,
        familiaId:0,
        tipoplato:'',
        valoracion: 0
    };
    carrito:lineasCarrito = {
        id:0,
        tipo_producto:'platos',
        precio:0,
        cantidad:1,
        tupperid:0,
        platoid:0,
        usuarioid:0,
    };


    constructor() { }

    ngOnInit() {


    }



}
