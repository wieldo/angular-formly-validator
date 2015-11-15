describe('formlyValidator notpattern validator', () => {
    //
    // vars
    //
    let formlyTransformer;
    let $compile;
    let $rootScope;
    let $scope;
    let field;
    const notpattern = /^[a-z]{4,8}$/;

    //
    // helpers
    //
    
    const validate = (value) => {
        return testUtils.validate(value, field, $scope);
    };

    const compile = () => {
        $scope = $rootScope.$new();
        const setup = testUtils.setupCompile({
            name: 'notpattern',
            value: notpattern
        }, $scope, formlyTransformer);

        $compile(setup.element)($scope);

        field = $scope[setup.formName][setup.fieldName];

        $scope.$digest();
    };
    
    //
    // tests
    //

    beforeEach(() => {
        angular.module('testApp', ['angular-meteor', 'formly', 'formlyValidator', 'ngMock']);

        module('testApp');

        inject(function (_formlyTransformer_, _$compile_, _$rootScope_) {
            formlyTransformer = _formlyTransformer_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        compile();
    });

    it('should be truthy on empty values', () => {
        expect(validate("")).toBeTruthy();
    });

    it('should be truthy on undefined value', () => {
        expect(validate(undefined)).toBeTruthy();
    });

    it('should be truthy on null value', () => {
        expect(validate(null)).toBeTruthy();
    });

    it('should be truthy on too short value', () => {
        const values = ["t", "te", "tes"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on too long value', () => {
        const values = ["testfailed", "testfailed2", "testfailed23"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on numbers', () => {
        const values = [123, 1234, "-12345"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on mixed strings', () => {
        const values = ["t123", "t1234", "t-12345"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on string with special characters', () => {
        const values = ["test-", "test$$", "t_est"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be truthy on strings upper case letters', () => {
        const values = ["tesT", "testFail", "TEST"];

        values.forEach((value) => {
            expect(validate(value)).toBeTruthy();
        });
    });

    it('should be falsy on strings with only lower case letters', () => {
        const values = ["test", "testpass", "tester"];

        values.forEach((value) => {
            expect(validate(value)).toBeFalsy();
        });
    });

});
