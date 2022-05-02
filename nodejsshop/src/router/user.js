import { Router } from "express";
import { json } from "express/lib/response";
import User from '../model/user'
const router = Router();

router.post('/signup', async (req, res) => {
    const {name, phone, address  ,email, password} = req.body;
    try {
        const exitUsser = await User.findOne({email}).exec();
        if(exitUsser){
            res.json({
                messager: "Email đã tồn tại"
            })
        }
        const user = await new User({name, phone, address  ,email, password}).save();
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.json({
            messager: "Không thể tạo tài khoản"
        })
    }
});

router.post('/signin', async (req, res) => {
    const {name, phone, address  ,email, password} = req.body;

        const user = await User.findOne({email}).exec();
        if(!user){
            res.json({
                messager: "Email đã tồn tại"
            })
        }
        if(!user.password){
            res.json({
                messager: "Password đã tồn tại"
            })
        }
        res.json({
            user: {
                name: user.name,
                email: user.email
            }
        })

});



export default router