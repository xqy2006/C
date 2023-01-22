/*
 * Copyright 2020 WebAssembly Community Group participants
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const LAYOUT_CONFIG_KEY = 'layoutConfig';

const initialProgram =
`#include <stdio.h>

int main(void)
{
    puts("Hello World!");
    return 0;
}
`;

// Golden Layout
let layout = null;

function initLayout() {
  const defaultLayoutConfig = {
    settings: {
      showCloseIcon: false,
      showPopoutIcon: false,
      showMaximiseIcon: false,
    },
    content: [{
      type: 'stack',
      content: [{
        type: 'component',
        componentName: 'terminal',
        componentState: {fontSize: 18},
        isClosable: false,
    },{
        type: 'component',
        componentName: 'editor',
        componentState: {fontSize: 18, value: initialProgram},
        isClosable: false,
      }, ]
    }]
  };

  layout = new Layout({
    configKey: LAYOUT_CONFIG_KEY,
    defaultLayoutConfig,
  });

  layout.on('initialised', event => {
    // Editor stuff
    editor.commands.addCommand({
      name: 'run',
      bindKey: {win: 'Ctrl+Enter', mac: 'Command+Enter'},
      exec: run
    });
  });

  layout.init();
}

function resetLayout() {
  sessionStorage.removeItem('layoutConfig');
  if (layout) {
    layout.destroy();
    layout = null;
  }
  initLayout();
}

// Toolbar stuff
$('#reset').on('click', event => { if (confirm('真的要重置吗？')) resetLayout() });
$('#run').on('click', event => run(editor));


initLayout();
