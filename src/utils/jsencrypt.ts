import JSEncrypt from 'jsencrypt'
const publicKey =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALZfcGGRtAXYW+uD1Sj7Iw127pxWwfvP\n' +
  'avo+2hyeD19a31+bTE809v3WBIF7lJpjt8mFMFzsnADhLpYoUOtGe+0CAwEAAQ=='

const privateKey =
  'MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAtl9wYZG0Bdhb64PV\n' +
  'KPsjDXbunFbB+89q+j7aHJ4PX1rfX5tMTzT2/dYEgXuUmmO3yYUwXOycAOEulihQ\n' +
  '60Z77QIDAQABAkAPM79zcqjV/+YRqMihBOY0HiDfyV+cNPsO5yRZVFeltBJkcTe+\n' +
  'i+oLBP6xb1iI0r5lpn3GGlhA5qptd84UoznhAiEA56OVRf3nvwhZEM2VQTStASu7\n' +
  'ORRec1EWHnZIf3OKl4UCIQDJjXZXTc2W2t6ThkFspbZf/9Olb9GrIqcO/lulNeFb\n' +
  'SQIhAOZJCOQ2kqimofVEjTfwKHbbhRwwFd5LJNRP/69FrOkJAiEAw87H2nc+tUD7\n' +
  'HU1AAEJZlJggUMf6ZQ0sSXe5Jx7aSekCICFAtI/Qz3yMmYVD4WUu4B2neUgN/TRc\n' +
  'Cd6vI0YUEjfG'

// 加密
export function encrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
