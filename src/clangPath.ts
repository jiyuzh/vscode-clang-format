'use strict';

import fs = require('fs');
import path = require('path');

let binPathCache: { [bin: string]: string } = {};

export function getBinPath(binname: string) {
  if (binPathCache[binname]) {
    return binPathCache[binname];
  }

  for (let binNameToSearch of correctBinname(binname)) {
    // clang-format-renew.executable has a valid absolute path
    if (fs.existsSync(binNameToSearch)) {
      binPathCache[binname] = binNameToSearch;
      return binNameToSearch;
    }

    if (process.env['PATH']) {
      let pathparts = process.env['PATH'].split(path.delimiter);
      for (let i = 0; i < pathparts.length; i++) {
        let binpath = path.join(pathparts[i], binNameToSearch);
        if (fs.existsSync(binpath)) {
          binPathCache[binname] = binpath;
          return binpath;
        }
      }
    }
  }

  // Else return the binary name directly (this will likely always fail downstream)
  binPathCache[binname] = binname;
  return binname;
}

function correctBinname(binname: string): string[] {
  if (process.platform === 'win32') {
    return [binname + '.exe', binname + '.bat', binname + '.cmd', binname];
  } else {
    return [binname];
  }
}