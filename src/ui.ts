const blessed = require('blessed');
import { OPTIONLISTCONTENT } from './utils';
import { dispatcher } from './eventbus';

export class NemUI {
    constructor() {
        // Create a screen object.
        let screen = blessed.screen({
            smartCSR: true
        });

        screen.title = 'welcome to NEM_NODE';

        // Create a box perfectly centered horizontally and vertically.
        let optionList = blessed.List({
            top: 'center',
            left: 'center',
            width: '50%',
            height: '50%',
            items: OPTIONLISTCONTENT,
            tags: true,
            keys: true,
            vi: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: 'magenta',
                border: {
                    fg: '#f0f0f0'
                },
                hover: {
                    bg: 'green'
                }
            }
        });

        // Append our box to the screen.
        screen.append(optionList);

        optionList.on('select', (ch: any) => {
            switch (OPTIONLISTCONTENT.indexOf(ch.content)) {
                case 0:
                    dispatcher.emit('play','*.mp3')
                    break;

                default:
                    break;
            }
        })

        // If box is focused, handle `enter`/`return` and give us some more content.
        optionList.key('enter', (ch: any, key: any) => {

            screen.render();
        });

        // Quit on Escape, q, or Control-C.
        screen.key(['q'], (ch: any, key: any) => {
            return process.exit(0);
        });

        // Focus our element.
        optionList.focus();

        // Render the screen.
        screen.render();
    }

}