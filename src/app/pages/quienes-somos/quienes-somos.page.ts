import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {DataService} from "../../services/data.service";
declare var google;

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.page.html',
  styleUrls: ['./quienes-somos.page.scss'],
})

export class QuienesSomosPage implements OnInit {

  map:any;
  lat: number = 39.46585029458012;
  lng: number = -0.38364542457256334;
  platos : any = Array ();
  slideOpts = {
    initialSlide: 1,
    speed: 100,
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView:1.6,
    effect: 'fade'
  };
  constructor(private loadingCtrl:LoadingController, private servicio:DataService) { }

  ngOnInit() {
    this.cargaPLatos();
    this.loadMap();
  }

  async loadMap(){
    const loading = await this.loadingCtrl.create();
    loading.present();
    const mapEle : HTMLElement = document.getElementById('map');
   this.map = new google.maps.Map(
        mapEle, {
      center: { lat: this.lat, lng: this.lng},
      zoom: 15
    });
   google.maps.event.addListenerOnce(this.map, 'idle', () => {
     loading.dismiss();
     this.addMarcador(this.lat,this.lng);
   })
  }
  private addMarcador(lat:number, lng: number){
    const marcador = new google.maps.Marker({
      position: { lat, lng},
      zoom: 8,
      map: this.map,
      title: 'Hola Mundo'
    });
  }
  async cargaPLatos(){
    this.servicio.getAllPlatos().subscribe(
        res => {
          this.platos = res;
        }
    )
  }



}
