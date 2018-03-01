import { h } from 'preact';
import style from './style.css';
import { formatAsCurrency } from '../../../Utils/Utils.js';
import { IconMedalOne, IconMedalSecond, IconMedalThird } from '../../Icons/IconMedals/IconMedals.js'
import Card from 'preact-material-components/Card';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';

const renderIcon = (rank) => {
    switch(rank) {
        case 1:
            return <IconMedalOne />
            break;
        case 2:
            return <IconMedalSecond />
            break;
        default:
            return <IconMedalThird />
    }
}
const TopCard = (props) => (
    <div id={props.id} class={style.topCard}>
        <section class={style.cardHeader}>
            <div class= {style.headerContainer}> 
                <div id='labelContainer'>
                    <h1 class={style.cardTitle}>{(props.creditCard != undefined) ? props.creditCard.RankWording : ''}</h1>
                    <h2 class={style.cardSubTitle}>{(props.creditCard != undefined) ? props.creditCard.Name : ''}</h2>
                </div>
                <div id='iconContainer'>
                {(props.creditCard != undefined) ? renderIcon(props.creditCard.Rank) : '' }
                </div>
            </div>
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
    </div>
);

export { TopCard };