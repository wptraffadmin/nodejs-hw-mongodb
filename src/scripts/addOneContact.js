import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  try {
    const contacts = await readContacts();

    const newContact = createFakeContact();
    const updatedContacts = [...contacts, newContact];

    await writeContacts(updatedContacts);

    console.log('Додано 1 контакт. Контактів у файлі:', updatedContacts.length);
  } catch (error) {
    console.error('Error adding contact:', error);
  }
};

addOneContact();
