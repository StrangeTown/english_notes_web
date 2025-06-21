export interface EpisodePoint {
  en: string;
  cn: string;
}

export interface EpisodeExample {
  en: string;
  cn: string;
}

export interface EpisodeSentence {
  en: string;
  cn: string;
  examples?: EpisodeExample[];
}

export interface EpisodeItem {
  en: string;
  cn: string;
  points?: EpisodePoint[];
  sentence?: EpisodeSentence;
}
