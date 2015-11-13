/*eslint no-self-compare: 1*/

const {SetModule, Service, Inject} = angular2now;

SetModule('formlyValidator');
@Service({
    name: 'formlyValidator'
})
@Inject(['formlyTransformer'])
    /**
     * AngularJS Service
     * 
     * @property formlyValidator
     */
class formlyValidator {

    // injectables
    formlyTransformer;
    
    nameRegExp = /^[a-z]{3,}$/i;

    constructor(formlyTransformer) {
        this.formlyTransformer = formlyTransformer;
    }

    /**
     * Register validator
     *
     * @method formlyValidator.register
     * 
     * @param {string} name - validator identifier
     * @param {function} expression - like formly expression but with field validator configuration as first argument
     */
    register(name, expression) {
        
        if(this.isEmpty(name)) {
            throw this.createError('Missing name of validator');
        }
        
        if(!angular.isString(name) || !this.nameRegExp.test(name)) {
            throw this.createError(`Invalid validator name: ${name}. Must match ${this.nameRegExp.source}`);
        }

        if (!expression) {
            throw this.createError(`Missing expression for ${name} validator`);
        }

        if (!angular.isFunction(expression)) {
            throw this.createError(`Expression for ${name} validator has to be a function`);
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


    /**
     * Add validator to field
     *
     * @method formlyValidator.setFieldValidator
     * 
     * @param {object} field - formlyConfig of field
     * @param {string} name - validator name
     * @param {Any} config - field validator configuration
     */
    setFieldValidator(field, name, config) {
        if (!field.transformers) {
            field.transformers = {};
        }

        if (!field.transformers.validators) {
            field.transformers.validators = {};
        }


        field.transformers.validators[name] = config;
    }

    /**
     * Get validator configuration of field
     *
     * @method formlyValidator.getFieldValidator
     * 
     * @param {object} field - formlyConfig of field
     * @param {string} name - validator name
     * @returns {Any} validator configuration for field
     */
    getFieldValidator(field, name) {
        if (!field.transformers) {
            return;
        }

        if (!field.transformers.validators) {
            return;
        }

        return field.transformers.validators[name];
    }

    /**
     * Create Error object with prefixed message
     *
     * @method formlyValidator.createError
     * 
     * @param {string} msg - error message
     * @returns {Error}
     */
    createError(msg) {
        return new Error(`[formlyValidator] ${msg}`);
    }

    /**
     * Checks if variable is empty
     *
     * @method formlyValidator.isEmpty
     * 
     * @param {Any} value - value to check
     * @returns {boolean}
     */
    isEmpty(value) {
        return angular.isUndefined(value) || value === '' || value === null || value !== value;
    }

    /**
     * You can put string representation of RegExp object (for example "[a-z]+") or just RegExp object.
     * Adds ^ and $ to string representation and returns undefined if it is not a string or RegExp object.
     *
     * @method formlyValidator.parseRegExp
     * 
     * @param {string|RegExp} regexp
     * @returns {RegExp}
     */
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