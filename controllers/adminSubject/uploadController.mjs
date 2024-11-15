import { UploadModel } from "../../models/adminSubject/uploadModel.mjs";
import multer from "multer";

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


}