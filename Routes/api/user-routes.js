const router = require("express").Router();
const{
    getAllUsers,getUserId,createUser,updateUser,deleteUser,addUser,removeUser
} = require ("../../controller/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router
.route("/:id")
.get(getUserId)
.put(updateUser)
.delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addUser).delete(removeUser);

module.exports = router;