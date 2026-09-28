import {regiteruser,loginuser,logoutuser} from '../controler/user.controler.js'

import {upload} from '../middlewares/multer.js'
import {veryfaccess} from '../middlewares/auth.middleweaer.js'
import {Router} from 'express'


const router =Router()
router.route('/register').post(
    upload.fields([
        {
            name:'avatar',maxCount:1
        },{
            name:'coverImage',maxCount:1
        }
    ]),
    regiteruser)
router.route('/login').post(loginuser) 
router.route('/logout').post(veryfaccess,logoutuser)   

export default router