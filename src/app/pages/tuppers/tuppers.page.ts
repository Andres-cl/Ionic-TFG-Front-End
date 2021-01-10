import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {
    Alimento,
    AlimentoTupper,
    InfoNutricional,
    lineasCarrito,
    TupperDetalle
} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {
    LoadingController,
    ModalController,
    ToastController
} from "@ionic/angular";
import {AppGlobals} from "../../services/variablesGlobales";
import {Storage} from "@ionic/storage";
import {Router} from "@angular/router";
import {CarritoServicioService} from "../../services/carrito-servicio.service";

import {AlimentosextraPage} from "../alimentosextra/alimentosextra.page";

@Component({
    selector: 'app-tuppers',
    templateUrl: './tuppers.page.html',
    styleUrls: ['./tuppers.page.scss'],
})

export class TuppersPage implements OnInit {

    slideOpts = {
        initialSlide: 0,
        speed: 300,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 1.5,
        slideShadows: true,
    };
    hidratos: Alimento[] = Array();
    verduras: Alimento[] = Array();
    proteinas: Alimento[] = Array();
    extras: Alimento[] = Array();
    alimentosBase: TupperDetalle[] = Array(3);
    alimentosTupper: TupperDetalle[] = Array();
    extraTupper: Alimento[] = Array();
    precioTupper: number = 0;
    numraciones: number = 0;
    infoNutricional: InfoNutricional = {
        calorias: 0,
        proteinas: 0,
        grasas: 0,
        carbohidratos: 0
    };

    tupperValido: boolean = false;
    validaRaciones: boolean = null;
    extra: boolean = false;
    loading:any;


    constructor(private servicio: DataService,
                private toast: ToastController,
                private globales: AppGlobals,
                private storage: Storage,
                private router: Router,
                private modal: ModalController,
                private carrito:CarritoServicioService,
                private loadingController:LoadingController
    ) {
    }

    ngOnInit() {
        this.alimentosBase = [{}, {}, {}];
        this.cargaAlimentos();
    }
    getDelay(i: number) {
        return 0.15 * (i + 1);
    }

    cargaAlimentos( event? ) {
        this.servicio.getAlimentos().subscribe(
            (res: Alimento[]) => {
                this.hidratos = []; this.proteinas = []; this.verduras = []; this.extras = [];
                    res.forEach(x => {
                        if (x.tipoalimento === 'Carbohidratos') {
                            this.hidratos.push(x);
                        } else if (x.tipoalimento === 'Proteinas') {
                            this.proteinas.push(x);
                        } else if (x.tipoalimento === 'Verduras') {
                            this.verduras.push(x);
                        } else
                            this.extras.push(x);
                    });

            }, error => {
                console.log('error');
                if (event != null) event.target.complete();
            },()=> {if (event != null) event.target.complete();}
        )
    }

    modificaPrecio() {
        this.validaRaciones = (this.numraciones > 0);
        this.alimentosTupper = [];
        this.alimentosBase.forEach(x => {
            if (x.alimento != null && x.cantidad > 0) {
                this.alimentosTupper.push(x);
            }
        });
        this.tupperValido = this.alimentosTupper.length > 0 && this.validaRaciones;
            this.cargaInfoTupper();
    }
    async presentLoading(){
        this.loading = await this.loadingController.create({
            duration:20000,
            message:'Un momento por favor...'
        });
         await this.loading.present();
         this.loading.onDidDismiss().then(() => {
             this.reseteaFormulario();
         })
    }

