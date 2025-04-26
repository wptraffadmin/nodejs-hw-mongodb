import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const contacts = await readContacts();
    
    if (contacts.length === 0) {
      console.log('Немає контактів для видалення');
      return null;
    }

    const removedContact = contacts.pop();
    
    await writeContacts(contacts);
    
    console.log('Видалено останній контакт:', removedContact);
    console.log(`Контактів у файлі: ${contacts.length}`);
    
    return removedContact;
  } catch (error) {
    console.error('Помилка при видаленні останнього контакту:', error);
    throw error;
  }
};

await removeLastContact();
