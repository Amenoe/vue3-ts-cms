import useLoginStore from '@/stores/modules/login'

export function usePermission(pageName: string, handleName: string) {
  const loginStore = useLoginStore()
  const permissions = loginStore.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => item === verifyPermission) //有返回值，没有返回undefined，通过!!转为Boolean
}
