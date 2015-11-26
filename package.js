var client = 'client';

Package.describe({
    name: "wieldo:angular-formly-validator",
    summary: "Use set of built-in validators in your project. This module extends angular-formly-transformer.",
    version: "1.2.0",

    documentation: 'README.md',
    git: 'https://github.com/wieldo/angular-formly-validator.git'
});

Package.onUse(function (api) {

    var packages = {
        use: [
            'angular@1.0.0',
            'angular:angular@1.4.7',
            'underscore@1.0.4',
            'pbastowski:angular-babel@1.0.2',
            'pbastowski:angular2-now@0.3.13',
            'wieldo:angular-formly@7.3.2',
            'wieldo:angular-formly-transformer@1.0.0'
        ],
        imply: [
            'wieldo:angular-formly',
            'wieldo:angular-formly-transformer'
        ]
    };

    api.versionsFrom("METEOR@1.0");

    api.use(packages.use);

    api.imply(packages.imply);

    api.addFiles([
        'lib/client/main.js',
        'lib/client/formly-validator.js',
        // validators
        'lib/client/validators/required.js',
        'lib/client/validators/minlength.js',
        'lib/client/validators/maxlength.js',
        'lib/client/validators/minnumber.js',
        'lib/client/validators/maxnumber.js',
        'lib/client/validators/pattern.js',
        'lib/client/validators/notpattern.js',
        'lib/client/validators/match.js',
        'lib/client/validators/notmatch.js',
        'lib/client/validators/contain.js',
        'lib/client/validators/notcontain.js'
    ], client);

});

Package.onTest(function (api) {
    api.use([
        'pbastowski:angular-babel@1.0.2',
        'pbastowski:angular2-now@0.3.13',
        'sanjo:jasmine@0.20.2',
        'velocity:helpers',
        'velocity:console-reporter',
        'angular:angular-mocks@1.4.7',
        'wieldo:angular-formly-validator'
    ]);

    api.addFiles([
        'tests/client/formly-validator-spec.js',
        'tests/client/validators/test-utils.js',
        // validators
        'tests/client/validators/required-spec.js',
        'tests/client/validators/maxlength-spec.js',
        'tests/client/validators/minlength-spec.js',
        'tests/client/validators/pattern-spec.js',
        'tests/client/validators/notpattern-spec.js',
        'tests/client/validators/maxnumber-spec.js',
        'tests/client/validators/minnumber-spec.js'
    ], client);
});