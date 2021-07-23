import { topSongs, listAllSongs } from '../repositories/recommendRepositories'

async function songList(amount:string) {
    return topSongs(amount);
}

async function sortSong(){
    const allSongs = await listAllSongs();
    const sort = Math.random() > 0.7;
    let songs;
    let max: number;
    let min: number = 0;

    if(allSongs.length === 0) return false;
    else if(sort){
        songs = allSongs.filter(n => n.score <= 10);
    }
    else{
        songs = allSongs.filter(n => n.score > 10);
    }
    
    if(songs.length === 0){
        max = allSongs.length -1;
        return allSongs[Math.floor(Math.random() * (max - min)) + min];
    }
    max = songs.length -1;
    return songs[Math.floor(Math.random() * (max - min + 1)) + min];
}

export { songList, sortSong };