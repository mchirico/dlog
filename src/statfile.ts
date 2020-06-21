import { promises } from 'fs'

class Stat {
    silenceDelete:boolean
    _statFile: string
    count:number = 0
    constructor (statFile:string = './dloggerStats.txt', silenceDelete = true) {
      this._statFile = statFile
      this.silenceDelete = silenceDelete
    }

    set file (file:string) {
      this._statFile = file
    }

    async readStat () {
      const timeStamp = Date()
      await this.logStat(timeStamp, 'read')

      const data = await promises.readFile(this._statFile)
      return data.toString()
    }

    async reset () {
      await promises.unlink(this._statFile).catch(
        error => {
          if (!this.silenceDelete) console.log(error.message)
        })
    }

    async logStat (timeStamp: string, txt: string = 'default') {
      const data = `
        ${timeStamp.toString()}: ${this.count}
          ---
               ${txt}
          ---
        `

      await promises.appendFile(this._statFile, data)
    }
}

export { Stat }
