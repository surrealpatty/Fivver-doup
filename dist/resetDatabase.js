"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const resetDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Starting database reset process...');
        console.log('Dropping all tables...');
        yield database_1.sequelize.drop();
        console.log('Tables dropped successfully.');
        console.log('Re-syncing database...');
        yield database_1.sequelize.sync({ force: true });
        console.log('Database re-synced successfully!');
    }
    catch (error) {
        console.error('Error resetting the database:', error);
    }
    finally {
        console.log('Database reset process complete.');
        process.exit(0);
    }
});
resetDatabase();
