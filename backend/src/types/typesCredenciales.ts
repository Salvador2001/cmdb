export interface Credencial {
    id: number;
    correo: string;
    contrasenia: string;
    usuario: number;
}

export interface CredencialNueva {
    correo: string;
    contrasenia: string;
    usuario: number;
}