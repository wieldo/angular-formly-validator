describe('formlyValidator', function () {
    var formlyValidator;
    var formlyTransformer;

    beforeEach(function () {
        module('formlyValidator');

        inject(function (_formlyValidator_, _formlyTransformer_) {
            formlyValidator = _formlyValidator_;
            formlyTransformer = _formlyTransformer_;

            // reset
            formlyTransformer._transformers = [];
        });
    });

    it('should be able to parse RegExp', function () {
        var objects = [];

        // valid
        objects.push({
            value: "[a-z]+",
            expected: new RegExp("^[a-z]+$")
        });

        objects.push({
            value: new RegExp("^[a-z]+$"),
            expected: new RegExp("^[a-z]+$")
        });

        objects.push({
            value: "1234",
            expected: new RegExp("^1234$")
        });

        objects.push({
            value: "undefined",
            expected: new RegExp("^undefined$")
        });

        // invalid
        objects.push({
            value: [],
            expected: undefined
        });

        objects.push({
            value: 1234,
            expected: undefined
        });

        objects.push({
            value: null,
            expected: undefined
        });

        objects.push({
            value: function () {
            },
            expected: undefined
        });

        objects.push({
            value: {},
            expected: undefined
        });

        _.each(objects, function (obj) {
            expect(formlyValidator.parseRegExp(obj.value)).toEqual(obj.expected);
        });
    });

    it('should be able to check empty value', function () {
        var emptyValues = [
            null, undefined, ""
        ];
        var notEmptyValues = [
            function () {
            }, {}, true, false, " ", 1, 0, -1, "1", "0", "-1", "s", "undefined", "null"
        ];

        // empty
        _.each(emptyValues, function (val) {
            expect(formlyValidator.isEmpty(val)).toBeTruthy();
        });
        // not empty
        _.each(notEmptyValues, function (val) {
            expect(formlyValidator.isEmpty(val)).toBeFalsy();
        });
    });

    it('should be able to create error with prefixed message', function () {
        expect(function () {
            throw formlyValidator.createError("test");
        }).toThrowError(Error, "[formlyValidator] test");

        expect(function () {
            formlyValidator.createError("test");
        }).not.toThrowError();
    });

    it('should be able to set field validator', function () {
        // empty field
        var field = {
            key: 'test'
        };

        formlyValidator.setFieldValidator(field, 'required', true);

        expect(field).toEqual({
            key: 'test',
            transformers: {
                validators: {
                    required: true
                }
            }
        });

        // field with only transformers property

        field = {
            key: 'test',
            transformers: {}
        };

        formlyValidator.setFieldValidator(field, 'required', true);

        expect(field).toEqual({
            key: 'test',
            transformers: {
                validators: {
                    required: true
                }
            }
        });

        // field with one validator

        field = {
            key: 'test',
            transformers: {
                validators: {
                    minlength: 3
                }
            }
        };

        formlyValidator.setFieldValidator(field, 'required', true);

        expect(field).toEqual({
            key: 'test',
            transformers: {
                validators: {
                    required: true,
                    minlength: 3
                }
            }
        });

    });

    it('should be able to get field validator', function () {
        var fields = [
            {
                field: {
                    key: 'test'
                },
                expected: undefined
            },
            {
                field: {
                    key: 'test',
                    transformers: {}
                },
                expected: undefined
            },
            {
                field: {
                    key: 'test',
                    transformers: {
                        validators: {}
                    }
                },
                expected: undefined
            },
            {
                field: {
                    key: 'test',
                    transformers: {
                        validators: {
                            required: true
                        }
                    }
                },
                expected: true
            }
        ];

        _.each(fields, function (field) {
            expect(formlyValidator.getFieldValidator(field.field, 'required')).toEqual(field.expected);
        });
    });

    it('should not register validator with empty name', function () {
        var names = [null, undefined, ""];
        _.each(names, function (name) {
            expect(function () {
                formlyValidator.register(name, function () {
                });
            }).toThrowError();
        });
        
        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should not register validator using numbers as name', function () {
        var names = [1, 0, 2, "1", "0", "2", 1.2, 2.1, -1, "1.2"];

        _.each(names, function (name) {
            expect(function () {
                formlyValidator.register(name, function () {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should not register validator using boolean values as name', function () {
        var names = [true, false];

        _.each(names, function (name) {
            expect(function () {
                formlyValidator.register(name, function () {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should register validator using strings as names which match pattern', function () {
        var names = ["", "s", "s1", "s.2", "s._", "123", "aaaa23", "aa", "AA"];

        _.each(names, function (name) {
            expect(function () {
                formlyValidator.register(name, function () {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);

        expect(function () {
            formlyValidator.register('test', function () {
            });
        }).not.toThrowError();

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(1);
    });

    it('should not register validator with empty expression', function () {
        var expressions = [null, undefined, ""];
        _.each(expressions, function (expr) {
            expect(function () {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should not register validator with number as expression', function () {
        var expressions = [1, 0, 2, "1", "0", "2", 1.2, 0.2, 2.1, "1.2", "0.2", "2.1"];
        _.each(expressions, function (expr) {
            expect(function () {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should not register validator with string as expression', function () {
        var expressions = ["", "expression", "1", "undefined", "null"];
        _.each(expressions, function (expr) {
            expect(function () {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should not register validator with object as expression', function () {
        var expressions = [{}, {test: 1}, [], ['1']];
        _.each(expressions, function (expr) {
            expect(function () {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(0);
    });

    it('should register validator with function as expression', function () {
        expect(function () {
            formlyValidator.register('test', function() {});
        }).not.toThrowError();
        // check transformers
        expect(formlyTransformer._transformers.length).toBe(1);
    });

});