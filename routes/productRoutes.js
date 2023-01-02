import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { uploadProductImage } from "../controllers/uploadsController.js";

export const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/uploads").post(uploadProductImage);
