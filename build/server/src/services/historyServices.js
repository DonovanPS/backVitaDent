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
class HistoryService {
    constructor() {
    }
    newHistory(paciente) {
        return new Promise((resolve, reject) => {
            try {
                //obtienen datos de odontologia
                console.log(paciente);
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO pacientes (paciente_id, nombre, apellido, estado_civil, ciudad_nacimiento, fecha_nacimiento, tipo_documento, servicio_salud, ocupacion, ciudad_residencia, direccion, numero_celular, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)', [
                        paciente.id,
                        paciente.nombre,
                        paciente.apellido,
                        paciente.estadoCivil,
                        paciente.ciudadNacimiento,
                        paciente.fechaNacimiento,
                        paciente.tipoID,
                        paciente.servicioSalud,
                        paciente.ocupacion,
                        paciente.ciudadResidencia,
                        paciente.direccion,
                        paciente.celular,
                        paciente.genero
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
            catch (error) {
                // Enviar una respuesta con error al cliente
                console.error(error);
                reject(error);
            }
        });
    }
    inserAcudiente(dataAcudiente) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO acudientes ( nombre, apellido, fecha_nacimiento, parentesco, numero_celular, paciente_id) VALUES (?,?,?,?,?,?)', [
                        dataAcudiente.nombre,
                        dataAcudiente.apellido,
                        dataAcudiente.fechaNacimiento,
                        dataAcudiente.parentesco,
                        dataAcudiente.telefono,
                        dataAcudiente.id,
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
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err);
            }
        });
    }
    insertNewOdontologia(dataOdontologia) {
        return new Promise((resolve, reject) => {
            try {
                //insert datos de odontologia
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO historiales_odontologia (odontologia_id, higiene_oral, cepillado, numero_cepillado, enjuague_bucal, seda_dental, plan_tratamiento, paciente_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataOdontologia.odontologia_id,
                        dataOdontologia.higiene_oral,
                        dataOdontologia.cepillado,
                        dataOdontologia.numero_cepillado,
                        dataOdontologia.enjuague_bucal,
                        dataOdontologia.seda_dental,
                        dataOdontologia.plan_tratamiento,
                        dataOdontologia.paciente_id
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
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err);
            }
        });
    }
    insertNewAnamnesis(dataAnamnesisi) {
        console.log(dataAnamnesisi);
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO anamnesis ( anamnesis_id, hipertension, enfermedades_respiratorias, cardiopatias, sistema_digestivo, fiebre_reumatica, hepatitis, enfermedades_renales, enfermedades_gastrointestinales, quirurgico, traumatico, tratamiento_medico, toma_medicamentos, alergias, embarazo, diabetes, neoplasias, enfermedad_hemorrogica, nf_neurologicas, grupo_sanguineo, rh, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataAnamnesisi.anamnesis_id,
                        dataAnamnesisi.hipertencion,
                        dataAnamnesisi.enfe_respiratorias,
                        dataAnamnesisi.cardiopatias,
                        dataAnamnesisi.sistema_digestivo,
                        dataAnamnesisi.fiebre_reumatica,
                        dataAnamnesisi.hepatitis,
                        dataAnamnesisi.enfer_renales,
                        dataAnamnesisi.enfer_gastrointestinales,
                        dataAnamnesisi.quirurgico,
                        dataAnamnesisi.traumatico,
                        dataAnamnesisi.tratamiento_medico,
                        dataAnamnesisi.toma_medicamento,
                        dataAnamnesisi.alergia,
                        dataAnamnesisi.embarazo,
                        dataAnamnesisi.diabetes,
                        dataAnamnesisi.neoplasias,
                        dataAnamnesisi.enfer_hemorrogicas,
                        dataAnamnesisi.nf_neurologicas,
                        dataAnamnesisi.grupo_sangineo,
                        dataAnamnesisi.rh,
                        dataAnamnesisi.observaciones,
                        dataAnamnesisi.odontologia_id
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
    insertNewExamenPeriodontal(dataPeriodontal) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO examen_periodontal (periodontal_id	, bolsas, movilidad, placa_blanda, calculos, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                        dataPeriodontal.examenPeriodontal_id,
                        dataPeriodontal.bolsas,
                        dataPeriodontal.movilidad,
                        dataPeriodontal.placaBlanca,
                        dataPeriodontal.calculos,
                        dataPeriodontal.observaciones,
                        dataPeriodontal.odontologia_id
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
    insertNewExamenTejidosBlnados(dataTejidosBlandos) {
        return new Promise((resolve, reject) => {
            console.log("tejidos dentales");
            console.log(dataTejidosBlandos);
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO examenes_tejidos_blandos (tejidos_blandos_id, labios, carrillos, frenillos, encias, paladar, lengua, orofaringe, glandulas, piso_boca, musculos_masticatorios, otros, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataTejidosBlandos.tejidos_blandos_id,
                        dataTejidosBlandos.labios,
                        dataTejidosBlandos.carrillos,
                        dataTejidosBlandos.frenillos,
                        dataTejidosBlandos.encias,
                        dataTejidosBlandos.paladar,
                        dataTejidosBlandos.lengua,
                        dataTejidosBlandos.orofaringe,
                        dataTejidosBlandos.glandulas,
                        dataTejidosBlandos.piso_boca,
                        dataTejidosBlandos.musculos_masticatorios,
                        dataTejidosBlandos.otros,
                        dataTejidosBlandos.odontologia_id
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
                console.log(err);
                reject(err);
            }
        });
    }
    insertNewExamenTejidosDentales(dataTejidosDentales) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO examenes_tejidos_dentales (tejidos_dentales_id, supernumerarios, abrasion, incluidos, maloclusiones, cambio_color, trauma, patologia_pulpar, otros, odontologia_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataTejidosDentales.tejidos_dentales_id,
                        dataTejidosDentales.supernumerarios,
                        dataTejidosDentales.abrasion,
                        dataTejidosDentales.incluidos,
                        dataTejidosDentales.maloclusiones,
                        dataTejidosDentales.cambio_color,
                        dataTejidosDentales.trauma,
                        dataTejidosDentales.patologia_pulmonar,
                        dataTejidosDentales.otros,
                        dataTejidosDentales.odontologia_id
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
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err);
            }
        });
    }
    // Muestra si existe los historiales
    findHistory(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('SELECT (SELECT CONCAT(nombre, " ", apellido) FROM pacientes WHERE paciente_id = ?)AS nombrePaciente, (SELECT COUNT(*) FROM historiales_odontologia WHERE odontologia_id = ?) AS numOdontologia, (SELECT COUNT(*) FROM historiales_ortodoncia WHERE ortodoncia_id = ?) AS numOrtodoncia', [
                        id,
                        id,
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error: " + err);
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result);
                            console.log("Result: ");
                            console.log(result);
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
    // obtiene datos del historial de odontologia
    getHistory(id, tabla, nombreCampo) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`SELECT * FROM ${tabla} WHERE ${nombreCampo} = ?`, [
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error: " + err);
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result);
                            console.log("Result: ");
                            console.log(result);
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
    deleteHistory(id, tabla) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`DELETE FROM ${tabla} WHERE odontologia_id = ?`, [
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.log("Error: " + err);
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(result);
                            console.log("Result: ");
                            console.log(result);
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
    // Actualizar
    updatePaciente(Paciente) {
    }
}
exports.default = HistoryService;
