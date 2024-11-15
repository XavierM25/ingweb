import multer from "multer";

export class UploadModel{

    static configureStorage({destinationPath}) {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, destinationPath);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            }
        });
    }

    static uploadFile({destinationPath}) {
        const storage = this.configureStorage({destinationPath});
        return multer({ storage: storage }).single('file');
    }
}

