import { Request } from "express";
import { TryCatch } from "../middleware/error.js";
import { BaseQuerry, newProductRequest } from "../types/types.js";
import { searchQuery } from "../types/types.js";
import { products } from "../models/product.js";
import Errorhandler from "../utils/utility-class.js";
import { rm } from "fs";
import { nodeCache } from "../app.js";

// foe creating new product
export const newProduct = TryCatch(
  async (req: Request<{}, {}, newProductRequest>, res, next) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    if (!photo) {
      return next(new Errorhandler("plz add photo", 401));
    }
    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("delaeted");
      });
      return next(new Errorhandler("plz add all fileds ", 401));
    }
    await products.create({
      name,
      category: category.toLocaleLowerCase(),
      price,
      stock,
      photo: photo.path,
    });
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);

//for lateest product

export const getLatest = TryCatch(async (req, res, next) => {
    // let product;
    // if(nodeCache.has("latest-product")){
    //     product= JSON.parse(nodeCache.get("latest-product") as string)
    // }
    
      const  product = await products.find({}).sort({ createdAt: -1 }).limit(2);
        // nodeCache.set("latest-product", JSON.stringify(product))
    
  return res.status(200).json({
    success: true,
    product,
  });
});
//get admin product

export const getAdminProduct = TryCatch(async (req, res, next) => {
  const product = await products.find({});

  return res.status(200).json({
    success: true,
    product,
  });
});
//for categories
export const getCatagories = TryCatch(async (req, res, next) => {
    
     const  catogories = await products.distinct("category");
    
  return res.status(200).json({
    success: true,
    catogories,
  });
});

//grt saingle product
export const getSingleProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const product = await products.findById(id);
  return res.status(200).json({
    success: true,
    product,
  });
});

//delete products
export const deleteProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const product = await products.findById(id);
  await product?.deleteOne();
  return res.status(200).json({
    success: true,
    message: "DEleted successfully",
  });
});

//update products
export const updateProducts = TryCatch(async (req, res, next) => {
  const { name, category, price, stock } = req.body;
  const photo = req.file;
  const { id } = req.params;
  const product = await products.findById(id);
  if (!product) {
    return next(new Errorhandler("Invalid Product ID", 404));
  }
  if (photo) {
    rm(product.photo!, () => {
      console.log("old photo deleted");
    });
    product.photo = photo.path;
  }
  if (name) product.name = name;
  if (category) product.category = category;
  if (price) product.price = price;
  if (stock) product.stock = stock;

  await product.save();
  return res.status(200).json({
    success: true,
    message: "product update successfully",
  });
});

export const getSearch = TryCatch(
  async (req: Request<{}, {}, {}, searchQuery>, res, next) => {
    const { search, price, category, sort } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuerry = {};
    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }
    if (category) {
      baseQuery.category = category;
    }

    const productsPromise = products.find(baseQuery)
    .sort(sort && { price: sort === "asc" ? 1 : -1 })
    .limit(limit)
    .skip(skip);

  const [product, filterProduct] = await Promise.all([
    productsPromise,
    products.find(baseQuery),
  ]);
    const totalpage = Math.ceil(filterProduct.length / limit);
    return res.status(200).json({
      success: true,
      product,
      totalpage,
    });
  }
);
