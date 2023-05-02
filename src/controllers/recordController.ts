import { Request, Response } from 'express';
import RecordService from '../services/recordServices';

class recordController {
  
    private recorService: RecordService = new RecordService();

    public findRecords = async (req: Request, res: Response) => {
        try {
            const records = await this.recorService.findRecords();
            res.status(200).json({
                success: true,
                records: records,
                });
        } catch (err) {
          
            res.status(400).json({
                success: false,
                message: err,
            });
        }
    }

    public findRecordsID = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const consulta = req.params.consulta;
            const records = await this.recorService.findRecordsID(id, consulta);
            res.status(200).json({
                success: true,
                records: records,
                });
        } catch (err) {
          
            res.status(400).json({
                success: false,
                message: err,
            });
        }
    }

    public create = async (req: Request, res: Response) => {
        try {

            
            const { fecha, id, consulta, descripcion,procedimiento ,precio } = req.body;

            await this.recorService.create(fecha, id, consulta, descripcion, procedimiento ,precio);
           

            res.status(200).json({
                success: true,
                records: "Registro creado",
                });
            

            
        } catch (err) {
           
            res.status(200).json({
                success: false,
                message: err,
            });
        }
    }


    public update = async (req: Request, res: Response) => {

        try{

            const { fecha, id, consulta, descripcion,procedimiento ,precio } = req.body;

            await this.recorService.update(fecha, id, consulta, descripcion, procedimiento ,precio);

            res.status(200).json({
                success: true,
                records: "Registro actualizado",
                });

        }catch (err) {
           
            res.status(200).json({
                success: false,
                message: err,
            }); 
        }

    }

    public delete = async (req: Request, res: Response) => {
        try {

            
            const id = req.params.id;

            await this.recorService.delete(id);

            res.status(200).json({
                success: true,
                records: "Registro creado",
                });
            

            
        } catch (err) {
         
            res.status(200).json({
                success: false,
                message: err,
            });
        }
    }
    
  


}

export default recordController;