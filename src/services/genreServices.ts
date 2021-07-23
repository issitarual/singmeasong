import { existsGenre, insertGenre, listGenres } from '../repositories/genreRepositories';

async function addGenre(name:string) {
    const alreadyExist: {} | {
        name: string; 
        id: number; 
    } = await existsGenre(name);
    
    if(alreadyExist) return true
    await insertGenre(name);
    return false;
};

async function allGenres() {
    return listGenres();
}

export { addGenre, allGenres };