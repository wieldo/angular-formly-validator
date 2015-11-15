describe('formlyValidator maxlength validator', () => {
    //
    // vars
    //
    
    let formlyTransformer;
    let $compile;
    let $rootScope;
    let $scope;
    let field;
    const maxlength = 5;
    
    //
    // helpers
    //

    const validate = (value) => {
        return testUtils.validate(value, field, $scope);
    };

    const compile = () => {
        $scope = $rootScope.$new();
        const setup = testUtils.setupCompile({
            name: 'maxlength',
            value: maxlength
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

    it('should be falsy on too long value', () => {
        expect(validate("testfailed")).toBeFalsy();
    });

    it('should be truthy on valid values', () => {
        expect(validate("test")).toBeTruthy();
    });

    it('should be truthy on empty values', () => {
        expect(validate("")).toBeTruthy();
    });

});
