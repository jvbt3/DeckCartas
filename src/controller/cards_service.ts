import {writeFile, readFile} from 'fs/promises'

class cardsService {
    async writeCards(cards: any) {
        try {
            await writeFile('cards.json', JSON.stringify(cards, null, 4))
            console.log("Arquivo escrito")
        } catch (error) {
            console.error('Não escrito', error)
        }
        
    }
}

export default new cardsService()