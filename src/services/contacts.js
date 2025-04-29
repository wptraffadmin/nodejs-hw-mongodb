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

export const getContactByIdService = async (contactId) => {
    return ContactsCollection.findById(contactId);
  };

export const createContact = async (contactData) => {
    const contact = await ContactsCollection.create(contactData);
    return contact;
  };

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findByIdAndDelete(contactId);
    return contact;
  };

export const replaceContact = async (contactId, newContactData) => {
    const contact = await ContactsCollection.findOneAndReplace(
      { _id: contactId },
      newContactData,
      { new: true }
    );
    return contact;
  };

export const updateContact = async (contactId, contactData) => {
    const contact = await ContactsCollection.findByIdAndUpdate(contactId, contactData, { new: true });
    return contact;
  };