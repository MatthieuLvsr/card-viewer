import { useEffect, useState } from "react"
import Card from "./Card"
import '../style/deck.scss'

interface Car {
    index:number,
    name:string,
    description:string,
    element:string,
    rarity:string,
    rarity_index:number,
    speed:number,
    acceleration:number,
    maniability:number,
    image_prompt:string,
    image_file:string
}


const Deck = () => {

    const [collection, setCollection] = useState<Car[]>([])

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await fetch('../data/car-classic.json')
                
                const data = await response.json()
                const cars:Car[] = []
                if(data != null){
                    Array.from(data.cards).forEach(card => {
                        // console.log(card);
                        cars.push(card as Car)                        
                    })
                }
                // console.log(data.cards);
                setCollection(cars)               
                
                
            }catch(error){
                console.log(error);
                
            }
        }

        fetchData()
    },[])

    return (
        <div className="deck">
            {collection.map((card, index) =>(
                <Card key={index} description={card.description} name={card.name as string} rarity_index={card.rarity_index} rarity={card.rarity} image_file={card.image_file as string}/>
            ))}
        </div>
    )
}

export default Deck