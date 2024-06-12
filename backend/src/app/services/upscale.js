const { spawn } = require('child_process');
const path = require('path')
const fs = require('fs')

function upscale(inputPath) {
    const outputPath = inputPath.replace('input', 'output');

    fs.mkdir(outputPath, { recursive: true }, (err) => {
    if (err) {
        console.error('Đã xảy ra lỗi khi tạo thư mục:', err);
        return;
    }
    console.log('Thư mục output đã được tạo:', outputPath);
    });
    const path_to_src = path.join(__dirname, '..', '..')
    const pythonScript = path.join(path_to_src, 'ESRGAN', 'upscale.py');
    console.log(pythonScript)
    const pythonArgs = [
    '-i', inputPath,
    '-o', outputPath,
    path.join(path_to_src, 'ESRGAN', 'models', '4x_eula_digimanga_bw_v2_nc1_307k.pth')
    ];

    const pythonProcess = spawn('python', [pythonScript, ...pythonArgs], { cwd: path_to_src });


    pythonProcess.stdout.on('data', (data) => {
    console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    });
}

module.exports = upscale