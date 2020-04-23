# srt parser
一个srt格式字幕文件解析工具

# Usage
## 基础应用
```
const parseSrt = require("srt-parse-xyc");

// srtStr：字幕字符串
parseSrt(srtStr)
```

## 可禁用report功能
```
const parseSrt = require("srt-parse-xyc");

// srtStr：字幕字符串
// report:true将打印每一条解析后的字幕，便于查找问题, 默认为true
parseSrt(srtStr, { report: false})
```


