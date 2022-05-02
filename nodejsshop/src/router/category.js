import {Router} from 'express'
import Category from '../model/category'

const router = Router();

router.get('/category', async (req, res) => {
    try {
        const category = await Category.find().exec();
        res.json(category);
    } catch (error) {
        res.status(400).error({
            messager: "Không thể hiển thị"
        })
    }
})
router.post('/category', async (req, res) => {
    try {
        const category = await Category(req.body).save();
        res.json(category);
    } catch (error) {
        res.status(400).error({
            messager: "Không thể thêm được"
        })
    }
})
export default router