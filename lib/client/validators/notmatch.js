angular.module('formlyValidator')
  .run(['formlyValidator', (formlyValidator) => {

    formlyValidator.register('notmatch', (fieldKey, $viewValue, $modelValue, $scope) => {
      const value = $viewValue || $modelValue;

      if (!angular.isString(fieldKey)) {
        throw formlyValidator.createError('match value has to be a string');
      }
      const field = _.find($scope.fields, (field) => field.key === fieldKey);

      // force this setting
      $scope.options.extras.validateOnModelChange = true;

      return formlyValidator.isEmpty($viewValue) || field.formControl.$viewValue !== value;
    });

  }]);
