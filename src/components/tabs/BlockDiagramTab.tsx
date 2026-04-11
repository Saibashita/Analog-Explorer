import { TopicData } from "@/data/topics";

interface Props {
  diagram: TopicData["blockDiagram"];
}

export function BlockDiagramTab({ diagram }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-2">{diagram.svgLabel}</h3>
        <p className="text-sm text-muted-foreground mb-6">{diagram.description}</p>

        {/* SVG Block Diagram */}
        <div className="bg-muted rounded-lg p-4 overflow-x-auto">
          <svg
            viewBox={`0 0 ${Math.max(...diagram.blocks.map(b => b.x + b.w)) + 40} ${Math.max(...diagram.blocks.map(b => b.y + b.h)) + 40}`}
            className="w-full max-w-3xl mx-auto"
            style={{ minHeight: 200 }}
          >
            {/* Arrows */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" className="fill-primary" />
              </marker>
            </defs>
            {diagram.arrows.map((arrow, i) => {
              const from = diagram.blocks[arrow.from];
              const to = diagram.blocks[arrow.to];
              if (!from || !to) return null;
              const fx = from.x + from.w;
              const fy = from.y + from.h / 2;
              const tx = to.x;
              const ty = to.y + to.h / 2;
              return (
                <line
                  key={i}
                  x1={fx} y1={fy} x2={tx} y2={ty}
                  className="stroke-primary"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              );
            })}
            {/* Blocks */}
            {diagram.blocks.map((block, i) => (
              <g key={i}>
                <rect
                  x={block.x} y={block.y}
                  width={block.w} height={block.h}
                  rx="8" ry="8"
                  className="fill-card stroke-primary"
                  strokeWidth="2"
                />
                <text
                  x={block.x + block.w / 2}
                  y={block.y + block.h / 2 + 4}
                  textAnchor="middle"
                  className="fill-foreground text-xs font-medium"
                  style={{ fontSize: "11px" }}
                >
                  {block.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <p className="text-xs text-muted-foreground mt-3 italic">
          💡 This diagram is editable — modify the blocks array in topics.ts to change labels, positions, or connections.
        </p>
      </div>
    </div>
  );
}
