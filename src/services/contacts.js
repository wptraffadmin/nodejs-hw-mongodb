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

export const getContactById = async (contactId, userId) => {
    return ContactsCollection.findOne({ _id: contactId, userId });
  };

export const createContact = async (contactData) => {
    const contact = await ContactsCollection.create(contactData);
    return contact;
  };

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
    return contact;
  };

  export const replaceContact = async (contactId, newContactData, userId) => {
    const existingContact = await ContactsCollection.findById(contactId);
    const contactWithUserId = {
      ...newContactData,
      userId: existingContact.userId,
    };

    const contact = await ContactsCollection.findOneAndReplace(
      { _id: contactId, userId },
      contactWithUserId,
      { new: true }
    );
    return contact;
  };

export const updateContact = async (contactId, contactData, userId) => {
    const contact = await ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, contactData, { new: true });
    return contact;
  };