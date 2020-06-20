// import fs from 'fs'
import { promises, unlinkSync } from 'fs'

class Dlog {
    silence:boolean
    _file: string
    _statFile: string
    count:number = 0
    constructor (file:string = './dlogger.txt', statFile:string = './dloggerStats.txt', silence = true) {
      this._file = file
      this._statFile = statFile
      this.silence = silence
    }

    set file (file:string) {
      this._file = file
    }

    async log (txt: string) {
      const timeStamp = Date()
      this.logStat(timeStamp, `log: {length: ${txt.length}}`)

      const data = `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `

      try {
        await promises.writeFile(this._file, data)
        console.info('File created successfully with Node.js v13 fs.promises!')
      } catch (error) {
        console.error(error)
      }

      // fs.writeFileSync(this._file, data, { flag: 'w+' })
    }

    async append (txt: string) {
      const timeStamp = Date()
      await this.logStat(timeStamp, `append: {length: ${txt.length}}`)
      const data = `
        ${timeStamp.toString()}
          --START--
        ${txt}
          --END--
        `
      try {
        await promises.writeFile(this._file, data, { flag: 'a+' })
        console.info('File created successfully with Node.js v13 fs.promises!')
      } catch (error) {
        console.error(error)
      }
      // fs.writeFileSync(this._file, data, { flag: 'a+' })
    }

    async read () {
      const timeStamp = Date()
      await this.logStat(timeStamp, 'read')
      try {
        const data = await promises.readFile(this._file)
        return data.toString()
      } catch (error) {
        return error
      }
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

    reset () {
      try {
        unlinkSync(this._file)
      } catch (error) {
        if (!this.silence) {
          console.log(error)
        }
      }
    }

    resetAll () {
      try {
        unlinkSync(this._file)
      } catch (error) {
        if (!this.silence) {
          console.log(error)
        }
      }

      try {
        unlinkSync(this._statFile)
      } catch (error) {
        if (!this.silence) {
          console.log(error)
        }
      }
    }

    private async logStat (timeStamp: string, txt: string = 'default') {
      const data = `
        ${timeStamp.toString()}: ${this.count}
          ---
               ${txt}
          ---
        `
      try {
        await promises.writeFile(this._statFile, data, { flag: 'a+' })
        console.info('File created successfully with Node.js v13 fs.promises!')
      } catch (error) {
        console.error(error)
      }
    }
}

export { Dlog }
