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
class HistoryService {
    constructor() {
        this.deleteFilesImage = (names) => {
            const files = names.map((name) => ({ ruta: name }));
            (0, fileDelete_1.deleteFiles)(files);
        };
    }
    //insertar historia Odontologica con promesas
    createOdontologia(dataOdontologia) {
        const { paciente, acudiente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales } = dataOdontologia;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                try {
                    conn.beginTransaction((err) => {
                        if (err)
                            reject(err.sqlMessage);
                    });
                    yield this.newHistory(paciente, conn);
                    yield this.inserAcudiente(acudiente, conn);
                    yield this.insertNewOdontologia(odontologia, conn);
                    yield this.insertNewAnamnesis(anamnesis, conn);
                    yield this.insertNewExamenPeriodontal(examenPeriodontal, conn);
                    yield this.insertNewExamenTejidosBlnados(tejidosBlandos, conn);
                    yield this.insertNewExamenTejidosDentales(tejidosDentales, conn);
                    conn.commit((err) => {
                        if (err) {
                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        }
                        else {
                            resolve(true);
                        }
                    });
                }
                catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    });
                }
            }));
        });
    }
    // insert paciente
    newHistory(paciente, conn) {
        /*
        
                return new Promise<boolean>((resolve, reject) => {
        
                    try {
        
        
        
                        //console.log(paciente);
        
                        pool.getConnection(async (err, conn) => {
                            conn.query(
                                'INSERT INTO pacientes (paciente_id, nombre, apellido, estado_civil, ciudad_nacimiento, fecha_nacimiento, tipo_documento, servicio_salud, ocupacion, ciudad_residencia, direccion, numero_celular, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)', [
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
                                paciente.genero],
        
                                async (err, result) => {
        
                                    if (err) {
        
                                        reject(err.sqlMessage)
        
        
                                    } else {
                                        resolve(true)
        
                                    }
                                    conn.release();
        
        
                                }
                            );
                        });
        
        
        
                    } catch (error) {
                        // Enviar una respuesta con error al cliente
                        console.error(error);
                        reject(error)
                    }
        
                })
        */
        return new Promise((resolve, reject) => {
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
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    inserAcudiente(dataAcudiente, conn) {
        /* return new Promise<boolean>((resolve, reject) => {
 
             try {
 
                 pool.getConnection(async (err, conn) => {
                     conn.query(
                         'INSERT INTO acudientes ( nombre, apellido, fecha_nacimiento, parentesco, numero_celular, paciente_id) VALUES (?,?,?,?,?,?)', [
 
                         dataAcudiente.nombre,
                         dataAcudiente.apellido,
                         dataAcudiente.fechaNacimiento,
                         dataAcudiente.parentesco,
                         dataAcudiente.telefono,
                         dataAcudiente.id,
                     ],
                         async (err, result) => {
 
                             if (err) {
 
                                 reject(err.sqlMessage)
 
 
                             } else {
                                 resolve(true)
 
                             }
                             conn.release();
 
 
                         }
                     );
 
                 });
 
             } catch (err) {
                 // Enviar una respuesta con error al cliente
                 console.error(err);
                 reject(err)
             }
         });*/
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO acudientes ( nombre, apellido, fecha_nacimiento, parentesco, numero_celular, paciente_id) VALUES (?,?,?,?,?,?)', [
                dataAcudiente.nombre,
                dataAcudiente.apellido,
                dataAcudiente.fechaNacimiento,
                dataAcudiente.parentesco,
                dataAcudiente.telefono,
                dataAcudiente.id,
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    insertNewOdontologia(dataOdontologia, conn) {
        /*
        return new Promise<boolean>((resolve, reject) => {

            try {

                //insert datos de odontologia

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO historiales_odontologia (odontologia_id, higiene_oral, cepillado, numero_cepillado, enjuague_bucal, seda_dental, plan_tratamiento, paciente_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                        dataOdontologia.odontologia_id,
                        dataOdontologia.higiene_oral,
                        dataOdontologia.cepillado,
                        dataOdontologia.numero_cepillado,
                        dataOdontologia.enjuague_bucal,
                        dataOdontologia.seda_dental,
                        dataOdontologia.plan_tratamiento,
                        dataOdontologia.paciente_id
                    ],

                        async (err, result) => {

                            if (err) {

                                reject(err.sqlMessage)


                            } else {
                                resolve(true)

                            }
                            conn.release();


                        }
                    );
                });



            } catch (err) {
                // Enviar una respuesta con error al cliente
                console.error(err);
                reject(err)
            }

        });
        */
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO historiales_odontologia (odontologia_id, higiene_oral, cepillado, numero_cepillado, enjuague_bucal, seda_dental, plan_tratamiento, paciente_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                dataOdontologia.odontologia_id,
                dataOdontologia.higiene_oral,
                dataOdontologia.cepillado,
                dataOdontologia.numero_cepillado,
                dataOdontologia.enjuague_bucal,
                dataOdontologia.seda_dental,
                dataOdontologia.plan_tratamiento,
                dataOdontologia.paciente_id
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    insertNewAnamnesis(dataAnamnesisi, conn) {
        /*
                return new Promise<boolean>((resolve, reject) => {
        
                    try {
                        pool.getConnection(async (err, conn) => {
                            conn.query(
                                'INSERT INTO anamnesis ( anamnesis_id, hipertension, enfermedades_respiratorias, cardiopatias, sistema_digestivo, fiebre_reumatica, hepatitis, enfermedades_renales, enfermedades_gastrointestinales, quirurgico, traumatico, tratamiento_medico, toma_medicamentos, alergias, embarazo, diabetes, neoplasias, enfermedad_hemorrogica, nf_neurologicas, grupo_sanguineo, rh, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
                            ],
        
                                async (err, result) => {
                                    if (err) {
        
                                        reject(err.sqlMessage)
        
        
                                    } else {
                                        resolve(true)
        
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
        */
        return new Promise((resolve, reject) => {
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
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    insertNewExamenPeriodontal(dataPeriodontal, conn) {
        /*
                return new Promise<boolean>((resolve, reject) => {
        
                    try {
        
        
        
        
                        pool.getConnection(async (err, conn) => {
                            conn.query(
                                'INSERT INTO examen_periodontal (periodontal_id	, bolsas, movilidad, placa_blanda, calculos, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                                dataPeriodontal.examenPeriodontal_id,
                                dataPeriodontal.bolsas,
                                dataPeriodontal.movilidad,
                                dataPeriodontal.placaBlanca,
                                dataPeriodontal.calculos,
                                dataPeriodontal.observaciones,
                                dataPeriodontal.odontologia_id
                            ],
        
                                async (err, result) => {
        
                                    if (err) {
        
                                        reject(err.sqlMessage)
        
        
                                    } else {
                                        resolve(true)
        
                                    }
                                    conn.release();
        
                                }
        
                            )
                        })
        
        
                    } catch (err) {
                        console.error(err);
                        reject(err)
                    }
                });
        
                */
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO examen_periodontal (periodontal_id	, bolsas, movilidad, placa_blanda, calculos, observaciones, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                dataPeriodontal.examenPeriodontal_id,
                dataPeriodontal.bolsas,
                dataPeriodontal.movilidad,
                dataPeriodontal.placaBlanca,
                dataPeriodontal.calculos,
                dataPeriodontal.observaciones,
                dataPeriodontal.odontologia_id
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    insertNewExamenTejidosBlnados(dataTejidosBlandos, conn) {
        /* return new Promise<boolean>((resolve, reject) => {
 
 
 
 
             try {
 
                 pool.getConnection(async (err, conn) => {
 
                     conn.query(
                         'INSERT INTO examenes_tejidos_blandos (tejidos_blandos_id, labios, carrillos, frenillos, encias, paladar, lengua, orofaringe, glandulas, piso_boca, musculos_masticatorios, otros, odontologia_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
 
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
 
                     ],
 
                         async (err, result) => {
 
                             if (err) {
 
                                 reject(err.sqlMessage)
 
 
                             } else {
                                 resolve(true)
 
                             }
                             conn.release();
 
                         }
 
                     )
 
                 });
 
 
             } catch (err) {
 
                 reject(err)
             }
 
 
         });
         */
        return new Promise((resolve, reject) => {
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
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    insertNewExamenTejidosDentales(dataTejidosDentales, conn) {
        /*
                return new Promise<boolean>((resolve, reject) => {
        
        
                    try {
        
                        pool.getConnection(async (err, conn) => {
        
                            conn.query(
                                'INSERT INTO examenes_tejidos_dentales (tejidos_dentales_id, supernumerarios, abrasion, incluidos, maloclusiones, cambio_color, trauma, patologia_pulpar, otros, odontologia_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
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
                            ],
                                async (err, result) => {
                                    if (err) {
        
                                        reject(err.sqlMessage)
        
        
                                    } else {
                                        resolve(true)
        
                                    }
                                    conn.release();
                                }
                            );
        
                        });
        
                    } catch (err) {
                        // Enviar una respuesta con error al cliente
                        console.error(err);
                        reject(err);
                    }
        
                });*/
        return new Promise((resolve, reject) => {
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
            ], (err, result) => {
                if (err) {
                    reject('pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
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
    // obtiene datos del historial de cualquier historia
    getHistory(id, tabla, nombreCampo) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`SELECT * FROM ${tabla} WHERE ${nombreCampo} = ?`, [
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
    // Elimina CUALQUIER HISTORIA
    deleteHistory(id, tabla) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`DELETE FROM ${tabla} WHERE odontologia_id = ?`, [
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
    // Actualizar con Commit
    updatePacienteWithTransaction(paciente, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE pacientes SET 
                    paciente_id = ${paciente.id},
                    tipo_documento = '${paciente.tipoID}',
                    nombre = '${paciente.nombre}',
                    apellido = '${paciente.apellido}',
                    fecha_nacimiento = '${paciente.fechaNacimiento}',
                    sexo = '${paciente.genero}',
                    estado_civil = '${paciente.estadoCivil}',
                    ciudad_nacimiento = '${paciente.ciudadNacimiento}',
                    ocupacion = '${paciente.ocupacion}',
                    servicio_salud = '${paciente.servicioSalud}',
                    ciudad_residencia = '${paciente.ciudadResidencia}',
                    direccion = '${paciente.direccion}',
                    numero_celular = '${paciente.celular}'
                    WHERE paciente_id = ${idAux}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Pacientes Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updateAcudienteWithTransaction(acudienteData, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE acudientes SET
                
                nombre = '${acudienteData.nombre}',
                apellido = '${acudienteData.apellido}',
                fecha_nacimiento = '${acudienteData.fechaNacimiento}',
                parentesco = '${acudienteData.parentesco}',
                numero_celular = '${acudienteData.telefono}'
                 WHERE paciente_id = ${idAux}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Acudiente Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updateOdontologiaWithTransaction(odontologiaData, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE historiales_odontologia SET
                    odontologia_id = ${odontologiaData.odontologia_id},
                    higiene_oral = '${odontologiaData.higiene_oral}',
                    cepillado = '${odontologiaData.cepillado}',
                    numero_cepillado = '${odontologiaData.numero_cepillado}',
                    enjuague_bucal = '${odontologiaData.enjuague_bucal}',
                    seda_dental = '${odontologiaData.seda_dental}',
                    plan_tratamiento = '${odontologiaData.plan_tratamiento}',
                    paciente_id = ${odontologiaData.paciente_id}
                    WHERE odontologia_id = ${idAux}`, [], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Odontologia Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updateAnamnesisWithTransaction(anamnesisData, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE anamnesis SET 
                    anamnesis_id = ?, 
                    hipertension = ?, 
                    enfermedades_respiratorias = ?, 
                    cardiopatias = ?, 
                    sistema_digestivo = ?, 
                    fiebre_reumatica = ?, 
                    hepatitis = ?, 
                    enfermedades_renales = ?, 
                    enfermedades_gastrointestinales = ?, 
                    quirurgico = ?, 
                    traumatico = ?, 
                    tratamiento_medico = ?, 
                    toma_medicamentos = ?, 
                    alergias = ?, 
                    embarazo = ?, 
                    diabetes = ?, 
                    neoplasias = ?, 
                    enfermedad_hemorrogica = ?, 
                    nf_neurologicas = ?, 
                    grupo_sanguineo = ?, 
                    rh = ?, 
                    observaciones = ?
                    WHERE anamnesis_id = ?
                    `, [
                anamnesisData.anamnesis_id,
                anamnesisData.hipertencion,
                anamnesisData.enfe_respiratorias,
                anamnesisData.cardiopatias,
                anamnesisData.sistema_digestivo,
                anamnesisData.fiebre_reumatica,
                anamnesisData.hepatitis,
                anamnesisData.enfer_renales,
                anamnesisData.enfer_gastrointestinales,
                anamnesisData.quirurgico,
                anamnesisData.traumatico,
                anamnesisData.tratamiento_medico,
                anamnesisData.toma_medicamento,
                anamnesisData.alergia,
                anamnesisData.embarazo,
                anamnesisData.diabetes,
                anamnesisData.neoplasias,
                anamnesisData.enfer_hemorrogicas,
                anamnesisData.nf_neurologicas,
                anamnesisData.grupo_sangineo,
                anamnesisData.rh,
                anamnesisData.observaciones,
                idAux
            ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Anamnesis Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updateTejidosBlandosWithTransaction(tejidosBlandos, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE examenes_tejidos_blandos SET 
                tejidos_blandos_id = ?,
                labios = ?,
                carrillos = ?,
                frenillos = ?,
                encias = ?,
                paladar = ?,
                lengua = ?,
                orofaringe = ?,
                glandulas = ?,
                piso_boca = ?,
                musculos_masticatorios = ?,
                otros = ?
                WHERE tejidos_blandos_id = ?`, [
                tejidosBlandos.tejidos_blandos_id,
                tejidosBlandos.labios,
                tejidosBlandos.carrillos,
                tejidosBlandos.frenillos,
                tejidosBlandos.encias,
                tejidosBlandos.paladar,
                tejidosBlandos.lengua,
                tejidosBlandos.orofaringe,
                tejidosBlandos.glandulas,
                tejidosBlandos.piso_boca,
                tejidosBlandos.musculos_masticatorios,
                tejidosBlandos.otros,
                idAux
            ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Tejidos Blandos Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updateTejidosDentalesWithTransaction(tejidosDentales, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE examenes_tejidos_dentales SET 
                tejidos_dentales_id = ?,
                supernumerarios = ?,
                abrasion = ?,
                incluidos = ?,
                maloclusiones = ?,
                cambio_color = ?,
                trauma = ?,
                patologia_pulpar = ?,
                otros = ?
                WHERE tejidos_dentales_id = ?`, [
                tejidosDentales.tejidos_dentales_id,
                tejidosDentales.supernumerarios,
                tejidosDentales.abrasion,
                tejidosDentales.incluidos,
                tejidosDentales.maloclusiones,
                tejidosDentales.cambio_color,
                tejidosDentales.trauma,
                tejidosDentales.patologia_pulmonar,
                tejidosDentales.otros,
                idAux
            ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Tejidos Dentales Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updatePeriodontalWithTransaction(examenPeriodontal, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE examen_periodontal SET
                                periodontal_id = ${examenPeriodontal.examenPeriodontal_id},
                                bolsas = '${examenPeriodontal.bolsas}',
                                movilidad = '${examenPeriodontal.movilidad}',
                                placa_blanda = '${examenPeriodontal.placaBlanca}',
                                calculos = '${examenPeriodontal.calculos}',
                                observaciones = '${examenPeriodontal.observaciones}'
                                
                                WHERE periodontal_id = ${idAux}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Periodontal Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    updateIdOrtodonciaWithTransaction(idAux, newId, conn) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // Verificar si el registro existe
            conn.query(`SELECT * FROM historiales_ortodoncia WHERE ortodoncia_id = ${idAux}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Historia ortodoncia comprobacion si existe Error:' + err.sqlMessage);
                }
                else {
                    if (result.length > 0) {
                        // Si el registro existe, actualizarlo
                        conn.query(`UPDATE historiales_ortodoncia SET ortodoncia_id = ${newId} WHERE ortodoncia_id = ${idAux}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                reject('Existe pero fallo actualizando Error:' + err.sqlMessage);
                            }
                            else {
                                resolve(true);
                            }
                        }));
                    }
                    else {
                        // Si el registro no existe, devolver un error
                        //reject('Historia ortodoncia Error: Registro no encontrado');
                        resolve(true);
                    }
                }
            }));
        }));
    }
    //---------------------------------------------------------------------------------------
    updateAllDataPaciente(idAux, pacienteData) {
        const { paciente, acudiente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales } = pacienteData;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                try {
                    conn.beginTransaction((err) => {
                        if (err)
                            reject(err.sqlMessage);
                    });
                    yield this.updatePacienteWithTransaction(paciente, idAux, conn);
                    yield this.updateAcudienteWithTransaction(acudiente, idAux, conn);
                    yield this.updateOdontologiaWithTransaction(odontologia, idAux, conn);
                    yield this.updateAnamnesisWithTransaction(anamnesis, idAux, conn);
                    yield this.updatePeriodontalWithTransaction(examenPeriodontal, idAux, conn);
                    yield this.updateTejidosBlandosWithTransaction(tejidosBlandos, idAux, conn);
                    yield this.updateTejidosDentalesWithTransaction(tejidosDentales, idAux, conn);
                    yield this.updateIdOrtodonciaWithTransaction(idAux, paciente.id, conn);
                    conn.commit((err) => {
                        if (err) {
                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        }
                        else {
                            resolve(true);
                        }
                    });
                }
                catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    });
                }
            }));
        });
    }
    // ortodoncia
    newHistoryOrtodoncia(ortodoncia) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`INSERT INTO historiales_ortodoncia 
                        (ortodoncia_id, linea_media, overjet, 
                        overbite, perdida_dientes, migraciones, 
                        asimentria_facial, apinamiento_superior, apinamiento_inferior, 
                        perfil, habitos, relacion_canina_derecha, 
                        relacion_canina_izquierda, relacion_molar_derecha, relacion_molar_izquierda, 
                        mal_posicion_dental_superior, mal_posicion_dental_inferior, mordida_cruzada, 
                        otros, pronostico, plan_de_tratamiento, 
                        paciente_id, anamnesis_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                        ortodoncia.ortodoncia_id,
                        ortodoncia.linea_media,
                        ortodoncia.overjet,
                        ortodoncia.overbite,
                        ortodoncia.perdida_dientes,
                        ortodoncia.migraciones,
                        ortodoncia.asimentria_facial,
                        ortodoncia.apinamiento_superior,
                        ortodoncia.apinamiento_inferior,
                        ortodoncia.perfil,
                        ortodoncia.habitos,
                        ortodoncia.relacion_canina_derecha,
                        ortodoncia.relacion_canina_izquierda,
                        ortodoncia.relacion_molar_derecha,
                        ortodoncia.relacion_molar_izquierda,
                        ortodoncia.mal_posicion_dental_superior,
                        ortodoncia.mal_posicion_dental_inferior,
                        ortodoncia.mordida_cruzada,
                        ortodoncia.otros,
                        ortodoncia.pronostico,
                        ortodoncia.plan_de_tratamiento,
                        ortodoncia.ortodoncia_id,
                        ortodoncia.ortodoncia_id
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
                reject(err);
            }
        });
    }
    //-------------------------------------------------- */
    updateOrtodonciaWithTransaction(ortodoncia, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE historiales_ortodoncia SET
                ortodoncia_id = ${ortodoncia.ortodoncia_id},
                linea_media = '${ortodoncia.linea_media}',
                overjet = '${ortodoncia.overjet}',
                overbite = '${ortodoncia.overbite}',
                perdida_dientes = '${ortodoncia.perdida_dientes}',
                migraciones = '${ortodoncia.migraciones}',
                asimentria_facial = '${ortodoncia.asimentria_facial}',
                apinamiento_superior = '${ortodoncia.apinamiento_superior}',
                apinamiento_inferior = '${ortodoncia.apinamiento_inferior}',
                perfil = '${ortodoncia.perfil}',
                habitos = '${ortodoncia.habitos}',
                relacion_canina_derecha = '${ortodoncia.relacion_canina_derecha}',
                relacion_canina_izquierda = '${ortodoncia.relacion_canina_izquierda}',
                relacion_molar_derecha = '${ortodoncia.relacion_molar_derecha}',
                relacion_molar_izquierda = '${ortodoncia.relacion_molar_izquierda}',
                mal_posicion_dental_superior = '${ortodoncia.mal_posicion_dental_superior}',
                mal_posicion_dental_inferior = '${ortodoncia.mal_posicion_dental_inferior}',
                mordida_cruzada = '${ortodoncia.mordida_cruzada}',
                otros = '${ortodoncia.otros}',
                pronostico = '${ortodoncia.pronostico}',
                plan_de_tratamiento = '${ortodoncia.plan_de_tratamiento}'                
                WHERE ortodoncia_id = ${idAux}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject('Ortodoncia Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            }));
        });
    }
    // ---------------- actualizar ids de tablas relacionadas ------------------------------
    updateOdontologiaIdWhitTransaction(newId, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE historiales_odontologia SET
                    odontologia_id = ${newId}
                    WHERE odontologia_id = ${idAux}`, (err, result) => {
                if (err) {
                    reject('Odontologia ID Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updatePeriodontalIdWhitTransaction(newId, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE examen_periodontal SET
                periodontal_id = ${newId}
                    WHERE periodontal_id = ${idAux}`, (err, result) => {
                if (err) {
                    reject('periodontal_id Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateBlandosIdWhitTransaction(newId, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE examenes_tejidos_blandos SET
                tejidos_blandos_id = ${newId}
                    WHERE tejidos_blandos_id = ${idAux}`, (err, result) => {
                if (err) {
                    reject('tejidos_blandos_id Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    updateDentalesIdWhitTransaction(newId, idAux, conn) {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE examenes_tejidos_dentales SET
                tejidos_dentales_id = ${newId}
                    WHERE tejidos_dentales_id = ${idAux}`, (err, result) => {
                if (err) {
                    reject('tejidos_dentales_id Error:' + err.sqlMessage);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    // -------------------------------------------------------------------------------------
    updateAllDataPacienteOrtodoncia(idAux, ortodonciaData) {
        const [paciente, acudiente, anamnesis, ortodoncia] = ortodonciaData;
        const newId = paciente.id;
        return new Promise((resolve, reject) => {
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                try {
                    conn.beginTransaction((err) => {
                        if (err)
                            reject(err.sqlMessage);
                    });
                    yield this.updatePacienteWithTransaction(paciente, idAux, conn);
                    yield this.updateAcudienteWithTransaction(acudiente, idAux, conn);
                    yield this.updateOrtodonciaWithTransaction(ortodoncia, idAux, conn);
                    yield this.updateAnamnesisWithTransaction(anamnesis, idAux, conn);
                    // actualizar ids
                    yield this.updateOdontologiaIdWhitTransaction(newId, idAux, conn);
                    yield this.updatePeriodontalIdWhitTransaction(newId, idAux, conn);
                    yield this.updateBlandosIdWhitTransaction(newId, idAux, conn);
                    yield this.updateDentalesIdWhitTransaction(newId, idAux, conn);
                    conn.commit((err) => {
                        if (err) {
                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        }
                        else {
                            resolve(true);
                        }
                    });
                }
                catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    });
                }
            }));
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
    deleteHistoryOrtodoncia(id) {
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
                                conn.query(`DELETE FROM historiales_ortodoncia WHERE ortodoncia_id = ?`, [id], (error, results, fields) => {
                                    if (error) {
                                        return conn.rollback(() => {
                                            reject(error);
                                            throw error;
                                        });
                                    }
                                    resolve(true);
                                });
                            });
                            const deleteRadiografias = new Promise((resolve, reject) => {
                                conn.query(`DELETE FROM radiografias WHERE paciente_id = ?`, [id], (error, results, fields) => {
                                    if (error) {
                                        return conn.rollback(() => {
                                            reject(error);
                                            throw error;
                                        });
                                    }
                                    resolve(true);
                                });
                            });
                            Promise.all([deleteHistoriales, deleteRadiografias])
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
exports.default = HistoryService;
