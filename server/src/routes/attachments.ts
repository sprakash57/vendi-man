import { Router } from 'express';
import multer from 'multer';
import {
  deleteAttachmentController,
  getAttachmentsController,
  uploadAttachmentController,
  uploadFileController,
} from '../controller/attachments';
import createUploadMiddleware from '../middleware/common/uploadMiddleware';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/', upload.array('files'), uploadAttachmentController);

router.post('/file', createUploadMiddleware(), uploadFileController);

router.get('/', getAttachmentsController);

router.delete('/:versionId', deleteAttachmentController);

export default router;
