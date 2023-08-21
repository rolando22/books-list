interface Props {
    availableBooksTotal: number
    readListTotal: number
    genres: string[]
    filters: { genre: string, pages: number }
    setterFilters: ({ genre, pages }: {genre: string, pages: number}) => void
}

export function Navbar({ availableBooksTotal, readListTotal, genres, filters, setterFilters }: Props) {

    const handlerOnChangeGenreFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newGenre = event.target.value;
        setterFilters({ genre: newGenre, pages: filters.pages });
    };

    const handlerOnChangePageFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPages = parseInt(event.target.value);
        setterFilters({ genre: filters.genre, pages: newPages });
    };

    return (
        <nav className='grid w-full md:flex md:justify-between gap-2'>
            <section>
                <h2 className='text-xl italic'>{availableBooksTotal} libros disponibles</h2>
                <h3 className='text-xl italic'>{readListTotal} en la lista de lectura</h3>
            </section>
            <section className='grid gap-3'>
                <select 
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                    onChange={handlerOnChangeGenreFilter}
                >
                    <option value='all'>Todos</option>
                    {genres.map(genre => 
                        <option key={genre} value={genre}>{genre}</option>
                    )}
                </select>
                <div className='flex gap-2 items-center'>
                    <label 
                        htmlFor='filter-pages'
                        className='text-sm font-medium text-gray-900 dark:text-white'
                    >
                        Páginas
                    </label>
                    <input 
                        id='filter-pages'
                        className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
                        type='range' 
                        min='0' 
                        max='1000' 
                        value={filters.pages} 
                        onChange={handlerOnChangePageFilter} 
                    />
                    <span>{filters.pages}</span>
                </div>
            </section>
        </nav>
    );
}
