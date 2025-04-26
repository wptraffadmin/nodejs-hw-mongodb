import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';
import { countContacts } from '../scripts/countContacts.js';

const generateContacts = async (count) => {
    try {
        const existingContacts = await readContacts();
    
        const newContacts = Array.from({ length: count }, () => createFakeContact());
    
        const updatedContacts = [...existingContacts, ...newContacts];
    
        await writeContacts(updatedContacts);
        
        console.log(`Додано контактів ${count}.`);
        console.log(`Контактів у файлі: ${await countContacts()}`);
      } catch (error) {
        console.error('Помилка додавання контактів:', error);
      }
};

generateContacts(5);
