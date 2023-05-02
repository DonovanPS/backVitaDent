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
class RecordService {
    findRecords() {
        return new Promise((resolve, reject) => {
            database_1.default.query('SELECT * FROM registros', (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    findRecordsID(id, consulta) {
        return new Promise((resolve, reject) => {
            database_1.default.query('SELECT * FROM registros WHERE paciente_id = ? and consulta = ?', [
                id,
                consulta
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    create(fecha, id, consulta, descripcion, procedimiento, precio) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO registros (fecha, paciente_id, consulta, descripcion, procedimiento, precio) VALUES (?,?,?,?,?,?)', [
                        fecha,
                        id,
                        consulta,
                        descripcion,
                        procedimiento,
                        precio
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(true);
                        }
                        conn.release();
                    }));
                }));
            }
            catch (err) {
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err);
            }
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            database_1.default.query('DELETE FROM registros WHERE registro_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    update(fecha, id, consulta, descripcion, procedimiento, precio) {
        return new Promise((resolve, reject) => {
            database_1.default.query('UPDATE registros SET fecha = ?, consulta = ?, descripcion = ?, procedimiento = ?, precio = ? WHERE registro_id = ?', [
                fecha,
                consulta,
                descripcion,
                procedimiento,
                precio,
                id
            ], (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.default = RecordService;
