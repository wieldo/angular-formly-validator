describe('formlyValidator minlength validator', function () {
    // injectables
    var formlyTransformer;
    var $compile;
    var $rootScope;

    // 
    var $scope = {};
    var field = {};
    var minlength = 5;

    beforeEach(function () {
        angular.module('testApp', ['angular-meteor', 'formly', 'formlyValidator', 'ngMock']);

        module('testApp');

        inject(function (_formlyTransformer_, _$compile_, _$rootScope_) {
            formlyTransformer = _formlyTransformer_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
        
        compile();
    });

    it('should be falsy on too short value', function () {
        expect(validate("test")).toBeFalsy();
    });

    it('should be truthy on valid values', function () {
        expect(validate("testpassed")).toBeTruthy();
    });

    it('should be falsy on empty values', function () {
        expect(validate("")).toBeFalsy();
    });

    function validate(value) {
        return testUtils.validate(value, field, $scope);
    }

    function compile() {
        $scope = $rootScope.$new();
        var setup = testUtils.setupCompile({
            name: 'minlength',
            value: minlength
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);

        field = $scope[setup.formName][setup.fieldName];

        $scope.$digest();
    }

});