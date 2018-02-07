import { h } from 'preact';
import style from './style.css';

const Disclaimer = () => (
	<div id="disclaimerContainer" class={style.disclaimer} >
		<h1>Disclaimer</h1>
		<p>
			The information contained on https://creditcardrewardcalc.netlify.com website (the "Service") is for general information purposes only.
		</p>
		<p>
			Credit Card Reward Calc assumes no responsibility for errors or omissions in the contents on the Service.
		</p>
		<p>
			In no event shall Credit Card Reward Calc be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. Credit Card Reward Calc reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.
		</p>
	</div>
);

export { Disclaimer };