"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const historyController_1 = __importDefault(require("../controllers/historyController"));
class historyRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.historyControler = new historyController_1.default();
        this.config();
    }
    config() {
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
exports.default = historyRouter;
