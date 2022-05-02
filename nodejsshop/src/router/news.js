import {Router} from 'express'
import News from '../model/news'
const router = Router();

router.get('/news', async (req, res) => {
    try {
        const news = await News.find().sort({createdAt: -1}).exec();
        res.json(news)
    } catch (error) {
        res.status.error({
            messager: "Không thể hiển thị"
        })
    }
})
router.post('/news', async (req, res) => {
    try {
        const news = await News(req.body).save();
        res.json(news)
    } catch (error) {
        res.status.error({
            messager: "Không thể thêm được"
        })
    }
})

router.put('/news', async (req, res) => {
    const condition = {_id: req.params.id}
    const update =  req.body
    const ontional = {new: true}
    try {
        const news = await News.findOneAndUpdate(
            condition,
            update,
            ontional

        ).exec();
        res.json(news)
    } catch (error) {
        res.status.error({
            messager: "Không thể update được"
        })
    }
})

router.delete('/news', async (req, res) => {
    try {
        const news = await News({_id: req.params.id}).exec();
        res.json(news)
    } catch (error) {
        res.status.error({
            messager: "Không thể remove được"
        })
    }
})

export default router