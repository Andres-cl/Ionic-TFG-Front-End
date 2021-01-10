import {Component, OnInit, ViewChild} from '@angular/core';
import {ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import {IonItem, IonItemSliding, LoadingController, ModalController, PopoverController} from "@ionic/angular";
import {AppGlobals} from "../../services/variablesGlobales";
import {PlanseleccionaPage} from "../planselecciona/planselecciona.page";
import {DataService} from "../../services/data.service";
import {
    HuecoPlanSemnal,
    InfoNutricional,
    lineasCarrito,
} from "../../interfaces/modelos";
import {TupperPlanPage} from "../tupper-plan/tupper-plan.page";
import {NutricionalesComponent} from "../../components/nutricionales/nutricionales.component";
import {Storage} from "@ionic/storage";
import {CarritoServicioService} from "../../services/carrito-servicio.service";


@Component({
    selector: 'app-plansemanal',
    templateUrl: './plansemanal.page.html',
    styleUrls: ['./plansemanal.page.scss'],
})
export class PlansemanalPage implements OnInit {

    platosPlan: HuecoPlanSemnal[] = Array(15);
    imagenesPlan: string [] = Array(15);
    precioPlan: number = 0;
    nutricionales: InfoNutricional[] = Array(5);
    lineaCarrito: lineasCarrito = {
        precio: 0,
        tupperid: null,
        platoid: null,
        cantidad: 1,
        tipo_producto: 'Plan_semanal',
        usuarioid: null
    };
    condicionesPrecio:boolean = false;
    loading:any;

    constructor(private screenOrientation: ScreenOrientation,
                private modal: ModalController,
                private globales: AppGlobals,
                private servicio: DataService,
                private pop: PopoverController,
                private storage:Storage,
                private carrito:CarritoServicioService,
                private loadingController:LoadingController) {
    }

    ngOnInit() {
        this.iniciaNutricionales();
    }
    ionViewWillEnter() {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    ionViewWillLeave() {
        this.screenOrientation.unlock();
    }
    async presentLoading(){
        this.loading = await this.loadingController.create({
            duration:20000,
            message:'Espere por favor...'
        });
        await this.loading.present();
        this.loading.onDidDismiss().then(() => {
            this.limpiaPlanSemanal();
        })
    }

    async rellenaHueco(r: number, c: number) {
        if (this.globales.logeado) {
            let indice = this.getIndex(r, c);
            var component;
            let componentProps: any = {indice: indice};
            if (this.platosPlan[indice] != undefined) {
                if (this.platosPlan[indice].plato != null) {
                    componentProps = {indice: indice, plato: this.platosPlan[indice].plato};
                    component = PlanseleccionaPage;
                } else {
                    component = TupperPlanPage;
                    componentProps = {indice: indice, alimentos: this.platosPlan[indice].alimentos}
                }
            } else {
                component = PlanseleccionaPage;
            }
            const modal = await this.modal.create({
                componentProps:
                componentProps
                ,
                component: component,
            });
            await modal.present();

            const {data} = await modal.onWillDismiss();
            if (data != null) {
                if (data.linea.platoid === null)
                    this.imagenesPlan[indice] = '/assets/tupperejemplo.jpg';
                else {
                    this.imagenesPlan[indice] = data.plato.foto;
                }
                this.platosPlan[indice] = data;
                this.cargaInformacion(indice);
            }
        } else {
            this.globales.presentToast('Debes estar logueado');
        }
    }

    cargaInformacion(indice: number) {
        this.modificaPrecio();
        switch (indice) {
            case 0:
            case 5:
            case 10:
                this.modificaInfoNutricional(0);
                break;
            case 1:
            case 6:
            case 11:
                this.modificaInfoNutricional(1);
                break;
            case 2:
            case 7:
            case 12:
                this.modificaInfoNutricional(2);
                break;
            case 3:
            case 8:
            case 13:
                this.modificaInfoNutricional(3);
                break;
            case 4:
            case 9:
            case 14:
                this.modificaInfoNutricional(4);
                break;
        }
    }

    modificaInfoNutricional(indice: number) {
        this.nutricionales[indice] = {calorias: 0, carbohidratos: 0, grasas: 0, proteinas: 0};
        let modificador = indice;
        for (var i = 0; i < 3; i++) {
            if (this.platosPlan[modificador] != undefined) {
                if (this.platosPlan[modificador].plato != null) {

                    this.nutricionales[indice].calorias += this.platosPlan[modificador].plato.calorias;
                    this.nutricionales[indice].carbohidratos += this.platosPlan[modificador].plato.hidratos;
                    this.nutricionales[indice].grasas += this.platosPlan[modificador].plato.grasas;
                    this.nutricionales[indice].proteinas += this.platosPlan[modificador].plato.proteinas;
                } else {

                    let calsTupper: number[] = this.getNutricionalesTupper(modificador);
                    this.nutricionales[indice].calorias += calsTupper[0];
                    this.nutricionales[indice].proteinas += calsTupper[1];
                    this.nutricionales[indice].carbohidratos += calsTupper[2];
                    this.nutricionales[indice].grasas += calsTupper[3];
                }
            }
            modificador += 5;
        }
    }

    getNutricionalesTupper(indice: number): number[] {
        let p = 0, h = 0, c = 0, g = 0;
        let nutricionales: number[] = [];
        this.platosPlan[indice].alimentos.forEach(a => {
            if (Number.isInteger(Number(a.alimento.nombre.split(' ').reverse()[1]))) {
                p += a.alimento.proteinas;
                h += a.alimento.hidratos;
                g += a.alimento.grasas;
                c += a.alimento.calorias;
            } else {
                p += a.alimento.proteinas * (a.cantidad / 100);
                h += a.alimento.hidratos * (a.cantidad / 100);
                g += a.alimento.grasas * (a.cantidad / 100);
                c += a.alimento.calorias * (a.cantidad / 100);
            }
        });
        nutricionales.push(c, p, h, g);
        return nutricionales;
    }

    modificaPrecio() {
        this.precioPlan = 0;
        this.platosPlan.forEach(x => {
            if (x.alimentos === null) {
                this.precioPlan += x.plato.precio;
            } else {
                this.precioPlan += this.getPrecioTupper(x.alimentos);
            }
        });
        this.precioPlan = this.precioPlan - this.precioPlan * 0.15;
    }

    getPrecioTupper(alimentos: any[]): number {
        let precio = 0;
        alimentos.forEach(a => {
            if (Number.isInteger(Number(a.alimento.nombre.split(' ').reverse()[1]))) {
                precio += a.alimento.precio;
            } else {
                precio += a.alimento.precio * (a.cantidad / 100);
            }
        });
        return precio;
    }

    getIndex(row: number, col: number) {
        switch (row) {
            case 0:
                return row + col;
            case 1:
                col += 4;
                return row + col;
            case 2:
                col += 8;
                return row + col;
        }
    }

    getDia(dia: number) {
        switch (dia) {
            case 1:
                return 'Lunes';
            case 2:
                return 'Martes';
            case 3:
                return 'Miércoles';
            case 4:
                return 'Jueves';
            case 5:
                return 'Viernes';
        }
    }

    getComida(i: number) {
        switch (i) {
            case 0:
                return 'Desayuno';
            case 1:
                return 'Comida';
            case 2:
                return 'Cena';
        }
    }

    validaPlanSemanal() {
        let contador = 0;
        for (let i = 0; i < 15; i++) {
            if (this.platosPlan[i] != undefined) {
                contador++;
            }
        }
        return contador == 15;
    }

    async agregaPlanSemanal() {
        //todo hacer un loader mientras todo??
        if (this.globales.logeado) {
            if (this.validaPlanSemanal()) {
                await this.presentLoading();
                let platosDentroDePlan =0;
                let planId;
                this.servicio.creaPlanSemanal({precio: this.precioPlan, familiaid: 6}).subscribe(
                    (res: any) => {
                        planId = res.plan.insertId;
                        this.platosPlan.forEach((x, cuentaLineasPlan) => {
                            if (x.plato != null) {
                                x.linea.semanalid = planId;
                                this.servicio.creaLineaPlanSemanal(x.linea).subscribe(
                                    next => {
                                        platosDentroDePlan ++;
                                        this.creaLineaCarrito(planId,cuentaLineasPlan);
                                    }, error => {
                                        console.log('Error creando linea plan de plato')
                                    }
                                )
                            } else if (x.alimentos != null) {
                                if (x.linea.tupperid != null) {
                                    x.linea.semanalid = planId;
                                    this.servicio.creaLineaPlanSemanal(x.linea).subscribe(
                                        next => {
                                            this.creaLineaCarrito(planId,cuentaLineasPlan);
                                        }
                                    )
                                } else {
                                this.servicio.creaTupper({
                                    precio: this.getPrecioTupper(x.alimentos),
                                    familiaid: 5
                                }).subscribe(
                                    (res: any) => {
                                        x.alimentos.forEach((alimento, index) => {
                                            this.servicio.creaAlimentoTupper({
                                                alimentoId: alimento.alimento.id,
                                                alimentoC: alimento.cantidad,
                                                tupperId: res.tupper.insertId
                                            })
                                                .subscribe(
                                                    next => {
                                                        if (index == x.alimentos.length - 1) {
                                                            x.linea.tupperid = res.tupper.insertId;
                                                            x.linea.semanalid = planId;
                                                            this.servicio.creaLineaPlanSemanal(x.linea).subscribe(
                                                                next => {
                                                                    this.creaLineaCarrito(planId, cuentaLineasPlan);
                                                                }
                                                            )
                                                        }
                                                    }
                                                )
                                        })
                                    }
                                )
                            }
                            }
                        });

                    },error1 => {console.log('error al crear plan semanal')});
            } else {
                this.globales.presentToast('Necesitas rellenar campos obligatorios');
            }
        } else {
            this.globales.presentToast('Debes estar logueado');
        }
    }
    creaLineaCarrito(idPlan:number,contadorLineas:number){
        if (contadorLineas === 14){
            let linea = {id:0,tipo_producto:'Plan semanal',precio:this.precioPlan,
                cantidad:1,plansemanalid:idPlan,usuarioid:this.globales.user.id};
            this.servicio.creaLineaCarrito(linea).subscribe(
                (res:any) => {
                    linea.id = res.linea.insertId;
                    this.carrito.lineasCarrito.push(linea);
                    this.carrito.cargaCantidadProductos();
                    this.loading.dismiss();
                }
            )
        }
    }
    limpiaPlanSemanal(){
        this.platosPlan.forEach((x,index) => {
           delete this.platosPlan[index];
           delete this.imagenesPlan[index];
        });
        this.precioPlan = 0;
        this.iniciaNutricionales();

    }
    eliminaPlatoPlan(index: number, SlidingItem: IonItemSliding) {
        delete this.platosPlan[index];
        delete this.imagenesPlan[index];
        this.cargaInformacion(index);
        SlidingItem.close();
    }
    iniciaNutricionales(){
        this.nutricionales = [{calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
            {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
            {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
            {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0},
            {calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0}];
    }

    async popNutricionales(dia: number) {
        let diaS = this.getDia(dia);
        const popover = await this.pop.create({
            component: NutricionalesComponent,
            componentProps: {
                dia: diaS,
                nutricion: this.nutricionales[dia - 1]
            },
            cssClass: "mipopover"
        });
        return await popover.present();
    }

}
