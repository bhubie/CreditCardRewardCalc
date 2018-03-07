import { h } from 'preact';
import style from './style.css';
import 'preact-material-components/Button/style.css';
import { TopCard } from './TopCard/index.js';

const TopCards = (props) => (
    <div class= {style.topCardContainer}> 
        <h2 id='topCardsLabel' class={style.topCardsLabel}>
            Top 3 Reward Cards Based On Monthly Expenditures
        </h2>
        <div id='topCardsContainer' class={style.topCards} >
            <TopCard creditCard={props.bestCard} id='bestCard'/>
            <TopCard creditCard={props.secondBestCard} id='secondBestCard'/>
            <TopCard creditCard={props.thirdBestCard} id='thirdBestCard'/>
        </div>
        <div class={style.button}>
            <button class='mdc-button mdc-button--raised mdc-theme--secondary-bg'
                onClick={props.handleViewAllCards}>
                VIEW ALL CARDS
            </button>
        </div>
    </div>
);

export { TopCards };