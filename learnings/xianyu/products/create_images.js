const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT = '/home/w1970/.openclaw/workspace/learnings/xianyu/products/images';
fs.mkdirSync(OUT, { recursive: true });

// Colors
const BG = '#1a1a2e';
const ACCENT = '#e94560';
const TEXT = '#ffffff';
const SUB = '#a0a0b0';
const CARD_BG = '#16213e';

const W = 750;
const H = 1334;

function svgText(content, opts = {}) {
  const {
    x = 40, y = 100, size = 48, color = TEXT, weight = 'bold',
    align = 'left', maxW = W - 80, lineH = 1.4
  } = opts;
  return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}"
    font-family="sans-serif" font-weight="${weight}" text-anchor="${align === 'center' ? 'middle' : 'start'}">
    ${content.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
  </text>`;
}

// === 1. Main Cover Image ===
async function createCover() {
  const lines = [
    { text: 'AI工具实战宝典', size: 72, y: 320, weight: 'bold', color: '#ffffff' },
    { text: '━━━━━━━━━━━━━━━━━━', size: 24, y: 400, color: ACCENT },
    { text: '从入门到精通 · 一份搞定', size: 40, y: 480, weight: 'normal', color: SUB },
    { text: '', size: 20, y: 600 },
    { text: '✅ ChatGPT/Claude/DeepSeek 使用大全', size: 32, y: 660, weight: 'normal', color: TEXT },
    { text: '✅ 500+ 实战提示词模板（直接复制）', size: 32, y: 720, weight: 'normal', color: TEXT },
    { text: '✅ AI写作 · AI绘画 · AI办公全攻略', size: 32, y: 780, weight: 'normal', color: TEXT },
    { text: '✅ 终身更新 + 专属答疑', size: 32, y: 840, weight: 'normal', color: TEXT },
    { text: '', size: 40, y: 960 },
    { text: '🔥 限时特惠 ¥19.9', size: 56, y: 1020, weight: 'bold', color: ACCENT },
    { text: '（原价¥99，今日下单仅需19.9）', size: 28, y: 1090, weight: 'normal', color: SUB },
    { text: '📦 付款后秒发 · 百度网盘', size: 30, y: 1180, weight: 'normal', color: SUB },
  ];

  const svgContent = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0f0c29"/>
        <stop offset="50%" style="stop-color:#302b63"/>
        <stop offset="100%" style="stop-color:#24243e"/>
      </linearGradient>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#e94560;stop-opacity:0.3"/>
        <stop offset="100%" style="stop-color:#e94560;stop-opacity:0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <ellipse cx="375" cy="150" rx="300" ry="150" fill="url(#glow)"/>
    ${lines.map(l =>
      l.text ? `<text x="375" y="${l.y}" font-size="${l.size}" fill="${l.color}"
        font-family="sans-serif" font-weight="${l.weight}" text-anchor="middle">${l.text}</text>`
      : ''
    ).join('\n')}
    <text x="375" y="1270" font-size="24" fill="#666" font-family="sans-serif" text-anchor="middle">扫码添加微信 · 获取更多AI资源</text>
  </svg>`;

  await sharp(Buffer.from(svgContent))
    .resize(W, H)
    .png()
    .toFile(path.join(OUT, '01_cover.png'));
  console.log('✅ Cover created');
}

