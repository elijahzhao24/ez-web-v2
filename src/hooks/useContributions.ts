"use client";

import { useEffect, useState } from "react";
import type { ContributionDay, ContributionWeek } from "@/types/contribution";

interface ContributionCollectionResponse {
  contributionCalendar?: {
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
      contributionsCollection?: ContributionCollectionResponse;
    };
  };
  errors?: Array<{ message?: string }>;
}

interface ExtraActivityResponse {
  data?: {
    viewer?: {
      pullRequests?: {
        nodes?: Array<{
          createdAt?: string | null;
          closedAt?: string | null;
          mergedAt?: string | null;
        }>;
      };
      issues?: {
        nodes?: Array<{
          createdAt?: string | null;
          closedAt?: string | null;
        }>;
      };
      repositories?: {
        nodes?: Array<{
          createdAt?: string | null;
          pushedAt?: string | null;
          updatedAt?: string | null;
        }>;
      };
      starredRepositories?: {
        edges?: Array<{
          starredAt?: string | null;
        }>;
      };
    };
  };
  errors?: Array<{ message?: string }>;
}

const DAYS_TO_SHOW = 182;
const MAX_REPOSITORIES = 100;
const MAX_ITEMS_PER_REPOSITORY = 100;
const EXTRA_ITEMS_LIMIT = 100;

function incrementForDate(
  activityByDate: Record<string, number>,
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

  activityByDate[date] = (activityByDate[date] ?? 0) + amount;
}

function buildDateRange(from: Date, to: Date): string[] {
  const dates: string[] = [];
  const cursor = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()),
  );
  const end = new Date(
    Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()),
  );

  while (cursor <= end) {
    dates.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

export const useContributions = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
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

        const dates = buildDateRange(fromDate, toDate);
        const activityByDate = Object.fromEntries(
          dates.map((date) => [date, 0]),
        ) as Record<string, number>;

        const contributionRes = await fetch("https://api.github.com/graphql", {
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
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
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

        const contributionJson =
          (await contributionRes.json()) as ContributionResponse;

        if (!contributionRes.ok || contributionJson.errors?.length) {
          console.error(
            "Error fetching GitHub contributions:",
            contributionJson.errors?.[0]?.message ?? contributionRes.statusText,
          );
          return;
        }

        const collection =
          contributionJson.data?.viewer?.contributionsCollection;

        const calendarDays =
          collection?.contributionCalendar?.weeks?.flatMap(
            (week) => week.contributionDays,
          ) ?? [];

        for (const day of calendarDays) {
          if (day.date < fromDateOnly || day.date > toDateOnly) {
            continue;
          }
          // Base profile-style contribution count.
          activityByDate[day.date] =
            (activityByDate[day.date] ?? 0) + day.contributionCount;
        }

        for (const repo of collection?.commitContributionsByRepository ?? []) {
          for (const node of repo.contributions?.nodes ?? []) {
            incrementForDate(
              activityByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
              node.commitCount ?? 1,
            );
          }
        }

        for (const repo of collection?.issueContributionsByRepository ?? []) {
          for (const node of repo.contributions?.nodes ?? []) {
            incrementForDate(
              activityByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
            );
          }
        }

        for (const repo of collection?.pullRequestContributionsByRepository ??
          []) {
          for (const node of repo.contributions?.nodes ?? []) {
            incrementForDate(
              activityByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
            );
          }
        }

        for (const repo of collection?.pullRequestReviewContributionsByRepository ??
          []) {
          for (const node of repo.contributions?.nodes ?? []) {
            incrementForDate(
              activityByDate,
              node.occurredAt,
              fromDateOnly,
              toDateOnly,
            );
          }
        }

        for (const node of collection?.repositoryContributions?.nodes ?? []) {
          incrementForDate(
            activityByDate,
            node.occurredAt,
            fromDateOnly,
            toDateOnly,
          );
        }

        // Extra non-calendar events to make the graph denser.
        try {
          const extraRes = await fetch("https://api.github.com/graphql", {
            method: "POST",
            cache: "no-store",
            headers: {
              Authorization: `bearer ${githubToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query ($first: Int!) {
                  viewer {
                    pullRequests(
                      first: $first
                      states: [OPEN, CLOSED, MERGED]
                      orderBy: { field: UPDATED_AT, direction: DESC }
                    ) {
                      nodes {
                        createdAt
                        closedAt
                        mergedAt
                      }
                    }
                    issues(
                      first: $first
                      states: [OPEN, CLOSED]
                      orderBy: { field: UPDATED_AT, direction: DESC }
                    ) {
                      nodes {
                        createdAt
                        closedAt
                      }
                    }
                    repositories(
                      first: $first
                      ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
                      orderBy: { field: PUSHED_AT, direction: DESC }
                    ) {
                      nodes {
                        createdAt
                        pushedAt
                        updatedAt
                      }
                    }
                    starredRepositories(
                      first: $first
                      orderBy: { field: STARRED_AT, direction: DESC }
                    ) {
                      edges {
                        starredAt
                      }
                    }
                  }
                }
              `,
              variables: { first: EXTRA_ITEMS_LIMIT },
            }),
          });

          const extraJson = (await extraRes.json()) as ExtraActivityResponse;

          if (extraRes.ok && !extraJson.errors?.length) {
            for (const pr of extraJson.data?.viewer?.pullRequests?.nodes ??
              []) {
              incrementForDate(
                activityByDate,
                pr.createdAt,
                fromDateOnly,
                toDateOnly,
              );
              incrementForDate(
                activityByDate,
                pr.closedAt,
                fromDateOnly,
                toDateOnly,
              );
              incrementForDate(
                activityByDate,
                pr.mergedAt,
                fromDateOnly,
                toDateOnly,
              );
            }

            for (const issue of extraJson.data?.viewer?.issues?.nodes ?? []) {
              incrementForDate(
                activityByDate,
                issue.createdAt,
                fromDateOnly,
                toDateOnly,
              );
              incrementForDate(
                activityByDate,
                issue.closedAt,
                fromDateOnly,
                toDateOnly,
              );
            }

            for (const repo of extraJson.data?.viewer?.repositories?.nodes ??
              []) {
              incrementForDate(
                activityByDate,
                repo.createdAt,
                fromDateOnly,
                toDateOnly,
              );
              incrementForDate(
                activityByDate,
                repo.pushedAt,
                fromDateOnly,
                toDateOnly,
              );
              incrementForDate(
                activityByDate,
                repo.updatedAt,
                fromDateOnly,
                toDateOnly,
              );
            }

            for (const edge of extraJson.data?.viewer?.starredRepositories
              ?.edges ?? []) {
              incrementForDate(
                activityByDate,
                edge.starredAt,
                fromDateOnly,
                toDateOnly,
              );
            }
          }
        } catch (error) {
          console.warn(
            "Extra activity query failed; continuing with base activity.",
            error,
          );
        }

        const denseDays: ContributionDay[] = dates.map((date) => ({
          date,
          contributionCount: activityByDate[date] ?? 0,
          color: "#ebedf0",
          contributionLevel: (calendarDays.find((day) => day.date === date)
            ?.contributionLevel ??
            "NONE") as ContributionDay["contributionLevel"],
        }));

        setContributions(denseDays);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };

    getGitHubContributionStats();
  }, [githubToken]);

  return { contributions };
};
