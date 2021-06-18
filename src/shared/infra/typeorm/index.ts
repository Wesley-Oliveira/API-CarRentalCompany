import { Connection, createConnection, getConnectionOptions } from "typeorm";

// Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
// export default async (host = "database_ignite"): Promise<Connection> => { // remoção devido adaptação para deploy
export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
        Object.assign(defaultOptions, {
            // host: process.env.NODE_ENV === "test" ? "localhost" : host, // remoção devido adaptação para deploy
            database:
                process.env.NODE_ENV === "test"
                    ? "carrentalcompany_test"
                    : defaultOptions.database,
        })
    );
};
