import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)

}
// route for user forgot your password



// route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // checking user is availabe for give email id 
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "invalid credinational" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // checking user already exist or not 
        const exist = await userModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: "user already exists" })
        }

        // validating email formating and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" })
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id);
        res.json({ success: true, token })


    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// route for admin login
const adminLogin = async (req, res) => {
    try{
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else{
            res.json({success:false, message: "invalid crediantionls"})
        }

    } catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

export { loginUser, registerUser, adminLogin}