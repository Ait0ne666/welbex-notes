
export interface Config {
    jwtSecret: string,
    refreshSecret: string,
    dbString: string,
    broker: string,
    topic: string
}