angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {

    formlyValidator.register('contain', (configValue, $viewValue, $modelValue) => {
      const value = $viewValue || $modelValue;
      const phrases = angular.isArray(configValue) ? configValue : [configValue];
      const pattern = new RegExp(`(${phrases.join("|")})`, "i");

      return formlyValidator.isEmpty($viewValue) || pattern.test(value);
    });

  }]);
