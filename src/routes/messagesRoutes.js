import express from "express";
import { getAllMessages, createMessage, getMessagesById, updateMessage, deleteMessage, getMessageByPropertyId } from "../controllers/messagesControllers.js";

const router = express.Router();

router.get('/', getAllMessages)
router.get('/:id', getMessagesById);
router.get('/property/:id', getMessageByPropertyId);

router.post('/', createMessage);

router.patch('/:id', updateMessage);

router.delete('/:id', deleteMessage)

export default router;