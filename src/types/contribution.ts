export type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  contributionLevel: ContributionLevel;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionStats {
  totalContributions: number;
  commits: number;
  pullRequestsOpened: number;
  reviews: number;
  issuesOpened: number;
  repositoriesCreated: number;
  privateContributions: number;
}
