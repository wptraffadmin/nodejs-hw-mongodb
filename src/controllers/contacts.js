import { getAllContacts, createContact, getContactByIdService } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
    try {
      const contacts = await getAllContacts();  
      res.status(200).json({
        message: 'Success',
        code: 200,
        data: contacts,
      });
    } catch (error) {
      console.error('Error in getAllContactsController:', error);
      next(error);
    }
  };

export const createContactController = async (req, res, next) => {
  try {
    const newContact = await createContact(req.body);
    res.status(201).json({
      message: 'Contact created successfully',
      code: 201,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactByIdService(contactId);
  
      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }
  
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (e) {
      next(e);
    }
  };
