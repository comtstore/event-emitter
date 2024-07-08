type EventConfig = {
    cb: (...args: any[]) => void;
    once: boolean;
};
declare class EventEmitter {
    events: Map<string, Array<EventConfig>>;
    on(eventName: string, cb: (...args: any[]) => void, once?: boolean): void;
    once(eventName: string, cb: (...args: any[]) => void): void;
    emit(eventName: string, args?: Array<any>): void;
    off(eventName: string, cb?: (...args: any[]) => void): void;
    getEventNameObservers: (eventName: string) => EventConfig[] | undefined;
}
export default EventEmitter;
