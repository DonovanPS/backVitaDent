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
const fileCreator_1 = require("../utils/fileCreator");
const fileDelete_1 = require("../utils/fileDelete");
class ImageService {
    uploadImage(image, id, title, description, history) {
        return new Promise((resolve, reject) => {
            const ruta = image.originalname;
            // console.log(image.originalname); // Imprime el nombre original del archivo
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                // Consultar si la imagen ya existe en la base de datos
                conn.query('SELECT COUNT(*) as count FROM radiografias WHERE ruta = ? AND paciente_id = ?', [ruta, id], (err, result) => __awaiter(this, void 0, void 0, function* () {
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
                    (0, fileCreator_1.saveFile)(ruta, image);
                    conn.query('INSERT INTO radiografias (titulo, descripcion, ruta, historia ,paciente_id) VALUES (?,?,?,?,?)', [
                        title,
                        description,
                        ruta,
                        history,
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err.sqlMessage);
                        }
                        else {
                            //console.log("Result: ");
                            //console.log(result);
                            resolve(result);
                        }
                        conn.release();
                    }));
                }));
            }));
        });
    }
    getImagesID(id, history) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    // Consultar si la imagen existe en la base de datos
                    conn.query('SELECT * FROM radiografias WHERE paciente_id = ? AND historia = ? OR historia = "Urgencia"', [
                        id,
                        history
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err.sqlMessage);
                            conn.release();
                            return;
                        }
                        resolve(result);
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
    deleteImage(id, ruta) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('DELETE FROM radiografias WHERE radiografia_id = ?', [
                        id
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err.sqlMessage);
                            conn.release();
                            return;
                        }
                        (0, fileDelete_1.deleteFile)(ruta); // elimina la imagen de la carpeta
                        resolve(result);
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
    updateImage(image, idImagen, title, description, history, rutaAnterior) {
        return new Promise((resolve, reject) => {
            try {
                const Nuevaruta = image.originalname;
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`UPDATE radiografias SET 
                        titulo = '${title}',
                        descripcion = '${description}',
                        ruta = '${Nuevaruta}',
                        historia = '${history}'
                        WHERE radiografia_id = ${idImagen}`, [], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err.sqlMessage);
                            conn.release();
                            return;
                        }
                        (0, fileDelete_1.deleteFile)(rutaAnterior); // elimina la imagen de la carpeta
                        (0, fileCreator_1.saveFile)(image.originalname, image); // guarda la nueva imagen en la carpeta
                        resolve(result);
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
    updateImageOnlyDB(idImagen, title, description, history, rutaAnterior) {
        return new Promise((resolve, reject) => {
            try {
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query(`UPDATE radiografias SET 
                        titulo = '${title}',
                        descripcion = '${description}',
                        historia = '${history}'
                        WHERE radiografia_id = ${idImagen}`, [], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            console.error(err);
                            reject(err.sqlMessage);
                            conn.release();
                            return;
                        }
                        resolve(result);
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
exports.default = ImageService;
