export interface Usuarios {
    id?: number,
    nombre?:string,
    apellidos?:string,
    telefono?:string,
    correo?:string,
    contrasenya?:string,
    creado_en?:string,
    promocionalid?: number
}
export interface Plato {
    id?: number;
    nombre?: string;
    descripcion? : string;
    foto?: string;
    precio?: number;
    proteinas?:number;
    grasas?:number;
    hidratos?:number;
    calorias?:number;
    familiaId?:number;
    tipoplato?:string;
    valoracion?:number;
}
export interface Alimento {
    id?: number;
    precio?: number;
    foto?: string;
    nombre?: string;
    proteinas?:number;
    grasas?:number;
    hidratos?:number;
    calorias?:number;
    tipoalimento?:string;
}
export interface PedidoTuppers {
    cantverdura?: number;
    cantcarbo?: number;
    cantproteina?: number;
    tipoverdura?: string;
    tipocarbo?: string;
    tipoproteina?: string;
    numraciones?:number;
    precioproteina?: number;
    precioverdura?: number;
    preciocarbohidrato?: number;
    preciototal?: number;
}
export interface lineasCarrito {
    id?:number;
    tipo_producto?:string;
    precio?:number;
    cantidad?:number;
    tupperid?:number;
    platoid?:number;
    plansemanalid?:number;
    usuarioid?:number;
}
export interface Direccion {
    id?:number;
    nombre_via?:string;
    ciudad?:string;
    pais?:string;
    cod_postal?:number;
    usuarioid?:number;
    numero?:string;
}
export interface Mensaje {
    id?:number;
    contenido?:string;
    usuarioid?:number;
    correo?:string;
    telefono?:string;
    nombre?:string;
}
export interface Pregunta {
    id?:number;
    pregunta?:string;
    respuesta?:string;
    activa?:boolean;
}
export interface Tupper {
    id?:number;
    precio?:number;
    familiaid?:number;
}
export interface AlimentoTupper {
    id?:number;
    alimentoId?:number;
    alimentoC?:number;
    tupperId?:number;
}
export interface TupperDetalle {
    alimento?:Alimento;
    cantidad?:number;
}
export interface Pedido {
    ref_pedido?:number;
    fecha_pedido?:Date;
    precio:number;
    usuarioid:number;
    direccionid:number;
}
export interface LineaPedido {
    id?:number;
    tipo_producto?:string;
    precio?:number;
    tupperid?:number;
    platoid?:number;
    plansemanalid?:number;
    cantidad?:number;
    pedidoid?:number;
}
export interface Codigo {
    id?:number;
    descuento?:number;
    preciominimo?:number;
    codigo?:string;
    validez?:Date;
}
export interface DietaPersonall {
    id?:number;
    talla?:number;
    peso?:number;
    edad?:number;
    sexo?:number;
    diasActividad?:number;
    descripcion?:string;
    usuarioId?:number;
}
export interface AlimentosIndeseados {
    id?:number;
    alimentoId?:number;
    platoId?:number;
    dietaPersonalId?:number;
}
export interface PlanSemanal {
    id?:number;
    precio?:number;
    familiaid?:number;
}
export interface PlatosPlanSemanal {
    id?:number;
    platoid?:number;
    tupperid?:number;
    posicion?:number;
    semanalid?:number;
}
export interface HuecoPlanSemnal {
    linea?:PlatosPlanSemanal,
    plato?:Plato,
    alimentos?: any[]
}
export interface InfoNutricional {
    calorias?:number;
    proteinas?:number;
    grasas?:number;
    carbohidratos?:number;
}
