import { useState } from 'react';
import { BooksList, ReadList } from './components';
import type { Book } from './types';
import booksJson from './books.json';
import './App.css';

export function App() {
    const [books, setBooks] = useState<Book[]>(booksJson.library.map(book => book.book));
    const [readListId, setReadListId] = useState<Book['ISBN'][]>([]);
    const [showReadList, setShowReadList] = useState<boolean>(false);

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

    return (
        <>
            <h1>Lista de Libros</h1>
            <main>
                <BooksList 
                    books={availableBooks} 
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