    async AnyadePedido() {
        if (this.globales.logeado) {
            if (this.tupperValido) {
                await this.presentLoading();
                  let posibleId = await this.carrito.compruebaTupperEnCarrito(this.alimentosTupper, this.extraTupper);
                    if (posibleId != undefined && Number.isInteger(posibleId)) {
                        this.carrito.modificaTupperLineaCarrito(posibleId, Number(this.numraciones),this.loading);
                    }else{
                        let tupperIdCreado = await this.servicio.compruebaExistenciaTupper(this.alimentosTupper, this.extraTupper);
                        if (tupperIdCreado != undefined && Number.isInteger(tupperIdCreado)) {
                            this.creaLineaCarrito(tupperIdCreado);
                        } else {
                            console.log('no existia, creamos el nuevo tupper');
                            this.creaTupperNuevo();
                        }
                    }

            } else {
                this.globales.presentAlertError('Error en Tupper', 'Los tuppers deben tener seleccionado el numero de raciones y algun alimento independientemente de los extras');
            }
        } else {
            this.router.navigate(['login']);
            this.globales.presentToast('Debes estar logueado');
        }

    }
    creaTupperNuevo(){
        let idtupper;
        this.servicio.creaTupper({precio: this.precioTupper/this.numraciones, familiaid: 5}).subscribe(
            (res: any) => {
                let alimentosAnyadidos: number = 0;
                idtupper = res.tupper.insertId;
                let lineaTupper: AlimentoTupper = {
                    id: 0,
                    alimentoC: 0,
                    alimentoId: 0,
                    tupperId: idtupper
                };
                this.alimentosTupper.forEach(x => {
                    lineaTupper.alimentoId = x.alimento.id;
                    lineaTupper.alimentoC = x.cantidad;
                    this.servicio.creaAlimentoTupper(lineaTupper).subscribe(
                        res => {
                            alimentosAnyadidos++;
                            if (alimentosAnyadidos === this.alimentosTupper.length + this.extraTupper.length)
                                this.creaLineaCarrito(idtupper);
                        }
                    )
                });
                if (this.extraTupper.length > 0) {
                    this.extraTupper.forEach(x => {
                        lineaTupper.alimentoId = x.id;
                        lineaTupper.alimentoC = Number(x.nombre.split(' ').reverse()[1]);
                        this.servicio.creaAlimentoTupper(lineaTupper).subscribe(
                            res => {
                                alimentosAnyadidos++;
                                if (alimentosAnyadidos === this.alimentosTupper.length + this.extraTupper.length)
                                    this.creaLineaCarrito(idtupper);
                            }
                        )
                    });
                }

            }
        );
    }

    creaLineaCarrito(idTupper:number) {
            let linea: lineasCarrito = {
                id: 0,
                tipo_producto: 'tupper',
                precio: this.precioTupper/Number(this.numraciones),
                cantidad: Number(this.numraciones),
                tupperid: idTupper,
                platoid: null,
                usuarioid: this.globales.user.id,
            };
            //TODO a partir de aqui deberia ser funcion de mi servicio de carrito
            this.servicio.creaLineaCarrito(linea).subscribe(
                (res:any) => {
                    linea.id = res.linea.insertId; //todo nueva
                    this.carrito.lineasCarrito.push(linea); //todo nueva
                    //todo sustituible por funcion cuenta productos:
                    this.carrito.cargaCantidadProductos();
                    this.tupperValido = false;
                    this.loading.dismiss();
                },error1 => {console.log('error al crear linea de carrito')},() => {
                    this.loading.dismiss();
                });

    }

    reseteaFormulario() {
        this.alimentosTupper = [];
        this.alimentosBase = [{}, {}, {}];
        this.extraTupper = [];
        this.infoNutricional = {calorias: 0, carbohidratos: 0, proteinas: 0, grasas: 0};
        this.numraciones = 0;
    }

    dorefresh(event) {
        this.cargaAlimentos(event);
    }

    cargaInfoTupper() {
        this.infoNutricional = {calorias: 0, carbohidratos: 0, grasas: 0, proteinas: 0};
        this.precioTupper = 0;
        this.alimentosTupper.forEach(x => {
            this.infoNutricional.proteinas += x.alimento.proteinas * (x.cantidad / 100);
            this.infoNutricional.grasas += x.alimento.grasas * (x.cantidad / 100);
            this.infoNutricional.carbohidratos += x.alimento.hidratos * (x.cantidad / 100);
            this.infoNutricional.calorias += x.alimento.calorias * (x.cantidad / 100);
            this.precioTupper += x.alimento.precio * (x.cantidad / 100);
        });
        this.extraTupper.forEach(x => {
            this.infoNutricional.proteinas += x.proteinas;
            this.infoNutricional.grasas += x.grasas;
            this.infoNutricional.carbohidratos += x.hidratos;
            this.infoNutricional.calorias += x.calorias;
            this.precioTupper += x.precio;
        });
        this.precioTupper = this.precioTupper * this.numraciones;
    }

    cancelAddAlimentosTupper() {
        this.extraTupper = [];
        this.extra = false;
    }

    habilitaExtras() {
        this.extra = true;
    }

    async abreExtras() {
        if (this.extraTupper.length < 3) {
            const modal = await this.modal.create({
                id: 'alimentos',
                componentProps:
                    {
                        contador: this.extraTupper.length
                    }
                ,
                component: AlimentosextraPage,
            });
            await modal.present();

            const {data} = await modal.onWillDismiss();
            if (data != null) {
                for (var i = 0; i < data.lista.length; i++) {
                    this.extraTupper.push(data.lista[i]);
                }
                this.cargaInfoTupper();
            }
        } else {
            this.globales.presentToast('Ya has llegado al máximo de extras permitidos');
        }
        this.modificaPrecio();
    }
    reseteaCard(card:number){
        this.alimentosBase[card] = {};
    }
    eliminaAlimentoExtra(a: Alimento) {
        var indice = this.extraTupper.indexOf(a);
        this.extraTupper.splice(indice, 1);
        this.cargaInfoTupper();
    }

}

