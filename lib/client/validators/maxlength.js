var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {

        formlyValidator.register('maxlength', (configValue, $viewValue, $modelValue) => {
            let maxlength = parseInt(configValue);
            let value = $viewValue || $modelValue;
            maxlength = isNaN(maxlength) ? -1 : maxlength;
            
            return (maxlength < 0) || angular.isEmpty(value) || (value.length <= maxlength);
        });

    });