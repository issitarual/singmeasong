import { existsSong, insertSong } from '../repositories/newSongRepositories';

async function addRecommendation(youtubeLink: string, name: string) {
    const alreadyExist = await existsSong(youtubeLink);
    if(alreadyExist) return true
    await insertSong(youtubeLink, name);
    return false
}

export { addRecommendation };