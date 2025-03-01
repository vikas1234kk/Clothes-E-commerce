import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudnary from './config/cloudnary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors());
connectDb();
connectCloudnary();

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=> {
    res.send("api is working")

})

app.listen(port, ()=> console.log("server is started on port: " + port))