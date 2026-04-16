# map-parse - 地图/序列帧处理工具

地图资源处理、序列帧动画生成工具，用于游戏素材的预处理。

## 环境要求

- Python 3.x
- TexturePacker (命令行工具，需加入环境变量)

## 主要脚本

| 脚本 | 功能 |
|------|------|
| UIImageRaname.py | 文件规范化重命名 |
| UIImageParse.py | 序列帧图片压缩 |
| UIImagePlist.py | 生成 Plist、动画、Prefab |
| UIImageQuant.py | PNG 量化压缩 |
| main.py | 主入口 |
| rename.py | 批量重命名 |

## 子模块

- `anim/` - 序列帧动画处理相关脚本
- `anim/pngquant/` - PNG 量化工具

## 使用流程

1. **UIImageRaname.py** - 对原始文件进行规范重命名
2. **UIImageParse.py** - 压缩序列帧图片
3. **UIImagePlist.py** - 生成 Plist 动画和 Prefab

详细使用说明见下方文档。

---

## 详细说明

### 1. UIImageRaname.py

对文件进行规范重命名

- `item`: 目标序列帧文件夹名（大部分情况下为中文）
- `distFold`: 输出目录，如 `R"C:\Users\dev\Desktop\demo\所有序列帧"`
- `aniFold`: AnimSource 对应路径，执行后生成整理好的 `AnimSource` 文件夹

### 2. UIImageParse.py

- `item`: AnimSource 下目标文件夹名
- `distFold`: AnimDist 目标生成文件路径
- `uiBaseDir`: AnimSource 的路径

对 `AnimSource` 中的序列帧图片进行压缩，生成到 `AnimDist`。

### 3. UIImagePlist.py

- `distFold`: AnimDist 的文件路径
- `item_list`: 角色名列表，如 `item_list = [R"\ShenManJun"]`
- `genStep`: 执行步骤 (1/2/3)

步骤1：生成序列帧动画 plist 文件  
步骤2：生成动画文件  
步骤3：生成 CocosCreator 中需要使用的 Prefab

> 注意：需要确保引用到生成的 Prefab 的 Prefab 中对序列帧动画有正确的引用关系（手动设置）
