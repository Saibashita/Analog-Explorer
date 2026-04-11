import { TopicData } from "@/data/topics";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  theory: TopicData["theory"];
}

function renderLatex(expression: string): string {
  try {
    return katex.renderToString(expression, {
      throwOnError: false,
      displayMode: true,
      trust: true,
    });
  } catch {
    return expression;
  }
}

export function TheoryTab({ theory }: Props) {
  return (
    <div className="space-y-6">
      {/* Key Points */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Key Points</h3>
        <ul className="space-y-3">
          {theory.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground/90 leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulas */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Important Formulas</h3>
        <div className="grid gap-3">
          {theory.formulas.map((f, i) => (
            <div key={i} className="bg-muted rounded-lg p-4 border border-border/50">
              <span className="text-xs font-medium text-primary uppercase tracking-wide">{f.label}</span>
              <div
                className="mt-2 text-foreground overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: renderLatex(f.expression) }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

