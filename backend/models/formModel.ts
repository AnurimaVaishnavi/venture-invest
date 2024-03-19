import { type ObjectId, Schema, model } from 'mongoose';
import type {FormElementsType} from '../utils/types'
import {userschema} from './userschema.js';

interface IForm {
  name: string;
  elements: FormElementsType[];
  isActive: boolean;
  user: ObjectId;
  previewImage?: {
    filename: string;
    mediatype: number;
  };
}

const formSchema = new Schema<IForm>(
  {
    name: {
      type: String,
      required: true,
    },
    elements: Array,
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'userschema',
      required: true,
    },
    previewImage:{
      filename:String,
      mediatype:Number,
     },
  },
  {
    timestamps: true,
  },
);

export default model<IForm>('Form', formSchema);