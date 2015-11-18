describe('formlyValidator minlength validator', () => {
    //
    // vars
    //
    
    let formlyTransformer;
    let $compile;
    let $rootScope;
    let $scope = {};
    let field = {};
    const minlength = 5;
    
    //
    // helpers
    //

    const validate = (value) => {
        return testUtils.validate(value, field, $scope);
    };

    const compile = () => {
        $scope = $rootScope.$new();
        const setup = testUtils.setupCompile({
            name: 'minlength',
            value: minlength
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

    it('should be falsy on too short value', () => {
        expect(validate("test")).toBeFalsy();
    });

    it('should be truthy on valid values', () => {
        expect(validate("testpassed")).toBeTruthy();
    });

    it('should be falsy on empty values', () => {
        expect(validate("")).toBeFalsy();
    });

});
