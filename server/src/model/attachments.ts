import mongoose from 'mongoose';
import { UserDocument } from './users';

export interface NewAttachment {
  versionId: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  user: UserDocument['_id'];
}

export interface AttachmentDocument extends NewAttachment, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const attachmentSchema = new mongoose.Schema(
  {
    versionId: { type: String, required: true, unique: true },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String, required: true },
    size: { type: Number },
    fieldname: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const AttachmentModel = mongoose.model<AttachmentDocument>('Attachment', attachmentSchema);

export default AttachmentModel;
