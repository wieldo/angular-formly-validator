angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {
    formlyValidator.register('minlength', (configValue, $viewValue, $modelValue) => {
      let value = $viewValue || $modelValue;
      let minlength = parseInt(configValue);

      minlength = isNaN(minlength) ? 0 : minlength;

      return !formlyValidator.isEmpty(value) && value.length >= minlength;
    });
  }]);
