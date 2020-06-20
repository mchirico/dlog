
import { promises, unlinkSync } from 'fs'
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

      try {
        await promises.writeFile(this._file, data)
        console.info(data)
      } catch (error) {
        console.error(error)
      }
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
      try {
        await promises.appendFile(this._file, data, { flag: 'a+' })
        console.info(data)
      } catch (error) {
        console.error(error)
      }
    }

    async read () {
      const timeStamp = Date()
      await this.stat.logStat(timeStamp, 'read')
      try {
        const data = await promises.readFile(this._file)
        return data.toString()
      } catch (error) {
        return error
      }
    }

    async readStat () {
      return this.stat.readStat()
    }

    reset () {
      try {
        unlinkSync(this._file)
      } catch (error) {
        if (!this.silenceDelete) {
          console.log(error)
        }
      }
    }

    async resetAll () {
      try {
        await promises.unlink(this._file)
      } catch (error) {
        if (!this.silenceDelete) {
          console.log(error)
        }
      }

      this.stat.reset()
    }
}

export { Dlog }
