module.exports = {
    apps: [{
        name: "server",
        script: "./server.js",
        args: 'dotenv_config_path=./.env'
    }]
}