import { CloseIcon } from "..";
import type { Book } from "../../types";

interface Props {
    readList: Book[]
    removeToReadList: (isbn: Book['ISBN']) => void
    closeShowReadList: () => void
}

export function ReadList({ readList, removeToReadList, closeShowReadList }: Props) {

    const handlerOnClickRemoveToReadList = (isbn: Book['ISBN']) => () => removeToReadList(isbn);
    const handlerOnClickCloseShowReadList = () => closeShowReadList();

    return(
        <aside className='grid gap-4 h-screen fixed top-0 right-0 bg-black p-4 max-w-xs'>
            <section className='flex justify-between h-3 place-items-center'>
                <h3>Lista de Lectura</h3>
                <button onClick={handlerOnClickCloseShowReadList}>
                    <CloseIcon />
                </button>
            </section>
            <section className='grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-8 overflow-y-scroll'>
                {readList.map(book => 
                    <article 
                        key={book.ISBN}
                        className='grid grid-rows-[auto,1fr] gap-4'
                    >
                        <figure 
                            className='aspect-[9/14] rounded-md'
                            onClick={handlerOnClickRemoveToReadList(book.ISBN)}
                        >
                            <img className='w-full h-full rounded-md object-cover' src={book.cover} alt={book.title} />
                        </figure>
                        <p className='text-md line-clamp-3 opacity-80'>{book.title}</p>
                    </article>
                )}
            </section>
        </aside>
    );
}
