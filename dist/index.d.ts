export interface Config {
    apiKey: string;
    baseId: string;
    endpointUrl?: string;
    requestTimeout?: number;
    customHeaders?: Record<string, string | number | boolean>;
}
export declare const main: (config: Config) => Promise<string>;
