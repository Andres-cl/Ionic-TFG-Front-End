import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  Alimento,
  AlimentosIndeseados, AlimentoTupper,
  DietaPersonall,
  Direccion,
  LineaPedido,
  lineasCarrito,
  Mensaje,
  Pedido, PlanSemanal, PlatosPlanSemanal,
  Tupper,
  Usuarios
} from "../interfaces/modelos";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URI:string = 'http://localhost:3000/api/ff/';

  constructor(private http: HttpClient) {
  }

  compruebaUsuario(user: string, pass: string) {
    return this.http.get(this.API_URI+`usuarios/${user}/${pass}`);
  }

  creaUsuario(user: Usuarios) {
    return this.http.post(this.API_URI+'usuarios', user);
  }

  modificaUsusario(id: number, user: Usuarios) {
    return this.http.put(this.API_URI+`usuarios/${id}`, user);
  }

  getUsuario(id: number) {
    return this.http.get(this.API_URI+`usuarios/${id}`);
  }

  getDirecciones(id: number) {
    return this.http.get(this.API_URI+`direcciones/${id}`);
  }

  getDireccion(id: number) {
    return this.http.get(this.API_URI+`direccion/${id}`);
  }

  eliminaDireccion(id: number) {
    return this.http.delete(this.API_URI+`direcciones/${id}`);
  }

  creaDireccion(direccion: Direccion) {
    return this.http.post(this.API_URI+'direcciones', direccion);
  }

  modificaDireccion(id: number, direccion: Direccion) {
    return this.http.put(this.API_URI+`direcciones/${id}`, direccion);
  }

  compruebaCorreo(correo: string) {
    return this.http.get(this.API_URI+`usuarios/prueba/mail/${correo}`);
  }

  getPlatosCategoria(categoria: string) {
    return this.http.get(this.API_URI+`platos/tipoplato/${categoria}`);
  }
  getPlato(id: string) {
    return this.http.get(this.API_URI+`platos/${id}`);
  }

  getAllPlatos() {
    return this.http.get(this.API_URI+'platos/');
  }

  getAlimentosCategoria(categoria: string) {
    return this.http.get(this.API_URI+`alimentos/categoria/${categoria}`);
  }
  getAlimentos() {
    return this.http.get(this.API_URI+`alimentos/`);
  }

  getAlimentoNombre(nombre: string) {
    return this.http.get(this.API_URI+`alimentos/nombre/${nombre}`);
  }
  getAlimentoId(id : number){
    return this.http.get(this.API_URI+`alimentos/${id}`);
  }

  creaLineaCarrito(linea: lineasCarrito) {
    return this.http.post(this.API_URI+'lineas_carrito/', linea);
  }

  getLineas(id: number) {
    return this.http.get(this.API_URI+`lineas_carrito/${id}`);
  }

  getPreguntas() {
    return this.http.get(this.API_URI+'faq/');
  }

  creaMensaje(mensaje: Mensaje) {
    return this.http.post(this.API_URI+'mensajes/', mensaje);
  }

  creaTupper(tupper: Tupper) {
    return this.http.post(this.API_URI+'tuppers', tupper);
  }
  creaAlimentoTupper(alimento: AlimentoTupper){
    return this.http.post(this.API_URI+'tuppersalimentos', alimento);
  }
  getAlimentosTupper(id:number){
    return this.http.get(this.API_URI+`tuppersalimentos/${id}`);
  }
  async getAlsTupper(id:number){
    try {
      return await this.getAlimentosTupper(id).toPromise();
    }catch (e) {
      return null;
    }
  }
  getTupper(id: number) {
    return this.http.get(this.API_URI+`tuppers/tupper/${id}`);
  }
  getTuppers(){
    return this.http.get(this.API_URI+'tuppers/');
  }
  async getAllTuppers(){
    try {
      return await this.getTuppers().toPromise();
    }catch (e) {
      return null;
    }
  }
  modificaLineaDeCarrito(id:number, linea:lineasCarrito){
    return this.http.put(this.API_URI+`lineas_carrito/${id}`, linea);
  }
  eliminaLineaCarrito(id:number){
    return this.http.delete(this.API_URI+`lineas_carrito/${id}`);
  }
  eliminaLineasCarritoUsuario(id:number){
    return this.http.delete(this.API_URI+`lineas_carrito/usuario/${id}`);
  }
  creaPedido(pedido:Pedido){
    return this.http.post(this.API_URI+'pedidos', pedido);
  }
  creaLineaPedido(linea:LineaPedido){
    return this.http.post(this.API_URI+'lineas_pedido', linea);
  }
  getLineaPedido(id:number){
    return this.http.get(this.API_URI+`lineas_pedido/${id}`);
  }
  getCodigoPromocional(descuento:number){
    return this.http.get(this.API_URI+`codigospromocionales/descuento/${descuento}`);
  }
  getCodigoPromocionalPorId(id:number){
    return this.http.get(this.API_URI+`codigospromocionales/${id}`);

  }
  getPedido(id:number){
    return this.http.get(this.API_URI+`pedidos/getOne/${id}`);
  }
  getPedidos(id:number){
    return this.http.get(this.API_URI+`pedidos/${id}`);
  }
  creaDietaPersonal(dieta:DietaPersonall){
    return this.http.post(this.API_URI+'dietaPersonal', dieta);
  }
  creaAlimentoNoDeseado(alimento:AlimentosIndeseados){
    return this.http.post(this.API_URI+'dietaPersonal/alimentosIndeseados', alimento);
  }
  creaPlanSemanal(plan:PlanSemanal){
    return this.http.post(this.API_URI+'planSemanal', plan);
  }
  creaLineaPlanSemanal(lineaPlan:PlatosPlanSemanal){
    return this.http.post(this.API_URI+'planSemanal/lineasPlan', lineaPlan);
  }
  getLineasPlanSemanal(id:number){
    return this.http.get(this.API_URI+`planSemanal/lineasPlan/${id}`);
  }
  async compruebaExistenciaTupper(alimentosNuevos:any[], extras:Alimento[]) {
    let contador;
    let tuppers: any = await this.getAllTuppers();
    let numalsNuevo = alimentosNuevos.length + extras.length;
    let numalsExistente;
    if (tuppers.length > 0) {
    for (const tupper of tuppers) {
      contador = 0;
      const alimentos: any = await this.getAlsTupper(tupper.id);
      if (alimentos.length > 0) {
        numalsExistente = alimentos.length;
        alimentos.forEach(existentes => {
          alimentosNuevos.forEach(nuevos => {
            if (nuevos.alimento.id === existentes.alimentoId && Number(nuevos.cantidad) === existentes.alimentoC) {
              contador++;
            }
          });
          extras.forEach(extra => {
            if (extra.id === existentes.alimentoId && existentes.alimentoC === Number(extra.nombre.split(' ').reverse()[1])) {
              contador++;
            }
          });
        });
        if (numalsNuevo == numalsExistente && numalsExistente === contador) {
          console.log('Bingo el tupper esta registrado');
          return tupper.id;
        }
      }
    }
  }
  }
}
