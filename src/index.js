module.exports = function parseSrt (srt, opts) {
  var options = Object.assign({ report: true }, opts)
  const subtitles = []
  const textSubtitles = srt.split('\r\n\r\n').filter(x => x) // 每条字幕的信息，包含了序号，时间，字幕内容
  try {
    for (let i = 0; i < textSubtitles.length; i++) {
      const textSubtitle = textSubtitles[i].split('\n').filter(x => x.trim())
      if (options.report) {
        console.log(`第${i + 1}条字幕:`, textSubtitle)
      }
      if (textSubtitle.length >= 2) {
        const sequence = textSubtitle[0]
        const startTime = toSecond(textSubtitle[1].split(/\s*-->\s*/)[0].trim())
        const endTime = toSecond(textSubtitle[1].split(/\s*-->\s*/)[1].trim())
        let subtitleEn = ''
        let subtitle = ''

        for (var j = 2; j < textSubtitle.length; j++) {
          if (/[\u4e00-\u9fa5]/g.test(textSubtitle[j])) {
            subtitle += textSubtitle[j] + '\n'
          } else {
            subtitleEn += textSubtitle[j] + '\n'
          }
        }

        const t = {
          sequence: +sequence,
          startTime: parseInt(startTime * 1000),
          endTime: parseInt(endTime * 1000),
          subtitleEn: subtitleEn.trim(),
          subtitle: subtitle.trim()
        }
        subtitles.push(t)
      }
    }

    const { endTime: e = 0 } = subtitles[subtitles.length - 1]
    const minutes = parseInt(e / 60)
    const seconds = parseInt(e % 60)
    console.log({ subtitles, minutes, seconds, duration: e })
    return { subtitles, minutes, seconds, duration: e }
  } catch (err) {
    console.log(err)
    return null
  }
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
