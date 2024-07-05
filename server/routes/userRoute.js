const express = require("express");
const router = express.Router();
const { UserDetails } = require("../models/User");

//api endpoint to register the user
router.post("/registerUser",async(req,res)=>{
  try{const userName = req.body.username;
  const password = req.body.password;
  const admin = req.body.isAdmin;

  const user = new UserDetails({
    userName,
    password,
    admin
  });
  const savedUser = await user.save();

  return res.json(savedUser);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})



router.post("/userDetails", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  
  UserDetails.findOne({ userName, password })
    .then((user) => {
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});


router.get("/getAllUserNames", (req, res) => {
  UserDetails.find({}, "id userName ") // Include 'password' in the projection
    .then((users) => {
      const userNames = users.map((user) => ({
        id: user.id,
        userName: user.userName,
      }));
      return res.status(200).json(userNames);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

//For deleting a user
router.delete("/deleteUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user with the given ID exists
    const userToDelete = await UserDetails.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await UserDetails.findByIdAndDelete(userId);

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
