import  Express  from "express";

import {acceptMentorshipRequest,rejectMentorshipRequest,
    getMentorshipRequests,
    getMentorshipRequestsApreant,
    createMentorshipRequest} 
    from "../controllers/mentorshipRequestController.js"

import {aprenantAutorisation, mentorAutorisation} from "../middelwares/jwt.js"   

export const mentorshipRequestRouter  = Express.Router()

mentorshipRequestRouter.post("/createMentorship", aprenantAutorisation, createMentorshipRequest)
mentorshipRequestRouter.post("/acceptMentorship",mentorAutorisation,acceptMentorshipRequest)
mentorshipRequestRouter.put("/rejectMentorship",mentorAutorisation,rejectMentorshipRequest)
mentorshipRequestRouter.get("/getMentorship/:id",mentorAutorisation,getMentorshipRequests)
mentorshipRequestRouter.get("/getMentorshipAprenant/:id",aprenantAutorisation,getMentorshipRequestsApreant)
