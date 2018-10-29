
interface MpgPlayerInterface {
    version: string;
    play(file: string):void;
    pause():void;
    stop():void;
    setVolume(volume: number):void;
    close():void;
}
