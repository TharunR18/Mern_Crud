import express from "express"
import {createNote,deleteNote,getNote, updateNote} from "../controllers/noteController.js"

const router = express.Router();
router.post("/",createNote);
router.get("/",getNote);
router.delete("/:id",deleteNote);
router.put("/:id",updateNote);

export default router;
