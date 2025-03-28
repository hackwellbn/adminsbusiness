// products controller
import ProductsModel from '../Models/products.Models.js';


//add new product

export const addProduct = async (req, res) => {
    const { name, price, description, stock, category } = req.body;
    try{
        const product = new ProductsModel({
            name,
            price,
            description,
            stock,
            category
        })
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//get all products
export const getProducts = async (req, res) => {
    try {
        const products = await ProductsModel.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//get product by id

export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductsModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//update product by id

export const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, stock, category } = req.body;
    try {
        const product = await ProductsModel.findByIdAndUpdate(id, { name, price, description, stock, category }, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

//delete product by id

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await ProductsModel.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }   
}

//get products by category

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await ProductsModel.find({ category });
        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }
        res.json(products);
    } catch (error) {
        console.error(error);
}
}
