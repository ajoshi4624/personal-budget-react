import React from "react";
import BudgetChart from "./BudgetChart";
import BudgetBarsD3 from "./BudgetBarsD3";

function HomePage() {
  return (
    <main class="center" id="main">
      <section class="page-area">
        <article>
          <h2>Stay on track</h2>
          <p>
            Do you know where you are spending your money? If you really stop to
            track it, you might be surprised! Proper budget management depends
            on real data — and this app will help you with that!
          </p>
        </article>

        <article>
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ends? You’ll get an alert. The goal is
            to never go over budget.
          </p>
        </article>

        <article>
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster. They also tend to live happier lives because
            they spend without guilt or fear — everything is accounted for.
          </p>
        </article>

        <section>
          <p>Charts powered by Axios + Chart.js + D3.</p>
          <BudgetChart />
          <BudgetBarsD3 />
        </section>
      </section>
    </main>
  );
}

export default HomePage;
