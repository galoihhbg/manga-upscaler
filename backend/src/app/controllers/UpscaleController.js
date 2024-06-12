const upscale = require('../services/upscale')

class UpscaleController {
    
    // [GET] 
    index = (req, res) => {
        upscale()
        res.send('abc')
    }

    // [POST]
    upscale = (req, res, uploadPaths) => {
        const upscaleImage = (uploadPath) => {
            return new Promise((resolve, reject) => {
                upscale(uploadPath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                });
            });
            };
            
        const promises = uploadPaths.map((uploadPath) => upscaleImage(uploadPath));

        Promise.all(promises)
            .then(() => {
            res.send(JSON.stringify(uploadPaths));
            })
            .catch((err) => {
            console.error('Đã xảy ra lỗi:', err);
            res.status(500).send('Đã xảy ra lỗi khi upscale ảnh.');
            });
    }
}

module.exports = new UpscaleController