import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Alimento, Codigo, Direccion, LineaPedido, Pedido, Plato, Tupper, Usuarios} from "../../interfaces/modelos";
import {AppGlobals} from "../../services/variablesGlobales";
import {ActivatedRoute, Router} from "@angular/router";
import {CarritoServicioService} from "../../services/carrito-servicio.service";
import {Storage} from "@ionic/storage";
import {AlertController, NavController} from "@ionic/angular";
import {HTTP} from "@ionic-native/http/ngx";

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})

export class PedidoPage implements OnInit {

  abrepedido:boolean;
  nuevoCode: boolean = false;
  codigo:string;
  codigoid:number;
  minimo:number;
  pedidoid:number;
  preciopedido:number;
  lineaspedido:any = Array();
  direccion:string;
  constructor(private servicio:DataService, private globales:AppGlobals,private rutaactiva:ActivatedRoute,
              private carrito:CarritoServicioService, private router:Router, private storage:Storage, private cordova:HTTP) { }

  ngOnInit() {
    this.borraInfoCarrito();
    this.pedidoid = Number(this.rutaactiva.snapshot.paramMap.get('id'));
    this.cargaLineas();
    this.cargaDireccion();
    this.cargaPromoCode();

  }
  async mandaMail(para:string, nombre:string){
      let _auth = btoa('api:'+this.globales.mailgunApiKey);
      let headers = {
          'Authorization': 'Basic ' + _auth,
          'Content-Type': 'application/x-www-form-urlencoded'
      };
      let lineas = [];
      for (const linea of this.lineaspedido) {
          if (linea.platoid != null) {
              let plato: any = await this.servicio.getPlato(linea.platoid).toPromise();
              lineas.push({linea: "" + linea.cantidad + " X " + plato.nombre + " " + linea.precio +"€"});
          } else if (linea.tupperid != null) {
              lineas.push({linea: "" + linea.cantidad + " X  tupper personalizados " + linea.precio +"€"});
          } else if(linea.tipo_producto === 'Plan semanal') {
              lineas.push({linea: "" + linea.cantidad + " X  plan semanal " + linea.precio +"€"});
          }else{
              lineas.push({linea: "" + linea.cantidad + " X  plan personalizado " + linea.precio+"€"});
          }
      }
      let variables = {nombre: nombre,id:this.pedidoid,precio:this.preciopedido,lineas:lineas};

      let body = {
          from: 'FF Company <theffcompany2@gmail.com>',
          to: para,
          subject: 'Confirmación de pedido',
          template : 'confirmacionpedido',
          "h:X-Mailgun-Variables": JSON.stringify(variables)
      };


      let url = 'https://api.mailgun.net/v3/' + this.globales.mailgunUrl+ '/messages';
      return this.cordova.post(url, body, headers).then(data => {
      }).catch(error => {
          this.globales.presentAlertError('Error','Ha habido algun problema enviando el correo. Prueba de nuevo en unos insantes');
      });
  }

   cargaPromoCode(){
       setTimeout(() => {
          if (this.globales.user.promocionalid == null){
              this.servicio.getCodigoPromocional(5).subscribe(
                  (codigo:Codigo) => {
                      this.nuevoCode = true;
                      this.codigo = codigo.codigo;
                      this.codigoid = codigo.id;
                      this.minimo = codigo.preciominimo;
                  }
              );
          }
      },250);
  }

  cargaLineas(){
      this.servicio.getLineaPedido(this.pedidoid).subscribe(
          res => {
            this.lineaspedido = res;
            let lineas = [];
            for (var i : number = 0; i < this.lineaspedido.length; i++){
              if (this.lineaspedido[i].platoid != null){
                this.carrito.getNombreProducto(this.lineaspedido[i].platoid, i, this.lineaspedido);
              }else if(this.lineaspedido[i].tupperid != null){
                this.carrito.getInfoTupper(this.lineaspedido[i].tupperid, i,this.lineaspedido);
                  this.lineaspedido[i].foto = '/assets/tupperejemplo.jpg';
              }else{
                  this.lineaspedido[i].foto ='/assets/plan-semanal.jpg'
              }
            }
              this.mandaMail(this.globales.user.correo, this.globales.user.nombre);
          }
      )
  }
  cargaDireccion(){
      this.servicio.getPedido(this.pedidoid).subscribe(
          (pedido:Pedido) => {
              this.preciopedido = pedido.precio;
             this.servicio.getDireccion(pedido.direccionid).subscribe(
                 (direccion:Direccion) => {
                     this.direccion = (direccion.nombre_via + direccion.numero);
                 },error => {console.log('Error al cargar la direccion del pedido')}
             )
          },error => {console.log('Error al cargar la dirección del pedido')}
      )
  }
  borraInfoCarrito(){
      this.servicio.eliminaLineasCarritoUsuario(this.globales.user.id).subscribe(
          res => {
              this.carrito.lineasCarrito = [];
              this.carrito.cargaCantidadProductos();
          },error => {console.log('Error al eliminar las lineas del usuario')}
      )
  }
    pushInicio(){

      //todo demasiadas llamadas a api no crees?? --> Solucionado al comentar abajo
      if (this.nuevoCode){
          this.globales.user.promocionalid = this.codigoid;
          this.globales.user.creado_en = new Date(this.globales.user.creado_en).toLocaleDateString().split('/').reverse().join('/').replace('/','-').replace('/','-');
          this.servicio.modificaUsusario(this.globales.user.id, this.globales.user).subscribe(
              res => {
                  this.storage.set('usuario',this.globales.user);

              },error => {console.log('Error al añadir el código promocional')}
          )
      }
        this.router.navigate(['inicio']);

    }

}
