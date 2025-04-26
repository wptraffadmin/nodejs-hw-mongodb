import { writeFile } from 'fs/promises';
import { PATH_DB } from '../constants/contacts.js';

export const writeContacts = async (contacts) => {
  try {
    const json = JSON.stringify(contacts, null, 2);
    await writeFile(PATH_DB, json, 'utf-8');
  } catch (error) {
    console.error('Error writing contacts:', error);
    throw error;
  }
};
