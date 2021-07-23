import { topSongs } from '../repositories/recommendRepositories'

async function songList(amount:string) {
    return topSongs(amount);
}

export { songList };