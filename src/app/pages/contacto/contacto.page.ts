import { Component, OnInit } from '@angular/core';
import {AppGlobals} from "../../services/variablesGlobales";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {

  segmento:string;
  constructor(private globales: AppGlobals, private router:Router) { }

  ngOnInit() {
  }


}
