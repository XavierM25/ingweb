import { UploadModel } from "../../models/adminSubject/uploadModel.mjs";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class UploadController{

    static async uploadVideo(req,res){
        const upload =  UploadModel.uploadFile({destinationPath: 'uploads/video'});
        upload(req,res, function(err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json({error: "Multer error: " , details: err.message})
            }else if (err) {
                return res.status(500).json({error: "Un error ha ocurrido mientras se subia el archivo: " , details: err.message})
            }

            const fileURL = `${req.protocol}://${req.get('host')}/uploads/video/${req.file.filename}`;
            return res.status(200).json({message: "Archivo subido correctamente", file: req.file, fileURL: fileURL});
        });
    }

    static async getVideo(req,res){
        const filePath = path.join(__dirname, 'uploads/video', req.params.filename);
        res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('Archivo no encontrado');
        }});
    }


}