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
                    className='w-full h-full grid grid-rows-[auto,1fr] gap-4'
                >
                    <figure 
                        className='aspect-[9/14] rounded-md relative'
                        onClick={handlerOnClickAddToReadList(book.ISBN)}
                    >
                        <img 
                            className='w-full h-full rounded-md object-cover' 
                            src={book.cover} 
                            alt={book.title} 
                        />
                        <p className='absolute bottom-1 left-2 bg-orange-700 text-md p-1 rounded-md'>
                            {book.genre}
                        </p>
                        <p className='absolute top-1 right-2 bg-yellow-200 text-md px-1 rounded-md text-black'>
                            {book.pages}
                        </p>
                    </figure>
                    <p className='text-md line-clamp-3 opacity-80'>
                        {book.title}
                    </p>
                </article>
            )}
        </section>
    );
}
