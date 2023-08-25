import mongoose, { Document } from "mongoose";
import {
  BlogRequestQuery,
  CreateBlog,
  IBlog,
  MiddlewareFunction,
  UpdateBlog,
} from "../types/types";
import {
  BadRequest,
  CreatedSuccessfully,
  InternalServer,
} from "../util/http-request";
import { BlogModel } from "../model/blogs";

// ! [POST]: /api/blog
const createBlog: MiddlewareFunction = async (req, res, next) => {
  const request = req.body as CreateBlog;

  try {
    await BlogModel.create({ ...request, createdAt: Date() });
  } catch (err) {
    const error = new InternalServer("Cannot add blog!");
    return next(res.status(error.code).json(error));
  }

  const response = new CreatedSuccessfully("Create blog successfully!");
  return next(res.status(response.code).json(response));
};

// ! [Patch]: /api/blog
const updateBlog: MiddlewareFunction = async (req, res, next) => {
  const { id, brief, content, creator, title } = req.body as UpdateBlog;

  let existedBlog: mongoose.Document & IBlog;

  try {
    existedBlog = await BlogModel.findById(id);
  } catch (err) {
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  if (!existedBlog) {
    const error = new BadRequest("This blog does not exist!");
    return next(res.status(error.code).json(error));
  }
  existedBlog.brief = brief;
  existedBlog.content = content;
  existedBlog.creator = creator;
  existedBlog.title = title;

  try {
    await existedBlog.save();
  } catch (err) {
    const error = new InternalServer("Something went wrong with updating blog");
    return next(res.status(error.code).json(error));
  }

  const response = new CreatedSuccessfully("Update blog successfully!");
  return next(res.status(response.code).json(response));
};

// ! [Delete]: /api/blog
const deleteBlog: MiddlewareFunction = async (req, res, next) => {
  const { id, brief, content, creator, title } = req.body as UpdateBlog;
  console.log(req.body);

  let existedBlog: mongoose.Document & IBlog;

  try {
    existedBlog = await BlogModel.findById(id);
  } catch (err) {
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  if (!existedBlog) {
    const error = new BadRequest("This blog does not exist!");
    return next(res.status(error.code).json(error));
  }
  console.log(id);

  try {
    await BlogModel.deleteOne({ _id: Object(id) });
  } catch (err) {
    const error = new InternalServer("Something went wrong with deleting blog");
    return next(res.status(error.code).json(error));
  }

  const response = new CreatedSuccessfully("Delete blog successfully!");
  return next(res.status(response.code).json(response));
};

// ! [GET]: /api/blog
const getBlogList: MiddlewareFunction = async (req, res, next) => {
  const query = req.query as BlogRequestQuery;
  const size = +query.size || undefined;
  const currentPage = +query.currentPage + 1 || undefined;
  const totalSkip = (currentPage - 1) * size;
  let total: number;
  let blogList: Document[] = [];

  try {
    blogList = await BlogModel.find().skip(totalSkip).limit(size);
    total = await BlogModel.count();
  } catch (err) {
    console.log(err);
    const error = new InternalServer();
    return next(res.status(error.code).json(error));
  }

  return next(res.json({ items: blogList, total, currentPage, size }));
};

export const blogController = {
  createBlog,
  updateBlog,
  getBlogList,
  deleteBlog,
};
