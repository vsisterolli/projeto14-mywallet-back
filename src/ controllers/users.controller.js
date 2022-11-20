import { usersCollection, sessionsCollection } from "../database/db.js";
import { userSchema, newUserSchema } from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

async function signUp(req, res) {

    try {
        const user = req.body;

        const validation = newUserSchema.validate(user)
        if(validation.error) {
            res.status(422).send(validation.error.message)
            return;
        }

        const existUser = await usersCollection.findOne({username: user.username});
        if(existUser !== null) {
            res.status(409).send("Username already being used!")
            return;
        }
        else {
            const usedEmail = await usersCollection.findOne({email: user.email})
            if(usedEmail !== null) 
                res.status(409).send("Email already registered!")
            else {
                delete user.repeatPassword;
                user.password = bcrypt.hashSync(user.password, 10);
                usersCollection.insertOne({
                    ...user,
                    register: []
                })
                res.status(201).send("OK")
            }
        }
    }

    catch(e) {
        res.status(500).send(e);
    }


}

async function signIn(req, res) {

    try {
        const user = req.body;
        
        const validation = userSchema.validate(user)
        if(validation.error) {
            res.status(422).send(validation.error.message)
            return;
        }

        const existUser = await usersCollection.findOne({email: user.email})
        console.log(existUser)
        if(!existUser) {
            res.status(401).send("This email hasn't been registered yet")
            return;
        }
        else if(!bcrypt.compareSync(user.password, existUser.password)) {
            res.status(401).send("Wrong password or email.")
            return;
        }

        
        const sessionId = uuidv4();
        sessionsCollection.deleteOne({email: user.email})

        const session = {
            email: user.email,
            "sessionId": sessionId
        };

        sessionsCollection.insertOne(session)
        res.status(201).send(sessionId)
    }
    
    catch(e) {
        res.status(500).send(e);
    }

}

export {
    signIn,
    signUp
}