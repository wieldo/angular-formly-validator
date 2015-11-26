var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run(['formlyValidator', (formlyValidator) => {

        formlyValidator.register('notallowed', (configValue, $viewValue, $modelValue) => {
            const value = $viewValue || $modelValue;
            const allowed = angular.isArray(configValue) ? configValue : [configValue];

            return formlyValidator.isEmpty($viewValue) || allowed.indexOf(value) === -1;
        });

    }]);