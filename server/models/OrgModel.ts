import { Schema, Document, model } from 'mongoose';
import { Org } from './types.js';
import bcrypt from 'bcryptjs';

// declare a new interface for Event Model
interface IOrgModel extends Org, Document {}

const orgSchema = new Schema<IOrgModel>({
  orgName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  causes: [{ type: String }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

// bcrypt pre middleware
orgSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (saltError, salt) => {
      if (saltError) return next(saltError);
      else {
        bcrypt.hash(this.password, salt, (hashError, hash) => {
          if (hashError) return next(hashError);
          this.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

export const OrgModel = model<IOrgModel>('Org', orgSchema);
