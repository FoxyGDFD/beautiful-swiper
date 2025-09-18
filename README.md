# How to start:
---
## 1. With Docker:
1. Create or copy `.env.example` with name `.env`.
2. Fill `.env` as `.env.example`.
3. Run container `compose.dev.yml` by command:

```bash
docker compose -f ./compose.dev.yml up 
```

> If you need build artifact you should run command:

```bash
docker compose up
```

----
## 2. With node.js
1. Install node.js and npm
2. Installing dependencies. In project root run command:
```bash
npm i
```
3. Run app by command:
```bash
npm run dev
```
> If you need build artifact you should run command:
> ```bash
npm run build
```
