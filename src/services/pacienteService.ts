import pool from '../database';
import { deleteFiles } from '../utils/fileDelete';

class PacienteService {

    public getPacientes() {
        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        `SELECT paciente_id, nombre, apellido
                        FROM pacientes
                        WHERE NOT EXISTS (
                          SELECT 1
                          FROM historiales_ortodoncia
                          WHERE historiales_ortodoncia.paciente_id = pacientes.paciente_id
                        )`, [
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

    public getPaciente(id: string) {

        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT * from pacientes where paciente_id = ?', [
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


    public countuser(id: string) {

        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'SELECT count(*) as numUsers from pacientes where paciente_id = ?', [
                        id
                    ],
                        async (err, result) => {

                            if (err) {

                                reject(err.sqlMessage)


                            } else {
                                resolve(result[0])

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

    deleteFilesImage = (names: string[]) => {

        const files = names.map((name) => ({ ruta: name }));
        deleteFiles(files);
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

    
    public delete(id: string) {
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
                                conn.query(
                                    `DELETE FROM pacientes WHERE paciente_id = ?`, [
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
export default PacienteService;