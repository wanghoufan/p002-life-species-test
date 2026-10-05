// 服务端壳：'use client' 页面不能导出 generateStaticParams，静态参数与按需渲染开关放这里。
// Vercel 主线不设 STATIC_EXPORT → 返回空参数列表，全部 shareCode 仍按需渲染（行为不变）；
// GitHub Pages 构建设 STATIC_EXPORT=1 → 只预渲染演示模式结果页 /r/preview/。
import ResultView from './result-view';

const isStatic = process.env.STATIC_EXPORT === '1';

export function generateStaticParams() {
  if (!isStatic) return [];
  return [{ shareCode: 'preview' }];
}

export default function Page() {
  return <ResultView />;
}
