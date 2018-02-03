import CopyWebpackPlugin from 'copy-webpack-plugin';

export default (config, env, helpers) => {
	config.plugins.push( new CopyWebpackPlugin([{ context: `${__dirname}/src/Utils`, from: `CreditCards.json` }]) );
};
