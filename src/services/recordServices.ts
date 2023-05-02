import pool from "../database";

class RecordService {


    public findRecords() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM registros', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }


    public findRecordsID(id: string, consulta: string) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM registros WHERE paciente_id = ? and consulta = ?', [
                id,
                consulta
            ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    public create(fecha: string, id: string, consulta: string, descripcion: string, procedimiento: string, precio: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {


          
            

            try {
                pool.getConnection(async (err, conn) => {
                    conn.query(
                        'INSERT INTO registros (fecha, paciente_id, consulta, descripcion, procedimiento, precio) VALUES (?,?,?,?,?,?)', [
                        fecha,
                        id,
                        consulta,
                        descripcion,
                        procedimiento,
                        precio
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
    }


    public delete(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            pool.query('DELETE FROM registros WHERE registro_id = ?', [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    public update(fecha: string, id: string, consulta: string, descripcion: string, procedimiento: string, precio: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            pool.query('UPDATE registros SET fecha = ?, consulta = ?, descripcion = ?, procedimiento = ?, precio = ? WHERE registro_id = ?', [
                fecha,
                consulta,
                descripcion,
                procedimiento,
                precio,
                id
            ], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

}

export default RecordService;