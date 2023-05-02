import pool from '../database';
import { saveFile } from '../utils/fileCreator';
import { deleteFile } from '../utils/fileDelete';


class ImageService {

    public uploadImage(image: Express.Multer.File, id: string, title: string, description: string, history: string) {
        return new Promise<any>((resolve, reject) => {
            const ruta = image.originalname;
           // console.log(image.originalname); // Imprime el nombre original del archivo

            pool.getConnection(async (err, conn) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                // Consultar si la imagen ya existe en la base de datos
                conn.query(
                    'SELECT COUNT(*) as count FROM radiografias WHERE ruta = ? AND paciente_id = ?',
                    [ruta, id],
                    async (err, result) => {
                        if (err) {
                            console.error(err);
                            reject(err.sqlMessage);
                            conn.release();
                            return;
                        }

                        const count = result[0].count;
                        if (count > 0) {
                            // Si la imagen ya existe, rechazar la promesa
                            reject("La imagen ya ha sido subida anteriormente.");
                            conn.release();
                            return;
                        }

                        // Si la imagen no existe, insertarla en la base de datos
                        saveFile(ruta, image);
                        conn.query(
                            'INSERT INTO radiografias (titulo, descripcion, ruta, historia ,paciente_id) VALUES (?,?,?,?,?)', [
                            title, 
                            description, 
                            ruta, 
                            history,
                            id],
                            async (err, result) => {
                                if (err) {
                                    console.error(err);
                                    reject(err.sqlMessage);
                                } else {
                                    //console.log("Result: ");
                                    //console.log(result);
                                    resolve(result);
                                }
                                conn.release();
                            }
                        );
                    }
                );
            });
        });
    }

    public getImagesID(id: string, history: string) {
        return new Promise<any>((resolve, reject) => {

            try {

                pool.getConnection(async (err, conn) => {

                    // Consultar si la imagen existe en la base de datos
                    conn.query(
                        'SELECT * FROM radiografias WHERE paciente_id = ? AND historia = ? OR historia = "Urgencia"',
                        [
                            id,
                            history
                        ],
                        async (err, result) => {
                            if (err) {
                                console.error(err);
                                reject(err.sqlMessage);
                                conn.release();
                                return;
                            }

                            resolve(result);
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


    public deleteImage(id: string, ruta: string) {
        return new Promise<any>((resolve, reject) => {

            try {

                

                pool.getConnection(async (err, conn) => {

                    
                    conn.query(
                        'DELETE FROM radiografias WHERE radiografia_id = ?',
                        [
                            id
                        ],
                        async (err, result) => {
                            if (err) {
                                console.error(err);
                                reject(err.sqlMessage);
                                conn.release();
                                return;
                            }
                            deleteFile(ruta);  // elimina la imagen de la carpeta
                            resolve(result);
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

    public updateImage(image: Express.Multer.File, idImagen: string, title: string, description: string, history: string ,rutaAnterior: string) {

        return new Promise<any>((resolve, reject) => {

            try {

                const Nuevaruta = image.originalname;

                pool.getConnection(async (err, conn) => {

                    
                    conn.query(
                        `UPDATE radiografias SET 
                        titulo = '${title}',
                        descripcion = '${description}',
                        ruta = '${Nuevaruta}',
                        historia = '${history}'
                        WHERE radiografia_id = ${idImagen}`,
                        [
                        ],
                        async (err, result) => {
                            if (err) {
                                console.error(err);
                                reject(err.sqlMessage);
                                conn.release();
                                return;
                            }

            
                            deleteFile(rutaAnterior);  // elimina la imagen de la carpeta
                            saveFile(image.originalname, image); // guarda la nueva imagen en la carpeta
                            resolve(result);
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



    public updateImageOnlyDB(idImagen: string, title: string, description: string, history: string ,rutaAnterior: string) {

        return new Promise<any>((resolve, reject) => {

            try {

               

                pool.getConnection(async (err, conn) => {

                    
                    conn.query(
                        `UPDATE radiografias SET 
                        titulo = '${title}',
                        descripcion = '${description}',
                        historia = '${history}'
                        WHERE radiografia_id = ${idImagen}`,
                        [
                        ],
                        async (err, result) => {
                            if (err) {
                                console.error(err);
                                reject(err.sqlMessage);
                                conn.release();
                                return;
                            }

                            resolve(result);
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


}
export default ImageService;