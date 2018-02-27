import { h } from 'preact';
import style from './style.css';
import { TopCard } from './TopCard/index.js';

const TopCards = (props) => (
    <div id='topCardsContainer'>
        <TopCard creditCard={props.bestCard} />
        <TopCard creditCard={props.secondBestCard} />
        <TopCard creditCard={props.thirdBestCard} />
    </div>
);

export { TopCards };