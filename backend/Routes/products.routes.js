import express from 'express'
import {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
} from "../controllers/products.controller.js";


const productRouter = express.Router();

productRouter.post('/add', addProduct);
productRouter.get('/products', getProducts);
productRouter.get('/get/:id', getProductById);
productRouter.put('/update/:id', updateProductById);
productRouter.delete('/delete/:productId', deleteProductById);
productRouter.get('/get/category/:category', getProductsByCategory);

export default productRouter;
