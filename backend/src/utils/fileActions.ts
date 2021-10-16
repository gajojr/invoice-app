import fs from 'fs';
import multer from 'multer';

export const upload = multer({ dest: './uploads' });

export const removeFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        fs.unlink(`./${filePath}`, (err: any) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
}