import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {lineasCarrito, Plato} from "../../interfaces/modelos";
import {DataService} from "../../services/data.service";
import {AlertController, IonIcon, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AppGlobals} from "../../services/variablesGlobales";
import {CarritoServicioService} from "../../services/carrito-servicio.service";

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.scss'],
})
export class PlatosComponent implements OnInit {

  @Input() tipoPlato;
  platos: any = Array();
  plato:Plato = {
    id: 0,
    nombre: '',
    descripcion : '',
    foto: '',
    precio: 0,
    proteinas:0,
    grasas:0,
    hidratos:0,
    calorias:0,
    familiaId:0,
    tipoplato:'',
    valoracion: 0
  };


  constructor(private servicio: DataService, private alertcontroler: AlertController, private router:Router,
              private toast:ToastController,
              private globales:AppGlobals,
              private carritoServicio: CarritoServicioService) { }

  ngOnInit() {
   this.cargaPlatos();
  }

   cargaPlatos( event? ){
    this.servicio.getPlatosCategoria(this.tipoPlato).subscribe(
        res => {
          this.platos = res;
        }, error => {
          console.error(error);
          if (event != null) event.target.complete();
        },() => {if (event != null) event.target.complete();}
    );
  }

  agregarPlato(plato:Plato) {
    if (this.globales.logeado) {
      var nuevo: boolean = true;
        for (const linea of this.carritoServicio.lineasCarrito) {
          if (linea.platoid === plato.id) {
            nuevo = false;
            if (linea.cantidad + 1 > 10) {
              this.carritoServicio.cantidadMaxima();
            } else {
              delete linea.nombrePlato;
              delete linea.foto;
              delete linea.infoTupper;
              linea.cantidad += 1;
              this.servicio.modificaLineaDeCarrito(linea.id, linea).subscribe(
                  res => {
                    this.carritoServicio.cargaCantidadProductos();
                  }
              );
            }
            break;
          }
        }
        if (nuevo) {
          let lineaNueva:lineasCarrito = {
            id:0,
            tipo_producto:'platos',
            precio:0,
            cantidad:1,
            tupperid:0,
            platoid:0,
            usuarioid:0,
          };
          delete lineaNueva.id;
          delete lineaNueva.tupperid;
          lineaNueva.platoid = plato.id;
          lineaNueva.precio = plato.precio;
          lineaNueva.usuarioid = this.globales.user.id;

          this.carritoServicio.creaLineaCarrito(lineaNueva);

        }


      } else {
        this.toastRegistroNecesario();
        this.router.navigate(['login']);
      }

  }


  abreInfoPlato(plato:Plato){
    this.router.navigate(['infoplato/',plato.id]);

  }
  dorefresh( event ){
    this.cargaPlatos(event);
  }



  async toastRegistroNecesario() {
    const toast = await this.toast.create({
      message: '<strong>Debes iniciar sesion para comprar</strong>',
      duration: 2000,
      position:"bottom",
      color:"danger"
    });
    toast.present();
  }

}
