import express from "express"
import cors from "cors"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    UpdateFirstName,
} from "../controllers/users.js"
import {verifyJWT} from "../middleware/auth.js"

const router = express.Router();
// READ
router.get("/:id",verifyJWT,getUser);
router.get("/:id/friends",verifyJWT,getUserFriends)

// UPDATE
router.patch("/:id/:friendId",verifyJWT,addRemoveFriend);
router.patch("/updateName",verifyJWT,UpdateFirstName)

export default router