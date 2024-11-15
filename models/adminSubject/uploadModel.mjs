import multer from "multer";

export class UploadModel{

    static configureStorage({destinationPath}) {
        return multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, destinationPath);
            },
            filename: function (req, file, cb) {
                const sanitizedFileName = file.originalname.replace(/\s+/g, '-');
                cb(null, Date.now() + '-' + sanitizedFileName);
            }
        });
    }

    static uploadFile({destinationPath}) {
        const storage = this.configureStorage({destinationPath});
        return multer({ storage: storage }).single('file');
    }
}

