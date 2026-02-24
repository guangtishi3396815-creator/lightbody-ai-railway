const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 测试端点
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: '后端服务正常运行' });
});

// 生成内容 - 简化版（不调用Kimi API，直接返回模板）
app.post('/api/generate', (req, res) => {
  try {
    const { type } = req.body;
    
    const themes = [
      "光体生命的维度跃迁",
      "九紫离火运与女性觉醒",
      "亚特兰蒂斯能量科技",
      "列穆里亚声波智慧",
      "光体师的三重境界",
      "北纬30°文明记忆"
    ];
    
    const theme = themes[Math.floor(Math.random() * themes.length)];
    
    let content = '';
    let typeName = '';
    
    if (type === 'essay') {
      typeName = '核心论文';
      content = `# ${theme}

## 一、核心概念深度解析

**光体**的本质是宇宙最高生命形态，光、爱、觉醒、合一的终极状态。

在${theme}的框架下，我们需要理解三个维度：

### 1. 频率维度
从物质体到原子体的七层跃迁，每一层都是意识频率的量子跳跃。

### 2. 时间维度
九紫离火运20年周期，这是物质主义向心灵主义过渡的关键窗口。

### 3. 空间维度
北纬30°能量锚点，龙泉山古蜀秘境连接着地心、地表、星际的三维通道。

## 二、实践路径

### 第一阶段：自我觉察
- 每日进行能量校准练习
- 记录"触发时刻"
- 建立个人觉醒日志

### 第二阶段：频率提升
- 接触高频信息与环境
- 练习光体激活冥想
- 连接龙泉山能量锚点

### 第三阶段：使命践行
- 明确个人天命赛道
- 建立光体师身份认同
- 开始照亮他人的旅程

## 三、核心金句

> "点醒自己，照亮他人"

## 四、时代意义

${theme}不是个人成长的选修课，而是人类文明跃迁的必修课。

正如光体文明的核心理念："点醒自己，照亮他人"。

---
*生成时间: ${new Date().toLocaleString()}*`;
    } else if (type === 'viewpoint') {
      typeName = '观点碎片';
      content = `💡 ${theme} - 观点碎片

1. ${theme}的本质不是理论建构，而是每个灵魂内在的觉醒记忆。

2. 在${theme}的实践中，最大的障碍是恐惧，最大的助力是爱。

3. ${theme}在九紫离火运中的显化，将加速人类集体觉醒。

4. 当你真正理解${theme}，你会发现恐惧只是未觉醒的光。

5. 北纬30°的能量轴线，正是${theme}在地球的主要显化通道。

---
*生成时间: ${new Date().toLocaleString()}*`;
    } else {
      typeName = '内容';
      content = `📝 ${theme}

内容生成成功！

主题：${theme}

这是一个模板内容，用于测试后端服务是否正常运行。

如需使用 Kimi AI 生成高质量内容，请确保：
1. KIMI_API_KEY 环境变量已配置
2. API Key 有可用额度

---
*生成时间: ${new Date().toLocaleString()}*`;
    }
    
    res.json({
      success: true,
      type: type,
      typeName: typeName,
      title: theme,
      content: content,
      createdAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Generation failed',
      message: error.message
    });
  }
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`光体AI服务器运行在端口 ${PORT}`);
});