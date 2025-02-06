import { useState, useEffect } from 'react';
import BookCard from './BookCard';
import '../styles/BookList.css';

import {fetchBooks, deleteBook, fetchBooksAfterYear, fetchBooksByAuthor, addBook} from '../services/bookService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    year: '',
    price: '',
    description: ''
  });
  const [filterYear, setFilterYear] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Récupérer les livres lors du chargement du composant
  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        setErrorMessage('Erreur lors de la récupération des livres');
      }
    };

    getBooks();
  }, []);



  const handleAddBook = async (e) => {
    e.preventDefault();

    const book = {
      title: newBook.title?.trim(),
      author: newBook.author?.trim(),
      year: newBook.year?.trim(),
      price: newBook.price?.trim(),
      description: newBook.description?.trim()
    };

    try {
      if (book.title && book.author && book.year && book.price) {
        await addBook(book);
        // Rafraîchir la liste complète des livres
        const booksData = await fetchBooks();
        setBooks(booksData);

        // Réinitialiser le formulaire
        setNewBook({
          title: '',
          author: '',
          year: '',
          price: '',
          description: ''

        });

        setSuccessMessage('Livre ajouté avec succès');
        setErrorMessage('');
      } else {
        setErrorMessage('veuillez remplir les champs');
      }
    } catch (error) {
      setErrorMessage(`Erreur lors de l'ajout du livre: ${error.message}`);
      console.error(error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const isDeleted = await deleteBook(bookId); // Appel de la fonction de suppression
      if (isDeleted) {
        setBooks(books.filter(book => book.id !== bookId)); // Met à jour la liste des livres après suppression
        setSuccessMessage('Livre supprimé avec succès !');
      } else {
        setErrorMessage('Erreur lors de la suppression du livre.');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression du livre.');
    }
  };


  // Fonction pour filtrer les livres par année
  const handleYearFilter = async () => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const filteredBooks = await fetchBooksAfterYear(filterYear); // Appel de la fonction de filtrage par année
      setBooks(filteredBooks);
      setSuccessMessage(`Filtrage réussi : ${filteredBooks.length} livre(s) trouvé(s) après l'année ${filterYear}.`);
    } catch (error) {
      setErrorMessage('Erreur lors du filtrage par année.');
    }
  };

// Fonction pour filtrer les livres par auteur
  const handleAuthorFilter = async () => {
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const filteredBooks = await fetchBooksByAuthor(filterAuthor); // Appel de la fonction de filtrage par auteur
      setBooks(filteredBooks);
      setSuccessMessage(`Filtrage réussi : ${filteredBooks.length} livre(s) trouvé(s) pour l'auteur ${filterAuthor}.`);
    } catch (error) {
      setErrorMessage('Erreur lors du filtrage par auteur.');
    }
  };


  const resetFilters = async () => {
    setFilterYear('');
    setFilterAuthor('');
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const booksData = await fetchBooks();
      setBooks(booksData); // Mettre à jour la liste des livres
    } catch (error) {
      setErrorMessage('Erreur lors du rechargement des livres.');
    }
  };


  return (
      <div className="book-list-container">
        <h1>Gestion de la Bibliothèque</h1>
        {/* Formulaire d'ajout */}
        <form onSubmit={handleAddBook} className="add-book-form">
          <h2>Ajouter un Nouveau Livre</h2>
          <div className="form-group">
            <input
                type="text"
                placeholder="Titre*"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Auteur*"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <input
                type="number"
                placeholder="Année*"
                value={newBook.year}
                onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
            />
            <input
                type="number"
                placeholder="Prix*"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            />
            <button type="submit" className="add-button">
              Ajouter le Livre
            </button>
          </div>
        </form>

        {/* Section Filtres */}
        <div className="filters-section">
          <h2>Filtres</h2>

          <div className="filter-group">
            <input
                type="number"
                placeholder="Filtrer par année"
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
            />
            <button
                type="button"
                onClick={handleYearFilter}
                className="filter-button"
            >
              Filtrer par Année
            </button>
          </div>

          <div className="filter-group">
            <input
                type="text"
                placeholder="Filtrer par auteur"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
            />
            <button
                type="button"
                onClick={handleAuthorFilter}
                className="filter-button"
            >
              Filtrer par Auteur
            </button>
          </div>

          <button
              type="button"
              onClick={resetFilters}
              className="reset-button"
          >
            Réinitialiser les Filtres
          </button>
        </div>

        {/* Messages de statut */}
        {errorMessage && <div className="message error">{errorMessage}</div>}
        {successMessage && <div className="message success">{successMessage}</div>}

          {/* Liste des livres */}
          <div className="books-grid">
            {books.length === 0 ? (
                <p className="no-books">Aucun livre trouvé</p>
            ) : (
                books.map((book, index) => (
                    <div key={`${book.title}-${index}`} className="book-card-container">

                      <BookCard
                          book={book}
                          onDelete={handleDeleteBook} // Passe la fonction handleDeleteBook en prop
                      />
                    </div>
                ))
            )}
          </div>
      </div>
  );
};
export default BookList;