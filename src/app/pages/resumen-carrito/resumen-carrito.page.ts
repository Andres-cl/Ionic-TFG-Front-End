import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AppGlobals} from "../../services/variablesGlobales";
import {Codigo, Direccion, LineaPedido, lineasCarrito, Pedido, Plato} from "../../interfaces/modelos";
import {CarritoServicioService} from "../../services/carrito-servicio.service";
import {
    AlertController,
    IonContent,
    IonInput,
    LoadingController,
    ModalController,
    NavController,
    PickerController, ToastController
} from "@ionic/angular";
import {PickerOptions} from "@ionic/core";
import {Router} from "@angular/router";
import {DireccioninfoPage} from "../direccioninfo/direccioninfo.page";

import {RevisionPlanSemanalPage} from "../revision-plan-semanal/revision-plan-semanal.page";

@Component({
    selector: 'app-resumen-carrito',
    templateUrl: './resumen-carrito.page.html',
    styleUrls: ['./resumen-carrito.page.scss'],
})
export class ResumenCarritoPage implements OnInit {

    direcciones: any = Array();
    direccion: Direccion = {
        id: 0,
        nombre_via: '',
        ciudad: '',
        pais: '',
        cod_postal: 0,
        usuarioid: 0,
        numero: ''
    };
    codigoPromocional: string;
    descuento: number = 0;
    pago: string;
    visa = {
        titular: '',
        numeroTarjeta: null,
        fecha: '',
        cvcodigo: null
    };

    @ViewChild("codigo", {static: false}) private promocional: IonInput;
    @ViewChild(IonContent, {static: false}) private content: IonContent;

    constructor(private servicio: DataService,
                private globales: AppGlobals,
                private carrito: CarritoServicioService,
                private nav: NavController,
                private alertController: AlertController,
                private router: Router,
                private picker: PickerController,
                private modalController: ModalController,
                private loadingController: LoadingController,
                private toastController: ToastController,
    ) {
    }

    ngOnInit() {
        this.descuento = 0;
    }

    ionViewWillEnter() {
        this.cargaDirecciones();
    }

    async dorefresh(event) {
        let dir: any = await this.servicio.getDirecciones(this.globales.user.id).toPromise().catch(err => {
            event.target.complete();
        });
        if (dir.length > 0) {
            this.direcciones = dir;
            this.direccion = this.direcciones[0];
        }
        this.carrito.cargaCarrito(event);
    }

    getDelay(i: number) {
        return 0.25 * (i + 1);
    }

    volver() {
        this.nav.back();
    }

    getPrecioTotal(): number {
        var precio: number = this.carrito.getTotal();
        if (precio > 50) {
            if (this.descuento > 0)
                return precio -= this.descuento;
            else
                return precio;
        } else {
            if (this.descuento > 0) {
                precio = precio + 4.99 - this.descuento;
                return precio;
            } else {
                return precio += 4.99;
            }
        }
    }

    async cargaDirecciones() {
        this.servicio.getDirecciones(this.globales.user.id).subscribe(
            res => {
                console.log(res);
                this.direcciones = res;
                if (this.direcciones.length > 0) {
                    this.direccion = this.direcciones[0];
                }
            }
        )
    }

    pushDirecciones() {
        this.router.navigate(['/cuenta/direcciones']);
    }

