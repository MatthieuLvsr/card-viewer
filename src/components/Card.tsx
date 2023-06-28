import React, {useRef, useState, CSSProperties, useEffect} from 'react';
import "../style/card.scss"
import VanillaTilt from 'vanilla-tilt';

const CARD_WIDTH:string = "180px"

interface CardProps {
  name: string,
  rarity:string,
  image_file:string,
  rarity_index:number
}

const Card:React.FC<CardProps> = ({name,rarity,image_file, rarity_index}) => {
  

    const cardRef = useRef<HTMLDivElement>(null)
    const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0, visible:'hidden' });
    const [holoPosition, setHoloPosition] = useState({ x: 0, y: 0, visible:'hidden' });

    const handleMouseMove = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(cardRef.current){
            const cardRect = cardRef.current.getBoundingClientRect()
            let w = cardRef.current.clientWidth;
            let h = cardRef.current.clientHeight;
            const offsetX = (event.clientX - cardRect.left) / w;
            const offsetY = (event.clientY - cardRect.top) / h;
            const bgX = (event.clientX - cardRect.left) * 0.25;
            const bgY = (event.clientY - cardRect.top) * 0.25;
            setGlarePosition({ x: offsetX, y: offsetY, visible: 'visible' });
            setHoloPosition({ x: bgX, y: bgY, visible: 'visible' });
        }
    }

    const handleMouseLeave = () => {      
      setGlarePosition({ x: 0, y: 0, visible: 'hidden' });
      setHoloPosition({ x: 0, y: 0, visible: 'hidden' });
    }

    const glareStyle: CSSProperties & { [key: string]: string | number } = {
        '--x': `${glarePosition.x * 100}%`,
        '--y': `${glarePosition.y * 100}%`,
        visibility: glarePosition.visible as 'visible' |'hidden'
    };

    const holoStyles: CSSProperties & { [key: string]: string | number } = {
      '--background-x':`${holoPosition.x}%`,
      '--background-y':`${holoPosition.y}%`,
      '--x': `${glarePosition.x * 100}%`,
      '--y': `${glarePosition.y * 100}%`,
      visibility: glarePosition.visible as 'visible' |'hidden'
    };

  

  const options = {
    scale:1.1,
    speed: 1000,
    max: 30,
    transition:true,
    easing: "cubic-bezier(.03,.98,.52,.99)"
  };
  
  useEffect(() => {
    VanillaTilt.init(cardRef.current as HTMLDivElement, options);
  }, [options]);


  const getMask = (image:string) => {
    image = image.split('.')[0]
    image += "-mask.png"
    return image    
  }


  return (
    <div style={{width:CARD_WIDTH,minWidth:CARD_WIDTH}} data-rarity={rarity} ref={cardRef} className='card' onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
      <img src={`./assets/cards/${image_file}`} alt={name} width={CARD_WIDTH}/>
      {rarity_index > 0 ? <><div className='glare' style={glareStyle}/>
      <div className='holo shine' style={holoStyles}/></> : <></>}
      {rarity_index > 1 ? <img className='mask' src={`./assets/masks/${getMask(image_file)}`} width={CARD_WIDTH}/> : <></>}
    </div>
  );
};

export default Card;
