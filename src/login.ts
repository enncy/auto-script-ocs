
import {Page} from 'puppeteer-core'


interface ASOcsLogin {
    page :  Page
    options:object
    start : ()=>Promise<string>
    selectSchool : ()=>Promise<boolean>
    inputAccount : ()=>void
    inputPassword : ()=>void
    inputVcode : ()=>void
    inputInfo: ()=>void
    submit: ()=>void
 
}

export default ASOcsLogin