import CopyWebpackPlugin from 'copy-webpack-plugin';
import jsonminify from 'jsonminify';

export default (config, env, helpers) => {
	config.plugins.push( new CopyWebpackPlugin(
		[{ 
			context: `${__dirname}/src/Utils`, 
			from: `CreditCards.json`, 
			transform (content, path) {
				//console.log(content.toString());
        		return JSON.minify(content.toString());
			  } 
		}]) );
};
