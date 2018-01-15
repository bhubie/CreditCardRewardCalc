import { h } from 'preact';
import style from './style';
import { IconGitHub } from '../Icons/IconGitHub.js';


const Header = () => (
	<header class={style.header}>
		<h1>Credit Card Reward Calculator</h1>
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
