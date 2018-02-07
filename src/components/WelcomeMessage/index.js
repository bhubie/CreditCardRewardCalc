import { h } from 'preact';
import style from './style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

const WelcomeMessage = (props) => (
	<div id="welcomeMessageContainer" class={style.welcome} >
		<h1>Welcome!</h1>
		<p>
            Find the Reward Credit Card that will give you the most bang for your buck. Get started by entering your Monthly Spendatures.
		</p>
		<p>
			The accuracy of the information presented on this site cannot be gauranteed and should be used for informational purposes only.
			&nbsp;
			<Link activeClassName="active" href="/disclaimer">Full Disclaimer</Link>
		</p>
		<p>
			See a missing credit card, or one that has incorrect information? Please, open an issue on Github.
		</p>
		<div id="welcomeButtonContainer" class={style.welcomeButtonContainer}>
			<Button raised className="mdc-theme--secondary-bg" onClick={props.onClick} >
				Get Started
			</Button>
		</div>
	</div>
);

export { WelcomeMessage };
