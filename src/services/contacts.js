import { ContactsCollection } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({ 
  page = 1, 
  perPage = 10, 
  sortOrder = SORT_ORDER.ASC, 
  sortBy = '_id', 
  filter = {}, }) => {

  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find(filter);
    const contactsCount = await ContactsCollection.countDocuments(filter);

    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
      data: contacts,
      ...paginationData,
    };
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