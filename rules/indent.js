"use strict";

const orgIndent = require('eslint/lib/rules/indent');

module.exports = Object.assign({}, orgIndent, {
    create: function(context) {
        const orgCreated = orgIndent.create(context);

        return Object.assign({}, orgCreated, {
            "*:exit"(node) {
                if (node.type === "Decorator" || node.type === "ClassProperty") {
                    return;
                }
                orgCreated["*:exit"].call(this, node);
            }
        });
    }
});
