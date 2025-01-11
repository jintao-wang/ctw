This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 功能实现情况
- 首先展示所有文章
- 接入富文本编辑、支持上传图片
- 文本自动上传、节流10s
- 文本发布
- 服务端渲染发布的文章

## 技术选型

- 框架是react和nextjs

  nextjs支持服务端渲染，有利于文章发布服务端渲染

- 富文本编辑器

  选择TipTap

- 样式框架

  Tailwind CSS和daisyui

- 后端存储

  阿里云oss

demo：https://ctw-peach.vercel.app/


