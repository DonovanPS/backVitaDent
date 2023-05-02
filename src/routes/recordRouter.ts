import {Router} from 'express';
import recordController from '../controllers/recordController';

class recordRouter{

    public router: Router = Router();

    private recordControler = new recordController();

    constructor(){
        this.config();
    };

    config(): void{
        this.router.get('/findRecords', this.recordControler.findRecords);
        this.router.get('/:id/:consulta', this.recordControler.findRecordsID);
        this.router.post('/create', this.recordControler.create);
        this.router.put('/update', this.recordControler.update);
        this.router.delete('/delete/:id', this.recordControler.delete);
    }

  

}

export default recordRouter;