export const sequelize: Sequelize;
export namespace config {
    namespace development {
        let username: string;
        let password: string;
        let database: string;
        let host: string;
        let dialect: string;
        namespace dialectOptions {
            let charset: string;
        }
        let logging: boolean;
    }
    namespace production {
        let username_1: string;
        export { username_1 as username };
        let password_1: string;
        export { password_1 as password };
        let database_1: string;
        export { database_1 as database };
        let host_1: string;
        export { host_1 as host };
        let dialect_1: string;
        export { dialect_1 as dialect };
        export namespace dialectOptions_1 {
            let charset_1: string;
            export { charset_1 as charset };
        }
        export { dialectOptions_1 as dialectOptions };
        let logging_1: boolean;
        export { logging_1 as logging };
    }
    namespace test {
        let username_2: string;
        export { username_2 as username };
        let password_2: string;
        export { password_2 as password };
        let database_2: string;
        export { database_2 as database };
        let host_2: string;
        export { host_2 as host };
        let dialect_2: string;
        export { dialect_2 as dialect };
        export namespace dialectOptions_2 {
            let charset_2: string;
            export { charset_2 as charset };
        }
        export { dialectOptions_2 as dialectOptions };
        let logging_2: boolean;
        export { logging_2 as logging };
    }
}
import { Sequelize } from 'sequelize';
