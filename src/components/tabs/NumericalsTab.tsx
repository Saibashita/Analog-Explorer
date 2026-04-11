import { useState } from "react";
import { NumericalProblem } from "@/data/topics";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

function NumericalCard({ problem }: { problem: NumericalProblem }) {
  const [showSolution, setShowSolution] = useState(false);

  const diffColor = {
    Easy: "bg-success/10 text-success",
    Medium: "bg-warning/10 text-warning",
    Hard: "bg-destructive/10 text-destructive",
  }[problem.difficulty];

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="font-semibold text-foreground text-sm">{problem.title}</h4>
        <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", diffColor)}>
          {problem.difficulty}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-muted-foreground">Given: </span>
          <span className="text-foreground">{problem.given}</span>
        </div>
        <div>
          <span className="font-medium text-muted-foreground">Formula: </span>
          <span className="font-mono text-foreground text-xs">{problem.formula}</span>
        </div>
      </div>

      <button
        onClick={() => setShowSolution(!showSolution)}
        className="flex items-center gap-1.5 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {showSolution ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        {showSolution ? "Hide Solution" : "Show Solution"}
      </button>

      {showSolution && (
        <div className="mt-3 bg-muted rounded-lg p-4 space-y-2 animate-fade-in">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Step-by-step:</p>
          {problem.steps.map((step, i) => (
            <div key={i} className="flex gap-2 text-sm text-foreground">
              <span className="text-primary font-bold text-xs mt-0.5">{i + 1}.</span>
              <span className="font-mono text-xs">{step}</span>
            </div>
          ))}
          <div className="mt-3 pt-3 border-t border-border">
            <span className="text-xs font-semibold text-muted-foreground">Answer: </span>
            <span className="font-semibold text-primary text-sm">{problem.answer}</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  numericals: NumericalProblem[];
}

export function NumericalsTab({ numericals }: Props) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        {numericals.length} numerical problems — click "Show Solution" to reveal step-by-step answers.
      </div>
      {numericals.map((problem) => (
        <NumericalCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
