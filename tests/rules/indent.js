/* eslint-disable */

var rule = require('../../rules/indent'),
    RuleTester = require('../RuleTester');

/**
 * Prevents leading spaces in a multiline template literal from appearing in the resulting string
 * @param {string[]} strings The strings in the template literal
 * @returns {string} The template literal, with spaces removed from all lines
 */
function unIndent(strings) {
    const templateValue = strings[0];
    const lines = templateValue.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
    const lineIndents = lines.filter(line => line.trim()).map(line => line.match(/ */)[0].length);
    const minLineIndent = Math.min.apply(null, lineIndents);

    return lines.map(line => line.slice(minLineIndent)).join("\n");
}

var ruleTester = new RuleTester();

ruleTester.run('babel/indent', rule, {
    valid: [
        {
            code: unIndent`
                class A{
                    a = 1;
                }
            `
        },
        {
            code: unIndent`
                class A{
                    @Decorator()
                    a = 1;
                }
            `
        },
        {
            code: unIndent`
                class A{
                    @Decorator(
                        // comment
                    )
                    a = 1;
                }
            `
        },
        {
            code: unIndent`
                class A{
                    @Decorator(
                    // comment
                    )
                    a = 1;
                }
            `
        }
    ],

    invalid: [
        {
            code: unIndent`
                class A{
                       a = 1;
                }
            `,
            errors: [
                {
                    message: "Expected indentation of 4 spaces but found 7.", 
                    type: "Identifier"
                }
            ]
        },
        {
            code: unIndent`
                class A{
                       @Decorator()
                    a = 1;
                }
            `,
            errors: [
                {
                    message: "Expected indentation of 4 spaces but found 7.", 
                    type: "Punctuator"
                }
            ]
        },
        {
            code: unIndent`
                class A{
                    @Decorator(
                     // comment
                    )
                    a = 1;
                }
            `,
            errors: [
                {
                    message: "Expected indentation of 8 spaces but found 5.", 
                    type: "Line"
                }
            ]
        }
    ]
})
