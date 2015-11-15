describe('formlyValidator', () => {
    //
    // vars
    //

    let formlyValidator;
    let formlyTransformer;
    let transformersLength = 0;

    //
    // tests
    //

    beforeEach(() => {
        module('formlyValidator');

        inject(function (_formlyValidator_, _formlyTransformer_) {
            formlyValidator = _formlyValidator_;
            formlyTransformer = _formlyTransformer_;
            transformersLength = formlyTransformer._transformers.length;
        });
    });

    it('should be able to parse RegExp', () => {
        const objects = [];

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
            value: () => {
            },
            expected: undefined
        });

        objects.push({
            value: {},
            expected: undefined
        });

        objects.forEach((obj) => {
            expect(formlyValidator.parseRegExp(obj.value)).toEqual(obj.expected);
        });
    });

    it('should be able to check empty value', () => {
        const emptyValues = [
            null, undefined, ""
        ];
        const notEmptyValues = [
            () => {
            }, {}, true, false, " ", 1, 0, -1, "1", "0", "-1", "s", "undefined", "null"
        ];

        // empty
        emptyValues.forEach((val) => {
            expect(formlyValidator.isEmpty(val)).toBeTruthy();
        });
        // not empty
        notEmptyValues.forEach((val) => {
            expect(formlyValidator.isEmpty(val)).toBeFalsy();
        });
    });

    it('should be able to create error with prefixed message', () => {
        expect(() => {
            throw formlyValidator.createError("test");
        }).toThrowError(Error, "[formlyValidator] test");

        expect(() => {
            formlyValidator.createError("test");
        }).not.toThrowError();
    });

    it('should be able to set field validator', () => {
        // empty field
        let field = {
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

    it('should be able to get field validator', () => {
        const fields = [
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

        fields.forEach((field) => {
            expect(formlyValidator.getFieldValidator(field.field, 'required')).toEqual(field.expected);
        });
    });

    it('should not register validator with empty name', () => {
        const names = [null, undefined, ""];

        names.forEach((name) => {
            expect(() => {
                formlyValidator.register(name, () => {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should not register validator using numbers as name', () => {
        const names = [1, 0, 2, "1", "0", "2", 1.2, 2.1, -1, "1.2"];

        names.forEach((name) => {
            expect(() => {
                formlyValidator.register(name, () => {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should not register validator using boolean values as name', () => {
        const names = [true, false];

        names.forEach((name) => {
            expect(() => {
                formlyValidator.register(name, () => {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should register validator using strings as names which match pattern', () => {
        const names = ["", "s", "s1", "s.2", "s._", "123", "aaaa23", "aa", "AA"];

        names.forEach((name) => {
            expect(() => {
                formlyValidator.register(name, () => {
                });
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);

        expect(() => {
            formlyValidator.register('test', () => {
            });
        }).not.toThrowError();

        // check transformers
        expect(formlyTransformer._transformers.length).toEqual(transformersLength + 1);
    });

    it('should not register validator with empty expression', () => {
        const expressions = [null, undefined, ""];
        expressions.forEach((expr) => {
            expect(() => {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should not register validator with number as expression', () => {
        const expressions = [1, 0, 2, "1", "0", "2", 1.2, 0.2, 2.1, "1.2", "0.2", "2.1"];
        expressions.forEach((expr) => {
            expect(() => {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should not register validator with string as expression', () => {
        const expressions = ["", "expression", "1", "undefined", "null"];
        expressions.forEach((expr) => {
            expect(() => {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should not register validator with object as expression', () => {
        const expressions = [{}, {test: 1}, [], ['1']];
        expressions.forEach((expr) => {
            expect(() => {
                formlyValidator.register('test', expr);
            }).toThrowError();
        });

        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength);
    });

    it('should register validator with function as expression', () => {
        expect(() => {
            formlyValidator.register('test', () => {
            });
        }).not.toThrowError();
        // check transformers
        expect(formlyTransformer._transformers.length).toBe(transformersLength + 1);
    });

});
