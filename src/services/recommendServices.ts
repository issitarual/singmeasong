import { topSongs, listAllSongs } from '../repositories/recommendRepositories'

async function songList(amount:string) {
    return topSongs(amount);
}

async function sortSong() {
    const allSongs = await listAllSongs();
    const sort = Math.random() > 0.7;
    let songs: string[];

    if(allSongs.length === 0) return null;
    else if(sort){
        songs = allSongs.filter(n => n.score <= 10);
    }
    else{
        songs = allSongs.filter(n => n.score > 10);
    }
    
    if(songs.length === 0){
        return allSongs[Math.random() * (allSongs.length - 1 )];
    }
    return songs[Math.random() * (songs.length - 1 )];
}

export { songList, sortSong };