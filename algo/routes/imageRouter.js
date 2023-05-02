"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageController_1 = __importDefault(require("../controllers/imageController"));
const multer = require('multer');
const upload = multer();
class ImageRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.imageControler = new imageController_1.default();
        this.config();
    }
    config() {
        this.router.post('/upload/:id/:history', upload.single('file'), this.imageControler.uploadImage);
        //this.router.get('/getImages', this.imageControler.getImages)
        this.router.get('/getImages/:id/:history', this.imageControler.getImagesID);
        this.router.get('/deleteImage/:id/:ruta', this.imageControler.deleteImage);
        this.router.put('/updateImage/:id/:ruta', upload.single('file'), this.imageControler.updateImage);
    }
}
exports.default = ImageRoutes;
