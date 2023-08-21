import { useEffect, useState } from "react";
import { getBooks } from "../services/books";
import type { Book } from "../types";

export function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                setIsError(false);
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.log(error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        books, 
        isLoading, 
        isError, 
    };
}
