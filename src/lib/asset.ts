// basePath 前缀 helper：静态托管在 GitHub Pages 项目页（带 /p002-life-species-test 子路径）时，
// 原生 <img>/数据里的本地绝对路径不会被 basePath 自动处理，必须在渲染处用 asset() 包一次。
// 外部 URL（http/https）与 data: URL 绝不能加前缀。
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(p: string): string {
  if (!p.startsWith('/')) return p;
  return BASE + p;
}
