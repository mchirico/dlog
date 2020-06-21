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
      try {
        const data = await promises.readFile(this._statFile)
        return data.toString()
      } catch (error) {
        return error
      }
    }

    async reset () {
      try {
        await promises.unlink(this._statFile)
      } catch (error) {
        if (!this.silenceDelete) {
          console.log(error)
        }
      }
    }

    async logStat (timeStamp: string, txt: string = 'default') {
      const data = `
        ${timeStamp.toString()}: ${this.count}
          ---
               ${txt}
          ---
        `
      try {
        await promises.writeFile(this._statFile, data, { flag: 'a+' })
      } catch (error) {
        console.error(error)
      }
    }
}

export { Stat }
