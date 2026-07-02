# Flutter Developer Portfolio

Flutter 앱 개발자 포트폴리오 웹사이트입니다.

## 로컬 실행
```bash
npm install
npm start
```

## 내 정보로 수정하기

| 파일 | 수정 내용 |
|---|---|
| `src/components/Hero.js` | 이름, 타이틀 |
| `src/components/About.js` | 자기소개 텍스트 |
| `src/components/Experience.js` | 회사명, 경력 내용 |
| `src/components/Projects.js` | 프로젝트 제목, 설명 |
| `src/components/Contact.js` | 이메일, GitHub 주소 |
| `src/components/Footer.js` | 이름 |

## GitHub Pages 배포

### 1단계: 저장소 생성 후 push
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/yourusername/flutter-portfolio.git
git push -u origin main
```

### 2단계: package.json homepage 수정
```json
"homepage": "https://yourusername.github.io/flutter-portfolio"
```

### 3단계: 배포
```bash
npm run deploy
```

### 4단계: GitHub 설정
저장소 → Settings → Pages → Source: `gh-pages` 브랜치

배포 완료 후: `https://yourusername.github.io/flutter-portfolio`
