type EventConfig = {
    // eslint-disable-next-line no-unused-vars
    cb: (...args) => void,
    once: boolean
}

class EventEmitter {
    public events: Map<string, Array<EventConfig>> = new Map()

    // eslint-disable-next-line no-unused-vars
    public on (eventName: string, cb: (...args) => void, once: boolean = false) {
      let cbs: Array<EventConfig> | undefined = this.events.get(eventName)
      if (!cbs) {
        cbs = []
        this.events.set(eventName, cbs)
      }
      const isExist = cbs.findIndex(eventConfig => eventConfig.once === once && eventConfig.cb === cb)
      if (isExist === -1) {
        cbs.push({
          cb,
          once
        })
      }
    }

    // eslint-disable-next-line no-unused-vars
    public once (eventName: string, cb: (...args) => void) {
      this.on(eventName, cb, true)
    }

    public emit (eventName: string, args?: Array<any>) {
      const cbs: Array<EventConfig> | undefined = this.events.get(eventName)
      if (!cbs) return
      cbs.forEach(eventConfig => eventConfig.cb(...(args ?? [])))
      this.events.set(eventName, cbs.filter(cb => !cb.once))
    }

    // eslint-disable-next-line no-unused-vars
    public off (eventName: string, cb?: (...args) => void) {
      let cbs: Array<EventConfig> | undefined = this.events.get(eventName)
      if (!cbs) return

      if(cb){
        cbs = cbs.filter(eventConfig => eventConfig.cb !== cb)
        if (cbs.length === 0) {
          this.events.delete(eventName)
        } else {
          this.events.set(eventName, cbs)
        }
      } else {
        this.events.delete(eventName)
      }
    }

    public getEventNameObservers = (eventName: string) => {
      return this.events.get(eventName)
    }
}

export default EventEmitter
  