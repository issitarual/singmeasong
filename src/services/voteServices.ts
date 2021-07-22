import { addVote, removeVote, findSongById, deletSong, verifyRate } from '../repositories/voteRepositories'

async function vote(id:number, type: string) {
    const songExist: boolean = await findSongById(id);
    if(!songExist) return null;
    else{
        if(type === 'sum'){
            await addVote(id);
        }
        else if(type === 'sub'){
            await removeVote(id);
            const rate = await verifyRate(id);
            if(parseInt(rate) <= -5){
                await deletSong(id);
            }
        }
        return true;
    }
}

export { vote }