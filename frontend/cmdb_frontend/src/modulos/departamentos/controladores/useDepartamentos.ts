import { ref } from "vue"
import type { Departamento, DepartamentoAgregar } from "../interfaces/departamentos-interface"
import departamentosApi from "../api/departamentosAPI"

export const useDepartamentos = () => {
    const departamentos = ref<Departamento[]>([])
    let mensaje = ref(0);

    const traeDepartamentos = async () => {
        const respuesta = await departamentosApi.get<Departamento[]>('/')
        departamentos.value = respuesta.data
        console.log(departamentos.value) //debug
    }

    const traeDepartamentoId = async (id:number) => {
        const respuesta = await departamentosApi.get<Departamento[]>('/'+id)
        departamentos.value = respuesta.data
    }

    const agregarDepartamento = async (departamento:DepartamentoAgregar) => {
        const respuesta = await departamentosApi.post('/', departamento)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarDepartamento = async (departamento:Departamento) => {
        const respuesta = await departamentosApi.put('/', departamento)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarDepartamento = async (departamento:Departamento) => {
        const respuesta = await departamentosApi.delete('/', {data: {id: departamento.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        departamentos,
        mensaje,
        traeDepartamentos,
        traeDepartamentoId,
        agregarDepartamento,
        actualizarDepartamento,
        borrarDepartamento
    }
}