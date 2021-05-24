declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        // Sobrescrevendo tipo da biblioteca
        // Com isso dá pra pegar o user com request.user
        user: {
            id: string;
        };
    }
}
