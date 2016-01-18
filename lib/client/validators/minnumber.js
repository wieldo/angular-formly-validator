angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {

    formlyValidator.register('minnumber', (configValue, $viewValue, $modelValue) => {
      let value = $viewValue || $modelValue;
      let defMin = parseFloat(configValue);

      defMin = isNaN(defMin) ? undefined : defMin;

      if (!defMin) {
        throw formlyValidator.createError('minnumber value has to be a number');
      }

      return formlyValidator.isEmpty(value) || value >= defMin;
    });

  }]);
