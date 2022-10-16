/**
 *
 * @param msg 确定要xxx吗
 * @param title 警告
 * @param config 确认按钮，取消按钮，提示类型
 * @returns Promise
 */
export function useMessageBox(
  msg: string,
  title: string,
  config: object = {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }
) {
  return ElMessageBox.confirm(msg, title, config)
}
