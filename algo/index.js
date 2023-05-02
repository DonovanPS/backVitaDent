"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const historyRoutes_1 = __importDefault(require("./routes/historyRoutes"));
const pacienteRoutes_1 = __importDefault(require("./routes/pacienteRoutes"));
const recordRouter_1 = __importDefault(require("./routes/recordRouter"));
const imageRouter_1 = __importDefault(require("./routes/imageRouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //this.app.use(express.static(__dirname + '/server/src/public'));
        // this.app.use('/content', express.static('public'))
        //       this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../src/public')));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/history', new historyRoutes_1.default().router);
        this.app.use('/paciente', new pacienteRoutes_1.default().router);
        this.app.use('/record', new recordRouter_1.default().router);
        this.app.use('/image', new imageRouter_1.default().router);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port `, this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
