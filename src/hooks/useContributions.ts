"use client";

import { useEffect, useState } from "react";
import type {
  ContributionDay,
  ContributionStats,
  ContributionWeek,
} from "@/types/contribution";

interface ContributionCollectionResponse {
  restrictedContributionsCount?: number;
  totalCommitContributions?: number;
  totalIssueContributions?: number;
  totalPullRequestContributions?: number;
  totalPullRequestReviewContributions?: number;
  totalRepositoryContributions?: number;
  contributionCalendar?: {
    totalContributions?: number;
    weeks?: ContributionWeek[];
  };
  commitContributionsByRepository?: Array<{
    contributions?: {
      nodes?: Array<{
        occurredAt?: string | null;
        commitCount?: number | null;
      }>;
    };
  }>;
  issueContributionsByRepository?: Array<{
    contributions?: {
      nodes?: Array<{
        occurredAt?: string | null;
      }>;
    };
  }>;
  pullRequestContributionsByRepository?: Array<{
    contributions?: {
      nodes?: Array<{
        occurredAt?: string | null;
      }>;
    };
  }>;
  pullRequestReviewContributionsByRepository?: Array<{
    contributions?: {
      nodes?: Array<{
        occurredAt?: string | null;
      }>;
    };
  }>;
  repositoryContributions?: {
    nodes?: Array<{
      occurredAt?: string | null;
    }>;
  };
}

interface ContributionResponse {
  data?: {
    viewer?: {
      login?: string;
      contributionsCollection?: ContributionCollectionResponse;
    };
  };
  errors?: Array<{ message?: string }>;
}

const DAYS_TO_SHOW = 182;
const MAX_REPOSITORIES = 100;
const MAX_ITEMS_PER_REPOSITORY = 100;

function addContributionForDate(
  dateMap: Record<string, number>,
  occurredAt: string | null | undefined,
  fromDateOnly: string,
  toDateOnly: string,
  amount = 1,
) {
  if (!occurredAt) {
    return;
  }

  const date = occurredAt.slice(0, 10);
  if (date < fromDateOnly || date > toDateOnly) {
    return;
  }

  dateMap[date] = (dateMap[date] ?? 0) + amount;
}

