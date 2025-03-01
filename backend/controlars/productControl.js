import { v2 as cloudnary } from 'cloudinary'
import productModel from '../models/productModel.js'


// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller, casualMens } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        // method to save all data in cloudnary
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudnary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
        // method to add data in mongo after that add cloudnary

        const productData = {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            casualMens: casualMens === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageUrl,
            date: Date.now(),

        }
      

        const product = new productModel(productData);
        await product.save();
        res.json({ success: true, message: "product added" })
        



    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
// function for List product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
// function for remove product
const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);

         // Delete images from Cloudinary
        await Promise.all(
            product.image.map(async (url) => {
                const publicId = url.split('/').slice(-2).join('/').split('.')[0]; // Extract public ID
                await cloudnary.uploader.destroy(publicId);
            })
        );


        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "product remove" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })


    }

}
// function for single  product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}
export { addProduct, listProducts, removeProduct, singleProduct }