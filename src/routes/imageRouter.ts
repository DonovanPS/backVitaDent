import {Router} from 'express';
import ImageController from '../controllers/imageController';

const multer = require('multer')
const upload = multer();
class ImageRoutes{

    public router: Router = Router();


    private imageControler = new ImageController();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/upload/:id/:history', upload.single('file') ,this.imageControler.uploadImage)
        //this.router.get('/getImages', this.imageControler.getImages)
        this.router.get('/getImages/:id/:history', this.imageControler.getImagesID)
        this.router.get('/deleteImage/:id/:ruta', this.imageControler.deleteImage)
        this.router.put('/updateImage/:id/:ruta',upload.single('file') , this.imageControler.updateImage)
    }

}

export default ImageRoutes;
