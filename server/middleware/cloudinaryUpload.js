const cloudinary = require("../config/cloudinary");
const streamifier = require('streamifier');

class CLoudinaryMiddleware {
    upload(req) {
        
        return new Promise((resolve, reject)=> {
            let stream = 
                cloudinary.uploader.upload_stream(                
                {
                    folder:"social_media_pins_images"
                },
                (error, result) => {
                    if(result) resolve(result);
                    else reject(error);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
    
        })
    };
    delete(req) {
        return new Promise((resolve, reject)=> {
            // Vi imageId nhan duoc tu CLient co dang social_media_images + ten file
            // => can chuyen thanh social_media_pins_images/tenfile thi moi dung dinh
            // dang cua public id
            const public_id =
                req?.params?.imageId?.replace("social_media_pins_images", "social_media_pins_images/");
            if(public_id) {
                cloudinary.uploader.destroy(
                    public_id,
                    (error, result) => {
                        if(result) resolve(result);
                        else reject(error);
                    }
                )
            }
        })
    }
    // upload(req) {
    //     console.log(req)
    //     return new Promise((resolve, reject)=> {
    //     //    cloudinary.uploader.upload(file, (error, result)=> {
    //     //        console.log(result)
    //     //    })
    
    //     })
    // };
}


module.exports = new CLoudinaryMiddleware;
