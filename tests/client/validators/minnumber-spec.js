describe('formlyValidator minnumber validator', function () {
    // injectables
    var formlyTransformer;
    var $compile;
    var $rootScope;

    //
    var $scope;
    var field;

    beforeEach(function () {
        angular.module('testApp', ['angular-meteor', 'formly', 'formlyValidator', 'ngMock']);

        module('testApp');

        inject(function (_formlyTransformer_, _$compile_, _$rootScope_) {
            formlyTransformer = _formlyTransformer_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });
    });

    it('should throw error on config value using strings with non numeric characters', function () {
        var values = ['a', '2a', 'two!', "!", "_"];

        values.forEach((value) => {
            expect(function () {
                compile(value);
            }).toThrowError();
        });
    });

    it('should throw error on empty config value', function () {
        var values = ["", null, undefined];

        values.forEach((value) => {
            expect(function () {
                compile(value);
            }).toThrowError();
        });
    });

    it('should throw error on boolean config value', function () {
        var values = [false, true];

        values.forEach((value) => {
            expect(function () {
                compile(value);
            }).toThrowError();
        });
    });

    it('should not throw error on config value using float numbers', function () {
        var values = [1.2, 2.1, "1.2", "2.1"];

        values.forEach((value) => {
            expect(function () {
                compile(value);
            }).not.toThrowError();
        });
    });

    describe('validator for integer', function () {

        beforeEach(function () {
            compile(5);
        });

        describe('pass', function () {
            it('should pass on equal values', function () {
                passOn([5, "5"]);
            });
            
            it('should pass on higher values', function () {
                passOn([5.1, 6, 7, "5.1", "6", "7"]);
            });
            
            it('should pass on empty values', function () {
                passOn([undefined, null, ""]);
            });
        });

        describe('fail', function () {
            it('should fail on lower values', function () {
                failOn([4, 4.9, 4.5, 1, 0, -1, -3, -5, -6, "4", "4.9", "4.5", "1", "0", "-1", "-3", "-5", "-6"]);
            });

            it('should fail on strings with non numeric characters', function () {
                failOn(['a', '2a', 'two!', "!", "_"]);
            });
        });
    });

    describe('validator for float', function () {

        beforeEach(function () {
            compile(5.1);
        });

        describe('pass', function () {
            it('should pass on higher values', function () {
                passOn([5.2, 6, 7, "5.2", "6", "7"]);
            });

            it('should pass on equal values', function () {
                passOn([5.1, "5.1"]);
            });

            it('should pass on empty values', function () {
                passOn([undefined, null, ""]);
            });
        });

        describe('fail', function () {

            it('should fail on lower values', function () {
                failOn([4, 4.9, 4.5, 1, 0, -1, -3, -5, -6, "4", "4.9", "4.5", "1", "0", "-1", "-3", "-5", "-6"]);
            });

            it('should fail on strings with non numeric characters', function () {
                failOn(['a', '2a', 'two!', "!", "_"]);
            });
        });
    });

    function validate(value) {
        return testUtils.validate(value, field, $scope);
    }

    function compile(value) {
        $scope = $rootScope.$new();
        var setup = testUtils.setupCompile({
            name: 'minnumber',
            value: value
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);
        field = $scope[setup.formName][setup.fieldName];
        $scope.$digest();
    }

    function failOn(values) {
        values.forEach((value) => {
            expect(validate(value)).toBeFalsy();
        });
    }

    function passOn(values) {
        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    }

});