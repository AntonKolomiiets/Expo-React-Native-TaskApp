import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

// Helper function to save JSON objects
export const saveToMMKV = (key: string, value: any) => {
    storage.set(key, JSON.stringify(value));
  };
  
  // Helper function to load JSON objects
  export const loadFromMMKV = (key: string) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  };
  