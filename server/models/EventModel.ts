import { Schema, Document, model } from 'mongoose';
import { Event } from './types.js';

// declare a new interface for Event Model
interface IEventModel extends Event, Document {}

const eventSchema = new Schema<IEventModel>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  needs: [{ type: String }],
  userRanks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      rank: { type: Number, required: true },
    },
  ],
});

export const EventModel = model<IEventModel>('Event', eventSchema);
