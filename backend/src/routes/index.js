const upscaleRouter = require('./upscale')

function route(app) {
    app.use('/upscale', upscaleRouter)
}

module.exports = route
