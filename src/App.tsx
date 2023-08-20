import { useState } from 'react';
import { BooksList, Navbar, ReadList } from './components';
import type { Book } from './types';
import booksJson from './books.json';
import './App.css';

export function App() {
    const [books, setBooks] = useState<Book[]>(booksJson.library.map(book => book.book));
    const [readListId, setReadListId] = useState<Book['ISBN'][]>([]);
    const [showReadList, setShowReadList] = useState<boolean>(false);
    const [filters, setFilters] = useState<{genre: string, pages: number}>({ genre: 'all', pages: 0 });

    const availableBooks = books.filter(book => !readListId.includes(book.ISBN));
    const readList = books.filter(book => readListId.includes(book.ISBN));

    const addToReadList = (isbn: Book['ISBN']) => {
        const newReadListId = [...readListId, isbn];
        setReadListId(newReadListId);
    };

    const removeToReadList = (isbn: Book['ISBN']) => {
        const newReadListId = readListId.filter(id => id !== isbn)
        setReadListId(newReadListId);
    };

    const openShowReadList = () => setShowReadList(true);
    const closeShowReadList = () => setShowReadList(false);

    const genres = Array.from(new Set(books.map(book => book.genre)));

    const filteredAvailableBooks = availableBooks.filter(book => 
        book.pages >= filters.pages && (filters.genre === 'all' || book.genre === filters.genre)
    );

    const setterFilters = ({ genre, pages }: {genre: string, pages: number}) => 
        setFilters(prevFilters => ({ ...prevFilters, genre, pages }));

    return (
        <>
            <h1>Lista de Libros</h1>
            <header className='w-full'>
                <Navbar 
                    availableBooksTotal={filteredAvailableBooks.length}
                    readListTotal={readListId.length}
                    genres={genres}
                    filters={filters}
                    setterFilters={setterFilters}
                 />
            </header>
            <main className='w-full'>
                <BooksList 
                    books={filteredAvailableBooks} 
                    addToReadList={addToReadList} 
                    openShowReadList={openShowReadList}
                />
                {showReadList && 
                    <ReadList 
                        readList={readList} 
                        removeToReadList={removeToReadList}
                        closeShowReadList={closeShowReadList}
                    />
                }
            </main>
        </>
    );
}
