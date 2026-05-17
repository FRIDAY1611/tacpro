# Hostinger Node.js 部署指南

## 前置准备

1. 一个 Hostinger Node.js 主机套餐（Business 或更高推荐）
2. 已绑定到主机的域名
3. Node.js 版本要求：v20 或更高
---

## 部署方式一：通过 Git 自动部署（推荐）

### 步骤 1：将代码推送到 GitHub/GitLab

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tacpro.git
git push -u origin main
```

### 步骤 2：在 Hostinger hPanel 中配置
1. 登录 hPanel → 网站 → 选择你的域名
2. 进入 **Git** 或 **Auto Deploy** 板块
3. 连接你的 GitHub/GitLab 仓库
4. 设置自动部署分支：`main`
5. 设置 **Node.js 版本**：选择 `20.x`
6. 设置 **启动命令**：
   ```
   npm start
   ```
7. 保存配置

### 步骤 3：配置环境变量
1. 在 hPanel 中找到 **环境变量** / **Node.js Configuration**
2. 添加以下变量：
| 变量名 | 值 | 说明 |
|--------|----|----|
| `DATABASE_URL` | `file:./dev.db` | SQLite 数据库路径 |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | 你的网站域名 |
| `NEXT_PUBLIC_SITE_NAME` | `WearTac` | 网站名称 |
| `ADMIN_USERNAME` | `admin` | 后台登录用户名 |
| `ADMIN_PASSWORD` | `your-secure-password` | 后台登录密码（务必修改） |
| `NODE_ENV` | `production` | 生产环境标志 |
| `SMTP_HOST` | `smtp.hostinger.com` | SMTP 服务器 |
| `SMTP_PORT` | `465` | SMTP 端口（SSL） |
| `SMTP_SECURE` | `true` | 启用 SSL |
| `SMTP_USER` | `wang@weartac.com` | 邮箱地址 |
| `SMTP_PASS` | `your-email-password` | 邮箱密码 |
| `SMTP_FROM` | `wang@weartac.com` | 发件人地址 |
| `ADMIN_EMAIL` | `wang@weartac.com` | 管理员邮箱 |

3. 保存环境变量

### 步骤 4：首次构建
1. 在 hPanel 中打开 **文件管理器** 或 **SSH 终端**
2. 确保在项目根目录（如 `public_html` 或你配置的目录）
3. 运行首次构建命令：
```bash
npm install
npx prisma migrate deploy
npm run build
```

4. 在 hPanel 中 **重启 Node.js 应用**

---

## 部署方式二：手动上传（FTP / ZIP）
### 步骤 1：本地准备
在本地项目根目录运行：
```bash
# 1. 确保依赖已安装
npm install

# 2. 运行数据库迁移
npx prisma migrate deploy

# 3. 构建生产版本
npm run build
```

### 步骤 2：打包上传
1. 将项目文件夹（**排除** `node_modules` 和 `.next`）打包为 ZIP
2. 登录 hPanel → 文件管理器
3. 上传到 `public_html`（或你的应用目录）
4. 解压 ZIP 文件

### 步骤 3：在服务器上安装依赖并构建
通过 hPanel 的 **SSH 终端** 或 **Node.js 控制台**：
```bash
cd ~/public_html  # 或你的项目目录
npm install
npm run build
```

### 步骤 4：配置环境变量和启动

同 **方式一** 的步骤 3 和 4。
---

## 部署后检查清单
- [ ] 网站首页可以正常访问
- [ ] 切换语言（/en, /zh, /es, /fr, /ar, /ru）正常
- [ ] 产品列表页可以加载
- [ ] 询盘表单可以提交
- [ ] 后台管理 `/admin` 可以登录
- [ ] 数据库文件 `dev.db` 有写入权限（若出现权限错误，设为 644 或 666）
---

## 常见问题

### 1. 数据库权限错误
如果看到 `SQLITE_CANTOPEN` 或权限错误：

```bash
chmod 666 dev.db
chmod 755 .
```

### 2. Prisma Client 未生成
如果看到 `@prisma/client` 相关错误，手动运行：

```bash
npx prisma generate
```

### 3. 端口冲突

Hostinger Node.js 会自动分配端口。启动命令使用 `npm start`（即 `next start -p ${PORT:-3000}`）会自动读取 `PORT` 环境变量。

### 4. 内存不足导致构建失败

如果 `npm run build` 因内存不足失败，联系 Hostinger 升级套餐，或在本地构建后上传 `.next` 文件夹（不推荐，但可应急）。

### 5. 静态资源 404

确保 `public/` 文件夹内的图片和字体已正确上传。
---

## 文件说明

| 文件/目录 | 是否必须上传 | 说明 |
|-----------|-------------|------|
| `src/` | 是 | 源代码 |
| `prisma/` | 是 | 数据库模型和迁移 |
| `public/` | 是 | 静态资源 |
| `.next/` | 否 | 构建输出（可在服务器上生成） |
| `node_modules/` | 否 | 依赖（在服务器上 `npm install`） |
| `dev.db` | 是 | SQLite 数据库文件（已有数据则上传） |
| `.env` | 否 | 环境变量在 hPanel 中配置 |

> *如服务器构建资源不足，可本地构建后上传 `.next` 文件夹。*
---

## 联系方式

如有问题，检查 Hostinger 文档或联系其客服。也可以检查 Next.js 和 Prisma 官方文档。
