"use client";

import mermaid from "mermaid";
import { useEffect, useMemo, useRef, useState } from "react";

interface MermaidChartProps {
  chart: string;
  className?: string;
}

export default function MermaidChart({ chart, className }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const chartId = useMemo(
    () => `mermaid-${Math.random().toString(36).slice(2, 10)}`,
    [],
  );

  useEffect(() => {
    let isMounted = true;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "dark",
    });

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(chartId, chart);

        if (!isMounted || !containerRef.current) {
          return;
        }

        containerRef.current.innerHTML = svg;
        setError(false);
      } catch {
        if (isMounted) {
          setError(true);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart, chartId]);

  if (error) {
    return (
      <pre
        className={`overflow-x-auto rounded-md border border-border/70 bg-surface/30 p-3 text-xs text-muted ${className ?? ""}`}
      >
        <code>{chart}</code>
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`[&>svg]:h-auto [&>svg]:w-full ${className ?? ""}`}
    />
  );
}
