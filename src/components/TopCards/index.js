import { h } from 'preact';
import style from './style.css';
import { TopCard } from './TopCard/index.js';

const TopCards = (props) => (
    <div id='topCardsContainer' class={style.topCardContainer} >
        <TopCard creditCard={props.bestCard} id='bestCard'/>
        <TopCard creditCard={props.secondBestCard} id='secondBestCard'/>
        <TopCard creditCard={props.thirdBestCard} id='thirdBestCard'/>
    </div>
);

export { TopCards };