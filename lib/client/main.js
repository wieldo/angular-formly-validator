var {SetModule, Service, Inject} = angular2now;

SetModule('formlyValidator', ['formlyTransformer']);
@Service({
    name: 'formlyValidator'
})
@Inject(['formlyTransformer'])
    //
class formlyValidator {

    // injectables
    formlyTransformer;

    constructor(formlyTransformer) {
        this.formlyTransformer = formlyTransformer;
    }

    register(name, expression) {

        if (!expression) {
            this.createError(`Missing expression for ${name} validator`);
        }

        if (!angular.isFunction(expression)) {
            this.createError(`Expression for ${name} validator has to be a function`);
        }

        this.formlyTransformer.register(name, function (field, config) {
            if (!field.validators) {
                field.validators = {};
            }

            field.validators[name] = {
                expression: (...expressionArgs) => expression.call(undefined, config, ...expressionArgs)
            };
        });
    }

    //
    // helpers
    //

    createError(msg) {
        return new Error(`[formlyValidator] ${msg}`);
    }
    
    isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }
}