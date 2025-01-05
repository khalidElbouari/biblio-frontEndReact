// bookService.js

const API_URL = 'http://localhost:8077/api/books'; // URL de l'API backend

// Récupérer tous les livres
export const fetchBooks = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (newBook) => {
  try {
    const response = await fetch(API_URL+'/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();  // Retourne le livre ajouté
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};


// Supprimer un livre
export const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`${API_URL}/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

// Mettre à jour un livre
export const updateBook = async (bookId, updatedBook) => {
  try {
    const response = await fetch(`${API_URL}/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};
