/**
 * @file 过滤器
 * @author tommyzqfeng
 * @date 2016/12/20
 */

/**
 * 将时间戳格式化为 YYYY-MM-DD
 * @param value 时间戳
 * @returns {*}
 */
export function dateFormat(value) {
  if (value) {
    let date =  new Date(parseInt(value));
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  } else {
    return '';
  }
}