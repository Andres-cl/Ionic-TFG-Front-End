import {Component, Input, OnInit} from '@angular/core';
import {InfoNutricional} from "../../interfaces/modelos";

@Component({
  selector: 'app-nutricionales',
  templateUrl: './nutricionales.component.html',
  styleUrls: ['./nutricionales.component.scss'],
})
export class NutricionalesComponent implements OnInit {

@Input() dia;
@Input() nutricion:InfoNutricional;

  constructor() { }

  ngOnInit() {
  }

}
