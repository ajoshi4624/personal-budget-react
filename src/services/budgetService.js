import client from "../api/client";
import localBudget from "../data/budget.json";

function normalizeBudget(raw) {
  let data = raw;

  if (typeof data === "string") {
    try { data = JSON.parse(data); } catch { return null; }
  }

  if (data && Array.isArray(data.labels) && Array.isArray(data.values)) {
    return { labels: data.labels, values: data.values.map(Number) };
  }

  if (Array.isArray(data)) {
    const labels = data.map(r => r?.title ?? r?.name ?? r?.label ?? "");
    const values = data.map(r => Number(r?.budget ?? r?.value ?? r?.amount ?? 0));
    return { labels, values };
  }

  if (data && typeof data === "object") {
    const candidates = [];
    if (Array.isArray(data.myBudget)) candidates.push(data.myBudget);
    if (Array.isArray(data.budget)) candidates.push(data.budget);
    for (const k of Object.keys(data)) {
      if (Array.isArray(data[k])) candidates.push(data[k]);
    }
    for (const arr of candidates) {
      const labels = arr.map(r => r?.title ?? r?.name ?? r?.label ?? "");
      const values = arr.map(r => Number(r?.budget ?? r?.value ?? r?.amount ?? 0));
      if (labels.length && labels.length === values.length) return { labels, values };
    }
  }

  return null;
}

export async function getBudget() {
  try {
    const res = await client.get("/budget", { headers: { Accept: "application/json" } });
    const norm = normalizeBudget(res.data);
    if (norm) return norm;
    console.warn("Backend returned unexpected shape; using local JSON.");
  } catch (e) {
    console.warn("Backend call failed; using local JSON.", e?.message || e);
  }

  const normLocal = normalizeBudget(localBudget);
  if (normLocal) return normLocal;

  return { labels: ["No data"], values: [1] };
}
