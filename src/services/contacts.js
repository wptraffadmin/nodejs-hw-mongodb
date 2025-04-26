import { ContactsCollection } from '../models/contacts.js';

export const getAllContacts = async () => {
    try {
      const contacts = await ContactsCollection.find({});
      return contacts;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  };

export const createContact = async (contactData) => {
  const contact = await ContactsCollection.create(contactData);
  return contact;
};

export const getContactByIdService = async (contactId) => {
    return ContactsCollection.findById(contactId);
  };
