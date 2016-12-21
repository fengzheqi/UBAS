
export function dateFormat(value) {
  if (value) {
    let date =  new Date(parseInt(value));
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
  } else {
    return '';
  }

}