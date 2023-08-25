import mongoose, { Document, model } from "mongoose";
import { ModelName } from "../types/constants";
const { Schema } = mongoose;
const { Blogs } = ModelName;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    brief: { type: String, required: true },
    creator: { type: Object, required: true},
    content: {type: Array, required: true},
    createdAt: {type: String, required: true},
    image: {type: String, required: true}
  },
  {
    toJSON: {
      transform: function (doc: Document, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

export const BlogModel = model(Blogs, blogSchema);
