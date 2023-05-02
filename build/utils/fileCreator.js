"use strict";
/*import fs from 'fs';
import path from 'path';

const saveFile = (name: string, file: Express.Multer.File) => {
    fs.writeFileSync(path.join(__dirname, "../public/"+name+".jpg"), file.buffer, 'binary')
}

export {saveFile};

import fs from 'fs';
import path from 'path';

const saveFile = (name: string, file: Express.Multer.File) => {
    const directory = path.resolve(__dirname, "../public");
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
    }
    fs.writeFileSync(path.join(directory, name+".jpg"), file.buffer, 'utf-8');
}

export {saveFile};
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const directory = path_1.default.resolve(__dirname, "../../src/public");
const saveFile = (name, file) => {
    if (!fs_1.default.existsSync(directory)) {
        fs_1.default.mkdirSync(directory);
    }
    fs_1.default.writeFileSync(path_1.default.join(directory, name), file.buffer, 'utf-8');
};
exports.saveFile = saveFile;
