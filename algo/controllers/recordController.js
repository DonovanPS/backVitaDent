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
const recordServices_1 = __importDefault(require("../services/recordServices"));
class recordController {
    constructor() {
        this.recorService = new recordServices_1.default();
        this.findRecords = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const records = yield this.recorService.findRecords();
                res.status(200).json({
                    success: true,
                    records: records,
                });
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.findRecordsID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const consulta = req.params.consulta;
                const records = yield this.recorService.findRecordsID(id, consulta);
                res.status(200).json({
                    success: true,
                    records: records,
                });
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha, id, consulta, descripcion, procedimiento, precio } = req.body;
                yield this.recorService.create(fecha, id, consulta, descripcion, procedimiento, precio);
                res.status(200).json({
                    success: true,
                    records: "Registro creado",
                });
            }
            catch (err) {
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { fecha, id, consulta, descripcion, procedimiento, precio } = req.body;
                yield this.recorService.update(fecha, id, consulta, descripcion, procedimiento, precio);
                res.status(200).json({
                    success: true,
                    records: "Registro actualizado",
                });
            }
            catch (err) {
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.recorService.delete(id);
                res.status(200).json({
                    success: true,
                    records: "Registro creado",
                });
            }
            catch (err) {
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = recordController;
