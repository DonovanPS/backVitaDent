"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mySql_1 = __importDefault(require("./mySql"));
const mysql_1 = __importDefault(require("mysql"));
//  "build": "tsc -w" // para que se actualice automaticamente el archivo js hay que agregarlo en el package.json
const pool = mysql_1.default.createPool(mySql_1.default.database);
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    connection.release();
    console.log('DB is connected');
});
exports.default = pool;
