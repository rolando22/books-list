import type { Book } from "../types";

export function getReadListId() {
    return JSON.parse(localStorage.getItem('readList') || '[]') as Book['ISBN'][];
}

export function saveReadListId(readList: Book['ISBN'][]) {
    localStorage.setItem('readList', JSON.stringify(readList));
}
