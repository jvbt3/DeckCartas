import { Request, Response } from "express"
import cards_service from "./cards_service";

class CardsController {
    async cardGet(req: Request, res: Response) {
        let response: any = await fetch('https://api.magicthegathering.io/v1/cards?supertypes=legendary').then(data => data.json())
        let legendary = response.cards.map(((card: any) => ({
            name: card.name,
            supertype: card.supertypes[0],
            colors: card.colors
        })));

        let indexCommander = Math.floor(Math.random() * legendary.length)
        let commander = legendary[indexCommander];
        let colorQuery = commander.colors.join('|')
        let cardsCommander: any = await fetch(`https://api.magicthegathering.io/v1/cards?colors=${colorQuery}`).then(data => data.json())

        const cardsMap = cardsCommander.cards
        cardsMap.unshift(commander)
        cardsMap.splice(cardsCommander.length - 1 , 1)

        await cards_service.writeCards(cardsMap)
        res.json(cardsMap)
    }
}

export default new CardsController()
