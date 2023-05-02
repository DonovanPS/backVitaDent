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
const fileDelete_1 = require("../utils/fileDelete");
class PacienteService {
    constructor() {
        this.deleteFilesImage = (names) => {
            const files = names.map((name) => ({ ruta: name }));
            (0, fileDelete_1.deleteFiles)(files);
        };
    }
    getPacientes() {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`SELECT paciente_id, nombre, apellido
                        FROM pacientes
                        WHERE NOT EXISTS (
                          SELECT 1
                          FROM historiales_ortodoncia
                          WHERE historiales_ortodoncia.paciente_id = pacientes.paciente_id
                        )`, [], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result);
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
    getPaciente(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('SELECT * from pacientes where paciente_id = ?', [
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result);
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
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result[0]);
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
    // obtiene las radiografias de un paciente para eliminar
    getRadiografias(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query(`SELECT ruta FROM radiografias WHERE paciente_id = ?`, [id], (error, results, fields) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const names = results.map((row) => row.ruta);
                    resolve(names);
                });
            });
        });
    }
    /*public async delete(id: string) {
        return new Promise<any>((resolve, reject) => {


            try {

                //const results = await this.getRadiografias(id);

                //this.deleteFilesImage(results);

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `DELETE FROM pacientes WHERE paciente_id = ?`, [
                        id
                    ],
                        async (err, result) => {

                            if (err) {

                                reject(err.sqlMessage)

                            } else {
                                resolve(result)


                            }
                            conn.release();
                        }
                    );
                });


            } catch (err) {
                console.error(err);
                reject(err)
            }



        });

    }*/
    delete(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.beginTransaction((err) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            throw err;
                        }
                        try {
                            const results = yield this.getRadiografias(id);
                            this.deleteFilesImage(results);
                            const deleteHistoriales = new Promise((resolve, reject) => {
                                conn.query(`DELETE FROM pacientes WHERE paciente_id = ?`, [
                                    id
                                ], (error, results, fields) => {
                                    if (error) {
                                        return conn.rollback(() => {
                                            reject(error);
                                            throw error;
                                        });
                                    }
                                    resolve(true);
                                });
                            });
                            Promise.all([deleteHistoriales])
                                .then(() => {
                                conn.commit((err) => {
                                    if (err) {
                                        return conn.rollback(() => {
                                            reject(err);
                                            throw err;
                                        });
                                    }
                                    console.log("Registros eliminados con éxito");
                                    resolve(true);
                                });
                            })
                                .catch((error) => {
                                return conn.rollback(() => {
                                    reject(error);
                                    throw error;
                                });
                            });
                        }
                        catch (error) {
                            return conn.rollback(() => {
                                reject(error);
                                throw error;
                            });
                        }
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
