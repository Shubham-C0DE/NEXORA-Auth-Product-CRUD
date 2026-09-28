import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { productValidator } from "../validators/product.validator.js";
import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  auth,
  productValidator,
  validate,
  createProduct
);

router.get("/", auth, getProducts);

router.get("/:id", auth, getProductById);

router.put(
  "/:id",
  auth,
  productValidator,
  validate,
  updateProduct
);

router.delete("/:id", auth, deleteProduct);

export default router;