
import express from "express";
import { apis } from "../util/api";
import { blogController } from "../controllers/blog-controller";

const { createBlog, getBlogList, updateBlog } = blogController;
const router = express.Router();

// *Blog
router.post(apis.blog.createBlog, createBlog);
router.patch(apis.blog.updateBlog, updateBlog);
router.get(apis.blog.getBlogList, getBlogList);



export const blogRouter = router;
