angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {

    formlyValidator.register('maxlength', (configValue, $viewValue, $modelValue) => {
      let maxlength = parseInt(configValue);
      let value = $viewValue || $modelValue;

      maxlength = isNaN(maxlength) ? -1 : maxlength;

      return (maxlength < 0) || formlyValidator.isEmpty(value) || (value.length <= maxlength);
    });

  }]);
