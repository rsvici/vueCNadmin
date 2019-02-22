import env from './env'

const DEV_URL = ''
const PRO_URL = 'http://www.appsun.com.cn/ClMAP/'

export default env === 'development' ? DEV_URL : PRO_URL
