import fs from 'fs'

class Dlog {
    _file: string
    _statFile: string
    count:number = 0
    constructor (file:string = './dlogger.txt', statFile:string = './dloggerStats.txt') {
      this._file = file
      this._statFile = statFile
    }

    set file (file:string) {
      this._file = file
    }

    log (txt: string) {
      const timeStamp = Date()
      this.logStat(timeStamp, `log: {length: ${txt.length}}`)
      fs.writeFileSync(this._file, `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `)
    }

    append (txt: string) {
      const timeStamp = Date()
      this.logStat(timeStamp, `append: {length: ${txt.length}}`)
      const data = `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `
      fs.writeFileSync(this._file, data, { flag: 'a' })
    }

    read () {
      const timeStamp = Date()
      const data = fs.readFileSync(this._file)
      this.logStat(timeStamp, `read: {length: ${data.length}}`)
      return data.toString()
    }

    private logStat (timeStamp: string, txt:string = 'default') {
      const data = `
        ${timeStamp.toString()}: ${this.count}
          ---
               ${txt}
          ---
        `
      fs.writeFileSync(this._statFile, data, { flag: 'a' })
    }
}

export { Dlog }
