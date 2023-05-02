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
const usuarioService_1 = __importDefault(require("../services/usuarioService"));
class UsuarioController {
    constructor() {
        this.usuarioService = new usuarioService_1.default();
        this.getusuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.usuarioService.getUser(id);
            }
            catch (err) {
                console.log(err);
                res.status(200).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.countusuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { numUsers } = yield this.usuarioService.countuser(id);
                res.status(200).json({
                    success: true,
                    numUser: numUsers,
                });
            }
            catch (err) {
                console.log(err);
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = UsuarioController;
