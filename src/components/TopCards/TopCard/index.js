import { h } from 'preact';
import style from './style.css';
import { formatAsCurrency } from '../../../Utils/Utils.js';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

const TopCard = (props) => (
    <div id={props.id} class={style.topCard}>
        <section class={style.cardHeader} > 
            <h1 class={style.cardTitle}>{(props.creditCard != undefined) ? props.creditCard.RankWording : ''}</h1>
            <h2 class={style.cardSubTitle}>{(props.creditCard != undefined) ? props.creditCard.Name : ''}</h2>
        </section>
        <section id='cardBody' class={style.cardBody}>
            <div id='itemCardType' class={style.itemContainer}>
                <h2>CARD TYPE</h2>
                <h1>{(props.creditCard != undefined) ? props.creditCard.CardType : ''}</h1>
            </div>
            <div id='itemFiveYearEarnings' class={style.itemContainer}>
                <h2>FIVE YEAR EARNINGS</h2>
                <h1>{(props.creditCard != undefined) ? formatAsCurrency(props.creditCard.RewardFiveYears) : ''}</h1>
            </div>
            <div id='itemTwoYearEarnings' class={style.itemContainer}>
                <h2>TWO YEAR EARNINGS</h2>
                <h1>{(props.creditCard != undefined) ? formatAsCurrency(props.creditCard.RewardTwoYear) : ''}</h1>
            </div>
            <div id='itemOneYearEarnings' class={style.itemContainer}>
                <h2>ONE YEAR EARNINGS</h2>
                <h1>{(props.creditCard != undefined) ? formatAsCurrency(props.creditCard.RewardOneYear) : ''}</h1>
            </div>
        </section>
        <section id='cardActions' class={style.cardActions}>
            <button class='mdc-card__action mdc-button mdc-button--compact'>APPLY</button>
        </section>
    </div>
);

export { TopCard };