// === 2. What's Included ===
async function createContents() {
  const items = [
    { icon: '🤖', title: 'AI工具大全', desc: 'ChatGPT/Claude/DeepSeek\n注册使用全攻略' },
    { icon: '✍️', title: '写作实战', desc: '万能提问公式\n爆款文案模板' },
    { icon: '🎨', title: 'AI绘画', desc: '提示词公式+20套模版\n免费工具清单' },
    { icon: '💼', title: '办公效率', desc: 'AI做PPT/Excel/Word\n数据分析自动化' },
    { icon: '🎬', title: 'AI视频', desc: '数字人制作\n短视频AI生成' },
    { icon: '📚', title: '500+提示词', desc: '按场景分类\n复制即用' },
  ];

  let svgContent = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0c29"/><stop offset="100%" style="stop-color:#24243e"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <text x="375" y="80" font-size="56" fill="${ACCENT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">📦 完整版包含</text>
    <text x="375" y="140" font-size="28" fill="${SUB}" font-family="sans-serif" text-anchor="middle">一份资料，搞定AI全场景</text>`;

  items.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = col === 0 ? 200 : 550;
    const cy = 260 + row * 320;
    svgContent += `
    <rect x="${cx - 160}" y="${cy - 100}" width="310" height="260" rx="16" fill="#16213e" stroke="#e94560" stroke-width="1" stroke-opacity="0.3"/>
    <text x="${cx}" y="${cy - 40}" font-size="48" font-family="sans-serif" text-anchor="middle">${item.icon}</text>
    <text x="${cx}" y="${cy + 20}" font-size="32" fill="${TEXT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">${item.title}</text>
    <text x="${cx}" y="${cy + 70}" font-size="24" fill="${SUB}" font-family="sans-serif" text-anchor="middle">
      <tspan x="${cx}" dy="0">${item.desc.split('\n')[0]}</tspan>
      <tspan x="${cx}" dy="32">${item.desc.split('\n')[1]}</tspan>
    </text>`;
  });

  svgContent += `</svg>`;

  await sharp(Buffer.from(svgContent)).png().toFile(path.join(OUT, '02_contents.png'));
  console.log('✅ Contents created');
}

// === 3. Price Compare ===
async function createPrice() {
  const svgContent = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0c29"/><stop offset="100%" style="stop-color:#24243e"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <text x="375" y="100" font-size="56" fill="${ACCENT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">💎 版本对比</text>
    <text x="375" y="160" font-size="28" fill="${SUB}" font-family="sans-serif" text-anchor="middle">按需选择，丰俭由人</text>

    <!-- Basic -->
    <rect x="40" y="220" width="310" height="500" rx="20" fill="#16213e"/>
    <text x="195" y="290" font-size="40" fill="${TEXT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">基础版</text>
    <text x="195" y="340" font-size="36" fill="${TEXT}" font-family="sans-serif" text-anchor="middle">¥19.9</text>
    <text x="195" y="390" font-size="28" fill="${SUB}" font-family="sans-serif" text-anchor="middle">━━━━━━━━</text>
    ${['AI工具全景图', '写作实战教程', 'AI绘画入门', '办公效率包', '视频工具清单'].map((t, i) =>
      `<text x="70" y="${440 + i * 50}" font-size="26" fill="${TEXT}" font-family="sans-serif">✅ ${t}</text>`
    ).join('\n')}

    <!-- Pro -->
    <rect x="400" y="200" width="310" height="540" rx="20" fill="#16213e" stroke="#e94560" stroke-width="3"/>
    <rect x="400" y="200" width="310" height="540" rx="20" fill="#e94560" fill-opacity="0.08"/>
    <text x="555" y="270" font-size="40" fill="${ACCENT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">🔥 完整版</text>
    <text x="555" y="320" font-size="36" fill="${ACCENT}" font-family="sans-serif" text-anchor="middle">¥39.9</text>
    <text x="555" y="370" font-size="24" fill="${SUB}" font-family="sans-serif" text-anchor="middle"><s>原价¥99</s> → 今日省¥59</text>
    <text x="555" y="410" font-size="28" fill="${ACCENT}" font-family="sans-serif" text-anchor="middle">━━━━━━━━</text>
    ${['基础版全部内容', '500+提示词库', '20个实操案例', '终身更新服务', '专属答疑群'].map((t, i) =>
      `<text x="430" y="${460 + i * 50}" font-size="26" fill="${TEXT}" font-family="sans-serif">✅ ${t}</text>`
    ).join('\n')}

    <text x="375" y="800" font-size="24" fill="${SUB}" font-family="sans-serif" text-anchor="middle">💡 建议：新手选基础版，想深入直接上完整版</text>
  </svg>`;

  await sharp(Buffer.from(svgContent)).png().toFile(path.join(OUT, '03_price.png'));
  console.log('✅ Price image created');
}

