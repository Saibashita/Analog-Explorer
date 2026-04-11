import { TopicData } from "@/data/topics";

interface Props {
  diagram: TopicData["circuitDiagram"];
}

export function CircuitDiagramTab({ diagram }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-2">{diagram.svgLabel}</h3>
        <p className="text-sm text-muted-foreground mb-6">{diagram.description}</p>

        {/* Circuit Diagram Image */}
        {diagram.image && (
          <div className="mb-6 bg-white rounded-xl p-4 border border-border shadow-sm">
            <img
              src={`/${diagram.image}`}
              alt={diagram.svgLabel}
              className="w-full max-w-2xl mx-auto rounded-lg"
            />
          </div>
        )}

        {/* Component list */}
        <div className="bg-muted rounded-lg p-5">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Circuit Components</p>
          <div className="grid gap-2.5">
            {diagram.elements.map((el, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {i + 1}
                </div>
                <span className="text-sm text-foreground">{el}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

