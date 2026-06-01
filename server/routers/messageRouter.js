import Express  from "express";

import {sendMessage,getMessages, getConversations} from "../controllers/messageController.js"
import { generalAutorisation } from "../middelwares/jwt.js";



export const messageRouter = Express.Router()

messageRouter.post("/sendMessage", generalAutorisation, sendMessage)
messageRouter.get("/getMessages", generalAutorisation, getMessages)
messageRouter.get("/getConversations/:userId", generalAutorisation, getConversations)

