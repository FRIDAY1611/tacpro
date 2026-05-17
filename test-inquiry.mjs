import { chromium } from 'playwright';

const URL = 'http://localhost:3456/zh/inquiry';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ locale: 'zh-CN' });
const page = await context.newPage();

const errors = [];
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', err => errors.push(err.message));

// Capture ALL API responses
const apiCalls = [];
page.on('response', async resp => {
  if (resp.url().includes('/api/inquiry')) {
    apiCalls.push({ status: resp.status(), url: resp.url(), body: await resp.text() });
  }
});

await page.goto(URL, { waitUntil: 'networkidle', timeout: 15000 });
console.log('1. Page loaded');
console.log('   Errors during load:', errors.length);
errors.forEach(e => console.log('   -', e.slice(0, 100)));

// Fill form
await page.fill('#companyName', '测试公司');
await page.fill('#contactName', '李四');
await page.fill('#email', 'test@example.com');
await page.fill('#phone', '13800138000');
await page.fill('#country', '中国');
await page.fill('#address', '广东省广州市');
await page.fill('#targetDate', '2026-07-01');
await page.fill('#message', '请发产品目录');
console.log('2. Form filled');

// Submit
await page.click('button[type="submit"]');
await page.waitForTimeout(3000);
console.log('3. Submitted');

// Results
console.log(`4. API calls captured: ${apiCalls.length}`);
apiCalls.forEach((c, i) => console.log(`   Call ${i+1}: ${c.status} ${c.body}`));

console.log(`5. Errors: ${errors.length}`);
errors.forEach(e => console.log('   -', e.slice(0, 100)));

// Check page content for success/error
const text = await page.textContent('body') || '';
if (text.includes('提交成功') || text.includes('成功')) console.log('✅ Success message shown');
if (text.includes('错误') || text.includes('失败')) console.log('❌ Error message shown');

await browser.close();