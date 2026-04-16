# png-tools - 图片处理工具

PNG 图片压缩工具集合，用于游戏资源优化。

## 工具

| 工具 | 说明 |
|------|------|
| PNGoo.exe | GUI 图片压缩工具 |
| libs/pngquanti/pngquanti.exe | 命令行 PNG 量化工具 |

## PNGoo

图形界面的 PNG 图片压缩工具，简单易用。

## PNGQuant

命令行 PNG 量化工具，可将 PNG 颜色数减少到 256 色以减小文件体积。

### 使用方法

```bash
# Windows
pngquanti.exe --quality=70-80 input.png output.png

# 批量处理 (配合脚本)
```