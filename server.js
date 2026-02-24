const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 获取环境变量
const KIMI_API_KEY = process.env.KIMI_API_KEY;

console.log('KIMI_API_KEY:', KIMI_API_KEY ? '已配置' : '未配置');

// 知识库
const knowledge = {
  themes: [
    "光体生命的维度跃迁与频率校准",
    "九紫离火运：中年女性天命觉醒的宇宙时机",
    "亚特兰蒂斯能量科技：失落的星际文明",
    "列穆里亚声波智慧：心电感应的黄金时代",
    "光体师的三重境界：觉醒者·传递者·共创者",
    "北纬30°文明记忆：地球灵脉的觉醒密码"
  ],
  concepts: {
    "光体": "宇宙最高生命形态，是光、爱、觉醒、合一的终极状态",
    "光体师": "以点醒自己、照亮他人为使命的觉醒者",
    "光明森林": "爱越分享越强大，光越绽放越永恒的宇宙法则"
  }
};

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    kimiConfigured: !!KIMI_API_KEY
  });
});

// 生成内容
app.post('/api/generate', async (req, res) => {
  try {
    const { type } = req.body;
    
    if (!KIMI_API_KEY) {
      return res.status(500).json({
        error: 'KIMI_API_KEY not configured',
        message: '请在 Railway 环境变量中设置 KIMI_API_KEY'
      });
    }

    const theme = random(knowledge.themes);
    const conceptEntry = random(Object.entries(knowledge.concepts));
    
    const prompts = {
      essay: `请以"${theme}"为主题，写一篇深度核心论文（1500字）。

核心概念：${conceptEntry[0]} - ${conceptEntry[1]}

文章结构：
1. 核心概念深度解析
2. 实践路径（自我觉察、频率提升、使命践行）
3. 核心金句与解读
4. 时代意义

要求：语言要有灵性深度，适合公众号发布。`,

      viewpoint: `请以"${theme}"为主题，生成10个深度观点碎片。

每个观点要求：
- 有哲学深度
- 结合光体文明理念
- 适合发朋友圈/微博
- 100-150字

输出格式：1. [观点] 2. [观点] ...`,

      quote: `请生成20条光体文明的神圣金句。

要求：
- 简洁有力，20字以内
- 有灵性深度
- 分类：使命/法则/觉醒/文明/时代

输出格式：1. 「金句」（分类）`
    };

    const prompt = prompts[type] || prompts.essay;

    console.log('Calling Kimi API...');
    
    // 调用Kimi API
    const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'kimi-k2.5',
        messages: [
          {
            role: 'system',
            content: '你是光体AI，专注于光体文明内容生成的高级AI助手。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 4000
      })
    });

    console.log('Kimi API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Kimi API error:', errorText);
      throw new Error('Kimi API调用失败: ' + response.status);
    }

    const completion = await response.json();
    const content = completion.choices[0].message.content;

    console.log('Content generated successfully');

    res.json({
      success: true,
      type: type,
      typeName: type === 'essay' ? '核心论文' : type === 'viewpoint' ? '观点碎片' : '神圣金句',
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
  console.log(`Kimi API: ${KIMI_API_KEY ? '已配置' : '未配置'}`);
});