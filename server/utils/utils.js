const fs = require('fs');

const removeFile = filePath => {
    fs.unlink(`./${filePath}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    })
}

module.exports = {
    removeFile
}