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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
let dataToken;
class IndexController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                conn.query('SELECT * FROM users where user = ? ', [user, password], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (!result || result.length === 0)
                        return res.json('Usuario o contraseña incorrectas');
                    const verified = yield bcrypt_1.default.compare(password, result[0].password);
                    if (verified && result[0].user === user) {
                        let data = JSON.stringify(result[0]);
                        const token = jwt.sign(data, 'stil');
                        res.json({ token });
                    }
                    else {
                        res.json('Usuario o contraseña incorrectas');
                    }
                    conn.release();
                }));
            }));
        });
    }
    imprimir() {
    }
    list(req, res) {
        //const resultado =  pool.query('Desc Users');
        //console.log(resultado);
        //res.send( pool.query('Desc Users'));
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('Desc Users', (err, result) => {
                res.json(result);
                conn.release();
            });
        }));
    }
    llamar(req, res) {
        database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
            conn.query('SELECT * FROM Users', (err, result) => {
                res.json(result);
                conn.release();
            });
        }));
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, password } = req.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                conn.query('INSERT INTO USERS VALUES (NULL, ?, ?)', [user, hashedPassword], (err, result) => {
                    res.json("creacion hacida XD");
                });
            }));
        });
    }
    detele_User(req, res) {
        res.json('eliminando el usuario con id ' + req.params.id);
    }
    update_User(req, res) {
        res.json('actualizando el usuario con id' + req.params.id);
    }
    verifyToken(req, res, next) {
        try {
            if (!req.headers.authorization)
                return res.status(401).json('No autorizado');
            const token = req.headers.authorization.substr(7);
            if (token !== '') {
                const content = jwt.verify(token, 'stil');
                dataToken = content;
                next();
            }
            else {
                res.status(401).json('Token vacio');
            }
        }
        catch (e) {
            res.status(401).json('Error token');
        }
    }
    newHistory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(req.body);
                // Obtener los datos del paciente del objeto req.body
                const Nh = req.body;
                // Crear una consulta SQL que inserte los datos en la tabla correspondiente
                database_1.default.getConnection((err, conn) => __awaiter(this, void 0, void 0, function* () {
                    conn.query('INSERT INTO pacientes (paciente_id, nombre, apellido, estado_civil, ciudad_nacimiento, fecha_nacimiento, tipo_documento, servicio_salud, ocupacion, ciudad_residencia, direccion, numero_celular, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)', [
                        Nh.paciente.id,
                        Nh.paciente.nombre,
                        Nh.paciente.apellido,
                        Nh.paciente.estadoCivil,
                        Nh.paciente.ciudadNacimiento,
                        Nh.paciente.fechaNacimiento,
                        Nh.paciente.tipoID,
                        Nh.paciente.servicioSalud,
                        Nh.paciente.ocupacion,
                        Nh.paciente.ciudadResidencia,
                        Nh.paciente.direccion,
                        Nh.paciente.celular,
                        Nh.paciente.genero
                    ], (err, result) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            res.status(200).json({
                                success: false,
                                message: err.sqlMessage,
                            });
                        }
                        else {
                            /*
                            this.insertNewOdontologia(req.body.odontologia).then(test =>{
                                this.insertNewOdontologia(req.body.odontologia).then(test =>{
                                
                                });
                            });
                            */
                            // await this.insertNewOdontologia(req.body.odontologia)
                            this.imprimir();
                            /*
                            res.status(200).json({
                                success: true,
                                message: 'Insertado con exito',
                              });
                          console.log("Result: " + result);
                          */
                            // Insertar datos odontologia
                            /*
                            try{
              
                              console.log("insertar odontologia");
                          
                              //obtienen datos de odontologia
                              const dataOdontologia= req.body.odontologia;
                  
                              console.log(dataOdontologia);
                  
                             pool.getConnection(async (err,conn) =>{
                              conn.query(
                                   'INSERT INTO historiales_odontologia (odontologia_id, higiene_oral, cepillado, numero_cepillado, enjuague_bucal, seda_dental, plan_tratamiento, paciente_id ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[
                                      dataOdontologia.odontologia_id,
                                      dataOdontologia.higiene_oral,
                                      dataOdontologia.cepillado,
                                      dataOdontologia.numero_cepillado,
                                      dataOdontologia.enjuague_bucal,
                                      dataOdontologia.seda_dental,
                                      dataOdontologia.plan_tratamiento,
                                      dataOdontologia.paciente_id
                                  ],
                  
                                  async (err,result)=>{
                  
                                      if (err) {
                                          console.log("Error: " + err);
                                          res.status(200).json({
                                            success: false,
                                            message: err.sqlMessage,
                                          });
                        
                                          
                                        } else {
                                            res.status(200).json({
                                                success: true,
                                                message: 'Insertado odontologia con exito',
                                              });
                                          console.log("Result: " + result);
                                        }
                                        conn.release();
                  
                  
                                  }
                              );
                             });
                              
                  
                  
                          } catch (error) {
                            // Enviar una respuesta con error al cliente
                            console.error(error);
                            res.status(500).json({
                              success: false,
                              message: 'Ha ocurrido un error al insertar los datos de odontologia',
                            });
                          }
              
                          */
                        }
                        conn.release();
                    }));
                }));
            }
            catch (error) {
                // Enviar una respuesta con error al cliente
                console.error(error);
                res.status(500).json({
                    success: false,
                    message: 'Ha ocurrido un error al insertar los datos del paciente',
                });
            }
        });
    }
    insertNewOdontologia(dataOdontologia) {
        return new Promise((resolve, reject) => {
            try {
                //obtienen datos de odontologia
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
                            reject(err.sqlMessage);
                        }
                        else {
                            resolve(true);
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
}
exports.default = IndexController;
