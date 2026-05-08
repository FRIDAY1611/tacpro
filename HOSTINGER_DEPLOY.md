# Hostinger Node.js 閮ㄧ讲鎸囧崡

## 鍓嶇疆鍑嗗

1. 涓€涓?Hostinger Node.js 涓绘満濂楅锛圔usiness 鎴栨洿楂樻帹鑽愶級
2. 宸茬粦瀹氬埌涓绘満鐨勫煙鍚?3. Node.js 鐗堟湰瑕佹眰锛歷20 鎴栨洿楂?
---

## 閮ㄧ讲鏂瑰紡涓€锛氶€氳繃 Git 鑷姩閮ㄧ讲锛堟帹鑽愶級

### 姝ラ 1锛氬皢浠ｇ爜鎺ㄩ€佸埌 GitHub/GitLab

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tacpro.git
git push -u origin main
```

### 姝ラ 2锛氬湪 Hostinger hPanel 涓厤缃?
1. 鐧诲綍 hPanel 鈫?缃戠珯 鈫?閫夋嫨浣犵殑鍩熷悕
2. 杩涘叆 **Git** 鎴?**Auto Deploy** 鏉垮潡
3. 杩炴帴浣犵殑 GitHub/GitLab 浠撳簱
4. 璁剧疆鑷姩閮ㄧ讲鍒嗘敮锛歚main`
5. 璁剧疆 **Node.js 鐗堟湰**锛氶€夋嫨 `20.x`
6. 璁剧疆 **鍚姩鍛戒护**锛?   ```
   npm start
   ```
7. 淇濆瓨閰嶇疆

### 姝ラ 3锛氶厤缃幆澧冨彉閲?
1. 鍦?hPanel 涓壘鍒?**鐜鍙橀噺** / **Node.js Configuration**
2. 娣诲姞浠ヤ笅鍙橀噺锛?
| 鍙橀噺鍚?| 鍊?| 璇存槑 |
|--------|----|----|
| `DATABASE_URL` | `file:./dev.db` | SQLite 鏁版嵁搴撹矾寰?|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` | 浣犵殑缃戠珯鍩熷悕 |
| `NEXT_PUBLIC_SITE_NAME` | `WearTac` | 缃戠珯鍚嶇О |
| `ADMIN_USERNAME` | `admin` | 鍚庡彴鐧诲綍鐢ㄦ埛鍚?|
| `ADMIN_PASSWORD` | `your-secure-password` | 鍚庡彴鐧诲綍瀵嗙爜锛堝姟蹇呬慨鏀癸級 |
| `NODE_ENV` | `production` | 鐢熶骇鐜鏍囧織 |

3. 淇濆瓨鐜鍙橀噺

### 姝ラ 4锛氶娆℃瀯寤?
1. 鍦?hPanel 涓墦寮€ **鏂囦欢绠＄悊鍣?* 鎴?**SSH 缁堢**
2. 纭繚鍦ㄩ」鐩牴鐩綍锛坄public_html` 鎴栦綘閰嶇疆鐨勭洰褰曪級
3. 杩愯棣栨鏋勫缓鍛戒护锛?
```bash
npm install
npx prisma migrate deploy
npm run build
```

4. 鍦?hPanel 涓?**閲嶅惎 Node.js 搴旂敤**

---

## 閮ㄧ讲鏂瑰紡浜岋細鎵嬪姩涓婁紶锛圸IP / FTP锛?
### 姝ラ 1锛氭湰鍦板噯澶?
鍦ㄦ湰鍦伴」鐩牴鐩綍杩愯锛?
```bash
# 1. 纭繚渚濊禆宸插畨瑁?npm install

# 2. 杩愯鏁版嵁搴撹縼绉?npx prisma migrate deploy

# 3. 鏋勫缓鐢熶骇鐗堟湰
npm run build
```

### 姝ラ 2锛氭墦鍖呬笂浼?
1. 灏嗛」鐩枃浠跺す锛?*鎺掗櫎** `node_modules` 鍜?`.next`锛夋墦鍖呬负 ZIP
2. 鐧诲綍 hPanel 鈫?鏂囦欢绠＄悊鍣?3. 涓婁紶鍒?`public_html`锛堟垨浣犵殑搴旂敤鐩綍锛?4. 瑙ｅ帇 ZIP 鏂囦欢

