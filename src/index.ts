
import { promises } from 'fs'
import { Stat } from './statfile'

class Dlog {
    silenceDelete:boolean
    _file: string
    _statFile: string
    count:number = 0
    stat: Stat
    constructor (file:string = './dlogger.txt', statFile:string = './dloggerStats.txt',
      silenceDelete = true) {
      this._file = file
      this._statFile = statFile
      this.silenceDelete = silenceDelete
      this.stat = new Stat(statFile)
    }

    set file (file:string) {
      this._file = file
    }

    async log (txt: string) {
      const timeStamp = Date()
      this.stat.logStat(timeStamp, `log: {length: ${txt.length}}`)

      const data = `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `

      await promises.writeFile(this._file, data)
      console.info(data)
    }

    async append (txt: string) {
      const timeStamp = Date()
      await this.stat.logStat(timeStamp, `append: {length: ${txt.length}}`)
      const data = `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `

      await promises.appendFile(this._file, data, { flag: 'a+' })
      console.info(data)
    }

    async read () {
      const timeStamp = Date()
      await this.stat.logStat(timeStamp, 'read')

      const data = await promises.readFile(this._file)
      return data.toString()
    }

    async readStat () {
      return await this.stat.readStat()
    }

    async reset () {
      try {
        await promises.unlink(this._file)
      } catch (error) {
        if (!this.silenceDelete) {
          console.log(error)
        }
      }
    }

    resetAll () {
      promises.unlink(this._file).catch(error => {
        console.log(error.message)
      }
      )
      this.stat.reset().catch(
        error => {
          if (!this.silenceDelete) console.log(error.message)
        }
      )
    }
}

export { Dlog }
