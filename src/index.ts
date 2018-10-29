const program = require('commander')
import { MpgPlayer } from './mpgplayer'

program
    .version('0.1.0')
    .command('nem')
    .alias('n')
    .description('start use nem_node player')
    .option('-a, --name <path>', '模块名称')
    .action((option:any) => {
        if(option.name){
            const { spawn } = require('child_process');
            const ls = spawn('mpg123', ['-R']);
            const mpgplayer = new MpgPlayer('1.22',ls);
            mpgplayer.play(option.name)
        }
    })
    
  
program.parse(process.argv)




 // ls.stdout.on('data', (data) => {
    //     console.log(`stdout: ${data}`);
    // });

    // ls.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`);
    // });

    // ls.stdin.write(`L ${option.name}` + '\n')

    // ls.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });