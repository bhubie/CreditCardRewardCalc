import { h, Component } from 'preact';
import { Header } from '../components/Header';
import { Disclaimer } from '../components/Disclaimer/index.js';
import Home from '../components/Home/index.js'
import { Router } from 'preact-router';


export default class App extends Component {

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="appContainer" >
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Disclaimer path="/disclaimer"/>
				</Router>
			</div>
		);
	}
}
