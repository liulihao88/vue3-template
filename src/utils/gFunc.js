export function formatImg(photoName, addPath = '', { basePath = '../assets/images' } = {}) {
  if (photoName.startsWith('http') || photoName.startsWith('https')) {
    return photoName
  }
  if (photoName.indexOf('.') === -1) {
    photoName = photoName + '.png'
  }
  const addLastSlash = addPath.endsWith('/') || !addPath ? addPath : `${addPath}/`
  const addLastBasePathSlash = basePath.endsWith('/') || !basePath ? basePath : `${basePath}/`
  let mergeSrc = `${addLastSlash}${photoName}`
  // '../assets/images/1.png'
  let res = new URL(`${addLastBasePathSlash}${mergeSrc}`, import.meta.url).href
  return res
}

export function confirm(message, options) {
  const baseOptions = {
    title: '提示',
    draggable: true,
    showCancelButton: false,
    confirmButtonText: '确定',
  }
  let mergeOptions = Object.assign({}, baseOptions, options)
  return new Promise((r, j) => {
    const instance = ElMessageBox.confirm(message, mergeOptions)
      .then(() => {
        r(instance)
      })
      .catch(() => {
        j(instance)
      })
  })
}
