import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';  // Importer BookCard
import '../styles/BookList.css';  // Ajoutez des styles si nécessaire

function BookList() {
  const [books, setBooks] = useState([]);

  // Appel à l'API pour récupérer les livres
  useEffect(() => {
    fetch('http://localhost:8077/api/books')  // L'URL de l'API backend
      .then(response => response.json())
      .then(data => setBooks(data))  // On met à jour l'état avec les livres récupérés
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>Liste des livres</h1>
      <div className="book-list">
        {books.map((book, index) => (
          <BookCard key={index} book={book} />  // Utiliser BookCard ici
        ))}
      </div>
    </div>
  );
}

export default BookList;
