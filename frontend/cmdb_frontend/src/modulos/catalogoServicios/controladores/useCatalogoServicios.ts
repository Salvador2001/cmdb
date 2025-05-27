import { ref } from "vue"
import type { CatalogoServicio, CatalogoServicioAgregar } from "../interfaces/catalogoServicios-interface";
import catalogoServiciosApi from "../api/catalogoServiciosAPI";

export const useCatalogoServicios = () => {
    const catalogoServicios = ref<CatalogoServicio[]>([])
    let mensaje = ref(0);

    const traeCatalogoServicios = async () => {
        const respuesta = await catalogoServiciosApi.get<CatalogoServicio[]>('/')
        catalogoServicios.value = respuesta.data
        console.log(catalogoServicios.value) //debug
    }

    const traeCatalogoServiciosId = async (id:number) => {
        const respuesta = await catalogoServiciosApi.get<CatalogoServicio[]>('/'+id)
        catalogoServicios.value = respuesta.data
    }

    const agregarCatalogoServicios = async (catalogoServicios:CatalogoServicioAgregar) => {
        const respuesta = await catalogoServiciosApi.post('/', catalogoServicios)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarCatalogoServicios = async (catalogoServicios:CatalogoServicio) => {
        const respuesta = await catalogoServiciosApi.put('/', catalogoServicios)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarCatalogoServicios = async (catalogoServicios:CatalogoServicio) => {
        const respuesta = await catalogoServiciosApi.delete('/', {data: {id: catalogoServicios.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        catalogoServicios,
        mensaje,
        traeCatalogoServicios,
        traeCatalogoServiciosId,
        agregarCatalogoServicios,
        actualizarCatalogoServicios,
        borrarCatalogoServicios
    }
}