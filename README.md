# 光体AI - Railway 部署指南

## 📦 文件清单

```
lightbody-ai-railway/
├── package.json      # 项目依赖
├── server.js         # Express 后端服务器
└── public/
    └── index.html    # 前端页面
```

## 🚀 部署步骤

### 1. 创建 GitHub 仓库

- 仓库名: `lightbody-ai-railway`
- 选择 Public

### 2. 上传文件

上传3个文件到仓库：
- `package.json`
- `server.js`
- `public/index.html`

### 3. Railway 部署

1. 访问 https://railway.app
2. 用 GitHub 登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择 `lightbody-ai-railway` 仓库
6. 点击 "Add Variables"
7. 添加环境变量:
   - Name: `KIMI_API_KEY`
   - Value: `sk-AT66lec8PlPL3EgdjUrBtAVxLfg9uXmwrjvN7c2TPqHApfNu`
8. 点击 "Deploy"

### 4. 获取网址

部署完成后，Railway 会自动分配一个网址：
`https://lightbody-ai-railway-production.up.railway.app`

## ✅ 验证部署

打开网址，点击"手动生成"按钮测试：
1. 选择生成类型
2. 等待5-10秒
3. 查看AI生成的内容

## 🔧 故障排除

### 如果部署失败

1. 检查 Railway 构建日志
2. 确认 `package.json` 格式正确
3. 确认环境变量已添加

### 如果API调用失败

1. 检查 `KIMI_API_KEY` 是否正确
2. 检查 Kimi API 额度是否充足

## 💰 费用

Railway 免费额度：
- 每月 $5 免费额度
- 足够运行本项目

超出后按量付费，约 $0.0001/请求

## 📞 需要帮助？

如果部署遇到问题，告诉我具体的错误信息。