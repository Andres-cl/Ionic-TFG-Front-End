import {Component, OnInit} from '@angular/core';
import {PickerOptions} from "@ionic/core";
import {AlertController, ModalController, PickerController} from "@ionic/angular";
import {DietaPersonalAlimentosPage} from "../dieta-personal-alimentos/dieta-personal-alimentos.page";
import {Alimento, AlimentosIndeseados, DietaPersonall, Plato} from "../../interfaces/modelos";
import {AppGlobals} from "../../services/variablesGlobales";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dieta-personal',
    templateUrl: './dieta-personal.page.html',
    styleUrls: ['./dieta-personal.page.scss'],
})
export class DietaPersonalPage implements OnInit {

    abreform: boolean = false;
    validado: boolean = true;
    alsnoDeseados: string;
    platosnoDeseados: string;
    listaALimentos: Alimento[] = [];
    listaPlatos: Plato[] = [];
    planSemanal: DietaPersonall = {
        id: 0,
        talla: null,
        peso: null,
        edad: null,
        sexo: null,
        diasActividad: null,
        descripcion: '',
        usuarioId: null
    };

    constructor(private picker: PickerController,
                private modal: ModalController,
                private gloables: AppGlobals,
                private servicio: DataService,
                private alertController: AlertController,
                private router: Router) {
    }

    ngOnInit() {
    }


    abreFormulario() {
        if (this.gloables.logeado) {
            this.cartaCss();
            setTimeout(() => {
                this.abreform = true
            }, 1000);
        } else {
            this.gloables.presentToast('debes iniciar sesión');
            this.router.navigate(['login']);
        }

    }

    cartaCss() {
        const element = document.getElementById('cartaplanpersonal');
        element.classList.add('animate__animated', 'animate__fadeOut');
    }

    nuevoPlanSemanal(form?: NgForm) {
        this.planSemanal.usuarioId = this.gloables.user.id;
        if (this.camposCompletados() && this.validaCampos()) {
            this.validado = true;
            this.servicio.creaDietaPersonal(this.planSemanal).subscribe(
                (res: any) => {
                    var lineasAgregadas: number = 0;
                    this.listaALimentos.forEach(alimento => {
                        this.servicio.creaAlimentoNoDeseado({
                            dietaPersonalId: res.dieta.insertId,
                            alimentoId: alimento.id
                        }).subscribe(
                            res => {
                                lineasAgregadas++;
                                if (lineasAgregadas == this.listaPlatos.length + this.listaALimentos.length) {
                                    this.alertExito();
                                    form.resetForm();
                                    this.listaALimentos = [];
                                    this.listaPlatos = [];
                                }
                            }, error => {
                                console.log(error)
                            }
                        )
                    });
                    this.listaPlatos.forEach(plato => {
                        this.servicio.creaAlimentoNoDeseado({
                            dietaPersonalId: res.dieta.insertId,
                            platoId: plato.id
                        }).subscribe(
                            res => {
                                lineasAgregadas++;
                                if (lineasAgregadas == this.listaPlatos.length + this.listaALimentos.length) {
                                    this.alertExito();
                                    form.resetForm();
                                    this.listaPlatos = [];
                                    this.listaALimentos = [];
                                }
                            }, error => {
                                console.log(error)
                            }
                        )
                    });
                }, error => {
                    this.gloables.presentToast('Error al crear la dieta personal')
                }
            )
            //todo hacer la gestion con la base de datos y al terminar resetear el form y avisar con alerta
        } else {
            this.validado = false;
        }
    }

    validaCampos(): boolean {
        return !(this.planSemanal.edad > 85 || this.planSemanal.peso > 300 || this.planSemanal.talla > 230 ||
            this.planSemanal.edad < 10 || this.planSemanal.peso < 30 || this.planSemanal.talla < 100);
    }

    camposCompletados(): boolean {
        return this.planSemanal.diasActividad != null && this.planSemanal.descripcion != '' && this.planSemanal.peso != null
            && this.planSemanal.talla != null && this.alsnoDeseados === 'Completado' && this.platosnoDeseados === 'Completado'
            && this.planSemanal.sexo != null;
    }

    async showDiasActividad() {
        let options: PickerOptions = {
            buttons: [
                {
                    text: "Cancel",
                    role: 'cancel'
                },
                {
                    text: 'Ok',
                    handler: (value: any) => {
                        console.log(value);
                        this.planSemanal.diasActividad = value.Actividad_Fisica.value;
                        console.log(this.planSemanal.diasActividad);
                    }
                }
            ],
            columns: [{
                name: 'Actividad_Fisica',
                options: [
                    {text: '1', value: 1},
                    {text: '2', value: 2},
                    {text: '3', value: 3},
                    {text: '4', value: 4},
                    {text: '5', value: 5},
                    {text: '6', value: 6},
                    {text: '7', value: 7}
                ]
            }]
        };

        let picker = await this.picker.create(options);
        picker.present()
    }

    async abreAlimentosNoDeseados(tipo: string) {
        const modal = await this.modal.create({
            component: DietaPersonalAlimentosPage,
            componentProps: {tipo: tipo}
        });

        await modal.present();

        const {data} = await modal.onWillDismiss();
        if (data != null) {
            if (tipo === 'alimentos') {
                this.listaALimentos = data.lista;
                this.alsnoDeseados = 'Completado';
            } else {
                this.listaPlatos = data.lista;
                this.platosnoDeseados = 'Completado'
            }

        }


    }

    async alertExito() {
        const alert = await this.alertController.create({
            header: 'Gracias, ' + this.gloables.user.nombre + '!',
            message: 'Tu dieta personalizada ha sido registrada con éxito. Pronto nos pondremos en contacto contigo via telefono o mail con actualizaciones sobre el estado de tu plan',
            buttons: ['OK']
        });

        await alert.present();
    }



}
