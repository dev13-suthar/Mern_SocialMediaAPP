// getUser,
// getUserFriends,
// addRemoveFriend,
import { use } from "bcrypt/promises.js";
import User from "../models/User.js";

// READ
export const getUser = async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        res.status(200).json(user);       
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
}

export const getUserFriends = async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formatttedFriends = friends.map(
            ({_id,firstName,lastName, occupation,location,picturePath})=>{
                return {_id,firstName,lastName, occupation,location,picturePath};
            }
        );
        res.status(200).json(formatttedFriends)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

// UPDATE
export const addRemoveFriend = async(req,res)=>{
    try {
        const { id,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>id!==friendId);
            friend.friends = friend.friends.filter((id)=>id !== id);
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>User.findById(id))
        );
        const formatttedFriends = friends.map(
            ({_id,firstName,lastName, occupation,location,picturePath})=>{
                return {_id,firstName,lastName, occupation,location,picturePath};
            }
        );
        res.status(200).json(formatttedFriends);

    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

// Update Users Name;
export const UpdateFirstName = async(req,res)=>{
       try {
        const {Id,Firstname} = req.body;
        const Updateduser = await User.findByIdAndUpdate(Id,{
            firstName:Firstname
        },
        {new:true}
        )
        res.status(200).json(Updateduser)
       } catch (error) {
        res.status(404).json({msg:error.message})
       }
}
