import { NextRequest, NextResponse } from 'next/server';
import { previewSpeciesByKey } from '@/lib/preview-result';

// 数据库未接入时的本机评分通道：跑的是同一个正式评分器，物种文案取自正式映射文件，
// 只是不写 test_runs / test_answers / result_snapshot，因此没有可分享的永久链接。
export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json();

    const { score, validateAnswers, VERSION } = await import('@/../life_species_calibrated_scorer_v1.mjs');
    const testVersion = 'mvp-1.2';

    validateAnswers(answers);
    const result = score(answers);

    if (!result.valid) {
      return NextResponse.json({ error: 'Invalid answers', details: result.error }, { status: 400 });
    }

    const mainSpecies = previewSpeciesByKey(result.mainSpeciesKey as string);
    const secondarySpecies = (result.secondarySpeciesKeys as string[])
      .map(key => previewSpeciesByKey(key))
      .filter((s): s is NonNullable<typeof s> => s !== null);

    if (!mainSpecies) {
      return NextResponse.json({ error: 'Species content not found' }, { status: 500 });
    }

    return NextResponse.json({
      shareCode: 'preview',
      mode: 'preview',
      mainSpecies,
      secondarySpecies,
      dimensionScores: Object.entries(result.dims as Record<string, number>).map(
        ([dimension_key, scoreValue]) => ({ dimension_key, score: scoreValue }),
      ),
      testVersion,
      scorerVersion: VERSION,
      completedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error('Preview run error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