    async realizarPedido() {
        if (this.direccion.id != 0) {
            await this.presentLoading();
                var codigoPedido;
                var pedido: Pedido = {
                    ref_pedido: 0,
                    precio: this.getPrecioTotal(),
                    usuarioid: this.globales.user.id,
                    direccionid: this.direccion.id
                };

                    this.servicio.creaPedido(pedido).subscribe(
                    (res: any) => {
                        console.log('id es: ', res.pedido.insertId);
                        codigoPedido = res.pedido.insertId;

                        let lineasagregadas: number = 0;

                        for (var i = 0; i < this.carrito.lineasCarrito.length; i++) {
                            var linea_pedido: LineaPedido = {
                                id: 0,
                                tipo_producto: '',
                                precio: 0,
                                tupperid: null,
                                platoid: null,
                                cantidad: 0,
                                pedidoid: res.pedido.insertId
                            };
                            linea_pedido.tipo_producto = this.carrito.lineasCarrito[i].tipo_producto;
                            linea_pedido.precio = this.carrito.lineasCarrito[i].precio;
                            linea_pedido.cantidad = this.carrito.lineasCarrito[i].cantidad;
                            if (this.carrito.lineasCarrito[i].platoid != null)
                                linea_pedido.platoid = this.carrito.lineasCarrito[i].platoid;
                            else if (this.carrito.lineasCarrito[i].tupperid != null)
                                linea_pedido.tupperid = this.carrito.lineasCarrito[i].tupperid;
                            else
                                linea_pedido.plansemanalid = this.carrito.lineasCarrito[i].plansemanalid;

                            this.servicio.creaLineaPedido(linea_pedido).subscribe(
                                res => {
                                    lineasagregadas++;
                                    if (lineasagregadas === this.carrito.lineasCarrito.length) {
                                        if (this.descuento > 0) {
                                            this.globales.user.promocionalid = null;
                                            this.servicio.modificaUsusario(this.globales.user.id, this.globales.user).subscribe(
                                                res => {
                                                }, error1 => {
                                                    console.log('Error al quitarle el promo code')
                                                }
                                            )
                                        }
                                        this.router.navigate(['pedido/', codigoPedido]);
                                        this.loadingController.dismiss();
                                    }
                                }, error1 => {
                                    this.loadingController.dismiss();
                                    console.log('Error al crear una linea de pedido')
                                }
                            )
                        }
                    }, error => {
                          this.loadingController.dismiss();
                        console.log('Error al crear el nuevo pedido')
                    }
                );
        } else {
            this.necesariaDireccion();
        }


    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Espera unos segundos',
            spinner: "circles",
            translucent: true,
            mode: "ios"
        });
        await loading.present();
    }

    compruebaCodigo() {
        if (this.codigoPromocional != '') {
            if (this.globales.user.promocionalid != null) {
                this.servicio.getCodigoPromocionalPorId(this.globales.user.promocionalid).subscribe(
                    (codigo: Codigo) => {
                        if (codigo.codigo === this.codigoPromocional){
                            if (codigo.validez != null) {
                                if (this.dateDiffInDays(new Date(), new Date(codigo.validez)) >= 0) {
                                    if (this.carrito.getTotal() < codigo.preciominimo) {
                                        this.gastaMas(codigo.preciominimo);
                                        this.promocional.value = '';
                                    } else {
                                        this.descuento = this.getPrecioTotal() * (codigo.descuento / 100);
                                        this.promocional.value = '';
                                    }
                                } else {
                                    this.globales.presentToast('El código ha caducado ya, lo siento');
                                    this.promocional.value = '';
                                }
                            }else{
                                if (this.carrito.getTotal() < codigo.preciominimo){
                                    this.gastaMas(codigo.preciominimo);
                                    this.promocional.value = '';
                                } else {
                                    this.descuento = this.getPrecioTotal() * (codigo.descuento / 100);
                                    this.promocional.value = '';
                                }
                            }
                        }else{
                            this.codigoErroneo();
                            this.promocional.value = '';
                        }
                    }, error1 => {
                        console.log('Error al trarse el codigo')
                    }
                )
            } else {
                this.sinCodigos();
                this.promocional.value = '';
            }
        }
    }

    dateDiffInDays(a, b) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    async gastosEnvio() {
        const alert = await this.alertController.create({
            header: 'Envios',
            message: 'Envios gratiutos en compras superiores a 50€. Resto de envios, tarifa plana de 4.99€.',
            buttons: ['OK'],
            animated: true,
            backdropDismiss: true,
            translucent: true
        });

        await alert.present();
    }

    async actualizarDireccion(id: number) {
        const modal = await this.modalController.create({
            component: DireccioninfoPage,
            componentProps: {
                id: id
            }
        });

        await modal.present();

        modal.onDidDismiss().then(
            () => this.servicio.getDirecciones(this.globales.user.id).subscribe(
                res => {
                    this.direcciones = res;
                    for (var i: number = 0; i < this.direcciones.length; i++) {
                        if (this.direcciones[i].id === id) {
                            this.direccion = this.direcciones[i];
                        }
                    }
                }
            )
        );
    }

    async pickerFecha() {
        let options: PickerOptions = {
            buttons: [
                {
                    text: "Cancel",
                    role: 'cancel'
                },
                {
                    text: 'Ok',
                    handler: (value: any) => {
                        this.visa.fecha = (value.meses.text + '/' + value.anyos.text);
                    }
                }
            ],
            columns: [
                {
                    name: 'meses',
                    options: this.getMeses()
                },
                {
                    name: 'anyos',
                    options: this.getAnyos()
                }
            ]
        };
        let picker = await this.picker.create(options);
        picker.present()
    }

    getMeses() {
        let options = [];
        for (let i = 1; i < 13; i++) {
            if (i >= 10) {
                options.push({
                    text: i,
                    value: i
                });
            } else {
                options.push({
                    text: '0' + i,
                    value: '0', i
                });
            }
        }
        return options;
    }

    getAnyos() {
        let variable: number = new Date().getFullYear();
        var anyo = Number(variable.toString().slice(0, 2));
        let anyos = [];
        for (let i = 0; i < 20; i++) {
            anyos.push({
                text: anyo,
                value: anyo
            });
            anyo++;
        }
        return anyos;
    }

    async showDirecciones() {
        let options: PickerOptions = {
            buttons: [
                {
                    text: "Cancel",
                    role: 'cancel'
                },
                {
                    text: 'Ok',
                    handler: (value: any) => {
                        this.direccion = value.direcciones.value;
                    }
                }
            ],
            columns: [{
                name: 'direcciones',
                options: this.getColumnOptions()
            }]
        };

        let picker = await this.picker.create(options);
        picker.present()
    }

    getColumnOptions() {
        let options = [];
        this.direcciones.forEach(x => {
            options.push({text: x.nombre_via, value: x});
        });
        return options;
    }

    scrollBottom() {
        setTimeout(() => {
            this.content.scrollToBottom(1000);
        }, 500);
    }

    async codigoErroneo() {
        const toast = await this.toastController.create({
            message: '<strong>No se corresponde con ningun código promocional</strong>',
            duration: 2000,
            position: "bottom",
        });
        toast.present();
    }

    async sinCodigos() {
        const toast = await this.toastController.create({
            message: '<strong>No tienes ningun código promocional</strong>',
            duration: 2000,
            position: "bottom",
        });
        toast.present();
    }

    async necesariaDireccion() {
        const toast = await this.toastController.create({
            message: '<strong>Necesitas seleccionar una dirección</strong>',
            color: 'medium',
            duration: 2000,
            position: "bottom",
        });
        toast.present();
    }

    async gastaMas(minimo: number) {
        const toast = await this.toastController.create({
            message: 'Debes gastar un mínimo de, ' + minimo + '€ para aplicar la promo',
            color: 'medium',
            duration: 2000,
            position: "bottom",
        });
        toast.present();
    }

    async abreInfoPlanSemanal(idPlan: number) {
        const modal = await this.modalController.create({
            component: RevisionPlanSemanalPage,
            componentProps: {
                planId: idPlan
            }
        });

        await modal.present();
    }
}
