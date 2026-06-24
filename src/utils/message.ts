import type { VNode } from 'vue'
import { isFunction } from '@pureadmin/utils'
import { type MessageHandler, type MessageOptions, ElMessage } from 'element-plus'

type messageStyle = 'el' | 'antd'
type MessageContent = string | VNode | (() => VNode)

interface MessageParams extends Omit<MessageOptions, 'customClass' | 'message' | 'onClose'> {
  /** 消息风格，可选 `el` 、`antd` ，默认 `antd` */
  customClass?: messageStyle
  /** 关闭时的回调函数, 参数为被关闭的 `message` 实例 */
  onClose?: Function | null
}

/** 用法非常简单，参考 src/views/components/message/index.vue 文件 */

/**
 * `Message` 消息提示函数
 */
const message = (message: MessageContent, params?: MessageParams): MessageHandler => {
  if (!params) {
    return ElMessage({
      message,
      customClass: 'pure-message',
    })
  } else {
    const {
      icon,
      type = 'info',
      dangerouslyUseHTMLString = false,
      customClass = 'antd',
      duration = 2000,
      showClose = false,
      offset = 20,
      appendTo = document.body,
      grouping = false,
      onClose,
    } = params

    return ElMessage({
      message,
      type,
      icon,
      dangerouslyUseHTMLString,
      duration,
      showClose,
      offset,
      appendTo,
      grouping,
      // 全局搜 pure-message 即可知道该类的样式位置
      customClass: customClass === 'antd' ? 'pure-message' : '',
      onClose: () => (isFunction(onClose) ? onClose() : null),
    })
  }
}

/**
 * 关闭所有 `Message` 消息提示函数
 */
const closeAllMessage = (): void => ElMessage.closeAll()

export { message, closeAllMessage }
