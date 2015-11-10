var both = ['client', 'server'];
var client = 'client';
var server = 'server';

Package.describe({
    name: "wieldo:angular-formly-validator",
    summary: "Use set of built-in validators in your project. This module extends angular-formly-transformer.",
    version: "0.0.3",

    documentation: 'README.md',
    git: 'https://github.com/wieldo/angular-formly-validator.git'
});

Package.onUse(function (api) {

    var packages = [
        'underscore@1.0.4',
        'es5-shim@4.1.14',
        'pbastowski:angular-babel@1.0.2',
        'pbastowski:angular2-now@0.3.13',
        'wieldo:angular-formly@7.3.2'
    ];

    api.versionsFrom("METEOR@1.0");

    api.use(packages);

    api.imply([
        'angular@1.0.0',
        'angular:angular@1.4.7',
        'wieldo:angular-formly-transformer@0.0.1',
        'wieldo:angular-formly@7.3.2'
    ]);

    api.addFiles([
        'lib/client/main.js',
        // validators
        'lib/client/validators/required.js',
        'lib/client/validators/minlength.js',
        'lib/client/validators/maxlength.js',
        'lib/client/validators/minnumber.js',
        'lib/client/validators/maxnumber.js',
        'lib/client/validators/pattern.js',
        'lib/client/validators/notpattern.js'
    ], client);

});