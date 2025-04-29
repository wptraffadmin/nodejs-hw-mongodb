import { Router } from "express";
import { getAllContactsController, createContactController, getContactByIdController, deleteContactController, replaceContactController, updateContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper";

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.post('/contacts', ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.put('/contacts/:contactId', ctrlWrapper(replaceContactController));
router.patch('/contacts/:contactId', ctrlWrapper(updateContactController));


export default router;