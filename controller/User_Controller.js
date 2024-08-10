const User_collection = require("../module/User_schema")
const bcript = require("bcryptjs")
const jwt =  require('jsonwebtoken');
// const cookieParser = require('cookie-parser');

//  authentication function 
const user_regester = async (req, res) => {
    try {
        //  rec data frpm req body
        const data_from_body = req.body

        //   generate hash password 
        const geenrate_salt = bcript.genSaltSync(10)
        const hash_password = bcript.hashSync(data_from_body.password, geenrate_salt)
        const body = {
            ...data_from_body, password: hash_password
        }

        //  save user data in db 
        const create_user = User_collection(body)
        const Data_save_in_db = await create_user.save(create_user)
        return res.status(200).json(Data_save_in_db)


    } catch (error) {
        return res.status(500).json({ messege: "internal server error", error: error.message })


    }

}


//   login functionalitu or authorization

const user_login = async (req, res) => {
    try {
        const body = req.body
        console.log(body.password)
        //  find user from db base on email
        const find_user = await User_collection.findOne({ 
            email: body.email
         })
       console.log(find_user)
       if(!find_user){
         res.status(402).json({
            success: false,
            message: 'Invalid credentials    user is not find !'
        });
       }
      

        // compare or match  password using bcript
        const compare_password = await bcript.compare(body.password, find_user.password);
        //  when password is not match 
        if(!compare_password){
            res.status(402).json({
                success: false,
                message: 'password is not match!'
            });
        }
        console.log(compare_password)
           

        // create jwt token
        const payload_for_jwt = {
             id:find_user.id
        }
           
        console.log(payload_for_jwt)
        const create_token = jwt.sign(payload_for_jwt,"@asdasd", {
            expiresIn: '1d'
           
        });
         
        // console.log(create_token)
        // send token as a cockies
        res.cookie('auth_token', create_token);


        const user_data = {
            ...find_user.toObject()
        }
 
         console.log(user_data)
         delete user_data.password


  

      

       res.status(200).json({user_data:user_data, compare_password})



    } catch (error) {
        res.status(500).json({ messege: "internal server error", error: error.message  })
        console.log(error.message)


    }

}

//  check user verification 
const checl_user_verification = async(req,res,done)=>{
     try {
    
        const req_cookie_token = req.cookies.auth_token;
        console.log(req_cookie_token)
      
        if(!req_cookie_token){
            return res.status(402).json({
                success: false,
                message: 'Login required!'
            });

        }
 
        // when user token is available then verify token 
        const verify_token = jwt.verify(req_cookie_token, "@asdasd");
        if(!verify_token){
            return res.status(402).json({
                success: false,
                message: 'Login required!'
            });
        }

        const find_user_data_from_db = await User_collection.findById(verify_token.id)

        const user_data = {
            ...find_user_data_from_db.toObject()
        }
         console.log(user_data)
        delete user_data.password

        console.log(verify_token)
        res.status(200).json({user_data,success:true})

        done()

 

     } catch (error) {
        res.status(500).json({ messege: "internal server error", error: error.message  })
        console.log(error.message)

     }
}

module.exports = { user_regester, user_login,checl_user_verification}