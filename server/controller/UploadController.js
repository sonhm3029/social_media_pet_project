const db = require("../database");
const CLoudinaryMiddleware = require("../middleware/cloudinaryUpload");

class UploadController {

    async upload(req, res, next) {
        try {
            let result = await CLoudinaryMiddleware.upload(req);
            
            if(result?.secure_url) {
                res.status(200).json({
                    status:"success",
                    data: {
                        url: result.secure_url,
                        id: result.public_id?.split("/").join("")
                    }
                    // Vi public_id co dang social_media_pins_images/tenfile
                    // => Su dung DELETE METHOD TAI CLIENT BI LOI
                    // => Gop lai bo dau /, them sau vao middleware
                })
            }
        } catch (error) {
            res.status(500).json({
                status:"error",
                message: error.message
            })
        }
    }

    async delete(req, res, next) {
        
        try {
            let result = await CLoudinaryMiddleware.delete(req);
            if(result) {
                res.status(200).json({
                    status:"success",
                    data: result
                })
            }
        } catch (error) {
            res.status(500).json({
                status:"error",
                message:error.message
            })
        }
    }
};

module.exports = new UploadController;
