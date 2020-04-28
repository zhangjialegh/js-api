import { fileToUrl } from '@/file'
import compressImage from '@/compress'
import { updateElementStyle } from '@/until'
import {invokeCallbackHandler as invoke} from '@/helper-api'

let imageInput = null

const _createInput = function (options) {
  let inputEl = document.createElement('input')
  inputEl.type = 'file'
  updateElementStyle(inputEl, {
    'position': 'absolute',
    'visibility': 'hidden',
    'z-index': -999,
    'width': 0,
    'height': 0,
    'top': 0,
    'left': 0
  })
  inputEl.accept = 'image/*'
  if (options.count > 1) {
    inputEl.multiple = 'multiple'
  }
  // 经过测试，仅能限制只通过相机拍摄，不能限制只允许从相册选择。
  if (options.sourceType.length === 1 && options.sourceType[0] === 'camera') {
    inputEl.capture = 'camera'
  }

  return inputEl
}

export function chooseImage ({
  count,
  quality,
  sourceType
}, callbackId) {

  if (imageInput) {
    document.body.removeChild(imageInput)
    imageInput = null
  }

  imageInput = _createInput({
    count: count,
    sourceType: sourceType
  })
  document.body.appendChild(imageInput)

  imageInput.addEventListener('change', async function (event) {
    const tempFilePaths = []
    const tempFiles = []
    const fileCount = event.target.files.length
    for (let i = 0; i < fileCount; i++) {
      const { file } = await compressImage(event.target.files[i], {
        quality: quality
      })
      const filePath = fileToUrl(file)

      tempFilePaths.push(filePath)
      tempFiles.push({
        path: filePath,
        size: file.size
      })
    }

    invoke(callbackId, {
      errMsg: 'chooseImage:ok',
      tempFilePaths: tempFilePaths,
      tempFiles: tempFiles
    })

    // TODO 用户取消选择时，触发 fail，目前尚未找到合适的方法。
  })

  imageInput.click()
}
