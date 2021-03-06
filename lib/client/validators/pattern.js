angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {
    formlyValidator.register('pattern', (configValue, $viewValue, $modelValue) => {
      let pattern = formlyValidator.parseRegExp(configValue);
      let value = $viewValue || $modelValue;

      return formlyValidator.isEmpty(value) || angular.isUndefined(pattern) || pattern.test(value);
    });
  }]);
