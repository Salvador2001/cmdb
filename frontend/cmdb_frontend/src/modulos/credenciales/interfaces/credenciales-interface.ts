export interface Credencial {
    id: number;
    correo: string;
    contrasenia: string;
    usuario: number;
}

export interface CredencialAgregar {
    correo: string;
    contrasenia: string;
    usuario: number;
}

export interface CredencialAgregarSinUsuario {
    correo: string;
    contrasenia: string;
}