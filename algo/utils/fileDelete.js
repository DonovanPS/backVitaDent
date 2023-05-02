"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const directory = path_1.default.resolve(__dirname, "../../src/public");
const deleteFile = (name) => {
    const filePath = path_1.default.join(directory, name);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
};
exports.deleteFile = deleteFile;
const deleteFiles = (files) => {
    files.forEach((file) => {
        deleteFile(file.ruta);
    });
};
exports.deleteFiles = deleteFiles;
