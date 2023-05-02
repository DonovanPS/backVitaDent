import {Router} from 'express';
import IndexController from '../controllers/indexController';

class IndexRoutes{

    public router: Router = Router();

    private indexController = new IndexController();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/test',this.indexController.verifyToken,this.indexController.llamar);

        this.router.post('/', this.indexController.login);
        this.router.post('/create', this.indexController.createUser);
        this.router.post('/createNewHistory', this.indexController.newHistory);

        

        
        
        //this.router.post('/',indexController.create_User);
        //this.router.delete('/:id',indexController.detele_User);
        //this.router.put('/:id',indexController.detele_User);
    }
}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;