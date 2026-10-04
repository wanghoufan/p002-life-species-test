import manifest from '../../life_species_supabase_seed_manifest_v1.json';

export type PreviewSpecies = {
  species_key: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  buff: string;
  summon_tags: string[];
  food_tags: string[];
  how_to_get_along: string;
  typical_symptoms: string;
  roast: string;
  family: string;
};

const splitTags = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw as string[];
  if (typeof raw === 'string' && raw.trim().length > 0) {
    return raw.split(/[、,，]/).map(t => t.trim()).filter(Boolean);
  }
  return [];
};

type ManifestSpecies = {
  speciesKey: string;
  displayOrder: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  buff: string;
  summonTags: string;
  foodTags: string;
  howToGetAlong: string;
  typicalSymptoms: string;
  roast: string;
  family: string;
};

// 结果页需要的物种字段与 species_content 表一致；这里直接从正式映射文件取，
// 用于数据库未接入时在本机出结果。图片路径与 species_key 均保持正式值。
const BY_KEY: Record<string, PreviewSpecies> = Object.fromEntries(
  (manifest as { species: ManifestSpecies[] }).species.map(s => [
    s.speciesKey,
    {
      species_key: s.speciesKey,
      name: s.name,
      tagline: s.tagline,
      description: s.description,
      image_url: s.imageUrl,
      buff: s.buff,
      summon_tags: splitTags(s.summonTags),
      food_tags: splitTags(s.foodTags),
      how_to_get_along: s.howToGetAlong,
      typical_symptoms: s.typicalSymptoms,
      roast: s.roast,
      family: s.family,
    },
  ]),
);

export function previewSpeciesByKey(key: string): PreviewSpecies | null {
  return BY_KEY[key] ?? null;
}
