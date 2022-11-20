import {usersCollection, sessionsCollection} from "../database/db.js";

async function checkUser(req, res, next) {

    // This function gets the user accordingly to the session id sent as a bearer token from the client
    try {
        let token = req.headers.authorization;
        token = token.replace("Bearer ", "");

        const session = await sessionsCollection.findOne({"sessionId": token})
        if(!session) 
            return res.status(401).send("Session expired, sign-in again.")

        const sessionUser = await usersCollection.findOne({email: session.email});
        res.locals.user = sessionUser;
    }
    catch(e) {
        return res.status(500).send(e);
    }    
    next();
}

export default checkUser;