import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AppGlobals} from "../../services/variablesGlobales";
import {Alimento, LineaPedido, lineasCarrito, Pedido, Plato, Tupper} from "../../interfaces/modelos";
import {Router} from "@angular/router";
import {CarritoServicioService} from "../../services/carrito-servicio.service";
import {error} from "util";
import {Storage} from "@ionic/storage";
import {RevisionPlanSemanalPage} from "../revision-plan-semanal/revision-plan-semanal.page";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.page.html',
    styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
    pedidoid: number;
    preciopedido: number;
    pedidos: Pedido[] = Array();
    lineasPedido: any = Array();

    constructor(private servicio: DataService, private globales: AppGlobals, private router: Router, private carrito: CarritoServicioService, private storage: Storage, private modalController:ModalController) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.cargaPedidos();
    }

    cargaPedidos( event? ) {

            this.servicio.getPedidos(this.globales.user.id).subscribe(
                (pedidos: Pedido[]) => {
                    if (pedidos.length > 0) {
                        this.pedidos = pedidos;

                    }else{
                        this.pedidos = [];
                    }
                }, error => {
                    console.log('Error al traerse los pedidos');
                    if (event != null) event.target.complete();
                    }, () => {
                    if (event != null) event.target.complete();
                }
            )
    }

    modificaPedido(pedidoid: number) {
        this.preciopedido = 0;
        this.servicio.getLineaPedido(pedidoid).subscribe(
            (lineas: LineaPedido[]) => {
                this.lineasPedido = lineas;
                for (var i: number = 0; i < this.lineasPedido.length; i++) {
                    if (this.lineasPedido[i].platoid != null) {
                        this.carrito.getNombreProducto(this.lineasPedido[i].platoid, i, this.lineasPedido);
                    } else if (this.lineasPedido[i].tupperid != null){
                        this.lineasPedido[i].foto = '/assets/tupperejemplo.jpg';
                        this.carrito.getInfoTupper(this.lineasPedido[i].tupperid, i, this.lineasPedido);
                    }else{
                        this.lineasPedido[i].foto ='/assets/plan-semanal.jpg'
                    }
                    this.preciopedido += this.lineasPedido[i].precio * this.lineasPedido[i].cantidad;
                }
            }
        )
    }

    repitePedido() {
        let alerta:boolean = false;
                this.lineasPedido.forEach((x,index) => {
                    var modifica: boolean = false;
                    if (this.carrito.lineasCarrito.length > 0) {
                        this.carrito.lineasCarrito.forEach(y => {
                            if ((y.platoid === x.platoid && y.platoid != null) || (y.tupperid === x.tupperid && y.tupperid != null) || (y.plansemanalid === x.plansemanalid && y.plansemanalid != null)) {
                                modifica = true;
                                if (y.cantidad + x.cantidad > 10) {
                                    let cantAnyadida = 10-y.cantidad;
                                    y.cantidad = 10;
                                    alerta = true;
                                    delete y.nombrePlato;
                                    delete y.foto;
                                    delete y.infoTupper;
                                    this.servicio.modificaLineaDeCarrito(y.id, y).subscribe(
                                        res => {

                                            if (index === this.lineasPedido.length-1) {
                                                this.carrito.cargaCantidadProductos();
                                                this.pedidoid = null;
                                                console.log('updted');
                                            }
                                        }, error => {
                                            console.log('error al añadir cantidad')
                                        }
                                    )
                                } else {
                                    y.cantidad += x.cantidad;
                                    delete y.nombrePlato;
                                    delete y.foto;
                                    delete y.infoTupper;
                                    this.servicio.modificaLineaDeCarrito(y.id, y).subscribe(
                                        res => {
                                            if (index === this.lineasPedido.length-1) {
                                                this.carrito.cargaCantidadProductos();
                                                this.pedidoid = null;
                                            }
                                        }, error => {
                                            console.log('error al modificar linea carrito')
                                        }
                                    )
                                }
                            }
                        });
                    }
                    if (!modifica) {
                        var nuevaLinea: lineasCarrito = {
                            id: 0,
                            tipo_producto: '',
                            precio: 0,
                            cantidad: 0,
                            tupperid: null,
                            platoid: null,
                            plansemanalid:null,
                            usuarioid: this.globales.user.id
                        };
                        if (x.tupperid != null) {
                            nuevaLinea.tipo_producto = 'tupper';
                            nuevaLinea.tupperid = x.tupperid;
                        } else if (x.platoid != null) {
                            nuevaLinea.tipo_producto = 'plato';
                            nuevaLinea.platoid = x.platoid;
                        }else{
                            if (x.tipo_producto === 'Plan personal')
                                nuevaLinea.tipo_producto = 'Plan personal';
                            else
                                nuevaLinea.tipo_producto = 'Plan semanal';

                            nuevaLinea.plansemanalid = x.plansemanalid;
                        }
                        nuevaLinea.precio = x.precio;
                        nuevaLinea.cantidad = x.cantidad;
                        this.servicio.creaLineaCarrito(nuevaLinea).subscribe(
                            (res:any) => {
                                nuevaLinea.id = res.linea.insertId;
                                this.carrito.lineasCarrito.push(nuevaLinea);

                                if (index === this.lineasPedido.length-1) {
                                    this.carrito.cargaCantidadProductos();
                                    this.pedidoid = null;

                                }
                            }, error1 => {
                                console.log('error al crear linea')
                            }
                        )
                    }
                });

        if (alerta){
            this.globales.presentAlertError('Advertencia',"Al añadir al carrito uno de tus platos de tu antiguo pedido, la suma total de cantidades de ese " +
                "mismo plato excedia de 10 luego hemos modificado la cantidad a 10. ");
        }

        //todo hay que volcar las lineas del pedido en el carrito

    }
    dorefresh(event){
        this.cargaPedidos(event);
    }
    showAlertPrecio(){
        this.globales.presentAlertError('¿Cambios en el precio?','Es posible que el precio que veas sea ' +
            'diferente al de tu historial de pedidos. Esto es debido a que en tu historial ' +
            'guardamos el precio aplicando los gastos de envio y posibles codigos de descuento.');
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
