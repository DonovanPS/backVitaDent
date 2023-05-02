"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recordController_1 = __importDefault(require("../controllers/recordController"));
class recordRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.recordControler = new recordController_1.default();
        this.config();
    }
    ;
    config() {
        this.router.get('/findRecords', this.recordControler.findRecords);
        this.router.get('/:id/:consulta', this.recordControler.findRecordsID);
        this.router.post('/create', this.recordControler.create);
        this.router.put('/update', this.recordControler.update);
        this.router.delete('/delete/:id', this.recordControler.delete);
    }
}
exports.default = recordRouter;