### 姝ラ 3锛氬湪鏈嶅姟鍣ㄤ笂瀹夎渚濊禆骞舵瀯寤?
閫氳繃 hPanel 鐨?**SSH 缁堢** 鎴?**Node.js 鎺у埗鍙?*锛?
```bash
cd ~/public_html  # 鎴栦綘鐨勯」鐩洰褰?npm install
npm run build
```

### 姝ラ 4锛氶厤缃幆澧冨彉閲忓拰鍚姩

鍚?*鏂瑰紡涓€**鐨勬楠?3 鍜?4銆?
---

## 閮ㄧ讲鍚庢鏌ユ竻鍗?
- [ ] 缃戠珯棣栭〉鍙互姝ｅ父璁块棶
- [ ] 鍒囨崲璇█锛?en, /zh, /es, /fr, /ar, /ru锛夋甯?- [ ] 浜у搧鍒楄〃椤靛彲浠ュ姞杞?- [ ] 璇㈢洏琛ㄥ崟鍙互鎻愪氦
- [ ] 鍚庡彴绠＄悊 `/admin` 鍙互鐧诲綍
- [ ] 鏁版嵁搴撴枃浠?`dev.db` 鏈夊啓鍏ユ潈闄愶紙鑻ュ嚭鐜版潈闄愰敊璇紝璁句负 644 鎴?666锛?
---

## 甯歌闂

### 1. 鏁版嵁搴撴潈闄愰敊璇?
濡傛灉鐪嬪埌 `SQLITE_CANTOPEN` 鎴栨潈闄愰敊璇細

```bash
chmod 666 dev.db
chmod 755 .
```

### 2. Prisma Client 鏈敓鎴?
濡傛灉鐪嬪埌 `@prisma/client` 鐩稿叧閿欒锛屾墜鍔ㄨ繍琛岋細

```bash
npx prisma generate
```

### 3. 绔彛鍐茬獊

Hostinger Node.js 浼氳嚜鍔ㄥ垎閰嶇鍙ｃ€傜‘淇濅綘鐨勫惎鍔ㄥ懡浠ゆ槸 `npm start`锛堝嵆 `next start`锛夛紝Next.js 浼氳嚜鍔ㄨ鍙?`PORT` 鐜鍙橀噺銆?
### 4. 鍐呭瓨涓嶈冻瀵艰嚧鏋勫缓澶辫触

濡傛灉 `npm run build` 鍥犲唴瀛樹笉瓒冲け璐ワ紝鑱旂郴 Hostinger 鍗囩骇濂楅锛屾垨鍦ㄦ湰鍦版瀯寤哄悗涓婁紶 `.next` 鏂囦欢澶癸紙涓嶆帹鑽愶紝浣嗗彲搴旀€ワ級銆?
### 5. 闈欐€佽祫婧?404

纭繚 `public/` 鏂囦欢澶瑰唴鐨勫浘鐗囧拰瀛椾綋宸叉纭笂浼犮€?
---

## 鏂囦欢璇存槑

| 鏂囦欢/鐩綍 | 鏄惁蹇呴』涓婁紶 | 璇存槑 |
|-----------|-------------|------|
| `src/` | 鏄?| 婧愪唬鐮?|
| `prisma/` | 鏄?| 鏁版嵁搴撴ā鍨嬪拰杩佺Щ |
| `public/` | 鏄?| 闈欐€佽祫婧?|
| `.next/` | 鍚? | 鏋勫缓杈撳嚭锛堝彲鍦ㄦ湇鍔″櫒涓婄敓鎴愶級 |
| `node_modules/` | 鍚?| 渚濊禆锛堝湪鏈嶅姟鍣ㄤ笂 `npm install`锛?|
| `dev.db` | 鏄?| SQLite 鏁版嵁搴撴枃浠讹紙宸叉湁鏁版嵁鍒欎笂浼狅級 |
| `.env` | 鍚?| 鐜鍙橀噺鍦?hPanel 涓厤缃?|

> *濡傛湇鍔″櫒鏋勫缓璧勬簮涓嶈冻锛屽彲鏈湴鏋勫缓鍚庝笂浼?`.next` 鏂囦欢澶广€?
---

## 鑱旂郴鏂瑰紡

濡傛湁闂锛屾鏌?Hostinger 鏂囨。鎴栬仈绯诲叾瀹㈡湇銆備篃鍙互妫€鏌?Next.js 鍜?Prisma 瀹樻柟鏂囨。銆?