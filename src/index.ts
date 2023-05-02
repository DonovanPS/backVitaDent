import express, {Application, application} from 'express'
import morgan from 'morgan';
import cors from 'cors';

import path from 'path';


import indexRoutes from './routes/indexRoutes';
import historyRoutes from './routes/historyRoutes';
import PacienteRoutes from './routes/pacienteRoutes';
import recordRouter from './routes/recordRouter';
import imageRouter from './routes/imageRouter';



class Server {
    public app: Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config():void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        //this.app.use(express.static(__dirname + '/server/src/public'));
       // this.app.use('/content', express.static('public'))
//       this.app.use(express.static(path.join(__dirname, 'public')));
       this.app.use(express.static(path.join(__dirname, '../src/public')));

    }
    
    routes(): void{
        this.app.use(indexRoutes);
        this.app.use('/history',new historyRoutes().router);
        this.app.use('/paciente',new PacienteRoutes().router);
        this.app.use('/record',new recordRouter().router);
        this.app.use('/image',new imageRouter().router);
    }

    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port `,this.app.get('port'));
        });
    }

}

const server = new Server();

server.start();