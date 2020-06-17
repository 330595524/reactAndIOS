class MyPlugin {
    apply(compiler) {
        compiler.hooks.done.tap('My Plugin', (stats) => {
            console.log('Bravo!');
        })
    }
}

module.exports = MyPlugin;