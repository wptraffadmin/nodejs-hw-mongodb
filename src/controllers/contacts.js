import { getAllContacts, createContact, getContactById, deleteContact, updateContact, replaceContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getAllContactsController = async (req, res) => {
      const { _id: userId } = req.user;

      const { page, perPage } = parsePaginationParams(req.query);
      const { sortBy, sortOrder } = parseSortParams(req.query);
      const filter = { ...parseFilterParams(req.query), userId };

      const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
      });  
      res.status(200).json({
        message: 'Success',
        code: 200,
        data: contacts,
      });
  };

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactById(contactId, userId);
  
    if (!contact) {
      throw createHttpError(404, `Contact not found`);
    }
  
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  };
  
export const createContactController = async (req, res) => {
    const photo = req.file;

    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const contactData = {
      ...req.body,
      userId: req.user._id,
      photo: photoUrl,
    };

    const newContact = await createContact(contactData);
    res.status(201).json({
      message: 'Contact created successfully',
      code: 201,
      data: newContact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const deletedContact = await deleteContact(contactId, userId);
  
    if (!deletedContact) {
      throw createHttpError(404, `Contact with id ${contactId} not found`);
    }
  
    res.status(200).json({
      message: 'Contact deleted successfully',
      code: 200,
      data: deletedContact,
    });
  };

export const replaceContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const newContact = await replaceContact(contactId, req.body, userId);
  
    if (!newContact) {
      throw createHttpError(404, `Contact with id ${contactId} not found`);
    }
  
    res.status(200).json({
      message: 'Contact replaced successfully',
      code: 200,
      data: newContact,
    });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const photo = req.file;

  if (!photo && Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Missing fields: provide at least one field or a photo.');
  }

  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const updatedContact = await updateContact(contactId, {
    ...req.body,
    ...(photoUrl && { photo: photoUrl }),
  }, userId);

  if (!updatedContact) {
    throw createHttpError(404, `Contact with id ${contactId} not found`);
  }

  res.status(200).json({
    message: 'Contact updated successfully',
    code: 200,
    data: updatedContact,
  });
};
