const path = require('path');
const fs = require('fs');
const readFileAsync = require('util').promisify(fs.readFile);
const writeFileAsync = require('util').promisify(fs.writeFile);

class myplugin {
	constructor (options){
		this.options = options || {serverPath:'xxx'};
		this.serverPath = this.options.serverPath;
	}
	apply(compiler){
		compiler.hooks.done.tap('AddstaticServer',(compilation)=>{
			let context = compiler.options.context;
			let publicPath = path.resolve(context,'dist');
			compilation.toJson().assets.forEach((ast)=>{
				let {dir,base,ext} =path.parse(ast.name);
				if(ext === '.ftl'){
					readFileAsync(path.resolve(publicPath,dir,base)).then((res)=>{
						res = res.replace('static',this.serverPath);
						writeFileAsync(path.resolve(publicPath,dir,base),res)；
					})
				}
			})
		})
	}
}
module.exports = myplugin;