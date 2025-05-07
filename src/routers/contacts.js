import { Router } from "express";
import { getAllContactsController, createContactController, getContactByIdController, deleteContactController, replaceContactController, updateContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { authenticate } from '../middlewares/authenticate.js';
import { checkUserRole } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();


router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', checkUserRole(ROLES.USER), ctrlWrapper(getContactByIdController));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
router.put('/:contactId', ctrlWrapper(replaceContactController));
router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(updateContactController));


export default router;