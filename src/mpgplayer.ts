import * as stream from "stream";
import {ChildProcess} from "child_process";
import {PLAYERSTATE} from './utils';

export class MpgPlayer implements MpgPlayerInterface{
    readonly version: string;    
    private current_song: string;
    private player_state: PLAYERSTATE;
    private sub_process: ChildProcess;
    private stdout: stream.Readable;
    private stderr: stream.Readable;
    private stdin: stream.Writable;

    constructor(version: string, childProcess: ChildProcess) {
        this.version = version;
        this.sub_process = childProcess;
        this.stdout = this.sub_process.stdout;
        this.stderr = this.sub_process.stderr;
        this.stdin = this.sub_process.stdin;
        this.startListener();
        this.current_song = '';
        this.player_state = PLAYERSTATE.Stop;
    }

    private startListener = () => {
        this.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        this.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
        });

        this.sub_process.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }

    public play = (file: string) => {
        this.current_song = file
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
