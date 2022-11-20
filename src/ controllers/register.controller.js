import registerSchema from "../schemas/registerSchema.js";
import { sessionsCollection, usersCollection } from "../database/db.js";

export async function addRegister(req, res) {
    
    // This functions add register to user in database, both inputs and outputs
    // Value expect a negative value if it is an output and positive if it's an input

    
        const validation = registerSchema.validate(req.body)
        if(validation.err)
            return res.status(422).send(err.message);

        let token = req.headers.authorization;
        token = token.replace("Bearer ", "");
        console.log(token)

        const session = await sessionsCollection.findOne({"sessionId": token})
        if(!session) {
            res.status(401).send("Session expired, sign-in again.")
            return;
        }

        const sessionUser = await usersCollection.findOne({email: session.email})
        sessionUser.register.push(req.body);

        usersCollection.updateOne({_id: sessionUser._id, $set: {"register": sessionUser.register}});

        res.send("OK")
    
    
        res.status(500).send(e);

    

}

