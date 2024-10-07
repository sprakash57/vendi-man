import { Response, Request } from 'express';
import fs from 'fs';
import { uploadAttachmentToS3, getAttachmentsFromS3, deleteAttachmentFromS3 } from '../service/attachments';

export const uploadAttachmentController = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user._id;
    const files = req.files as Express.Multer.File[];
    await uploadAttachmentToS3(files, userId);
    const allFiles = await getAttachmentsFromS3(userId);
    res.status(201).json({ files: allFiles });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getAttachmentsController = async (_req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user._id;
    const files = await getAttachmentsFromS3(userId);
    res.json({ files });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export const deleteAttachmentController = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const versionId = req.params.versionId;
    await deleteAttachmentFromS3(userId, versionId);
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const uploadFileController = async (req: Request, res: Response) => {
  try {
    console.log({ host: req.hostname, body: req.body, protocol: req.protocol });
    const files = req.files as Express.Multer.File[];
    // console.log(files);
    // Return success response
    res.status(201).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
