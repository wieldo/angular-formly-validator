var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {
        formlyValidator.register('required', (configValue, $viewValue, $modelValue) => {
            let value = $viewValue || $modelValue;
            return value && value !== "";
        });
    });