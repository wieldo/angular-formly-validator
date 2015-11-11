var {SetModule, Service, Inject} = angular2now;

SetModule('formlyValidator');
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

        this.formlyTransformer.register((fields) => {

            if (!angular.isArray(fields)) {
                return;
            }

            fields.forEach((field) => {
                const validatorConfig = this.getFieldValidator(field, name);

                if (angular.isDefined(validatorConfig)) {
                    if (!field.validators) {
                        field.validators = {};
                    }

                    // set expression with context (this.createError method)
                    field.validators[name] = {
                        expression: (...expressionArgs) => expression.call({
                            createError: (msg) => this.createError(`[${name}]: ${msg}`)
                        }, validatorConfig, ...expressionArgs)
                    }
                }
            });

        });
    }

    //
    // helpers
    //

    setFieldValidator(field, name, config) {
        if (!field.transformers) {
            field.transformers = {};
        }

        if (!field.transformers.validators) {
            field.transformers.validators = {};
        }


        field.transformers.validators[name] = config;
    }

    getFieldValidator(field, name) {
        if (!field.transformers) {
            return;
        }

        if (!field.transformers.validators) {
            return;
        }

        return field.transformers.validators[name];
    }

    createError(msg) {
        return new Error(`[formlyValidator] ${msg}`);
    }

    isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    parseRegExp(regexp) {
        let pattern;
        if (angular.isString(regexp) && regexp.length > 0) {
            pattern = new RegExp('^' + regexp + '$');
        }

        if (regexp && regexp.test) {
            pattern = regexp;
        }

        return pattern;
    }
}