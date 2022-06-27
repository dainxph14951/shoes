import {Router} from 'express'
import Category from '../model/category'

const router = Router();

router.get('/categorys', async (req, res) => {
    try {
        const category = await Category.find().exec();
        res.json(category);
    } catch (error) {
        res.status(400).error({
            messager: "Không thể hiển thị"
        })
    }
})

router.post('/categorys', async (req, res) => {
    try {
        const category = await Category(req.body).save();
        res.json(category);
    } catch (error) {
        res.status(400).error({
            messager: "Không thể thêm được"
        })
    }
})
router.put('/categorys/:id', async (req, res) => {
    const condistion = { _id: req.params.id };
    const { name } = req.body;
    try {
        const category = await Category.findOneAndUpdate(condistion, { name })
        res.status(200).json(category)
    } catch (error) {
        res.status(401).json({
            message: "Lỗi không update được "
        })
    }
})
router.delete('/categorys/:id', async (req, res) => {
    try {
        const category = await Category.findOneAndDelete({
          _id: req.params.id,
        }).exec();
        res.json(category);
      } catch (error) {
        res.status(400).json({
          message: 'Xóa sản phẩm không thành công',
        });
      }
})
router.get('/categorys/:id', async (req, res) => {
    try {
        const category = await Category.findOne({
          _id: req.params.id,
        }).exec();
        res.json(category);
      } catch (error) {
        res.status(400).json({
          message: 'sản phẩm không thành công',
        });
      }
})
export default router