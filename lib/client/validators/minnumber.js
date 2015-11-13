var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {

        /**
         * @todo extend it to use decimal also
         */

        formlyValidator.register('minnumber', (configValue, $viewValue, $modelValue) => {
            let value = parseInt($viewValue) || parseInt($modelValue);
            let defMin = parseInt(configValue);
            
            defMin = isNaN(defMin) ? undefined : defMin;

            if (!defMin) {
                throw formlyValidator.createError('minnumber value has to be a number');
            }

            return value >= defMin;
        });

    });