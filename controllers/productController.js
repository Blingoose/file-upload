import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { BadRequest } from "../errors/bad-request.js";
import { NotFound } from "../errors/not-found-error.js";
import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";

const createProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

const getAllProducts = asyncWrapper(async (req, res, next) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
});

export { createProduct, getAllProducts };
