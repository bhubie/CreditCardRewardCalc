import { h } from 'preact';
import style from './style.css';


const IconMedalOne = ({ id, className }) => (
	<i class={`${style.emSvg} ${style.first_place_medal}`}/>
);

const IconMedalSecond = ({ id, className }) => (
	<i class={`${style.emSvg} ${style.second_place_medal}`}/>
);

const IconMedalThird = ({ id, className }) => (
	<i class={`${style.emSvg} ${style.third_place_medal}`}/>
);

export { IconMedalOne, IconMedalSecond, IconMedalThird };