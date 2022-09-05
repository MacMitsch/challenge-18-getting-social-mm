const router = require("express").Router();
const {
    getAllThoughts,getThoughtsId,createNewThought,updateThoughts,deleteThoughts,addReaction,deleteReaction
} = require("../../controller/thoughts-controller");

router.route("/").get(getAllThoughts).post(createNewThought);

router
    .route("/:id")
    .get(getThoughtsId)
    .put(updateThoughts)
    .delete(deleteThoughts);

    router.route("/:thoughtId/reactions").post(addReaction);
    router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);


    module.exports=router;