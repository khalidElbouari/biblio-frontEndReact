import React, { useEffect, useState } from 'react';
import { fetchBooks, addBook } from '../services/bookService';
import BookCard from '../components/BookCard';
import '../styles/BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', year: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Appel à l'API pour récupérer les livres
  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setErrorMessage('Erreur lors de la récupération des livres.');
      }
    };

    getBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
  
    // Validation simple
    if (!newBook.title || !newBook.author || !newBook.year) {
      setErrorMessage('Tous les champs sont obligatoires.');
      return;
    }
  
    try {
      // Appel à l'API pour ajouter un livre dans le backend
      const addedBook = await addBook(newBook);

      // Après avoir ajouté le livre, on récupère à nouveau la liste complète des livres
      const updatedBooks = await fetchBooks();
      setBooks(updatedBooks); // Mets à jour la liste des livres avec celle retournée par l'API

      // Réinitialise le formulaire et réinitialise les messages
      setNewBook({ title: '', author: '', year: '' });
      setErrorMessage('');
      setSuccessMessage('Livre ajouté avec succès !');
    } catch (error) {
      console.error('Error adding book:', error);
      setErrorMessage('Erreur lors de l\'ajout du livre.');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Liste des livres</h1>

      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Titre"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Auteur"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="number"
          placeholder="Année"
          value={newBook.year}
          onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
        />
        <button type="submit">Ajouter le livre</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="book-list">
        {books.length === 0 ? (
          <p>Aucun livre disponible</p>
        ) : (
          books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        )}
      </div>
    </div>
  );
}

export default BookList;
