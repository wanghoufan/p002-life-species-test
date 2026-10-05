// 静态镜像（GitHub Pages）没有 API 路由时的客户端兜底评分通道。
// 与 /api/runs/preview 用同一正式评分器、同一正式映射文件，结果结构完全一致，
// 只是评分发生在浏览器本机：不落库、没有永久分享链接（跳 /r/preview 读 sessionStorage）。
import { previewSpeciesByKey } from '@/lib/preview-result';

export async function buildPreviewResult(answers: unknown) {
  const { score, validateAnswers, VERSION } = await import(
    '@/../life_species_calibrated_scorer_v1.mjs'
  );

  validateAnswers(answers);
  const result = score(answers);

  if (!result.valid) {
    throw new Error('Invalid answers');
  }

  const mainSpecies = previewSpeciesByKey(result.mainSpeciesKey as string);
  const secondarySpecies = (result.secondarySpeciesKeys as string[])
    .map(key => previewSpeciesByKey(key))
    .filter((s): s is NonNullable<typeof s> => s !== null);

  if (!mainSpecies) {
    throw new Error('Species content not found');
  }

  return {
    shareCode: 'preview',
    mode: 'preview',
    mainSpecies,
    secondarySpecies,
    dimensionScores: Object.entries(result.dims as Record<string, number>).map(
      ([dimension_key, scoreValue]) => ({ dimension_key, score: scoreValue }),
    ),
    testVersion: 'mvp-1.2',
    scorerVersion: VERSION,
    completedAt: new Date().toISOString(),
  };
}
