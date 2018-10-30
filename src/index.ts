const program = require('commander')
import { NemUI } from './ui'
import { MpgPlayer } from './mpgplayer'

program
    .version('0.1.0')
    .command('nem')
    .alias('n')
    .description('start use nem_node player')
    .option('-a, --name <path>', '模块名称')
    .action((option:any) => {
        if(option.name){
            const ui = new NemUI();
            const mpgplayer = new MpgPlayer();
        }
    })
    
  
program.parse(process.argv)
