
export type AgeGroup = 'child' | 'teen' | 'adult';

export interface WordMeaning {
  definition: string;
  example: string;
}

export interface Summaries {
  child: string;
  teen: string;
  adult: string;
}

export type AnalysisResult = {
  type: 'word';
  data: WordMeaning;
} | {
  type: 'summary';
  data: Summaries;
};
