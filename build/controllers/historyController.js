"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const historyServices_1 = __importDefault(require("../services/historyServices"));
class historyController {
    constructor() {
        this.historyService = new historyServices_1.default();
        // crea una nueva historia clinica
        this.newHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log(req.body);
                const { paciente, acudiente, odontologia, anamnesis, examenPeriodontal, tejidosBlandos, tejidosDentales } = req.body;
                yield this.historyService.createOdontologia(req.body);
                /*
                await this.historyService.newHistory(paciente);
                await this.historyService.inserAcudiente(acudiente);
    
                await this.historyService.insertNewOdontologia(odontologia);
                await this.historyService.insertNewAnamnesis(anamnesis);
                await this.historyService.insertNewExamenPeriodontal(examenPeriodontal);
                await this.historyService.insertNewExamenTejidosBlnados(tejidosBlandos)
                await this.historyService.insertNewExamenTejidosDentales(tejidosDentales)
    */
                res.status(200).json({
                    success: true,
                    message: "insercion correcta",
                });
            }
            catch (err) {
                //console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        // Muestra solo el numero de historia clinica
        this.findHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const [{ nombrePaciente, numOdontologia, numOrtodoncia }] = yield this.historyService.findHistory(id);
                res.status(200).json({
                    success: true,
                    numOdontologia: numOdontologia,
                    numOrtodoncia: numOrtodoncia,
                    nombrePaciente: nombrePaciente,
                });
            }
            catch (err) {
                //console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        // Muestra toda la historia clinica de un paciente por id
        this.getHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { tabla } = req.params;
                const { nombreCampo } = req.params;
                const data = yield this.historyService.getHistory(id, tabla, nombreCampo);
                res.status(200).json({
                    success: true,
                    data: data,
                });
            }
            catch (err) {
                //console.log(err);
                // deberia ir 400
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.deleteHistory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { tabla } = req.params;
                yield this.historyService.deleteHistory(id, tabla);
                res.status(200).json({
                    success: true,
                    message: "historia eliminada",
                });
            }
            catch (err) {
                //console.log(err);
                // deberia ir 400
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.updateHistoryOdontologia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { auxId } = req.params;
                ////console.log(req.body);
                yield this.historyService.updateAllDataPaciente(auxId, req.body);
                //await this.historyService.updateOdontologia(auxId, odontologia);
                //await this.historyService.updateAnamnesis(auxId, anamnesis);
                //await this.historyService.updateExamenPeriodontal(auxId, examenPeriodontal);
                res.status(200).json({
                    success: true,
                    message: "actualizado",
                });
            }
            catch (err) {
                ////console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        // ortodoncia
        this.newHistoryOrtodoncia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.historyService.newHistoryOrtodoncia(req.body);
                res.status(200).json({
                    success: true,
                    message: "insercion correcta",
                });
            }
            catch (err) {
                //console.log(err);
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.updateHistoryOrtodoncia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this.historyService.updateAllDataPacienteOrtodoncia(id, req.body);
                console.log(data);
                res.status(200).json({
                    success: true,
                    message: "actualizado",
                });
            }
            catch (err) {
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.deleteHistoryOrtodoncia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = yield this.historyService.deleteHistoryOrtodoncia(id);
                console.log(data);
                res.status(200).json({
                    success: true,
                    message: data,
                });
            }
            catch (err) {
                // deberia ir 400
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = historyController;
