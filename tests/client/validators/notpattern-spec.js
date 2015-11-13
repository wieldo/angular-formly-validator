describe('formlyValidator notpattern validator', function () {
    // injectables
    var formlyTransformer;
    var $compile;
    var $rootScope;

    //
    var $scope;
    var field;
    var notpattern = /^[a-z]{4,8}$/;

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

    it('should be truthy on empty values', function () {
        expect(validate("")).toBeTruthy();
    });

    it('should be truthy on undefined value', function () {
        expect(validate(undefined)).toBeTruthy();
    });

    it('should be truthy on null value', function () {
        expect(validate(null)).toBeTruthy();
    });

    it('should be truthy on too short value', function () {
        var values = ["t", "te", "tes"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on too long value', function () {
        var values = ["testfailed", "testfailed2", "testfailed23"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on numbers', function () {
        var values = [123, 1234, "-12345"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on mixed strings', function () {
        var values = ["t123", "t1234", "t-12345"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on string with special characters', function () {
        var values = ["test-", "test$$", "t_est"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on strings upper case letters', function() {
        var values = ["tesT", "testFail", "TEST"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be falsy on strings with only lower case letters', function() {
        var values = ["test", "testpass", "tester"];

        values.forEach((value) => {
            expect(validate(value)).toBeFalsy();
        });
    });

    function validate(value) {
        return testUtils.validate(value, field, $scope);
    }

    function compile() {
        $scope = $rootScope.$new();
        var setup = testUtils.setupCompile({
            name: 'notpattern',
            value: notpattern
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);

        field = $scope[setup.formName][setup.fieldName];

        $scope.$digest();
    }

});