var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {
        formlyValidator.register('minlength', (configValue, $viewValue, $modelValue) => {
            let value = $viewValue || $modelValue;
            let minlength = parseInt(configValue);
            minlength = isNaN(minlength) ? 0 : minlength;
            
            return !value || value === "" || value.length >= minlength;
        });
    });