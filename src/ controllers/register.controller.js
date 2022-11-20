import { registerSchema, deleteSchema, changeSchema } from "../schemas/registerSchema.js";
import { usersCollection } from "../database/db.js";

export async function addRegister(req, res) {
    
    // This functions add register to user in database, both inputs and outputs
    // Value expect a negative number if it is an output and positive if it's an input
 
    try {
        const validation = registerSchema.validate(req.body)
        if(validation.err)
            return res.status(422).send(err.message);

        const sessionUser = res.locals.user;
        sessionUser.register.push({...req.body,
                                    date: Date.now(),
                                    id: sessionUser.register.length
                                });
        await usersCollection.updateOne({_id: sessionUser._id}, 
              {$set: {...sessionUser}} )
        res.send("OK")
    }
    catch(e) {
        res.status(500).send(e);
    }
    

}

export async function getRegister(req, res) {
    try {
        const sessionUser = res.locals.user;
        res.send(sessionUser.register);
    }
    catch(e) {
        res.status(500).send(e);
    }
}

export async function deleteRegister(req, res) {
    try {
        const validation = deleteSchema.validate(req.body)
        if(validation.err)
            return res.status(422).send(err.message);

        const sessionUser = res.locals.user;
        sessionUser.register = sessionUser.register.filter(value => value.id != req.body.id);
        await usersCollection.updateOne({_id: sessionUser._id}, 
                                        {$set: {...sessionUser}} )
        res.send(sessionUser.register)
    }
    catch(e) {
        res.status(500).send(e);
    }
}

export async function updateRegister(req, res) {
    try {
        const validation = changeSchema.validate(req.body)
        if(validation.err)
            return res.status(422).send(err.message);

        const sessionUser = res.locals.user;
        sessionUser.register = sessionUser.register.map(value => {
            if(value.id === req.body.id)
                return req.body;
            else return value;
        });
        await usersCollection.updateOne({_id: sessionUser._id}, 
                                        {$set: {...sessionUser}} )
        res.send(sessionUser.register)
    }
    catch(e) {
        res.status(500).send(e);
    }
}