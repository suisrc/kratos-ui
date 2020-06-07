/**
 * 😢这里的方法没有实现
 */

/**
 * 执行绑定，一般返回是一个二维码和一个签名
 */
export async function postMfaBinding(): Promise<any> {}

/**
 * 通过二维码或者签名，完成设备绑定，返回值是备用码
 * Verify
 */
export async function getMfaVfBinding(): Promise<any> {}

/**
 * 完成重新绑定
 */
export async function putMfaReBinding(): Promise<any> {}

/**
 * 删除绑定的设备
 */
export async function deleteMfaBinding(): Promise<any> {}

/**
 * 进行二次验证
 */
export async function checkMfaAuthorize(): Promise<any> {}
