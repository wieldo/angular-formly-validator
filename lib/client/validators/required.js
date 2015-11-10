var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {
        formlyValidator.register('required', (configValue, $viewValue, $modelValue) => {
            let value = $viewValue || $modelValue;
            return !isEmpty(value);

            function isEmpty(value) {
                return angular.isUndefined(value) || value === '' || value === null || value !== value;
            }
        });
    });