import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const PersonalSchema = toTypedSchema(
    zod.object({
        id: zod.number({message: 'Requerido'}).int().positive({message: 'Un entero positivo'}),
        nombre: zod.string().min(1,{message: 'Nombre requerido'}).max(200, {message: 'Máximo 200 caracteres'}),
        direccion: zod.string().min(1,{message: 'Dirección requerida'}).max(300, {message: 'Máximo 300 caracteres'}),
        telefono: zod.string().min(10, {message: 'Mínimo 10 números'}).max(15, {message: 'Máximo 15 números'}),
        estatus: zod.string({message: 'Estatus requerido'})
    }).or(
        zod.object({
            nombre: zod.string().min(1,{message: 'Nombre requerido'}).max(200, {message: 'Máximo 200 caracteres'}),
            direccion: zod.string().min(1,{message: 'Dirección requerida'}).max(300, {message: 'Máximo 300 caracteres'}),
            telefono: zod.string().min(10, {message: 'Mínimo 10 números'}).max(15, {message: 'Máximo 15 números'}),
            estatus: zod.string({message: 'Estatus requerido'})
        })
    )
)