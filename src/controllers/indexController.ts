import { Request, Response } from 'express';

import pool from '../database';

import bcrypt from "bcrypt";

const jwt = require('jsonwebtoken');

let dataToken: string;

class IndexController {

  constructor() {
    
  }

  public imprimir() {


  }


  public list(req: Request, res: Response) {

    //const resultado =  pool.query('Desc Users');

    //console.log(resultado);
    //res.send( pool.query('Desc Users'));

    pool.getConnection(async (err, conn) => {
      conn.query('Desc Users', (err, result) => {
        res.json(result)
        conn.release();
      });
    })
  }


  public llamar(req: Request, res: Response) {



    pool.getConnection(async (err, conn) => {
      conn.query('SELECT * FROM Users', (err, result) => {
        res.json(result)
        conn.release();
      });
    })

  }



  public async createUser(req: Request, res: Response) {


    const { user, password } = req.body;




    const hashedPassword = await bcrypt.hash(password, 12);

    pool.getConnection(async (err, conn) => {
      conn.query('INSERT INTO USERS VALUES (NULL, ?, ?)', [user, hashedPassword], (err, result) => {

        res.json("creacion hacida XD")
      });
    })


  }

  public login(req: Request, res: Response) {


    // res.json('Validando  '+ req.params.user + ' ' + req.params.password)
    //const {user,password} = req.body;

    //console.log(req.body);

   

    console.log("----------------------------------------------------------------------------------");
    

    const { user, password } = req.body;

    pool.getConnection(async (err, conn) => {
      conn.query('SELECT * FROM Users where user = ? ', [user, password], async (err, result) => {

        console.log("----------------------------------------------------------------------------------");
        
        console.log(result);
        

        if (!result  || result.length === 0) return res.json('Usuario o contraseña incorrectas');

        const verified = await bcrypt.compare(password, result[0].password);

        if (verified && result[0].user === user) {
          let data = JSON.stringify(result[0]);
          const token = jwt.sign(data, 'stil');
          res.json({ token })
        } else {
          res.json('Usuario o contraseña incorrectas');

        }

        conn.release();
      });
    })


  }



  public detele_User(req: Request, res: Response) {
    res.json('eliminando el usuario con id ' + req.params.id)
  }

  public update_User(req: Request, res: Response) {
    res.json('actualizando el usuario con id' + req.params.id)
  }




  public verifyToken(req: Request, res: Response, next: any) {

    try {


      if (!req.headers.authorization) return res.status(401).json('No autorizado');
      const token = req.headers.authorization.substr(7);

      if (token !== '') {
        const content = jwt.verify(token, 'stil');
        dataToken = content;

        next();

      } else {
        res.status(401).json('Token vacio');
      }

    } catch (e) {

      res.status(401).json('Error token');
    }

  }



  public async newHistory(req: Request, res: Response) {



    try {

      //console.log(req.body);

      // Obtener los datos del paciente del objeto req.body
      const Nh = req.body;



      // Crear una consulta SQL que inserte los datos en la tabla correspondiente


      pool.getConnection(async (err, conn) => {
        conn.query(
          'INSERT INTO pacientes (paciente_id, nombre, apellido, estado_civil, ciudad_nacimiento, fecha_nacimiento, tipo_documento, servicio_salud, ocupacion, ciudad_residencia, direccion, numero_celular, sexo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)', [
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
          Nh.paciente.genero],

          async (err, result) => {


            if (err) {

              res.status(200).json({
                success: false,
                message: err.sqlMessage,
              });


            } else {


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
          }
        );
      });

    } catch (error) {
      // Enviar una respuesta con error al cliente
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Ha ocurrido un error al insertar los datos del paciente',
      });
    }
  }





  public insertNewOdontologia(dataOdontologia: any): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      try {



        //obtienen datos de odontologia




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



      } catch (error) {
        // Enviar una respuesta con error al cliente
        console.error(error);
        reject(error)
      }

    })


  }







}



export default IndexController