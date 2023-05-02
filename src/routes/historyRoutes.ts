import {Router} from 'express';
import historyController from '../controllers/historyController';

class historyRouter{


    public router: Router = Router();

    private historyControler = new historyController();
    

    constructor(){
        this.config();
    }

    config(): void{
       
        this.router.post('/createNewHistory', this.historyControler.newHistory);
        this.router.get('/findHistory/:id', this.historyControler.findHistory);
        this.router.get('/gedHistory/:id/:tabla/:nombreCampo', this.historyControler.getHistory);

        this.router.delete('/deleteHistory/:id/:tabla', this.historyControler.deleteHistory);

        this.router.put('/updateHistoryOdontologia/:auxId', this.historyControler.updateHistoryOdontologia);

        // ortodoncia
        this.router.post('/createNewHistoryOrtodoncia', this.historyControler.newHistoryOrtodoncia);
        this.router.put('/updateHistoryOrtodoncia/:id', this.historyControler.updateHistoryOrtodoncia);
        this.router.delete('/deleteHistoryOrtodoncia/:id', this.historyControler.deleteHistoryOrtodoncia);
    }


}



export default historyRouter;