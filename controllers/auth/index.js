const userDB = require('../../service/mongoDB/mongoDB');
const valid = require('../../service/valid/valid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4:uuidv4} = require('uuid');



const userToken = (user)=>{
    
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
    return token;

}


const register = async (req, res, next) => {
    const {email, password, name } = req.body;
    try {
        const user = await userDB.findUser({email});
        const error = await valid.userValid.validate(req.body);
        if (!error) {
            res.status(400).json({message:error})
        } else if (user){
            const passVerification = bcrypt.compareSync(password, (user && user.password) || '');
            if (!passVerification){
                res.status(401).json({message:"Email or password is wrong"})
            }
            
            const token = userToken(user);

            await userDB.findAndUpdateUser(user._id, {token});
        
            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
            })
        } else {
            const verificationToken = uuidv4();
            const userHash = bcrypt.hashSync(password, bcrypt.genSaltSync(2));
        await userDB.createUser({
            email,
            name,
            password:userHash,
            verificationToken,
            });
            // const msg = `Here's a token to verify your email address: http://localhost:3000/api/users/verify/${verificationToken}`;
            // await sendEmail(email, "registration", msg);
            const UserExist = await userDB.findUser({email});
            const token = userToken(UserExist);
            await userDB.findAndUpdateUser(UserExist._id, {token});
        res.status(201).json(
            {token,
                user:
                {
                email: UserExist.email,
                id: UserExist._id,
                name: UserExist.name,
                }
            });
        }        
    } catch (e) {
        next(e);
    }
};


const logout = async (req, res) => {
    const {_id} = req.user;
    try {
        await userDB.findAndUpdateUser(_id, {token: null});
        return res.status(204).json({message: "No Content"});
    } catch (error) {
        next(error);
    }
        

};

module.exports = {
    register,
    logout,
};