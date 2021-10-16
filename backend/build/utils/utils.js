"use strict";
var fs = require('fs');
var removeFile = function (filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlink("./" + filePath, function (err) {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
};
module.exports = {
    removeFile: removeFile
};
