import PacienteService from "../services/pacienteService";
import { Request, Response } from 'express';

class PacienteController {

    private PacienteService: PacienteService = new PacienteService();

    public getusuario = async (req: Request, res: Response) => {

        try {

            const { id } = req.params

            const data = await this.PacienteService.getPaciente(id);

            res.status(200).json({
                success: true,
                data: data,
            });


        } catch (err) {
           

            res.status(400).json({
                success: false,
                message: err,
            });
        }
    }


    public countusuario = async (req: Request, res: Response) => {

        try {

            const { id } = req.params


            const { numUsers } = await this.PacienteService.countuser(id);


            res.status(200).json({
                success: true,
                numUser: numUsers,
            });


        } catch (err) {
          

            res.status(400).json({
                success: false,
                numUser: 0,
            });
        }
    }

    public deletePaciente = async (req: Request, res: Response) => {

        try {

            const { id } = req.params

            await this.PacienteService.delete(id);


            res.status(200).json({
                success: true,
                message: "Paciente eliminado",
            });



        } catch (err) {
          

            res.status(400).json({
                success: false,
                numUser: 0,
            });
        }
    }


    public getPacientes = async (req: Request, res: Response) => {
            
            try {
    
                const data = await this.PacienteService.getPacientes();
    
                res.status(200).json({
                    success: true,
                    data: data,
                });

            } catch (err) {
             
    
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
    }




}

export default PacienteController;