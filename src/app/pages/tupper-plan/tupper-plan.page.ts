import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {Alimento, AlimentoTupper, PlatosPlanSemanal, Tupper, TupperDetalle} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-tupper-plan',
  templateUrl: './tupper-plan.page.html',
  styleUrls: ['./tupper-plan.page.scss'],
})
export class TupperPlanPage implements OnInit {

  @Input() indice;
  @Input() alimentos:any[];
  contador:number = 0;

  carbohidratos: Alimento[] = [];
  proteinas: Alimento[] = [];
  verduras: Alimento[] = [];
  extras: Alimento[] = [];
  alimentosTupper : TupperDetalle[] = [];
  extrasTupper: Alimento[] = Array();
  prueba : TupperDetalle[] = Array(3);
  tupperCorrecto:boolean;
  nutricional = {proteinas:0,grasas:0,carbohidratos:0,calorias:0};
  precioTupper: number;
  loading:any;
  lineaPlan:PlatosPlanSemanal = {
    id:0,
    platoid:null,
    tupperid:null,
    posicion:null,
    semanalid:null
  };

  constructor(private modal2:ModalController, private servicio:DataService,private toastController:ToastController,private loadingController:LoadingController) {}

  ngOnInit() {
    this.prueba = [{},{},{}];
    if (this.alimentos != null){
      this.cargaAlimentosEntrantes(this.alimentos);
    }
    this.cargaTipoAlimentos();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      duration: 20000,
      message: 'Un momento por favor...'
    });
    await this.loading.present();
  }

  modificaDatos(){
    this.alimentosTupper = [];
    this.prueba.forEach(x => {
      if (x.alimento != null && x.cantidad > 0) {
        this.alimentosTupper.push(x);
      }
    });

    if (this.alimentosTupper.length > 0 || (this.extrasTupper.length > 0 && this.extrasTupper.length <= 3)){
      this.cargaInfoTupper();
      this.tupperCorrecto = true;
    }else{
      this.tupperCorrecto = false;
    }
    this.compruebaExtras();
  }
  compruebaExtras(){
    if (this.extrasTupper.length > 3){
      this.extrasTupper = [];
      this.presentToast('danger','No puedes seleccionar mas de 3 extras.');
    }
  }
  cargaInfoTupper() {
    this.nutricional = {calorias: 0,carbohidratos: 0,grasas: 0,proteinas: 0};
    this.precioTupper = 0;
    this.alimentosTupper.forEach(x => {
      this.nutricional.proteinas += x.alimento.proteinas * (x.cantidad/100);
      this.nutricional.grasas += x.alimento.grasas * (x.cantidad/100);
      this.nutricional.carbohidratos += x.alimento.hidratos * (x.cantidad/100);
      this.nutricional.calorias += x.alimento.calorias * (x.cantidad/100);
      this.precioTupper += x.alimento.precio * (x.cantidad/100);
    });
    this.extrasTupper.forEach(x => {
      this.nutricional.proteinas += x.proteinas;
      this.nutricional.grasas += x.grasas;
      this.nutricional.carbohidratos += x.hidratos;
      this.nutricional.calorias += x.calorias;
      this.precioTupper += x.precio;
    })
  }

  cargaTipoAlimentos( event? ){
    this.servicio.getAlimentos().subscribe(
        (res:Alimento[]) => {
          this.carbohidratos = []; this.proteinas = []; this.verduras = []; this.extras = [];
          res.forEach(x => {
            if (x.tipoalimento === 'Carbohidratos'){
              this.carbohidratos.push(x);
            }else if (x.tipoalimento === 'Proteinas'){
              this.proteinas.push(x);
            }else if (x.tipoalimento === 'Verduras'){
              this.verduras.push(x);
            }else
              this.extras.push(x);
          })
        }, error => {console.log('error'); if (event != null) event.target.complete();},()=> {
          if (event != null) event.target.complete();
        }
    )
  }
  doRefresh(event){
    this.cargaTipoAlimentos(event);
  }
  async creaTupper(){

    if (this.alimentosTupper.length > 0){
      await this.presentLoading();
      let posibleIdTupper = await this.servicio.compruebaExistenciaTupper(this.alimentosTupper, this.extrasTupper).catch(err => {
        this.loading.dismiss();
      });
      let alimentosQueVuelven : any[] = Array();
      this.alimentosTupper.forEach(x => {
        alimentosQueVuelven.push(x);
      });
      if (this.extrasTupper.length > 0){
        this.extrasTupper.forEach(x => {
          alimentosQueVuelven.push({'alimento':x,'cantidad': Number(x.nombre.split(' ').reverse()[1])})
        });
      }
      this.lineaPlan.posicion = this.indice;
      if (posibleIdTupper != undefined && Number.isInteger(posibleIdTupper)) {
        console.log('Habemus tupper existente ');
        this.lineaPlan.tupperid = posibleIdTupper;
      }
      this.loading.dismiss();
      this.modal2.dismiss({'linea':this.lineaPlan,'plato':null,'alimentos':alimentosQueVuelven})
    }else{
      this.presentToast('danger','Necesario rellenar la info de un alimento');
    }
  }

  cancelar(){
    this.modal2.dismiss();
  }
  cargaAlimentosEntrantes(alimentos:any[]){
    alimentos.forEach(x => {
      if (x.alimento.tipoalimento === 'extras'){
        this.extrasTupper.push(x.alimento);
      }else{
        if (x.alimento.tipoalimento === 'Proteinas'){
          this.prueba[0].alimento = x.alimento;
          this.prueba[0].cantidad = x.cantidad;
        } else if (x.alimento.tipoalimento === 'Carbohidratos'){
          this.prueba[1].alimento = x.alimento;
          this.prueba[1].cantidad = x.cantidad;
        }else{
          this.prueba[2].alimento = x.alimento;
          this.prueba[2].cantidad = x.cantidad;
        }
        this.alimentosTupper.push(x);
      }
    });
    if (this.alimentosTupper.length > 0){
      this.contador = 3;
      this.tupperCorrecto = true;
      this.cargaInfoTupper();
    }
  }
  async presentToast(color:string,mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      color:color,
      duration: 2000,
      position:"bottom"
    });
    toast.present();
  }
}
