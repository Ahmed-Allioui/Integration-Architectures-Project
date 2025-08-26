const environment = {
    production: true,
    port: 8080,
    defaultAdminPassword: '<your-password>',
    db:{
        host: '<your-host>',
        port: 27017,
        username: '<username>',
        password: '<password>',
        authSource: '<authSource>',
        name: 'name'
    },
    corsOrigins: [
        '<frontend-path>'
    ]
};

exports.default = environment;
