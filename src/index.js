module.exports = function parseSrt (srt) {
  const subtitles = []
  const textSubtitles = srt.split('\r\n\r\n') // 每条字幕的信息，包含了序号，时间，字幕内容
  for (let i = 0; i < textSubtitles.length; i++) {
    const textSubtitle = textSubtitles[i].split('\n')

    if (textSubtitle.length >= 2) {
      const sn = textSubtitle[0]
      const startTime = toSecond(textSubtitle[1].split(' --> ')[0].trim())
      const endTime = toSecond(textSubtitle[1].split(' --> ')[1].trim())
      let contentEN = ''
      let contentCN = ''

      for (var j = 2; j < textSubtitle.length; j++) {
        if (/[\u4e00-\u9fa5]/g.test(textSubtitle[j])) {
          contentCN += textSubtitle[j] + '\n'
        } else {
          contentEN += textSubtitle[j] + '\n'
        }
      }

      const subtitle = {
        sn: sn.trim(),
        startTime: startTime,
        endTime: endTime,
        contentEN: contentEN.trim(),
        contentCN: contentCN.trim()
      }
      subtitles.push(subtitle)
    }
  }

  const { endTime: e = 0 } = subtitles[subtitles.length - 1]
  const minutes = parseInt(e / 60)
  const seconds = parseInt(e % 60)
  return { subtitles, minutes, seconds }
}

/**
 * 把字符串格式的字幕时间转换为浮点数
 * @param  string t 字符串格式的时间
 * @return 浮点数格式的时间
 */
function toSecond (t) {
  var s = 0.0
  if (t) {
    return t.split(':').reduce((s, cur) => {
      s += s * 60 + parseFloat(cur.replace(',', '.'))
      return s
    }, 0.0)
  }
  return s
}
