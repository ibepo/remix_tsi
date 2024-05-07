function convertToMarkdown(text) {
  // 将中文标点符号替换为换行符和bullet point
  const bulletPoints = text.replace(/[，。！？；]/g, '\n- ')
  // 将冒号前边的文本前缀加上h3标签
  const withH3 = bulletPoints.replace(/([^：]+)：/g, '\n### $1:\n')
  return '- ' + withH3.trim() // 添加初始的bullet point并修剪文本
}

export { convertToMarkdown }
