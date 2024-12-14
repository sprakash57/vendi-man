import { S3Client, DeleteObjectCommand, PutObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import config from 'config';

const s3Client = new S3Client({
  region: config.get('awsRegion'),
  credentials: {
    secretAccessKey: config.get('awsSecretAccessKey'),
    accessKeyId: config.get('awsAccessKeyId'),
  },
});

export { s3Client, DeleteObjectCommand, PutObjectCommand, ListObjectsCommand };
