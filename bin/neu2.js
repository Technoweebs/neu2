#!/usr/bin/env node
module.exports = new Map();

module.exports.set("commands", require(__dirname + "/../src/commands"));
module.exports.set("args", require(__dirname + "/../src/args"));
module.exports.set("modules", require(__dirname + "/../src/modules"));

module.exports.get("commands").load(module.exports);
module.exports.get("args").load(module.exports);
module.exports.get("modules").load(module.exports);

let command = process.argv.slice(2)[0];
let args = process.argv.slice(3);

if(command == undefined) return module.exports.get("commands").exec("help", []);
if(!module.exports.get("commands").check(command)) return module.exports.get("commands").exec("help", [ command ]);
module.exports.get("commands").exec(command, args);