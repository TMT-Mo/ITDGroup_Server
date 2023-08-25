import { Document } from "mongoose";
import { BlogRequestQuery, CreateBlog, MiddlewareFunction } from "../types/types";
import { CreatedSuccessfully, InternalServer } from "../util/http-request";
import { BlogModel } from "../model/blogs";

// ! [POST]: /api/blog
const createBlog: MiddlewareFunction = async (req, res, next) => {
  const request = req.body as CreateBlog;

  const response = new CreatedSuccessfully("Create post successfully!");
  return next(res.status(response.code).json(response));
};

// ! [Patch]: /api/blog
const updateBlog: MiddlewareFunction = async (req, res, next) => {
  const request = req.body as CreateBlog;

  const response = new CreatedSuccessfully("Create post successfully!");
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
    total = await BlogModel.count()
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
};
