'use strict';

var _templateObject = _taggedTemplateLiteral(['\n     _____ _   _ _   _  ____ _____ ____  _____ _____       ____ _     ___\n    |  ___| | | |  | |/ ___|_   _|  _ | ____| ____|     / ___| |   |_ _|\n    | |_  | | | |  | | |     | | | |_) |  _| |  _| _____| |   | |    | |\n    |  _| | |_| | |  | |___  | | |  _ <| |___| |__|_____| |___| |___ | |\n    |_|    ___/|_| _|____| |_| |_| ______|_____|     ____|_____|___|\n\n[ Visualization and analysis tool for omics data based on biological functional tree ]\n\nVersion: ', '  Copyright (c) 2014-2017 Yamada Lab, Tokyo Institute of Technology.\n\nUsage: functree [command] [options...]'], ['\n     _____ _   _ _   _  ____ _____ ____  _____ _____       ____ _     ___\n    |  ___| | | | \\ | |/ ___|_   _|  _ \\| ____| ____|     / ___| |   |_ _|\n    | |_  | | | |  \\| | |     | | | |_) |  _| |  _| _____| |   | |    | |\n    |  _| | |_| | |\\  | |___  | | |  _ <| |___| |__|_____| |___| |___ | |\n    |_|    \\___/|_| \\_|\\____| |_| |_| \\_\\_____|_____|     \\____|_____|___|\n\n[ Visualization and analysis tool for omics data based on biological functional tree ]\n\nVersion: ', '  Copyright (c) 2014-2017 Yamada Lab, Tokyo Institute of Technology.\n\nUsage: functree [command] [options...]']);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

{
    _colors2.default.setTheme('colors/themes/generic-logging');
    var version = require('../package.json').version;
    var usageText = String.raw(_templateObject, version);

    var epilogueText = 'For more information, see below:\n  https://github.com/yyuuta88/functree-cli';

    var args = _yargs2.default.detectLocale(false).wrap(100).command(require('./get.js')).command(require('./stats.js')).command(require('./create.js')).option({
        'no-color': {
            'global': true,
            'type': 'boolean',
            'describe': 'Disable colored output'
        },
        'show-config': {
            'type': 'boolean',
            'describe': 'Show default configuration value'
        }
    }).help().version().usage(usageText).epilogue(epilogueText).argv;

    // If "--show-config" is supplied, show default configuration
    if (args.showConfig) {
        var configPath = _path2.default.resolve(_path2.default.join(__dirname, '../etc/config.json'));
        try {
            var configString = _fs2.default.readFileSync(configPath);
            process.stdout.write(configString);
            process.exit(0);
        } catch (e) {
            process.stderr.write(('Error: Failed to open file "' + configPath + '"\n').error);
            process.exit(1);
        }
        // If the command is invalid, print error message
    } else if (args._[0]) {
        process.stderr.write(('Error: "' + args._[0] + '" is not a functree command\n').error);
        process.exit(1);
        // If any option is not supplied, show help and usage
    } else {
        _yargs2.default.showHelp();
        process.exit(1);
    }
}