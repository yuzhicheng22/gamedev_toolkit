# excel-parse - Excel 配置解析工具

Excel 配置文件解析工具，用于读取 Excel 并生成客户端代码。

## 环境要求

- Node.js
- TypeScript

## 安装

```bash
cd tools/excel-parse
npm install
```

## 功能

- Excel 文件读取 (支持 .xlsx 格式)
- 元数据解析
- 表达式解析
- 客户端代码生成

## 主要模块

- `src/ExcelRead.ts` - Excel 读取
- `src/parser/ExcelParser.ts` - 解析器
- `src/parser/GenClientCode.ts` - 代码生成
- `src/ExpressionParser.ts` - 表达式解析
- `src/PlayerTaskCondParser.ts` - 任务条件解析

## 使用

```bash
npm start
```