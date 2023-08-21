import type { Book } from '../types';
import booksJson from '../books.json';

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export async function getBooks(): Promise<Book[]> {
    await delay(3000);
    const books: Book[] = booksJson.library.map(book => book.book);
    return books;
}
