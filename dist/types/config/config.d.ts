export default config;
declare namespace config {
    namespace development {
        let username: string | undefined;
        let password: string | undefined;
        let database: string | undefined;
        let host: string | undefined;
        let dialect: string;
    }
    namespace production {
        let username_1: string | undefined;
        export { username_1 as username };
        let password_1: string | undefined;
        export { password_1 as password };
        let database_1: string | undefined;
        export { database_1 as database };
        let host_1: string | undefined;
        export { host_1 as host };
        let dialect_1: string;
        export { dialect_1 as dialect };
    }
}
