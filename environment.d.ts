declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            PORT: number;
            MONGO_URL: string;
        }
    }
}

// convert this to a module
export { };