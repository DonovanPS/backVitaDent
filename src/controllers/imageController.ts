import express, { Request, Response } from 'express';


import multer, { StorageEngine } from 'multer';
import path from 'path';

import fs from 'fs';
import ImageService from '../services/imageService';


class ImageController {

  private ImageService = new ImageService();

  

  public uploadImage = async (req: Request, res: Response) => {


    try {

      const { id, history } = req.params

      // console.log(req as any);

      const { title, description } = req.body;


      const file: Express.Multer.File = (req as any).file;


      await this.ImageService.uploadImage(file, id, title, description, history);


      res.status(200).json({
        success: true,
        message: "imagen subida correctamente",
      });

    } catch (err) {
  

      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }

  public getImagesID = async (req: Request, res: Response) => {

    try {

      const { id, history } = req.params

      const response = await this.ImageService.getImagesID(id, history);

      


      res.status(200).json({
        success: true,
        data: response,
      });

    } catch (err) {


      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }

  public deleteImage = async (req: Request, res: Response) => {

    try {

      const { id, ruta } = req.params


      await this.ImageService.deleteImage(id, ruta);

      res.status(200).json({
        success: true,
        message: "Radiografia eliminada",
      });



    } catch (err) {
      

      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }


  public updateImage = async (req: Request, res: Response) => {

    try {


      const { id, ruta } = req.params

      const { title, description, history } = req.body;

      const file: Express.Multer.File = (req as any).file;

      if (file == null) {
       
        await this.ImageService.updateImageOnlyDB( id, title, description, history, ruta);

      } else {
        await this.ImageService.updateImage(file, id, title, description, history, ruta);
      }

      res.status(200).json({
        success: true,
        message: "imagen actualizada correctamente",
      });



    } catch (err) {
   
      // deberia ir 400
      res.status(200).json({
        success: false,
        message: err,
      });
    }
  }


}

export default ImageController;

