import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {IonIcon, IonInput, PopoverController} from "@ionic/angular";
import {PopinfoComponent} from "../popinfo/popinfo.component";
import {AppGlobals} from "../../services/variablesGlobales";
import {DataService} from "../../services/data.service";
import {CarritoServicioService} from "../../services/carrito-servicio.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  @Input() titulo:string;
  @ViewChild('cartito', {static: false, read: ElementRef})icono: ElementRef;
  lineasCarrito: any = Array();
  subscripcion;
  constructor(private router:Router, private popover: PopoverController,private globales:AppGlobals,private carrito:CarritoServicioService) {
    this.subscripcion = this.carrito.formRefreshSource$.subscribe(data => {
      console.log('fired');
      this.animateCSS('bounce');
    });
  }

  ngOnInit() {

  }

  pushInicio(){
    this.router.navigate(['inicio'])
  }
  async mostrarPop( evento ){
    const popover = await this.popover.create({
      component:PopinfoComponent,
      event: evento,
      mode:'ios',
      cssClass: 'pop-over-style',
    });
    await popover.present();
  }

   animateCSS = (animation, prefix = 'animate__') =>

      new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = this.icono.nativeElement;

        node.classList.add(`${prefix}animated`, animationName);

        function handleAnimationEnd() {
          node.classList.remove(`${prefix}animated`, animationName);
          node.removeEventListener('animationend', handleAnimationEnd);

          resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd);
      });
  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }










}
