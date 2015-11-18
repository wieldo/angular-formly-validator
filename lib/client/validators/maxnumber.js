var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run(['formlyValidator', (formlyValidator) => {

        formlyValidator.register('maxnumber', (configValue, $viewValue, $modelValue) => {
            let value = $viewValue || $modelValue;
            let defMax = parseFloat(configValue);

            defMax = isNaN(defMax) ? undefined : defMax;

            if (!defMax) {
                throw formlyValidator.createError('maxnumber value has to be a number');
            }

            return formlyValidator.isEmpty(value) || value <= defMax;
        });

    }]);