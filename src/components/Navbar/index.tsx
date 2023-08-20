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
        <nav className='flex justify-between'>
            <section>
                <h2>{availableBooksTotal} libros disponibles</h2>
                <h3>{readListTotal} en la lista de lectura</h3>
            </section>
            <section>
                <select className='w-full' onChange={handlerOnChangeGenreFilter}>
                    <option value='all'>Todos</option>
                    {genres.map(genre => 
                        <option key={genre} value={genre}>{genre}</option>
                    )}
                </select>
                <div>
                    <label htmlFor='filter-pages'>Páginas</label>
                    <input 
                        id='filter-pages'
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
