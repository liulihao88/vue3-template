import { createWorker, PSM } from 'tesseract.js'

const CAPTCHA_PATTERN = /^[A-Z0-9]{4}$/

/**
 * 识别黑底白字的 4 位图片验证码。
 *
 * @param {string | Blob | HTMLImageElement | ImageBitmap} source 图片 URL、Base64、Blob 或图片对象
 * @returns {Promise<string>} 4 位大写字母/数字
 */
export async function recognizeCaptcha(source) {
  const canvas = await preprocessCaptcha(source)
  const workerOptions =
    typeof document === 'undefined' ? { cacheMethod: 'write', cachePath: 'node_modules/.cache' } : undefined
  const worker = await createWorker('eng', undefined, workerOptions)

  try {
    await worker.setParameters({
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
      tessedit_pageseg_mode: PSM.SINGLE_WORD,
      preserve_interword_spaces: '0',
    })

    const { data } = await worker.recognize(canvas)
    const result = data.text.toUpperCase().replace(/[^A-Z0-9]/g, '')

    if (!CAPTCHA_PATTERN.test(result)) {
      throw new Error(`验证码识别失败，OCR 原始结果: ${JSON.stringify(data.text)}`)
    }

    return result
  } finally {
    await worker.terminate()
  }
}

async function preprocessCaptcha(source) {
  if (typeof document !== 'undefined') {
    const image = await loadBrowserImage(source)
    return renderCaptcha(image, createBrowserCanvas)
  }

  const { createCanvas, loadImage } = await import('@napi-rs/canvas')
  const image = await loadImage(source)
  const output = renderCaptcha(image, createCanvas)

  return output.toBuffer('image/png')
}

function renderCaptcha(image, createCanvas) {
  const width = image.naturalWidth || image.width
  const height = image.naturalHeight || image.height
  const input = createCanvas(width, height)

  const inputContext = input.getContext('2d', { willReadFrequently: true })
  inputContext.drawImage(image, 0, 0, width, height)
  const pixels = inputContext.getImageData(0, 0, width, height)
  const mask = new Uint8Array(width * height)

  for (let index = 0; index < mask.length; index += 1) {
    const offset = index * 4
    const brightness = pixels.data[offset] * 0.299 + pixels.data[offset + 1] * 0.587 + pixels.data[offset + 2] * 0.114
    mask[index] = brightness > 150 ? 1 : 0
  }

  // 一次形态学开运算可去掉 1px 干扰线，同时保留较粗的验证码笔画。
  const opened = dilate(erode(mask, width, height), width, height)
  const scale = 4
  const padding = 12
  const output = createCanvas(width * scale + padding * 2, height * scale + padding * 2)

  const outputContext = output.getContext('2d')
  outputContext.fillStyle = '#fff'
  outputContext.fillRect(0, 0, output.width, output.height)
  outputContext.fillStyle = '#000'

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (opened[y * width + x]) {
        outputContext.fillRect(padding + x * scale, padding + y * scale, scale, scale)
      }
    }
  }

  return output
}

function createBrowserCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function erode(mask, width, height) {
  const result = new Uint8Array(mask.length)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x
      result[index] =
        mask[index] && mask[index - 1] && mask[index + 1] && mask[index - width] && mask[index + width] ? 1 : 0
    }
  }
  return result
}

function dilate(mask, width, height) {
  const result = new Uint8Array(mask.length)
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const index = y * width + x
      result[index] =
        mask[index] || mask[index - 1] || mask[index + 1] || mask[index - width] || mask[index + width] ? 1 : 0
    }
  }
  return result
}

async function loadBrowserImage(source) {
  const isImageElement = typeof HTMLImageElement !== 'undefined' && source instanceof HTMLImageElement
  const isImageBitmap = typeof ImageBitmap !== 'undefined' && source instanceof ImageBitmap

  if (isImageElement || isImageBitmap) {
    return source
  }

  const objectUrl = typeof Blob !== 'undefined' && source instanceof Blob ? URL.createObjectURL(source) : null
  const url = objectUrl || source

  if (typeof url !== 'string') {
    throw new TypeError('不支持的验证码图片类型')
  }

  try {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = url
    await image.decode()
    return image
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl)
  }
}
