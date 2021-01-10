import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {AppGlobals} from "./variablesGlobales";
import {Storage} from "@ionic/storage";
import {Alimento, AlimentoTupper, lineasCarrito, Plato, Tupper} from "../interfaces/modelos";
import {ToastController} from "@ionic/angular";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CarritoServicioService {

  lineasCarrito:any[] = [];

  constructor(private servicio:DataService, private globales:AppGlobals, private storage : Storage, private toastcontroller:ToastController) {}

    private formRefreshAnnouncedSource = new Subject();
    formRefreshSource$ = this.formRefreshAnnouncedSource.asObservable();

    publishFormRefresh(){
        this.formRefreshAnnouncedSource.next();
    }

  cargaCantidadProductos( event? ) {
      this.globales.productosCarrito = 0;
      this.lineasCarrito.forEach(linea => {
          this.globales.productosCarrito += linea.cantidad;
      });
      this.storage.set('carrito',this.globales.productosCarrito);
      if (!event)
      this.publishFormRefresh();
  }

  cargaInfoLineasCarrito(){
      this.globales.productosCarrito = 0;
      for (var i : number = 0; i < this.lineasCarrito.length; i++){
          this.globales.productosCarrito += this.lineasCarrito[i].cantidad;
          if (this.lineasCarrito[i].platoid != null){
              this.getNombreProducto(this.lineasCarrito[i].platoid, i, this.lineasCarrito);
          }else if (this.lineasCarrito[i].tupperid != null){
              this.lineasCarrito[i].foto = '/assets/tupperejemplo.jpg';
              this.getInfoTupper(this.lineasCarrito[i].tupperid, i, this.lineasCarrito);
          }else{
              this.lineasCarrito[i].foto ='/assets/plan-semanal.jpg'
          }
      }
      this.storage.set('carrito',this.globales.productosCarrito);
  }
  cargaCarrito( event? ){
    if (this.globales.logeado){
      this.servicio.getLineas(this.globales.user.id).subscribe(
          (res:any[]) => {
              if (res.length>0) {
                  this.lineasCarrito = res;
                  this.cargaInfoLineasCarrito();
              }else{
                  this.lineasCarrito = [];
                  this.cargaCantidadProductos();
              }

          },error => {
              this.globales.presentAlertError('Server Error', 'Ahora mismo no hay conexion con el servidor.' +
              'Intentalo de nuevo en unos minutos refrescando la página');
               if (event != null){
                   event.target.complete();
               }
              },
          () => {
              if (event != null){
                  event.target.complete();
              }
          }
      )
    }else{
        if (event != null){
            event.target.complete();
        }
    }
  }
  getNombreProducto(id:number, indice: number, lineas:any){
    this.servicio.getPlato(id.toString()).subscribe(
        (res:Plato) => {
          lineas[indice].nombrePlato = res.nombre;
          lineas[indice].foto = res.foto;
        }
    );
  }
  getTotal():number{
    var precio:number = 0;
    for (var i : number = 0; i < this.lineasCarrito.length; i++){
      precio += this.lineasCarrito[i].precio * this.lineasCarrito[i].cantidad;
    }
    return precio;
  }
  getInfoTupper(id:number, indice:number, lineas:any){
      this.servicio.getAlimentosTupper(id).subscribe(
          (alimentos:any) => {
              var alimentosEnTupper : AlimentoTupper[] = Array();
              lineas[indice].infoTupper = '';
              alimentosEnTupper = alimentos;
              alimentosEnTupper.forEach((x, index) =>{
                  this.servicio.getAlimentoId(x.alimentoId).subscribe(
                  (alimento:Alimento) => {
                      if (alimento.tipoalimento === 'extras'){
                          if (index === alimentosEnTupper.length-1){
                              lineas[indice].infoTupper += (' extra: '+alimento.nombre+'. ');
                          }else{
                              lineas[indice].infoTupper += (' extra: '+alimento.nombre+',');
                          }
                      }else {
                          if (index === alimentosEnTupper.length - 1) {
                              lineas[indice].infoTupper += (' ' + alimento.nombre + ' x ' + x.alimentoC + '. ');
                          } else {
                              lineas[indice].infoTupper += (' ' + alimento.nombre + ' x ' + x.alimentoC + ',');
                          }
                      }
                  }
              )
          });
          }
      );
  }
  modificaTupperLineaCarrito(id:number,cantidad:number,loader){
      this.lineasCarrito.forEach((linea,indice) => {
          if (linea.id === id){
              if (linea.cantidad + cantidad > 10){
                  this.cantidadMaxima();
              }else{
                  linea.cantidad += cantidad;
                  delete linea.nombrePlato;
                  delete linea.foto;
                  delete linea.infoTupper;
                  this.servicio.modificaLineaDeCarrito(linea.id, linea).subscribe(
                      res => {
                          this.cargaCantidadProductos();
                          //todo esto es la version antigua => this.cargaCantidadProductos();
                      },error => {},() => { loader.dismiss();}
                  )
              }
          }
      })
  }

  aumentaLineaCarrito(linea,indice,lineas){
      if (linea.cantidad + 1 > 10){
          this.cantidadMaxima();
      }else {
          delete linea.nombrePlato;
          delete linea.foto;
          delete linea.infoTupper;
          linea.cantidad += 1;
          this.servicio.modificaLineaDeCarrito(linea.id, linea).subscribe(
              res => {
                  if (linea.platoid != null){
                      this.getNombreProducto(linea.platoid,indice,lineas);
                  }else if (linea.tupperid != null){
                      this.getInfoTupper(linea.tupperid,indice,lineas);
                  }
                  this.cargaCantidadProductos();
              }
          )
      }
  }
    reduceLineaCarrito(linea, indice:number,lineas:any, element? ){
        if (linea.cantidad - 1 <=0){
            this.eliminaProductoCarrito(linea, indice, lineas, element);
        }else{
            delete linea.nombrePlato;
            delete linea.foto;
            delete linea.infoTupper;
            linea.cantidad -= 1;
            this.servicio.modificaLineaDeCarrito(linea.id, linea).subscribe(
                res => {
                    if (linea.platoid != null){
                        this.getNombreProducto(linea.platoid,indice,lineas);
                    }else if (linea.tupperid != null){
                        this.getInfoTupper(linea.tupperid,indice,lineas);
                    }
                    this.cargaCantidadProductos();
                }
            )
        }
    }
    eliminaProductoCarrito(linea, indice : number, lineas, element? ){

        this.servicio.eliminaLineaCarrito(linea.id).subscribe(
            data => {
                if (element)
                 element.el.classList.add('animate__animated', 'animate__backOutRight');
                setTimeout(() => {
                    lineas.splice(indice,1);
                    this.cargaCantidadProductos();
                },500);
            }
        )
    }
    creaLineaCarrito(linea:lineasCarrito){
      this.servicio.creaLineaCarrito(linea).subscribe(
          (res:any) => {
              linea.id = res.linea.insertId;
              this.lineasCarrito.push(linea);
              this.cargaCantidadProductos();
          }
      )
    }
    async compruebaTupperEnCarrito(alimentosNuevos:any[], extras:Alimento[]){
        //todo imorescindible, que al llamar a la funcion, las lineas del carrito, esten actualizadas
        let numAlsNuevos = alimentosNuevos.length + extras.length;
        if (this.lineasCarrito.length > 0) {
            for (const linea of this.lineasCarrito) {
                if (linea.tupperid != null) {
                    let contador = 0;
                    let alimentos: any = await this.servicio.getAlsTupper(linea.tupperid);
                    let numAlsExistentes = alimentos.length;
                    alimentosNuevos.forEach(nuevos => {
                        alimentos.forEach(existentes => {
                            if (nuevos.alimento.id === existentes.alimentoId && Number(nuevos.cantidad) === existentes.alimentoC) {
                                contador++;
                            }
                        })
                    });
                    extras.forEach(nuevos => {
                        alimentos.forEach(existentes => {
                            if (nuevos.id === existentes.alimentoId && existentes.alimentoC === Number(nuevos.nombre.split(' ').reverse()[1])) {
                                contador++;
                            }
                        })
                    });
                    if (numAlsNuevos === numAlsExistentes && contador === numAlsExistentes) {
                        console.log('bingo');
                        return linea.id;
                    }
                }
            }
        }
    }


    async cantidadMaxima() {
        const toast = await this.toastcontroller.create({
            message: '<strong>No se puede añadir mas de 10 productos iguales</strong>',
            color: 'medium',
            duration: 2000,
            position:"bottom",
        });
        toast.present();
    }

}
