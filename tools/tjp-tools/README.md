# tjp-tools - 桌面工具

基于 Wails (Go + Vue 3 + TypeScript) 的桌面应用程序，提供文件管理功能。

## 环境要求

- Go 1.18+
- Node.js 16+
- Wails CLI

## 开发

```bash
# 安装 Wails
go install github.com/wailsapp/wails/v2/cmd/wails@latest

# 开发模式
wails dev

# 构建
wails build
```

## 功能

- 文件浏览与管理
- 文件操作（复制、粘贴、删除等）
- 批量处理

## 项目结构

- `app.go` - Go 后端逻辑
- `frontend/` - Vue 3 前端
- `build/` - 构建配置
