import type { Book } from "../../types";

interface Props {
    books: Book[]
    addToReadList: (isbn: Book['ISBN']) => void
    openShowReadList: () => void
}

export function BooksList({ books, addToReadList, openShowReadList }: Props) {

    const handlerOnClickAddToReadList = (isbn: Book['ISBN']) => () => {
        addToReadList(isbn);
        openShowReadList();
    };

    return (
        <section className='grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] place-items-center gap-8'>
            {books.map(book => 
                <article 
                    key={book.ISBN}
                    className='grid grid-rows-[auto,1fr] gap-4'
                >
                    <figure 
                        className='aspect-[9/14] rounded-md'
                        onClick={handlerOnClickAddToReadList(book.ISBN)}
                    >
                        <img 
                            className='w-full h-full rounded-md object-cover' 
                            src={book.cover} 
                            alt={book.title} 
                        />
                    </figure>
                    <p className='text-md line-clamp-3 opacity-80'>
                        {book.title}
                    </p>
                </article>
            )}
        </section>
    );
}
