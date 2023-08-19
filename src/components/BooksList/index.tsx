import { useState } from 'react';
import { Book } from '../../types';
import booksJson from './../../books.json';

export function BooksList() {
    const [books, setBooks] = useState<Book[]>(booksJson.library.map(book => book.book));

    return (
        <section className='grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8'>
            {books.map(book => 
                <article className='grid grid-rows-[auto, 1fr] gap-4'>
                    <figure className='aspect-[9/14] rounded-md'>
                        <img className='w-full h-full rounded-md object-cover' src={book.cover} alt={book.title} />
                    </figure>
                    <p className='text-md line-clamp-3 opacity-80'>{book.title}</p>
                </article>
            )}
        </section>
    );
}
