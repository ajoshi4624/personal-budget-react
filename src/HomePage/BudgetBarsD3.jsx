import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getBudget } from "../services/budgetService";

const COLORS = [
  "#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236",
  "#166a8f", "#00a950", "#58595b", "#8549ba", "#ff9f40"
];

export default function BudgetBarsD3() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { labels, values } = await getBudget();

      const w = 560, h = 320, m = { top: 20, right: 20, bottom: 50, left: 50 };
      const svg = d3.select(ref.current)
        .attr("viewBox", `0 0 ${w} ${h}`)
        .attr("width", "100%")
        .attr("height", "auto");

      svg.selectAll("*").remove();

      const x = d3.scaleBand().domain(labels).range([m.left, w - m.right]).padding(0.2);
      const y = d3.scaleLinear().domain([0, d3.max(values) || 1]).nice()
        .range([h - m.bottom, m.top]);

      svg.append("g")
        .attr("transform", `translate(0,${h - m.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .selectAll("text")
        .attr("font-size", 12)
        .attr("transform", "rotate(-20)")
        .style("text-anchor", "end");

      svg.append("g")
        .attr("transform", `translate(${m.left},0)`)
        .call(d3.axisLeft(y));

      svg.append("g")
        .selectAll("rect")
        .data(values)
        .join("rect")
        .attr("x", (_, i) => x(labels[i]))
        .attr("y", (d) => y(d))
        .attr("width", x.bandwidth())
        .attr("height", (d) => y(0) - y(d))
        .attr("fill", (_, i) => COLORS[i % COLORS.length]); 

      setReady(true);
    })();
  }, []);

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto" }}>
      {!ready && <p>Loading bars…</p>}
      <svg ref={ref} />
    </div>
  );
}
