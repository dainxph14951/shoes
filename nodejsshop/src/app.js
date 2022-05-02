import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import ProductRouter from './router/products';
import UserRouter from './router/user';
import CategoryRouter from './router/category';
import NewsRouter from './router/news';
const app = express();

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())


app.use('/api', ProductRouter);
app.use('/api', UserRouter);
app.use('/api', CategoryRouter);
app.use('/api', NewsRouter);
// connnect database
mongoose.connect('mongodb://127.0.0.1:27017/shoes')
    .then(() => console.log("Kết nối db thành công"))
    .catch((error) => console.log(error));
    
// connection
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server is running port", PORT);
})