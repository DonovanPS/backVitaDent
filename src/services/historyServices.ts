import { PoolConnection } from 'mysql';
import pool from '../database';
import { deleteFiles } from '../utils/fileDelete';

class HistoryService {

    constructor() {


    }

    //insertar historia Odontologica con promesas

    public createOdontologia(dataOdontologia: any) {

       
        const {paciente, acudiente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales} = dataOdontologia


        return new Promise<any>((resolve, reject) => {
            pool.getConnection(async (err, conn) => {
                try {
                    conn.beginTransaction((err) => {
                        if (err) reject(err.sqlMessage);
                    });

                    await this.newHistory(paciente, conn);
                    await this.inserAcudiente(acudiente, conn);
                    await this.insertNewOdontologia(odontologia, conn);
                    await this.insertNewAnamnesis(anamnesis, conn);
                    await this.insertNewExamenPeriodontal(examenPeriodontal, conn);
                    await this.insertNewExamenTejidosBlnados(tejidosBlandos, conn);
                    await this.insertNewExamenTejidosDentales(tejidosDentales, conn);



                    conn.commit((err) => {
                        if (err) {

                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        } else {
                            resolve(true);
                        }
                    });
                } catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    })
                }
            });
        })


    }

    // insert paciente
    public newHistory(paciente: any, conn: PoolConnection) {
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
                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });

    }

    public inserAcudiente(dataAcudiente: any, conn: PoolConnection) {
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
            conn.query(
                'INSERT INTO acudientes ( nombre, apellido, fecha_nacimiento, parentesco, numero_celular, paciente_id) VALUES (?,?,?,?,?,?)', [

                dataAcudiente.nombre,
                dataAcudiente.apellido,
                dataAcudiente.fechaNacimiento,
                dataAcudiente.parentesco,
                dataAcudiente.telefono,
                dataAcudiente.id,
            ],
                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });


    }


    public insertNewOdontologia(dataOdontologia: any, conn: PoolConnection) {

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
                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });


    }


    public insertNewAnamnesis(dataAnamnesisi: any, conn: PoolConnection) {

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

                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });


    }


    public insertNewExamenPeriodontal(dataPeriodontal: any, conn : PoolConnection) {
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
                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });


    }


    public insertNewExamenTejidosBlnados(dataTejidosBlandos: any, conn : PoolConnection) {
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
                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });

   
    }

    public insertNewExamenTejidosDentales(dataTejidosDentales: any, conn : PoolConnection) {
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
                (err, result) => {
                    if (err) {

                        reject('pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });


    }


    // Muestra si existe los historiales

    public findHistory(id: string) {
        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT (SELECT CONCAT(nombre, " ", apellido) FROM pacientes WHERE paciente_id = ?)AS nombrePaciente, (SELECT COUNT(*) FROM historiales_odontologia WHERE odontologia_id = ?) AS numOdontologia, (SELECT COUNT(*) FROM historiales_ortodoncia WHERE ortodoncia_id = ?) AS numOrtodoncia', [
                        id,
                        id,
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

    }


    // obtiene datos del historial de cualquier historia
    public getHistory(id: string, tabla: string, nombreCampo: string) {

        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `SELECT * FROM ${tabla} WHERE ${nombreCampo} = ?`, [
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
    }

    // Elimina CUALQUIER HISTORIA
    public deleteHistory(id: string, tabla: string) {
        return new Promise<any>((resolve, reject) => {


            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `DELETE FROM ${tabla} WHERE odontologia_id = ?`, [
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
    }


    // Actualizar con Commit

    public updatePacienteWithTransaction(paciente: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE pacientes SET 
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
                    WHERE paciente_id = ${idAux}`,
                async (err, result) => {
                    if (err) {

                        reject('Pacientes Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updateAcudienteWithTransaction(acudienteData: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE acudientes SET
                
                nombre = '${acudienteData.nombre}',
                apellido = '${acudienteData.apellido}',
                fecha_nacimiento = '${acudienteData.fechaNacimiento}',
                parentesco = '${acudienteData.parentesco}',
                numero_celular = '${acudienteData.telefono}'
                 WHERE paciente_id = ${idAux}`,

                async (err, result) => {
                    if (err) {

                        reject('Acudiente Error:' + err.sqlMessage);
                    } else {

                        resolve(true);
                    }
                })
        })
    }

    public updateOdontologiaWithTransaction(odontologiaData: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE historiales_odontologia SET
                    odontologia_id = ${odontologiaData.odontologia_id},
                    higiene_oral = '${odontologiaData.higiene_oral}',
                    cepillado = '${odontologiaData.cepillado}',
                    numero_cepillado = '${odontologiaData.numero_cepillado}',
                    enjuague_bucal = '${odontologiaData.enjuague_bucal}',
                    seda_dental = '${odontologiaData.seda_dental}',
                    plan_tratamiento = '${odontologiaData.plan_tratamiento}',
                    paciente_id = ${odontologiaData.paciente_id}
                    WHERE odontologia_id = ${idAux}`, [

            ],

                async (err, result) => {
                    if (err) {

                        reject('Odontologia Error:' + err.sqlMessage);
                    } else {

                        resolve(true);
                    }
                })
        })
    }

    public updateAnamnesisWithTransaction(anamnesisData: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE anamnesis SET 
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
                    ` , [
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
            ],

                async (err, result) => {
                    if (err) {

                        reject('Anamnesis Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updateTejidosBlandosWithTransaction(tejidosBlandos: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examenes_tejidos_blandos SET 
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

            ],

                async (err, result) => {
                    if (err) {

                        reject('Tejidos Blandos Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updateTejidosDentalesWithTransaction(tejidosDentales: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examenes_tejidos_dentales SET 
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

            ],

                async (err, result) => {
                    if (err) {

                        reject('Tejidos Dentales Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })
    }

    public updatePeriodontalWithTransaction(examenPeriodontal: any, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examen_periodontal SET
                                periodontal_id = ${examenPeriodontal.examenPeriodontal_id},
                                bolsas = '${examenPeriodontal.bolsas}',
                                movilidad = '${examenPeriodontal.movilidad}',
                                placa_blanda = '${examenPeriodontal.placaBlanca}',
                                calculos = '${examenPeriodontal.calculos}',
                                observaciones = '${examenPeriodontal.observaciones}'
                                
                                WHERE periodontal_id = ${idAux}`,

                async (err, result) => {
                    if (err) {

                        reject('Periodontal Error:' + err.sqlMessage);
                    } else {

                        resolve(true);
                    }
                })
        })
    }


    public updateIdOrtodonciaWithTransaction(idAux: string, newId: string, conn: PoolConnection) {



        return new Promise(async (resolve, reject) => {
            // Verificar si el registro existe
            conn.query(
                `SELECT * FROM historiales_ortodoncia WHERE ortodoncia_id = ${idAux}`,
                async (err, result) => {
                    if (err) {

                        reject('Historia ortodoncia comprobacion si existe Error:' + err.sqlMessage);
                    } else {
                        if (result.length > 0) {
                            // Si el registro existe, actualizarlo
                            conn.query(
                                `UPDATE historiales_ortodoncia SET ortodoncia_id = ${newId} WHERE ortodoncia_id = ${idAux}`,
                                async (err, result) => {
                                    if (err) {

                                        reject('Existe pero fallo actualizando Error:' + err.sqlMessage);
                                    } else {
                                        resolve(true);
                                    }
                                }
                            );
                        } else {
                            // Si el registro no existe, devolver un error
                            //reject('Historia ortodoncia Error: Registro no encontrado');
                            resolve(true);
                        }
                    }
                }
            );
        });
    }


    //---------------------------------------------------------------------------------------



    public updateAllDataPaciente(idAux: string, pacienteData: any) {

        const { paciente, acudiente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales } = pacienteData



        return new Promise<any>((resolve, reject) => {
            pool.getConnection(async (err, conn) => {
                try {
                    conn.beginTransaction((err) => {
                        if (err) reject(err.sqlMessage);
                    });
                    await this.updatePacienteWithTransaction(paciente, idAux, conn);
                    await this.updateAcudienteWithTransaction(acudiente, idAux, conn);
                    await this.updateOdontologiaWithTransaction(odontologia, idAux, conn);
                    await this.updateAnamnesisWithTransaction(anamnesis, idAux, conn);
                    await this.updatePeriodontalWithTransaction(examenPeriodontal, idAux, conn);
                    await this.updateTejidosBlandosWithTransaction(tejidosBlandos, idAux, conn);
                    await this.updateTejidosDentalesWithTransaction(tejidosDentales, idAux, conn);
                    await this.updateIdOrtodonciaWithTransaction(idAux, paciente.id, conn);
                    conn.commit((err) => {
                        if (err) {

                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        } else {
                            resolve(true);
                        }
                    });
                } catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    })
                }
            });
        })
    }



    // ortodoncia

    public newHistoryOrtodoncia(ortodoncia: any) {


        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `INSERT INTO historiales_ortodoncia 
                        (ortodoncia_id, linea_media, overjet, 
                        overbite, perdida_dientes, migraciones, 
                        asimentria_facial, apinamiento_superior, apinamiento_inferior, 
                        perfil, habitos, relacion_canina_derecha, 
                        relacion_canina_izquierda, relacion_molar_derecha, relacion_molar_izquierda, 
                        mal_posicion_dental_superior, mal_posicion_dental_inferior, mordida_cruzada, 
                        otros, pronostico, plan_de_tratamiento, 
                        paciente_id, anamnesis_id) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
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

                reject(err)
            }

        });

    }


    //-------------------------------------------------- */
    public updateOrtodonciaWithTransaction(ortodoncia: any, idAux: string, conn: PoolConnection) {

        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE historiales_ortodoncia SET
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
                WHERE ortodoncia_id = ${idAux}`,

                async (err, result) => {
                    if (err) {

                        reject('Ortodoncia Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        })


    }

    // ---------------- actualizar ids de tablas relacionadas ------------------------------

    public updateOdontologiaIdWhitTransaction(newId: string, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE historiales_odontologia SET
                    odontologia_id = ${newId}
                    WHERE odontologia_id = ${idAux}`,
                (err, result) => {
                    if (err) {

                        reject('Odontologia ID Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });
    }


    public updatePeriodontalIdWhitTransaction(newId: string, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examen_periodontal SET
                periodontal_id = ${newId}
                    WHERE periodontal_id = ${idAux}`,
                (err, result) => {
                    if (err) {

                        reject('periodontal_id Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });
    }


    public updateBlandosIdWhitTransaction(newId: string, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examenes_tejidos_blandos SET
                tejidos_blandos_id = ${newId}
                    WHERE tejidos_blandos_id = ${idAux}`,
                (err, result) => {
                    if (err) {

                        reject('tejidos_blandos_id Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });
    }



    public updateDentalesIdWhitTransaction(newId: string, idAux: string, conn: PoolConnection) {
        return new Promise((resolve, reject) => {
            conn.query(
                `UPDATE examenes_tejidos_dentales SET
                tejidos_dentales_id = ${newId}
                    WHERE tejidos_dentales_id = ${idAux}`,
                (err, result) => {
                    if (err) {

                        reject('tejidos_dentales_id Error:' + err.sqlMessage);
                    } else {
                        resolve(true);
                    }
                })
        });
    }

    // -------------------------------------------------------------------------------------


    public updateAllDataPacienteOrtodoncia(idAux: string, ortodonciaData: any) {

        const [paciente, acudiente, anamnesis, ortodoncia] = ortodonciaData;



        const newId = paciente.id



        return new Promise<any>((resolve, reject) => {
            pool.getConnection(async (err, conn) => {
                try {
                    conn.beginTransaction((err) => {
                        if (err) reject(err.sqlMessage);
                    });
                    await this.updatePacienteWithTransaction(paciente, idAux, conn);
                    await this.updateAcudienteWithTransaction(acudiente, idAux, conn);
                    await this.updateOrtodonciaWithTransaction(ortodoncia, idAux, conn);
                    await this.updateAnamnesisWithTransaction(anamnesis, idAux, conn);

                    // actualizar ids
                    await this.updateOdontologiaIdWhitTransaction(newId, idAux, conn);
                    await this.updatePeriodontalIdWhitTransaction(newId, idAux, conn);
                    await this.updateBlandosIdWhitTransaction(newId, idAux, conn);
                    await this.updateDentalesIdWhitTransaction(newId, idAux, conn);

                    conn.commit((err) => {
                        if (err) {

                            conn.rollback(() => {
                                reject(err.sqlMessage);
                            });
                        } else {
                            resolve(true);
                        }
                    });
                } catch (error) {
                    conn.rollback(() => {
                        reject(error);
                    })
                }
            });
        })


    }

    deleteFilesImage = (names: string[]) => {

        const files = names.map((name) => ({ ruta: name }));
        deleteFiles(files);
    }

    // obtiene las radiografias de un paciente para eliminar
    public async getRadiografias(id: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            pool.query(`SELECT ruta FROM radiografias WHERE paciente_id = ?`, [id], (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                const names = results.map((row: any) => row.ruta);
                resolve(names);
            });
        });
    }


    public deleteHistoryOrtodoncia(id: string) {
        return new Promise<any>((resolve, reject) => {
            try {
                pool.getConnection(async (err, conn) => {
                    conn.beginTransaction(async (err) => {
                        if (err) {
                            throw err;
                        }

                        try {


                            const results = await this.getRadiografias(id);

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
                        } catch (error) {
                            return conn.rollback(() => {
                                reject(error);
                                throw error;
                            });
                        }
                    });
                });
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }


}

export default HistoryService;