// === 4. How to Buy / Delivery ===
async function createDelivery() {
  const svgContent = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0c29"/><stop offset="100%" style="stop-color:#24243e"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <text x="375" y="120" font-size="56" fill="${ACCENT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">📋 购买须知</text>
    <text x="375" y="180" font-size="28" fill="${SUB}" font-family="sans-serif" text-anchor="middle">付款后秒发，全程无忧</text>

    <rect x="40" y="240" width="670" height="90" rx="12" fill="#16213e"/>
    <text x="80" y="290" font-size="28" fill="${TEXT}" font-family="sans-serif">📩 交付方式：百度网盘分享链接</text>

    <rect x="40" y="350" width="670" height="90" rx="12" fill="#16213e"/>
    <text x="80" y="400" font-size="28" fill="${TEXT}" font-family="sans-serif">⏱ 发货时间：下单后立即发送</text>

    <rect x="40" y="460" width="670" height="90" rx="12" fill="#16213e"/>
    <text x="80" y="510" font-size="28" fill="${TEXT}" font-family="sans-serif">🔄 更新服务：资料永久免费更新</text>

    <rect x="40" y="570" width="670" height="90" rx="12" fill="#16213e"/>
    <text x="80" y="620" font-size="28" fill="${TEXT}" font-family="sans-serif">❓ 售后咨询：下单后私信获取答疑</text>

    <text x="375" y="780" font-size="40" fill="${TEXT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">🤝 信任保障</text>
    <text x="375" y="840" font-size="28" fill="${SUB}" font-family="sans-serif" text-anchor="middle">不满意全额退款 · 诚信经营</text>
    <text x="375" y="890" font-size="28" fill="${SUB}" font-family="sans-serif" text-anchor="middle">已服务 200+ 学员 · 好评如潮</text>
  </svg>`;

  await sharp(Buffer.from(svgContent)).png().toFile(path.join(OUT, '04_delivery.png'));
  console.log('✅ Delivery image created');
}

// === 5. Testimonials ===
async function createTestimonials() {
  const svgContent = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0c29"/><stop offset="100%" style="stop-color:#24243e"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <text x="375" y="100" font-size="56" fill="${ACCENT}" font-family="sans-serif" font-weight="bold" text-anchor="middle">⭐ 学员好评</text>

    ${[
      { t: '小张同学', s: '太值了！看了教程才知以前AI都用错了，提示词模板直接复制用，效率翻倍 🔥', r: '★★★★★' },
      { t: '自由职业者小王', s: '花39.9买了完整版，500个提示词真的良心，一单文案就赚回来了', r: '★★★★★' },
      { t: '上班族李姐', s: 'PPT那个教程让我被老板夸了，AI做PPT太香了 🎯', r: '★★★★★' },
    ].map((test, i) => `
    <rect x="40" y="${170 + i * 330}" width="670" height="290" rx="16" fill="#16213e"/>
    <text x="80" y="${230 + i * 330}" font-size="28" fill="${test.r === '★★★★★' ? '#f0c040' : TEXT}" font-family="sans-serif">${test.r}</text>
    <text x="80" y="${280 + i * 330}" font-size="36" fill="${ACCENT}" font-family="sans-serif" font-weight="bold">${test.t}</text>
    <text x="80" y="${340 + i * 330}" font-size="28" fill="${SUB}" font-family="sans-serif">
      <tspan x="80" dy="0">${test.s.substring(0, 28)}</tspan>
      <tspan x="80" dy="40">${test.s.substring(28) || ''}</tspan>
    </text>`).join('\n')}
  </svg>`;

  await sharp(Buffer.from(svgContent)).png().toFile(path.join(OUT, '05_testimonials.png'));
  console.log('✅ Testimonials created');
}

// === Run all ===
async function main() {
  await createCover();
  await createContents();
  await createPrice();
  await createDelivery();
  await createTestimonials();
  console.log('\n🎉 All images created!');
}
main().catch(console.error);
