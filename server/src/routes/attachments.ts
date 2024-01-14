import { Router } from 'express';
import multer from 'multer';
import { deleteAttachmentController, getAttachmentsController, uploadAttachmentController } from '../controller/attachments';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/', upload.array('files'), uploadAttachmentController);

router.get('/', getAttachmentsController);

router.delete('/:versionId', deleteAttachmentController);

export default router;
