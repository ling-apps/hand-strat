module.exports.routes = {
    '/': {
        view: 'homepage',
        layout: 'layout'
    },

    // --- Auth
    'get /register': { view: 'user/register' },
    'post /register': 'AuthController.register',

    'get /login': { view: 'user/login' },

    'get /logout': 'AuthController.logout',
    'get /auth/:provider': 'AuthController.auth',
    'post /auth/:provider': 'AuthController.auth',
    'get /auth/:provider/callback': 'AuthController.auth',

    // --- User
    'get /account': 'UserController.profile',

    // --- Combis
    'get /_api/combis': 'CombiController.find',
    'post /_api/combis': 'CombiController.create',
    'put /_api/combis/:id': 'CombiController.update',
    'delete /_api/combis/:id': 'CombiController.destroy',

    'get /combis': 'CombiController.index',
};
