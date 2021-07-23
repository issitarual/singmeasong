import { existsSong, insertSong } from '../repositories/newSongRepositories';

async function addRecommendation(youtubeLink: string, name: string) {
    const alreadyExist: {} | {
        name: string; 
        youtubeLink: string; 
        id: number; 
        score: number
    } = await existsSong(youtubeLink);
    
    if(alreadyExist) return true
    await insertSong(youtubeLink, name);
    return false
}

export { addRecommendation };