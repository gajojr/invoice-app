import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import fs from 'fs';
import S3, { GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';

const s3 = new S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// uploads file
export function uploadFile(file: Express.Multer.File) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams as PutObjectRequest).promise();
}

// downloads file
export function getFileStream(fileKey: string) {
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET_NAME
    }

    return s3.getObject(downloadParams as GetObjectRequest).createReadStream();
}

// removes file
export function removeFileFromS3() {}