import dotenv from "dotenv";

dotenv.config();

const requiredVariables = ["PORT", "NODE_ENV"];

requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(
            `Error: falta la variable de entorno ${variable}`
        );
    }
});

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;