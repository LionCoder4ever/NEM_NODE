const { spawn } = require('child_process');
import * as stream from "stream";
import { ChildProcess } from "child_process";
import { PLAYERSTATE } from './utils';
import { dispatcher } from './eventbus';

export class MpgPlayer implements MpgPlayerInterface{
    readonly version: string;    
    private current_song: string;
    private player_state: PLAYERSTATE;
    private sub_process: ChildProcess;
    private stdout: stream.Readable;
    private stderr: stream.Readable;
    private stdin: stream.Writable;

    constructor(version?: string, childProcess?: ChildProcess) {
        this.version =  version ?  version : '0.0.1';
        this.sub_process = childProcess ? childProcess : spawn('mpg123',['-R']);
        this.stdout = this.sub_process.stdout;
        this.stderr = this.sub_process.stderr;
        this.stdin = this.sub_process.stdin;
        this.current_song = '';
        this.player_state = PLAYERSTATE.Stop;
        this.startListener();
    }

    private startListener = () => {
        this.stdout.on('data', (data) => {
            // console.log(`stdout: ${data}`);
        });

        this.stderr.on('data', (data) => {
            // console.log(`stderr: ${data}`);
        });

        this.sub_process.on('close', (code) => {
            // console.log(`child process exited with code ${code}`);
        });

        dispatcher.on('play',(name:any) => {
            this.play(name)
        })

    }

    public play = (file: string) => {
        this.current_song = file
        console.log(file)
        this.stdin.write(`L ${file}` + '\n')
    }

    public pause = () => {
        throw new Error("Method not implemented.");
    }

    public stop = () => {
        throw new Error("Method not implemented.");
    }

    public setVolume = (volume: number) => {
        throw new Error("Method not implemented.");
    }

    public close = () => {
        throw new Error("Method not implemented.");
    }
}
