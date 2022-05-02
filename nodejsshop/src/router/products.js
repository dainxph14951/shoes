import { Router } from "express";
import Product from '../model/products'

const router = Router();

// List Products
router.get('/products', async (req, res) => {
        const limit = 20
        const {name} = req.query
        if (limit || name) {
            if(limit){
                try {
                    const products = await Product.find().sort({createdAt: -1}).limit(limit).exec();
                    res.json(products)
                } catch (error) {
                    res.status(400).error({
                        messager: "Không thể hiển thị"
                    }) 
                }
            }
        if(name){
            try {
                const products = await Product.find({ name: new RegExp(name, 'i') }).exec();
                res.status(200).json(products)
            } catch (error) {
                res.status(401).json({
                    message: "Lỗi , không lấy được sản phẩm"
                })
            }
        }

        } else {
            try {
                const products = await Product.find().exec();
                res.json(products)
            } catch (error) {
               res.status(400).error({
                   messager: "Không thể hiển thị"
               }) 
            }
        }
})
// Add products
router.post('/products', async (req, res) => {
    try {
        const products = await Product(req.body).save();
        res.json(products)
    } catch (error) {
        res.status(400).error({
            messager: "Không thể thêm được"
        })
    }

} )

// Update products
router.put('/products/:id', async (req, res) => {
    const codition = {_id: req.params.id};
    const update = req.body;
    const ontional = {new: true}
     try {
        const products = await Product.findOneAndUpdate(
            codition,
            update,
            ontional
        ).exec();
        res.json(products)
    } catch (error) {
        res.status(400).error({
            messager: "Không thể update được"
        })
    }

})

// Remove products

router.delete('/prducts', async (req, res) => {
        try {
            const products = await Product.findOneAndRemove({_id: req.params.id}).exec();
            res.json(products)
        } catch (error) {
            res.status(400).error({
                messager: "Không thể remove được"
            })
        }
})
// detail products
router.get('/prducts/:id', async (req, res) => {
    try {
        const products = await Product.findOne({_id: req.params.id}).exec();
        res.json(products)
    } catch (error) {
        res.status(400).error({
            messager: "Không thể hiển thị được"
        })
    }
})



export default router