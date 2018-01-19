export default function areaSelect(val) {
  if (/en/.test(val)) {
    return 'en';
  } else {
    return 'zh-CN';
  }
}
