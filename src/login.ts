
import {Page} from 'puppeteer-core'


interface ASOcsLogin {
    page :  Page
    options:object
    start : ()=>void
    selectSchool : ()=>void
    inputAccount : ()=>void

    inputPassword : ()=>void
    inputVcode : ()=>void
    inputInfo: ()=>void
    submit: ()=>void
 
}

export default ASOcsLogin