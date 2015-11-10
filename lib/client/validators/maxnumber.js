var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {

        /**
         * @todo extend it to use decimal also
         */

        formlyValidator.register('maxnumber', (configValue, $viewValue, $modelValue) => {
            let value = parseInt($viewValue) || parseInt($modelValue);

            let defMax = parseInt(configValue);
            defMax = isNaN(defMax) ? undefined : defMax;

            if (!defMax) {
                throw formlyValidator.createError('maxnumber value has to be a number');
            }

            return value <= defMax;
        });

    });