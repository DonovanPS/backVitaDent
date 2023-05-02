import {Router} from 'express';
import PacienteController from '../controllers/pacienteController';

class PacienteRoutes{

    
    public router: Router = Router();

    private pacienteControler = new PacienteController();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/:id', this.pacienteControler.getusuario)
        this.router.get('/countpaciente/:id', this.pacienteControler.countusuario)
        this.router.get('/deletePaciente/:id', this.pacienteControler.deletePaciente)
        this.router.get('/', this.pacienteControler.getPacientes)
    }

}

export default PacienteRoutes;