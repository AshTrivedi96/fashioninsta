const path = require("path");

module.exports = {
    getConfig: () => {
        return require(path.resolve(`./config/config.json`));
    }
}