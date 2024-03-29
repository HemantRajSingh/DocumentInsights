import AWS from 'aws-sdk'
import fs from 'fs';

export async function downloadFromS3(file_key: string) {
    try {
        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME || '';
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_KEY
        })
        const s3 = new AWS.S3({
            params: {
                Bucket: bucketName
            },
            region: "ca-central-1"
        })
        const params: AWS.S3.GetObjectRequest = {
            Bucket: bucketName,
            Key: file_key
        }
        const obj = await s3.getObject(params).promise()
        const file_name = `/tmp/pdf-${Date.now()}.pdf`
        fs.writeFileSync(file_name, obj.Body as Buffer)
        return file_name
    } catch (error) {
        console.log(error)
        return null
    }
}