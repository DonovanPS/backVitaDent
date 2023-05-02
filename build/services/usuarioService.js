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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class PacienteService {
    getUser(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('SELECT paciente_id from pacientes where paciente_id = ?', [
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error: " + err);
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(true);
                            console.log("Result: " + result);
                        }
                        conn.release();
                    }));
                }));
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    countuser(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('SELECT count(*) as numUsers from pacientes where paciente_id = ?', [
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error: " + err);
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result[0]);
                            console.log("Result: " + result);
                        }
                        conn.release();
                    }));
                }));
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
}
exports.default = PacienteService;
