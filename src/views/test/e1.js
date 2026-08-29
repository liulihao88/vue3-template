import { recognizeCaptcha } from '../../utils/recognizeCaptcha.js'

const imageUrl = new URL('../../../public/erweima.png', import.meta.url)
console.log(`65 recognizeCaptcha`, recognizeCaptcha);
console.log(`38 imageUrl`, imageUrl);

const code = await recognizeCaptcha(imageUrl)
console.log(`44 code`, code);
// code === 'P5K2'
