export type RegionScores = { [key: number]: number | '' };
export type Sanctuary = { id: string; value: number | '' };
export type Player = {
  id: number;
  name: string;
  regions: RegionScores;
  sanctuaries: Sanctuary[];
};
