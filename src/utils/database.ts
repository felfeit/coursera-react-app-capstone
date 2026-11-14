import { openDatabaseSync } from 'expo-sqlite';

export const db = openDatabaseSync('little_lemon.db');


export const initDatabase = () => {
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT
      );
    `);
    console.log('Database fresh & initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const saveMenuToDB = (menuItems: any[]) => {
  try {
    db.execSync('DELETE FROM menu;');
    
    for (const item of menuItems) {
      let category = 'Mains';
      const nameLower = item.name.toLowerCase();
      if (nameLower.includes('salad') || nameLower.includes('bruschetta')) category = 'Starters';
      if (nameLower.includes('dessert') || nameLower.includes('cake')) category = 'Desserts';
      if (nameLower.includes('lemonade') || nameLower.includes('drink')) category = 'Drinks';

      db.runSync(
        'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
        [item.name, item.price, item.description, item.image, category]
      );
    }
    console.log('Menu saved to DB successfully');
  } catch (error) {
    console.error('Error saving menu:', error);
  }
};

export const filterMenuInDB = (categories: string[], searchText: string): any[] => {
  try {
    let query = 'SELECT * FROM menu';
    const params: any[] = [];
    const conditions: string[] = [];

    if (categories.length > 0) {
      const placeholders = categories.map(() => '?').join(',');
      conditions.push(`category IN (${placeholders})`);
      params.push(...categories);
    }

    if (searchText.trim() !== '') {
      conditions.push('name LIKE ?');
      params.push(`%${searchText}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    return db.getAllSync(query, params);
  } catch (error) {
    console.error('Error filtering menu:', error);
    return [];
  }
};

export const isDatabaseEmpty = () => {
  try {
    const result = db.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM menu;');
    return result?.count === 0;
  } catch (error) {
    return true;
  }
};