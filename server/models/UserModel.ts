import { Schema, Document, model } from 'mongoose';
import { User } from './types';

// declare a new interface for User Model
interface IUserModel extends User, Document {}

const userSchema = new Schema<IUserModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: [{ type: String }],
  preferences: { type: Map, of: Number, required: true },
  eventRanks: [
    {
      event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
      rank: { type: Number, required: true },
    },
  ],
});

export const UserModel = model<IUserModel>('User', userSchema);
