"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacienteController_1 = __importDefault(require("../controllers/pacienteController"));
class PacienteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.pacienteControler = new pacienteController_1.default();
        this.config();
    }
    config() {
        this.router.get('/:id', this.pacienteControler.getusuario);
        this.router.get('/countpaciente/:id', this.pacienteControler.countusuario);
        this.router.get('/deletePaciente/:id', this.pacienteControler.deletePaciente);
        this.router.get('/', this.pacienteControler.getPacientes);
    }
}
exports.default = PacienteRoutes;
