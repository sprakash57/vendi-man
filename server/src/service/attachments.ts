import AttachmentModel from '../model/attachments';
import { s3Client, PutObjectCommand, DeleteObjectCommand } from '../utils/connectAws';
import config from 'config';
import { omit } from 'lodash';

const attachmentParams = {
  Bucket: config.get('awsS3Bucket') as string,
};

export const uploadAttachment = async (files: Express.Multer.File[], userId: string) => {
  try {
    const uploadAttachmentPromises = files.map(async file => {
      const command = new PutObjectCommand({
        ...attachmentParams,
        Key: file.originalname,
        Body: file.buffer,
      });
      const data = await s3Client.send(command);
      return data;
    });
    const data = (await Promise.all(uploadAttachmentPromises)) as unknown as { VersionId: string }[];
    const validFiles = files.map((file, i) => ({ ...omit(file, 'buffer'), user: userId, versionId: data[i].VersionId }));
    const result = await AttachmentModel.insertMany(validFiles);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAttachments = async (userId: string) => {
  try {
    const data = await AttachmentModel.find({ user: userId });
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAttachment = async (userId: string, versionId: string) => {
  try {
    const fileToBeDeleted = await AttachmentModel.findOne({ user: userId, versionId });
    if (fileToBeDeleted) {
      const command = new DeleteObjectCommand({
        ...attachmentParams,
        Key: fileToBeDeleted.originalname,
        VersionId: versionId,
      });
      await s3Client.send(command);
      const deletedFile = await AttachmentModel.deleteOne({ user: userId, versionId });
      return deletedFile;
    }
    throw new Error('File can not be deleted');
  } catch (error) {
    throw error;
  }
};