export const useContributions = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState<ContributionStats>({
    totalContributions: 0,
    commits: 0,
    pullRequestsOpened: 0,
    reviews: 0,
    issuesOpened: 0,
    repositoriesCreated: 0,
    privateContributions: 0,
  });
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  useEffect(() => {
    const getGitHubContributionStats = async () => {
      if (!githubToken) {
        console.warn(
          "NEXT_PUBLIC_GITHUB_TOKEN is missing. Contribution graph will be empty.",
        );
        return;
      }

      try {
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setDate(toDate.getDate() - (DAYS_TO_SHOW - 1));

        const fromDateOnly = fromDate.toISOString().slice(0, 10);
        const toDateOnly = toDate.toISOString().slice(0, 10);

        const from = new Date(
          Date.UTC(
            fromDate.getUTCFullYear(),
            fromDate.getUTCMonth(),
            fromDate.getUTCDate(),
            0,
            0,
            0,
          ),
        ).toISOString();

        const to = new Date(
          Date.UTC(
            toDate.getUTCFullYear(),
            toDate.getUTCMonth(),
            toDate.getUTCDate(),
            23,
            59,
            59,
          ),
        ).toISOString();

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          cache: "no-store",
          headers: {
            Authorization: `bearer ${githubToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query (
                $from: DateTime!
                $to: DateTime!
                $maxRepositories: Int!
                $maxItemsPerRepository: Int!
              ) {
                viewer {
                  login
                  contributionsCollection(from: $from, to: $to) {
                    restrictedContributionsCount
                    totalCommitContributions
                    totalIssueContributions
                    totalPullRequestContributions
                    totalPullRequestReviewContributions
                    totalRepositoryContributions
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                          color
                          contributionLevel
                        }
                      }
                    }
                    commitContributionsByRepository(
                      maxRepositories: $maxRepositories
                    ) {
                      contributions(first: $maxItemsPerRepository) {
                        nodes {
                          occurredAt
                          commitCount
                        }
                      }
                    }
                    issueContributionsByRepository(
                      maxRepositories: $maxRepositories
                    ) {
                      contributions(first: $maxItemsPerRepository) {
                        nodes {
                          occurredAt
                        }
                      }
                    }
                    pullRequestContributionsByRepository(
                      maxRepositories: $maxRepositories
                    ) {
                      contributions(first: $maxItemsPerRepository) {
                        nodes {
                          occurredAt
                        }
                      }
                    }
                    pullRequestReviewContributionsByRepository(
                      maxRepositories: $maxRepositories
                    ) {
                      contributions(first: $maxItemsPerRepository) {
                        nodes {
                          occurredAt
                        }
                      }
                    }
                    repositoryContributions(first: $maxItemsPerRepository) {
                      nodes {
                        occurredAt
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              from,
              to,
              maxRepositories: MAX_REPOSITORIES,
              maxItemsPerRepository: MAX_ITEMS_PER_REPOSITORY,
            },
          }),
        });

        const json = (await res.json()) as ContributionResponse;

        if (!res.ok || json.errors?.length) {
          console.error(
            "Error fetching GitHub stats:",
            json.errors?.[0]?.message ?? res.statusText,
          );
          return;
        }

        const contributionCollection =
          json.data?.viewer?.contributionsCollection;
        if (!contributionCollection) {
          setContributions([]);
          return;
        }

        const allDays =
          contributionCollection.contributionCalendar?.weeks?.flatMap(
            (week) => week.contributionDays,
          ) ?? [];

        const filteredDays = allDays
          .filter((day) => day.date >= fromDateOnly && day.date <= toDateOnly)
          .sort((a, b) => a.date.localeCompare(b.date));

        const customCountsByDate: Record<string, number> = {};

        for (const repo of contributionCollection.commitContributionsByRepository ??
          []) {
          for (const node of repo.contributions?.nodes ?? []) {
            addContributionForDate(
              customCountsByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
              node.commitCount ?? 1,
            );
          }
        }

        for (const repo of contributionCollection.issueContributionsByRepository ??
          []) {
          for (const node of repo.contributions?.nodes ?? []) {
            addContributionForDate(
              customCountsByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
            );
          }
        }

        for (const repo of contributionCollection.pullRequestContributionsByRepository ??
          []) {
          for (const node of repo.contributions?.nodes ?? []) {
            addContributionForDate(
              customCountsByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
            );
          }
        }

        for (const repo of contributionCollection.pullRequestReviewContributionsByRepository ??
          []) {
          for (const node of repo.contributions?.nodes ?? []) {
            addContributionForDate(
              customCountsByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
            );
          }
        }

        for (const node of contributionCollection.repositoryContributions
          ?.nodes ?? []) {
          addContributionForDate(
            customCountsByDate,
            node.occurredAt,
            fromDateOnly,
            toDateOnly,
          );
        }

        const mergedDays: ContributionDay[] = filteredDays.map((day) => {
          const customCount = customCountsByDate[day.date] ?? 0;
          return {
            ...day,
            // Keep the higher count to avoid undercount if a nested connection is truncated.
            contributionCount: Math.max(day.contributionCount, customCount),
          };
        });

        setContributions(mergedDays);

        setStats({
          totalContributions:
            contributionCollection.contributionCalendar?.totalContributions ??
            0,
          commits: contributionCollection.totalCommitContributions ?? 0,
          pullRequestsOpened:
            contributionCollection.totalPullRequestContributions ?? 0,
          reviews:
            contributionCollection.totalPullRequestReviewContributions ?? 0,
          issuesOpened: contributionCollection.totalIssueContributions ?? 0,
          repositoriesCreated:
            contributionCollection.totalRepositoryContributions ?? 0,
          privateContributions:
            contributionCollection.restrictedContributionsCount ?? 0,
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    getGitHubContributionStats();
  }, [githubToken]);

  return { contributions, stats };
};
