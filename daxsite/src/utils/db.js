import { openDB } from 'idb';

const DB_NAME = 'menuDB';
const DB_VERSION = 1;
const STORE_NAME = 'menuItems';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

export const addItem = async (item) => {
  const db = await initDB();
  return db.add(STORE_NAME, item);
};

export const getItems = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteItem = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
