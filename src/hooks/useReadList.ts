import { useState } from "react";
import { getReadListId, saveReadListId } from './../services/readList';
import type { Book } from "../types";

export function useReadList() {
    const [readListId, setReadListId] = useState<Book['ISBN'][]>(getReadListId());
    const [showReadList, setShowReadList] = useState<boolean>(false);

    const addToReadList = (isbn: Book['ISBN']) => {
        const newReadListId = [...readListId, isbn];
        setReadListId(newReadListId);
        saveReadListId(newReadListId);
    };

    const removeToReadList = (isbn: Book['ISBN']) => {
        const newReadListId = readListId.filter(id => id !== isbn)
        setReadListId(newReadListId);
        saveReadListId(newReadListId);
    };

    const getAvailableBooks = ({ books }: {books: Book[]}) => books.filter(book => !readListId.includes(book.ISBN));
    const getReadList = ({ books }: {books: Book[]}) => books.filter(book => readListId.includes(book.ISBN));

    const openShowReadList = () => setShowReadList(true);
    const closeShowReadList = () => setShowReadList(false);

    return {
        addToReadList, 
        removeToReadList, 
        getAvailableBooks, 
        getReadList, 
        openShowReadList, 
        closeShowReadList, 
        showReadList
    };
}
