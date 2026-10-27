import {regiteruser,loginuser,logoutuser
    ,chengepassword,chengecoverima,getuserinfo
    ,chengeavatar,chenalinfo,subscribe} from '../controler/user.controler.js'
    import {videoupload,like} from '../controler/video.controler.js'

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
router.route('/chengeavatar').post(veryfaccess,upload.field([
    {name:'avatar',maxCount:1}
]),chengeavatar)
router.route('/chengecoverimag').post(veryfaccess,upload.field([
    {name : coverImage, maxCount:1}
]),chengecoverima)
router.route('/chenalinfo/:username').get(veryfaccess,chenalinfo)
router.route('/videoupload').post(veryfaccess,upload.fields([
    {name:video, maxCount:1},
    {name:thumbnail,maxCount:1}
]),videoupload)
router.route('/subscribe').post(veryfaccess,subscribe)
router.route('/like/:videoid').post(veryfaccess,like)

export default router