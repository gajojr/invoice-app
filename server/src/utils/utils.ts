const fs = require('fs');

const removeFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(`./${filePath}`, (err: any) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
}

module.exports = {
    removeFile
}