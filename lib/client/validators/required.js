angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {
    formlyValidator.register('required', (configValue, $viewValue, $modelValue) => {
      let value = $viewValue || $modelValue;

      return !formlyValidator.isEmpty(value);
    });
  }]);
