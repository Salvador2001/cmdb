export const dateHelper = () => {

    const getFecha = (fecha: string) => {
        return fecha.split('T')[0];
    }

    const getFechaYHora = (fecha: string) => {
        return fecha.substring(0, 16);
    }

    return {
        getFecha,
        getFechaYHora
    }
}