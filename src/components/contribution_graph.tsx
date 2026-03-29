"use client";

import { useTheme } from "@/context/themeProvider";
import { useContributions } from "@/hooks/useContributions";
import type { ContributionDay, ContributionLevel } from "@/types/contribution";

const LIGHT_CONTRIBUTION_COLORS: Record<ContributionLevel, string> = {
  NONE: "#ebedf0",
  FIRST_QUARTILE: "#9be9a8",
  SECOND_QUARTILE: "#40c463",
  THIRD_QUARTILE: "#30a14e",
  FOURTH_QUARTILE: "#216e39",
};

const DARK_CONTRIBUTION_COLORS: Record<ContributionLevel, string> = {
  NONE: "#1b2533",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

interface DisplayContributionDay extends ContributionDay {
  displayLevel: ContributionLevel;
}

function getFixedLevel(contributionCount: number): ContributionLevel {
  if (contributionCount <= 0) {
    return "NONE";
  }
  if (contributionCount <= 2) {
    return "FIRST_QUARTILE";
  }
  if (contributionCount <= 4) {
    return "SECOND_QUARTILE";
  }
  if (contributionCount <= 6) {
    return "THIRD_QUARTILE";
  }
  return "FOURTH_QUARTILE";
}

export default function ContributionGraph() {
  const { isDarkMode } = useTheme();
  const { contributions } = useContributions();
  const palette = isDarkMode
    ? DARK_CONTRIBUTION_COLORS
    : LIGHT_CONTRIBUTION_COLORS;

  const days = contributions.slice(-182);

  const boostedDays: DisplayContributionDay[] = days.map((day) => {
    return {
      ...day,
      displayLevel: getFixedLevel(day.contributionCount),
    };
  });

  const weeks: DisplayContributionDay[][] = [];
  for (let i = 0; i < boostedDays.length; i += 7) {
    weeks.push(boostedDays.slice(i, i + 7));
  }

  return (
    <div className="flex flex-col">
      <div className="mb-2 space-y-0.5 text-center">
        <p className="text-xs uppercase tracking-[0.32em] leading-none text-muted">
          last 180 days
        </p>
        <h3 className="text-base font-medium leading-tight text-foreground sm:text-[1.5rem]">
          my github activity
        </h3>
      </div>

      <div
        className="rounded-2xl border border-border p-4 sm:p-6"
        style={{ backgroundColor: isDarkMode ? "#0d1117" : "transparent" }}
      >
        <div className="mb-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: palette.NONE }}
            />
            <span className="text-sm text-muted">Less</span>
          </div>

          <div className="flex items-center gap-1">
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: palette.FIRST_QUARTILE }}
            />
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: palette.SECOND_QUARTILE }}
            />
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: palette.THIRD_QUARTILE }}
            />
            <div
              className="h-4 w-4 rounded-sm"
              style={{ backgroundColor: palette.FOURTH_QUARTILE }}
            />
          </div>

          <span className="text-sm text-muted">More</span>
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="mx-auto flex w-max gap-1.5">
            {weeks.map((week) => {
              const weekStart = week[0]?.date ?? "unknown";
              const weekEnd = week[week.length - 1]?.date ?? weekStart;
              return (
                <div
                  key={`${weekStart}-${weekEnd}`}
                  className="flex flex-col gap-1.5"
                >
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className="h-4 w-4 rounded-sm"
                      style={{
                        backgroundColor: palette[day.displayLevel],
                      }}
                      title={day.date}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
