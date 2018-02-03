import { h } from 'preact';
import style from './style.css';
import { IconGitHub } from '../Icons/IconGitHub.js';


const Header = (className) => (
	<header class={style.header}>
		<h1 id="LabelLarge" class={style.headerLabelLarge}>Credit Card Reward Calculator</h1>
		<h1 id="LabelSmall" class={style.headerLabelSmall}>CC Reward Calc</h1>
		<nav>
			<a href="https://github.com/bhubie/CreditCardRewardCalc" target="_blank" rel="noopener noreferrer"
				class={style.headerItemPadding} title="Contribute on Github"
			>
				<IconGitHub id="githubIco" className={style.whiteIcon} />
			</a>
		</nav>
	</header>
);

export { Header };
