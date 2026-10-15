import {regiteruser,loginuser,logoutuser
    ,chengepassword,chengecoverima,getuserinfo
    ,chengeavatar,chenalinfo} from '../controler/user.controler.js'

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
router.route('/chengepassword').post(veryfaccess,chengepassword)
router.route('/getuserinfo').get(veryfaccess,getuserinfo)
router.route('/chengeavatar').post(veryfaccess,chengeavatar)
router.route('/chengecoverimag').post(veryfaccess,chengecoverima)
router.route('/chenalinfo').get(veryfaccess,chenalinfo)

export default router