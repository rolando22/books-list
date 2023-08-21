import { useState } from 'react';
import { BooksList, Loader, Navbar, ReadList } from './components';
import { useBooks } from './hooks/useBooks';
import { useReadList } from './hooks/useReadList';
import './App.css';

export function App() {
    const [filters, setFilters] = useState<{genre: string, pages: number}>({ genre: 'all', pages: 0 });
    const { books, isLoading, isError } = useBooks();
    const { 
        addToReadList, 
        removeToReadList, 
        getAvailableBooks, 
        getReadList, 
        openShowReadList, 
        closeShowReadList, 
        showReadList, 
    } = useReadList();

    const availableBooks = getAvailableBooks({ books });
    const readList = getReadList({ books });

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
                    readListTotal={readList.length}
                    genres={genres}
                    filters={filters}
                    setterFilters={setterFilters}
                 />
            </header>
            <main className='w-full flex justify-center'>
                {isLoading && <Loader />}
                {!isLoading && !isError && 
                    <BooksList 
                        books={filteredAvailableBooks} 
                        addToReadList={addToReadList} 
                        openShowReadList={openShowReadList}
                    />
                }
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
