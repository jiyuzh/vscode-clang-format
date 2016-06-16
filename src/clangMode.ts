'use strict';

import vscode = require('vscode');

const LANGUAGES: string[] = ['cpp', 'c', 'objective-c', 'java', 'javascript', 'typescript'];
export const MODES: vscode.DocumentFilter[] = LANGUAGES.map(language => ({ language, scheme: 'file' }));
