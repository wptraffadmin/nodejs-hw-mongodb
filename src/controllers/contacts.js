import { getAllContacts, createContact, getContactByIdService, deleteContact, updateContact, replaceContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res) => {
      const contacts = await getAllContacts();  
      res.status(200).json({
        message: 'Success',
        code: 200,
        data: contacts,
      });
  };

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactByIdService(contactId);
  
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
    const newContact = await createContact(req.body);
    res.status(201).json({
      message: 'Contact created successfully',
      code: 201,
      data: newContact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const deletedContact = await deleteContact(contactId);
  
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
    const newContact = await replaceContact(contactId, req.body);
  
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
    const updatedContact = await updateContact(contactId, req.body);
  
    if (!updatedContact) {
      throw createHttpError(404, `Contact with id ${contactId} not found`);
    }
  
    res.status(200).json({
      message: 'Contact updated successfully',
      code: 200,
      data: updatedContact,
    });
};
