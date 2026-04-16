# Game Development Toolkit

游戏开发工具集，用于存档工作中用到的工具脚本和通用代码片段。

## 项目结构

```
gamedev_toolkit/
├── libs/                    # 通用代码库
│   └── code/                # TypeScript/JavaScript 通用代码片段
├── tools/                   # 独立工具集
│   ├── excel-parse/         # Excel 解析工具 (TypeScript)
│   ├── map-parse/          # 地图/序列帧处理工具 (Python)
│   ├── png-tools/           # 图片压缩处理工具
│   └── tjp-tools/           # 桌面工具 (Go + Wails)
├── docs/                    # 文档
└── README.md
```

## 工具说明

### libs/code - 通用代码库

TypeScript/JavaScript 通用工具代码：

- `md5` - MD5 加密工具
- `string` - 字符串处理工具
- `ecs` - 实体组件系统
- `dictionary` - 字典数据结构

### tools/excel-parse - Excel 解析工具

Excel 配置文件解析，生成客户端代码。TypeScript 项目。

### tools/map-parse - 地图解析工具

地图资源处理、序列帧动画生成工具。Python 脚本。

### tools/png-tools - 图片处理工具

PNG 图片压缩工具，用于游戏资源优化。

### tools/tjp-tools - 桌面工具

基于 Wails (Go + Vue) 的桌面应用程序。

## 使用说明

各子项目均有独立文档，请参考各目录下的 README.md