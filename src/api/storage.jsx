export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function load(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  
  export function clear() {
    localStorage.clear();
  }