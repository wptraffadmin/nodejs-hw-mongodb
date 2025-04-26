import { writeContacts } from '../utils/writeContacts.js';
import { countContacts } from '../scripts/countContacts.js';

export const removeAllContacts = async () => {
  try {
    const initialCount = await countContacts();

    if (initialCount === 0) {
      console.log('Немає контактів для видалення');
      return;
    }
    
    await writeContacts([]);
    console.log(`Видалено контактів ${initialCount}`);

    return;
  } catch (error) {
    console.error('Помилка при видаленні контактів:', error);
    throw error;
  }
};

// Викликаємо функцію
await removeAllContacts();
console.log(`Контактів у файлі: ${await countContacts()}`);
