var {SetModule} = angular2now;

SetModule('formlyValidator')
    .run((formlyValidator) => {
        formlyValidator.register('notpattern', (configValue, $viewValue, $modelValue) => {
            let pattern = formlyValidator.parseRegExp(configValue);
            let value = $viewValue || $modelValue;

            return formlyValidator.isEmpty(value) || angular.isUndefined(pattern) || !pattern.test(value);
        });
    });