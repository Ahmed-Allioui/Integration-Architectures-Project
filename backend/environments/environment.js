const environment = {
    production: false,
    port: 8080,
    defaultAdminPassword: '<your-password>',
    db:{
        host: 'localhost',
        port: 27017,
        username: '',
        password: '',
        authSource: 'admin',
        name: 'intArch'
    },
    corsOrigins: [
        'http://localhost:4200'
    ]
};

exports.default = environment;
