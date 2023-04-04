import { Schema, Document, model } from 'mongoose';
import { Org } from './types';

// declare a new interface for Event Model
interface IOrgModel extends Org, Document {}

const orgSchema = new Schema<IOrgModel>({
  orgName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  causes: [{ type: String }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

export const OrgModel = model<IOrgModel>('Org', orgSchema);
