import { Response, Request } from 'express';
import { uploadAttachment, getAttachments, deleteAttachment } from '../service/attachments';

export const uploadAttachmentController = async (req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user._id;
    const files = req.files as Express.Multer.File[];
    await uploadAttachment(files, userId);
    const allFiles = await getAttachments(userId);
    res.status(201).json({ files: allFiles });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const getAttachmentsController = async (_req: Request, res: Response) => {
  try {
    const userId: string = res.locals.user._id;
    const files = await getAttachments(userId);
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
    await deleteAttachment(userId, versionId);
    res.status(200).send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
