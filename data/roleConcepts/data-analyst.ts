import type { RoleConcepts } from './types'

// Data analyst concepts page (/data-analyst/concepts), built 11 Nov 2026.
// Worked examples were run, not typed: SQL in SQLite 3 (window functions), pandas 3.0.5, and
// the arithmetic in Python (scratch script logged in docs/briefs/2026-11-11-data-analyst-concepts.md).
// Primary sources opened 11 Nov 2026: PostgreSQL docs (joins, aggregates, window functions,
// comparison, WITH), Microsoft Learn (SELECT logical order, star schema, measures, CALCULATE,
// DirectQuery, visual types), Microsoft Support (VLOOKUP, XLOOKUP, PivotTable), NIST/SEMATECH
// e-Handbook (location, hypothesis tests, confidence intervals), ASA 2016 p-value statement,
// Evan Miller (A/B sample size), Stanford Encyclopedia of Philosophy (Simpson's paradox),
// pandas docs, Amplitude (North Star metric), Tableau help (FIXED LOD).
// Every name in the examples is fictional.

const PG = 'https://www.postgresql.org/docs/current'

const dataAnalystConcepts: RoleConcepts = {
  slug: 'data-analyst',
  metaTitle: 'Data Analyst Interview Concepts: 20 to Know (2026)',
  metaDescription:
    'The 20 concepts behind real data analyst interview questions: SQL joins, window functions, NULLs, DAX, A/B tests, p-values, metrics. Worked examples and a quiz.',
  h1: 'Data analyst interview concepts: the 20 ideas to know before the interview',
  kicker: 'Concepts · 20 ideas · Worked examples · Self-check quiz',
  directAnswer:
    'Before a data analyst interview, be able to explain 20 ideas out loud: SQL joins, query order, GROUP BY and HAVING, ranking and LAG/LEAD window functions, NULLs; Excel lookups and pivots; star schemas, DAX measures, Import vs DirectQuery and chart choice in BI; mean vs median, p-values, A/B test design and Simpson’s paradox in statistics; metrics, root-cause analysis and guesstimates; and pandas. Each one below has a one-line definition, a worked example with its real output, the trap interviewers probe, and the reported interview questions that test it.',
  lastUpdated: '2026-11-11',
  groups: [
    {
      id: 'sql',
      label: 'SQL',
      blurb:
        'Every loop on our data analyst page has a SQL round. These six ideas cover almost every SQL question reported there.',
    },
    {
      id: 'bi',
      label: 'Excel and BI',
      blurb:
        'Service firms (EY, Deloitte, eClerx) ask Excel and Power BI by name. Know what each feature is for, not just where the button is.',
    },
    {
      id: 'stats',
      label: 'Statistics and experiments',
      blurb:
        'Product companies (Uber, Meta, Swiggy) test whether you can tell a real effect from noise, and say so in plain words.',
    },
    {
      id: 'business',
      label: 'Metrics and business cases',
      blurb:
        'Case rounds test structure: define the metric, break it into parts, find which part moved.',
    },
    {
      id: 'python',
      label: 'Python',
      blurb: 'When Python comes up for analyst roles, it is pandas: load, join, clean.',
    },
  ],
  concepts: [
    /* ------------------------------ SQL ------------------------------ */
    {
      id: 'joins',
      short: 'Joins',
      group: 'sql',
      name: 'Joins: inner vs left, and why row counts change',
      definition:
        'A join combines rows from two tables on a key; an inner join keeps only rows that match on both sides, and a left join keeps every row of the left table and fills NULLs where the right table has no match.',
      listensFor:
        'That you predict the row count before you run the query: matches that repeat multiply rows, and missing matches either vanish (inner) or show as NULL (left).',
      example: {
        setup:
          'Four customers and five orders. Asha has two orders; Chitra and Dev have none; order 104 points at a customer who does not exist.',
        inputs: [
          {
            caption: 'customers',
            head: ['customer_id', 'name', 'city'],
            rows: [
              [1, 'Asha', 'Pune'],
              [2, 'Ben', 'Mumbai'],
              [3, 'Chitra', 'Pune'],
              [4, 'Dev', 'Delhi'],
            ],
          },
          {
            caption: 'orders',
            head: ['order_id', 'customer_id', 'amount'],
            rows: [
              [101, 1, 500],
              [102, 1, 300],
              [103, 2, 700],
              [104, 9, 250],
              [105, 'NULL', 400],
            ],
          },
        ],
        code: {
          lang: 'sql',
          text: 'SELECT c.name, o.order_id\nFROM customers c\nLEFT JOIN orders o\n  ON o.customer_id\n   = c.customer_id;',
        },
        result: {
          caption: 'LEFT JOIN: 5 rows (an INNER JOIN returns only the first 3)',
          head: ['name', 'order_id'],
          rows: [
            ['Asha', 101],
            ['Asha', 102],
            ['Ben', 103],
            ['Chitra', 'NULL'],
            ['Dev', 'NULL'],
          ],
        },
        takeaway:
          'Four customers became five rows because Asha matched twice. Orders 104 and 105 match no customer, so neither join returns them.',
      },
      trap: 'Filtering the right table in WHERE (WHERE o.amount > 0) after a LEFT JOIN removes the NULL rows and quietly turns it into an inner join: 3 rows, not 5. Put that condition in the ON clause to keep all customers. Asked about UNION too? UNION stacks rows and removes duplicates; UNION ALL keeps them and is faster; both need the same number of columns with compatible types.',
      fromSource: {
        quote:
          'When outputting a left-table row for which there is no right-table match, empty (null) values are substituted for the right-table columns.',
        source: { label: 'PostgreSQL docs: Joins Between Tables', url: `${PG}/tutorial-join.html` },
      },
      askedIn: [
        { group: 'sql', i: 0 },
        { group: 'sql', i: 1 },
        { group: 'sql', i: 4 },
        { group: 'sql', i: 7 },
        { group: 'sql', i: 8 },
        { group: 'sql', i: 10 },
        { group: 'guesstimates-python', i: 3 },
      ],
    },
    {
      id: 'query-order',
      short: 'Query order',
      group: 'sql',
      name: 'Query order: how SQL evaluates a query',
      definition:
        'SQL is written SELECT-first but evaluated FROM-first: the database builds the rows (FROM, JOIN), filters them (WHERE), groups them (GROUP BY), filters the groups (HAVING), and only then computes SELECT and sorts (ORDER BY).',
      listensFor:
        'Whether you can explain why an alias from SELECT cannot be used in WHERE, and why an aggregate belongs in HAVING.',
      example: {
        setup: 'This query fails in most databases, and the logical order explains why.',
        code: {
          lang: 'sql',
          text: 'SELECT amount * 0.18 AS gst\nFROM orders\nWHERE gst > 50;  -- error\n\n-- fix: repeat the expression\nSELECT amount * 0.18 AS gst\nFROM orders\nWHERE amount * 0.18 > 50;',
        },
        takeaway:
          'WHERE runs before SELECT, so the alias gst does not exist yet. ORDER BY runs after SELECT, so ORDER BY gst works. (Some engines, such as SQLite, accept the alias in WHERE anyway; MySQL does not. Do not rely on it.)',
      },
      trap: 'Saying the order is “SELECT, FROM, WHERE”. That is the order you write it, not the order it is evaluated.',
      fromSource: {
        quote:
          'This order determines when the objects defined in one step are made available to the clauses in subsequent steps.',
        source: {
          label: 'Microsoft Learn: SELECT (Transact-SQL), logical processing order',
          url: 'https://learn.microsoft.com/sql/t-sql/queries/select-transact-sql',
        },
      },
      askedIn: [{ group: 'sql', i: 3 }],
      visual: 'sql-order',
    },
    {
      id: 'group-having',
      short: 'GROUP BY and HAVING',
      group: 'sql',
      name: 'GROUP BY, aggregates, WHERE vs HAVING',
      definition:
        'GROUP BY turns many rows into one row per group so you can SUM, COUNT or AVG them; WHERE filters rows before grouping and HAVING filters the groups after.',
      listensFor:
        'That every non-aggregated column in SELECT is in GROUP BY, and that you pick WHERE or HAVING on purpose.',
      example: {
        setup:
          'Same customers and orders as above. Which cities have more than ₹600 in matched orders?',
        code: {
          lang: 'sql',
          text: 'SELECT c.city,\n       SUM(o.amount) AS total,\n       COUNT(*) AS orders\nFROM orders o\nJOIN customers c\n  ON c.customer_id\n   = o.customer_id\nGROUP BY c.city\nHAVING SUM(o.amount) > 600;',
        },
        result: {
          caption: 'Result',
          head: ['city', 'total', 'orders'],
          rows: [
            ['Mumbai', 700, 1],
            ['Pune', 800, 2],
          ],
        },
        takeaway:
          'Pune is two orders from one customer. If the question was “cities with more than one buyer”, you would need COUNT(DISTINCT c.customer_id), which is 1 here. The same pattern finds duplicates (GROUP BY the key, HAVING COUNT(*) > 1), and SUM(CASE WHEN n >= 2 THEN 1 ELSE 0 END) * 1.0 / COUNT(*) turns counts into a rate such as repeat rate.',
      },
      trap: 'Writing WHERE SUM(amount) > 600. Aggregates do not exist yet when WHERE runs, so the database rejects it.',
      fromSource: {
        quote:
          'WHERE selects input rows before groups and aggregates are computed … whereas HAVING selects group rows after groups and aggregates are computed.',
        source: { label: 'PostgreSQL docs: Aggregate Functions', url: `${PG}/tutorial-agg.html` },
      },
      askedIn: [
        { group: 'sql', i: 0 },
        { group: 'sql', i: 1 },
        { group: 'sql', i: 2 },
        { group: 'sql', i: 5 },
        { group: 'sql', i: 9 },
        { group: 'cases', i: 7 },
      ],
    },
    {
      id: 'ranking',
      short: 'Ranking functions',
      group: 'sql',
      name: 'Ranking window functions: ROW_NUMBER, RANK, DENSE_RANK',
      definition:
        'A window function computes a value for each row from a set of related rows without collapsing them; ROW_NUMBER numbers rows 1, 2, 3, RANK gives ties the same number and skips the next, and DENSE_RANK gives ties the same number without skipping.',
      listensFor:
        'That you ask how ties should be treated, and use PARTITION BY for “top N per group”.',
      example: {
        setup:
          'Five scores with a tie at 85. “Find the second-highest score” depends on the function you pick.',
        code: {
          lang: 'sql',
          text: 'SELECT name, score,\n  ROW_NUMBER() OVER w AS rn,\n  RANK()       OVER w AS rk,\n  DENSE_RANK() OVER w AS drk\nFROM scores\nWINDOW w AS\n  (ORDER BY score DESC);',
        },
        result: {
          caption: 'Result',
          head: ['name', 'score', 'rn', 'rk', 'drk'],
          rows: [
            ['Asha', 90, 1, 1, 1],
            ['Ben', 85, 2, 2, 2],
            ['Chitra', 85, 3, 2, 2],
            ['Dev', 80, 4, 4, 3],
            ['Esha', 75, 5, 5, 4],
          ],
        },
        takeaway:
          'DENSE_RANK = 2 returns both Ben and Chitra (85). ROW_NUMBER = 2 returns one of them arbitrarily (not guaranteed to be the same next run) unless you add a tie-breaker. RANK = 3 returns nobody.',
      },
      trap: 'Using ROW_NUMBER for “second-highest salary” without saying it drops ties, or filtering the rank in WHERE: window functions run in the SELECT step, so wrap them in a CTE or subquery and filter outside. For “top 3 per city”, forgetting PARTITION BY city ranks the whole table instead.',
      fromSource: {
        quote:
          'Returns the rank of the current row, without gaps; this function effectively counts peer groups.',
        source: {
          label: 'PostgreSQL docs: Window Functions (dense_rank)',
          url: `${PG}/functions-window.html`,
        },
      },
      askedIn: [
        { group: 'sql', i: 1 },
        { group: 'sql', i: 3 },
        { group: 'sql', i: 5 },
        { group: 'sql', i: 6 },
        { group: 'sql', i: 8 },
      ],
      visual: 'rank-compare',
    },
    {
      id: 'lag-rolling',
      short: 'LAG, LEAD, rolling',
      group: 'sql',
      name: 'LAG, LEAD and rolling windows',
      definition:
        'LAG reads a value from an earlier row and LEAD from a later row in the same window, and a frame such as ROWS BETWEEN 2 PRECEDING AND CURRENT ROW turns AVG into a rolling average.',
      listensFor:
        'Day-over-day change and moving averages written without a self-join, and a clear answer on what the first rows show.',
      example: {
        setup:
          'Five days of revenue (₹ thousand). Change versus the day before, and a 3-day rolling average.',
        code: {
          lang: 'sql',
          text: 'SELECT d, revenue,\n  revenue - LAG(revenue)\n    OVER (ORDER BY d) AS change,\n  AVG(revenue) OVER (\n    ORDER BY d\n    ROWS BETWEEN 2 PRECEDING\n    AND CURRENT ROW) AS avg_3d\nFROM daily;',
        },
        result: {
          caption: 'Result (avg rounded to 1 decimal)',
          head: ['d', 'revenue', 'change', 'avg_3d'],
          rows: [
            ['1 Nov', 100, 'NULL', '100.0'],
            ['2 Nov', 120, 20, '110.0'],
            ['3 Nov', 90, -30, '103.3'],
            ['4 Nov', 150, 60, '120.0'],
            ['5 Nov', 140, -10, '126.7'],
          ],
        },
        takeaway:
          'The first change is NULL because there is no earlier row. The first two averages cover fewer than 3 days; say whether you would show or hide them.',
      },
      trap: 'A rolling 7-day average over ROWS assumes one row per day. If some days have no sales, the window spans more than 7 calendar days; fill missing dates first or use a date range.',
      fromSource: {
        quote: 'If omitted, offset defaults to 1 and default to NULL.',
        source: {
          label: 'PostgreSQL docs: Window Functions (lag, lead)',
          url: `${PG}/functions-window.html`,
        },
      },
      askedIn: [
        { group: 'sql', i: 4 },
        { group: 'sql', i: 11 },
      ],
    },
    {
      id: 'nulls',
      short: 'NULLs',
      group: 'sql',
      name: 'NULLs: counts, averages and NOT IN',
      definition:
        'NULL means “unknown”, so comparisons with it are neither true nor false, aggregate functions skip it, and COUNT(*) counts rows while COUNT(column) counts only non-NULL values.',
      listensFor:
        'The edge cases: NULL keys in joins, averages that silently drop rows, and NOT IN returning nothing.',
      example: {
        setup: 'The orders table above has one NULL customer_id. Find customers with no orders.',
        code: {
          lang: 'sql',
          text: '-- returns 0 rows\nSELECT name FROM customers\nWHERE customer_id NOT IN (\n  SELECT customer_id\n  FROM orders);\n\n-- returns Chitra, Dev\nSELECT name FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id\n      = c.customer_id);',
        },
        result: {
          caption: 'Aggregates on the same orders table',
          head: ['COUNT(*)', 'COUNT(customer_id)', 'SUM(amount)', 'AVG(amount)'],
          rows: [[5, 4, 2150, 430]],
        },
        takeaway:
          'One NULL in the subquery makes NOT IN unknown for every row, so it returns nothing. NOT EXISTS (or a LEFT JOIN … WHERE o.order_id IS NULL) is safe.',
      },
      trap: 'Writing WHERE col = NULL. It never matches; use IS NULL. And AVG(bonus) over a column with NULLs averages only the filled rows, which may not be what the business means.',
      fromSource: {
        quote: 'Do not write expression = NULL because NULL is not “equal to” NULL.',
        source: {
          label: 'PostgreSQL docs: Comparison Functions and Operators',
          url: `${PG}/functions-comparison.html`,
        },
      },
      askedIn: [
        { group: 'sql', i: 7 },
        { group: 'sql', i: 10 },
        { group: 'guesstimates-python', i: 6 },
      ],
    },

    /* --------------------------- Excel and BI --------------------------- */
    {
      id: 'lookups',
      short: 'Lookups',
      group: 'bi',
      name: 'Lookups: VLOOKUP, INDEX-MATCH, XLOOKUP',
      definition:
        'A lookup finds a key in one column and returns the value from the same row in another column; VLOOKUP only looks to the right of the key column, INDEX-MATCH and XLOOKUP can look either way.',
      listensFor:
        'That you set exact match on purpose, know why VLOOKUP breaks when a column is inserted, and handle “not found”.',
      example: {
        setup: 'Fetch Ben’s marks from a sheet where names are in column A and marks in column C.',
        code: {
          lang: 'excel',
          text: '=VLOOKUP("Ben", A2:C6, 3, FALSE)\n=INDEX(C2:C6,\n  MATCH("Ben", A2:A6, 0))\n=XLOOKUP("Ben", A2:A6, C2:C6,\n         "Not found")',
        },
        takeaway:
          'All three return the same value. Only XLOOKUP needs no column number and no match-type flag, and it can return your own text instead of #N/A.',
      },
      trap: 'Leaving out VLOOKUP’s last argument. It defaults to approximate match, which on unsorted data can return a wrong row, with no error.',
      fromSource: {
        quote: 'VLOOKUP can only look from left-to-right.',
        source: {
          label: 'Microsoft Support: XLOOKUP function',
          url: 'https://support.microsoft.com/excel/functions/xlookup-function',
        },
      },
      askedIn: [
        { group: 'excel-bi', i: 0 },
        { group: 'excel-bi', i: 2 },
      ],
      visual: 'lookup-compare',
    },
    {
      id: 'pivots',
      short: 'Pivot tables',
      group: 'bi',
      name: 'Pivot tables',
      definition:
        'A pivot table summarises a flat table by putting one field in rows, another in columns and an aggregate (sum, count, average) in the cells, so you can compare groups without writing formulas.',
      listensFor:
        'That you clean the source first (one header row, no blanks, no merged cells), pick the right aggregate, and refresh after the data changes.',
      example: {
        setup: 'Five sales rows: region, product, sales (₹).',
        inputs: [
          {
            caption: 'sales',
            head: ['region', 'product', 'sales'],
            rows: [
              ['North', 'Pens', 120],
              ['North', 'Books', 300],
              ['South', 'Pens', 80],
              ['South', 'Pens', 100],
              ['South', 'Books', 200],
            ],
          },
        ],
        result: {
          caption: 'Pivot: Region in rows, Product in columns, Sum of sales',
          head: ['region', 'Books', 'Pens', 'Total'],
          rows: [
            ['North', 300, 120, 420],
            ['South', 200, 180, 380],
            ['Total', 500, 300, 800],
          ],
        },
        takeaway:
          'South has two Pens rows; the pivot adds them (80 + 100 = 180). Switch the value to Count and the same cell shows 2.',
      },
      trap: 'Adding rows below the source range: the pivot does not see them. Format the source as a Table (Ctrl+T) so the range grows, then Refresh.',
      askedIn: [
        { group: 'excel-bi', i: 1 },
        { group: 'excel-bi', i: 2 },
      ],
      learn: [
        {
          label: 'Microsoft Support: Create a PivotTable',
          href: 'https://support.microsoft.com/office/18fb0032-b01a-4c99-9a5f-7ab09edde05a',
        },
      ],
    },
    {
      id: 'star-schema',
      short: 'Star schema',
      group: 'bi',
      name: 'Data modelling: star schema, facts and dimensions',
      definition:
        'A star schema puts events (sales, clicks) in one fact table of keys and numbers, and the things you slice by (date, product, store) in dimension tables joined to it one-to-many.',
      listensFor:
        'That you can say which table is the fact, why one flat table or many-to-many links slow reports and give wrong totals, and that filters flow from dimension to fact.',
      example: {
        setup: 'A small retail model.',
        inputs: [
          {
            caption: 'fact_sales (one row per sale line)',
            head: ['date_key', 'product_key', 'store_key', 'qty', 'amount'],
            rows: [['20261101', 17, 3, 2, 3000]],
          },
          {
            caption: 'dim_product (one row per product)',
            head: ['product_key', 'name', 'category'],
            rows: [[17, 'Shoe A', 'Shoes']],
          },
        ],
        takeaway:
          'Pick Category from dim_product and Sum of amount from fact_sales: Power BI follows the one-to-many relationship from product_key to filter the fact rows.',
      },
      trap: 'Saying “I join everything into one big table”. It works for small files but repeats text in every row and makes measures harder; say when you would use a star instead.',
      fromSource: {
        quote:
          'A fact table contains dimension key columns that relate to dimension tables, and numeric measure columns.',
        source: {
          label: 'Microsoft Learn: Understand star schema for Power BI',
          url: 'https://learn.microsoft.com/power-bi/guidance/star-schema',
        },
      },
      askedIn: [
        { group: 'excel-bi', i: 8 },
        { group: 'excel-bi', i: 6 },
      ],
    },
    {
      id: 'measures',
      short: 'DAX measures',
      group: 'bi',
      name: 'DAX: measures vs calculated columns, CALCULATE and filter context',
      definition:
        'A calculated column is computed once per row and stored; a measure is computed at query time for whatever the visual is filtered to, and CALCULATE evaluates a measure under a changed set of filters.',
      listensFor:
        'That you choose a measure for anything that is summed or ratioed, explain filter context in one sentence, and know SUM vs SUMX.',
      example: {
        setup:
          'Four sale lines: Shoe A (2 × ₹1,500), Shoe B (1 × ₹2,000), Shirt (3 × ₹800), Cap (4 × ₹300).',
        code: {
          lang: 'dax',
          text: 'Total Sales = SUMX(Sales,\n  Sales[Qty] * Sales[Price])\n\nShoe Sales = CALCULATE(\n  [Total Sales],\n  Product[Category] = "Shoes")\n\nShoe Share = DIVIDE(\n  [Shoe Sales], [Total Sales])',
        },
        result: {
          caption: 'Measures in a card visual with no filters',
          head: ['Total Sales', 'Shoe Sales', 'Shoe Share'],
          rows: [['₹8,600', '₹5,000', '58.1%']],
        },
        takeaway:
          'SUMX multiplies row by row, then adds: ₹8,600. SUM(Qty) × SUM(Price) would give 10 × ₹4,600 = ₹46,000, which is meaningless.',
      },
      trap: 'Building Shoe Share as a calculated column. It is computed per row when data loads, so it cannot respond to the slicers on the page. In Tableau, the closest idea is a level of detail expression: FIXED computes at a grain you name and ignores ordinary dimension filters (context filters still apply).',
      fromSource: {
        quote: 'Evaluates an expression in a modified filter context.',
        source: {
          label: 'Microsoft Learn: CALCULATE function (DAX)',
          url: 'https://learn.microsoft.com/en-us/dax/calculate-function-dax',
        },
      },
      askedIn: [
        { group: 'excel-bi', i: 5 },
        { group: 'excel-bi', i: 9 },
        { group: 'excel-bi', i: 10 },
        { group: 'excel-bi', i: 11 },
      ],
      learn: [
        {
          label: 'Tableau help: FIXED level of detail expressions',
          href: 'https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields_lod_fixed.htm',
        },
      ],
    },
    {
      id: 'import-dq',
      short: 'Import vs DirectQuery',
      group: 'bi',
      name: 'Power BI Import vs DirectQuery',
      definition:
        'Import copies the data into Power BI’s in-memory model, which is fast but only as fresh as the last refresh; DirectQuery leaves the data in the source and queries it each time a visual loads.',
      listensFor:
        'A choice tied to the business need (freshness vs speed vs data size) and the limits that come with DirectQuery.',
      example: {
        setup: 'A sales dashboard that leaders open every morning, built on 2 years of orders.',
        takeaway:
          'Import, refreshed overnight, is the usual answer: yesterday’s data is fresh enough and visuals stay fast. Choose DirectQuery when the data must be current to the minute or is too large or too restricted to copy.',
      },
      trap: 'Saying DirectQuery is “always live so always better”. Every click becomes a query on the source, and Microsoft documents a one-million-row limit on intermediate results.',
      fromSource: {
        quote:
          'DirectQuery in Power BI lets you keep data in the source and query it at report time instead of importing it.',
        source: {
          label: 'Microsoft Learn: DirectQuery in Power BI',
          url: 'https://learn.microsoft.com/power-bi/connect-data/desktop-directquery-about',
        },
      },
      askedIn: [
        { group: 'excel-bi', i: 4 },
        { group: 'excel-bi', i: 6 },
      ],
      visual: 'import-dq',
    },
    {
      id: 'chart-choice',
      short: 'Chart choice',
      group: 'bi',
      name: 'Choosing the right chart',
      definition:
        'Pick the chart from the question: a line for change over time, bars for comparing categories, a scatter for a relationship between two numbers, a table when people need exact values.',
      listensFor:
        'That you start from the question and the audience, not the chart gallery, and that you can say what a stakeholder should see first.',
      example: {
        setup: 'Three questions a manager might ask about the same sales data.',
        takeaway:
          '“How did sales move this year?” → line. “Which region sold most?” → bars sorted largest first. “Do bigger discounts bring bigger orders?” → scatter. Say the takeaway in the chart title.',
      },
      trap: 'Pies with many slices, 3D effects, or a chart whose title says “Sales by region” instead of what the reader should notice.',
      fromSource: {
        quote:
          'Line charts emphasize the overall shape of values over time, making them ideal for showing trends and patterns.',
        source: {
          label: 'Microsoft Learn: Overview of visualizations in Power BI',
          url: 'https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview',
        },
      },
      askedIn: [
        { group: 'excel-bi', i: 7 },
        { group: 'behavioural', i: 0 },
      ],
      visual: 'chart-choice',
    },

    /* ------------------------ Statistics ------------------------ */
    {
      id: 'mean-median',
      short: 'Mean vs median',
      group: 'stats',
      name: 'Mean vs median, skew and outliers',
      definition:
        'The mean is the sum divided by the count; the median is the middle value once sorted, so one extreme value moves the mean a lot and the median hardly at all.',
      listensFor:
        'That you check the distribution before quoting an average, and say what you would do with an outlier (investigate first, then cap, exclude or report separately).',
      example: {
        setup: 'Nine fictional salaries in ₹ LPA: 4, 5, 5, 6, 6, 7, 7, 8 and one founder-level 60.',
        result: {
          caption: 'Computed',
          head: ['', 'All 9', 'Without the 60'],
          rows: [
            ['Mean', '12', '6'],
            ['Median', '6', '6'],
          ],
        },
        takeaway:
          'One value doubled the mean; the median did not move. That is why salary and order-value reports usually lead with the median.',
      },
      trap: 'Deleting outliers by reflex. An “outlier” order may be a bulk buyer worth a separate segment, or a data-entry error worth fixing at the source.',
      fromSource: {
        quote:
          'In general, for data with extreme values in the tails, the median provides a better estimate of location than does the mean.',
        source: {
          label: 'NIST/SEMATECH e-Handbook: Measures of Location',
          url: 'https://itl.nist.gov/div898/handbook/eda/section3/eda351.htm',
        },
      },
      askedIn: [{ group: 'guesstimates-python', i: 6 }],
      visual: 'skew',
    },
    {
      id: 'p-value',
      short: 'p-values and CIs',
      group: 'stats',
      name: 'Hypothesis tests: p-value, confidence interval, Type I and II errors',
      definition:
        'A p-value is the probability of seeing a result at least as extreme as yours if there were truly no effect; a confidence interval is the range of effect sizes consistent with the data; a Type I error is calling an effect real when it is not, and a Type II error is missing a real one.',
      listensFor:
        'Plain-English interpretation, the difference between “significant” and “large”, and naming the null hypothesis before any test.',
      example: {
        setup:
          'A test of a new checkout shows p = 0.03 and a 95% confidence interval of +0.4 to +3.2 percentage points in conversion.',
        takeaway:
          'p < 0.05 and the interval excludes 0, so at the usual 5% level you reject “no effect”. The true lift is plausibly anywhere from +0.4 to +3.2 points; whether +0.4 is worth shipping is a business call.',
      },
      trap: 'Saying “p = 0.03 means a 97% chance the new checkout is better.” That is not what a p-value measures.',
      fromSource: {
        quote:
          'P-values do not measure the probability that the studied hypothesis is true, or the probability that the data were produced by random chance alone.',
        source: {
          label: 'ASA statement on p-values (Wasserstein & Lazar, 2016)',
          url: 'https://www.stat.berkeley.edu/%7Ealdous/Real_World/ASA_statement.pdf',
        },
      },
      askedIn: [
        { group: 'stats', i: 2 },
        { group: 'stats', i: 3 },
      ],
      learn: [
        {
          label: 'NIST e-Handbook: What are confidence intervals?',
          href: 'https://itl.nist.gov/div898/handbook/prc/section1/prc14.htm',
        },
      ],
    },
    {
      id: 'ab-design',
      short: 'A/B test design',
      group: 'stats',
      name: 'A/B test design: metric, sample size, no peeking, guardrails',
      definition:
        'An A/B test randomly splits users between the current and new version, fixes one success metric and a sample size before starting, and also watches guardrail metrics that must not get worse.',
      listensFor:
        'The order: goal → primary metric → guardrails → sample size → run to the end → read the result → decide. And that you mention novelty effects and segments.',
      example: {
        setup:
          'Baseline conversion is 10% and you want to detect a 1-point absolute lift (10% → 11%) at 5% significance (two-sided) and 80% power, the settings behind the 16 in Evan Miller’s rule.',
        code: {
          lang: 'text',
          text: 'n per group ≈ 16 × σ² / δ²\nσ² = p(1 − p) = 0.10 × 0.90\n   = 0.09\nδ  = 0.01\nn  ≈ 16 × 0.09 / 0.0001\n   = 14,400 users per group',
        },
        takeaway:
          'About 28,800 users in total before you look at the answer. Halve the effect you want to detect and the sample needed goes up four times.',
      },
      trap: 'Checking the dashboard every day and stopping the first time it looks significant. Each peek is another chance of a false win.',
      fromSource: {
        quote: 'The more you peek, the more your significance levels will be off.',
        source: {
          label: 'Evan Miller: How Not To Run an A/B Test (2010)',
          url: 'https://www.evanmiller.org/how-not-to-run-an-ab-test.html',
        },
      },
      askedIn: [
        { group: 'stats', i: 0 },
        { group: 'stats', i: 1 },
        { group: 'cases', i: 6 },
      ],
    },
    {
      id: 'simpson',
      short: 'Simpson’s paradox',
      group: 'stats',
      name: 'Correlation vs causation, and Simpson’s paradox',
      definition:
        'Two numbers moving together does not show that one causes the other; a third factor (a confounder) can drive both, and an overall trend can even reverse inside every segment once you split the data.',
      listensFor:
        'That you segment before concluding, name a likely confounder, and propose a test or natural experiment to check causation.',
      example: {
        setup:
          'Two app versions, 1,000 users each (fictional). B converts better on mobile and on desktop, yet worse overall.',
        result: {
          caption: 'Conversions / users',
          head: ['Segment', 'Version A', 'Version B'],
          rows: [
            ['Mobile', '5.0% (20/400)', '5.6% (45/800)'],
            ['Desktop', '15.0% (90/600)', '17.5% (35/200)'],
            ['Overall', '11.0% (110/1,000)', '8.0% (80/1,000)'],
          ],
        },
        takeaway:
          'B got mostly mobile users, who convert less everywhere. The device mix, not the version, drives the overall gap. In a properly randomised test the mix should be near-identical, so a 40% vs 80% mobile split is itself a red flag: check assignment before reading results.',
      },
      trap: 'Reporting only the overall number when the groups differ in mix. Always ask “is the mix the same in both groups?”',
      fromSource: {
        quote:
          'Simpson’s Paradox is a statistical phenomenon where an association between two variables in a population emerges, disappears or reverses when the population is divided …',
        source: {
          label: 'Stanford Encyclopedia of Philosophy: Simpson’s Paradox',
          url: 'https://plato.stanford.edu/archives/sum2026/entries/paradox-simpson/',
        },
      },
      askedIn: [
        { group: 'stats', i: 4 },
        { group: 'stats', i: 1 },
        { group: 'behavioural', i: 1 },
      ],
      visual: 'simpson',
    },

    /* ------------------------ Business ------------------------ */
    {
      id: 'metrics',
      short: 'Metrics and funnels',
      group: 'business',
      name: 'Metrics: north star, funnel, guardrails',
      definition:
        'A north star metric is the one number that best shows customers getting value; input metrics (often funnel steps) explain what moves it, and guardrail metrics catch damage elsewhere.',
      listensFor:
        'A metric with a clear definition (who, what, time window), the funnel that drives it, and one guardrail.',
      example: {
        setup: 'A fictional subscription app’s funnel last month.',
        result: {
          caption: 'Step-to-step conversion',
          head: ['Step', 'Users', 'From previous'],
          rows: [
            ['Visited', '10,000', '—'],
            ['Signed up', '1,200', '12%'],
            ['Activated', '600', '50%'],
            ['Paid', '150', '25%'],
          ],
        },
        takeaway:
          'End to end, 1.5% of visitors pay. Every funnel loses the most people at the top, so compare each step with a benchmark or last month before picking where to dig: the 25% activated-to-paid step may be the real problem.',
      },
      trap: 'Picking a vanity metric (page views, downloads) as the north star, or a metric with no time window (“active users” without saying daily, weekly or monthly).',
      fromSource: {
        quote:
          'Your North Star Metric should be the key measure of success for your company’s product team.',
        source: {
          label: 'Amplitude: Every Product Needs a North Star Metric',
          url: 'https://amplitude.com/blog/product-north-star-metric',
        },
      },
      askedIn: [
        { group: 'cases', i: 1 },
        { group: 'cases', i: 4 },
        { group: 'cases', i: 5 },
        { group: 'cases', i: 6 },
      ],
      visual: 'funnel',
    },
    {
      id: 'root-cause',
      short: 'Root-cause analysis',
      group: 'business',
      name: 'Root-cause analysis of a metric drop',
      definition:
        'Root-cause analysis checks that the drop is real, then breaks the metric into its parts (users × frequency × value), finds which part moved, and segments that part until one explanation fits the data.',
      listensFor:
        'Clarifying questions first, a decomposition you can say out loud, internal vs external causes, and one check that would prove you wrong.',
      example: {
        setup:
          'Fictional: “Revenue fell 20% in December vs November.” Revenue = buyers × orders per buyer × average order value.',
        result: {
          caption: 'Decompose before you guess',
          head: ['Part', 'November', 'December', 'Change'],
          rows: [
            ['Buyers', '50,000', '50,000', '0%'],
            ['Orders per buyer', '2.0', '2.0', '0%'],
            ['Avg order value', '₹500', '₹400', '−20%'],
            ['Revenue', '₹5.0 Cr', '₹4.0 Cr', '−20%'],
          ],
        },
        takeaway:
          'People bought as often, but spent less per order. Next, split order value by category: a November festive sale on high-price items ending would explain it.',
      },
      trap: 'Listing ten possible causes without a structure, or skipping the first check: did tracking, the definition or a data pipeline change?',
      askedIn: [
        { group: 'cases', i: 0 },
        { group: 'cases', i: 2 },
        { group: 'cases', i: 3 },
        { group: 'cases', i: 4 },
        { group: 'behavioural', i: 1 },
      ],
    },
    {
      id: 'guesstimates',
      short: 'Guesstimates',
      group: 'business',
      name: 'Guesstimates: structure over the exact number',
      definition:
        'A guesstimate is an estimate built from a formula of stated assumptions, so the interviewer can follow and challenge each step rather than judge the final number.',
      listensFor:
        'A formula stated up front, round numbers, assumptions said out loud, units kept straight, and a sanity check at the end.',
      example: {
        setup:
          'How much paint for a 10 × 10 × 10 m room? (The assumptions are labelled; change any of them.)',
        code: {
          lang: 'text',
          text: '4 walls: 4 × 10 × 10 = 400 m²\nCeiling: 10 × 10      = 100 m²\nAssume door + windows = −10 m²\nArea to paint         = 490 m²\nTwo coats             = 980 m²\nAssume 10 m² per litre\n(read the tin)\nPaint ≈ 98 litres ≈ 100 L',
        },
        takeaway:
          'The interviewer cares that you asked “floor too?” and “how many coats?”, not whether 98 is right.',
      },
      trap: 'Saying a number with no formula, or using false precision (98.3 litres) from assumptions that are rounded.',
      askedIn: [
        { group: 'guesstimates-python', i: 0 },
        { group: 'guesstimates-python', i: 1 },
        { group: 'guesstimates-python', i: 2 },
      ],
    },

    /* ------------------------ Python ------------------------ */
    {
      id: 'pandas',
      short: 'pandas',
      group: 'python',
      name: 'pandas: DataFrames, merge and missing values',
      definition:
        'A pandas DataFrame is a table in Python with named columns; merge joins two DataFrames like SQL, and dropna or fillna deal with missing values.',
      listensFor:
        'That you check row counts after a merge, choose drop vs fill for a reason, and can write the code without looking it up.',
      example: {
        setup: 'Three customers; four orders (one with no amount, one for an unknown customer 4).',
        code: {
          lang: 'python',
          text: 'm = customers.merge(\n    orders, on="customer_id",\n    how="left")\nlen(m)           # 4\nlen(m.dropna())  # 2',
        },
        result: {
          caption: 'm (left merge)',
          head: ['customer_id', 'name', 'amount'],
          rows: [
            [1, 'Asha', 500],
            [1, 'Asha', 300],
            [2, 'Ben', 'NaN'],
            [3, 'Chitra', 'NaN'],
          ],
        },
        takeaway:
          'dropna removed Ben (an order with no amount) and Chitra (no order at all). Those are different problems; dropping both hides that Chitra never bought.',
      },
      trap: 'Calling dropna on the whole table by default. Decide per column: fill a missing amount with 0 only if it truly means zero.',
      fromSource: {
        quote: 'Merge DataFrame or named Series objects with a database-style join.',
        source: {
          label: 'pandas docs: pandas.merge',
          url: 'https://pandas.pydata.org/docs/reference/api/pandas.merge.html',
        },
      },
      askedIn: [
        { group: 'guesstimates-python', i: 4 },
        { group: 'guesstimates-python', i: 5 },
        { group: 'guesstimates-python', i: 6 },
      ],
      learn: [
        {
          label: 'Learn AI: AI for data analysis (and how to check its numbers)',
          href: '/learn-ai/ai-for-data-analysis',
        },
      ],
    },
  ],
  quiz: [
    {
      q: 'customers has 4 rows. One customer has 2 orders, one has 1, two have none. How many rows does customers LEFT JOIN orders return?',
      options: ['3', '4', '5', '7'],
      answer: 2,
      why: '2 + 1 rows for the buyers, plus 1 NULL-filled row each for the two customers with no orders = 5.',
      concept: 'joins',
    },
    {
      q: 'Which clause can filter on SUM(amount)?',
      options: ['WHERE', 'HAVING', 'ON', 'FROM'],
      answer: 1,
      why: 'HAVING runs after GROUP BY, when the aggregate exists. WHERE runs before grouping.',
      concept: 'group-having',
    },
    {
      q: 'Scores are 90, 85, 85, 80. What does DENSE_RANK give the 80?',
      options: ['2', '3', '4', '5'],
      answer: 1,
      why: 'DENSE_RANK has no gaps: 90 → 1, both 85s → 2, 80 → 3. RANK would give 4.',
      concept: 'ranking',
    },
    {
      q: 'The subquery in WHERE id NOT IN (SELECT customer_id FROM orders) includes one NULL among the IDs. What happens?',
      options: [
        'The NULL is ignored',
        'The query returns no rows',
        'The query errors',
        'Only NULL rows return',
      ],
      answer: 1,
      why: 'Comparing with NULL is unknown, so NOT IN is never true. Use NOT EXISTS.',
      concept: 'nulls',
    },
    {
      q: 'Which runs first in SQL’s logical order?',
      options: ['SELECT', 'ORDER BY', 'WHERE', 'HAVING'],
      answer: 2,
      why: 'FROM/JOIN, then WHERE, GROUP BY, HAVING, SELECT, ORDER BY.',
      concept: 'query-order',
    },
    {
      q: 'You leave out VLOOKUP’s last argument. What match does it use?',
      options: ['Exact', 'Approximate', 'Wildcard', 'It errors'],
      answer: 1,
      why: 'It defaults to TRUE (approximate), which can return a wrong row silently. XLOOKUP defaults to exact.',
      concept: 'lookups',
    },
    {
      q: 'You need a “% of total” that changes with the slicers on a Power BI page. What do you build?',
      options: ['A calculated column', 'A measure', 'A new table', 'A Power Query step'],
      answer: 1,
      why: 'Measures are evaluated in the current filter context; calculated columns are fixed when data loads.',
      concept: 'measures',
    },
    {
      q: 'Nine salaries: eight between ₹4 and ₹8 LPA and one at ₹60 LPA. Which figure best describes a typical person?',
      options: ['Mean', 'Median', 'Maximum', 'Mode'],
      answer: 1,
      why: 'The ₹60 LPA value drags the mean to ₹12 LPA; the median stays at ₹6 LPA.',
      concept: 'mean-median',
    },
    {
      q: 'A test gives p = 0.03. Which statement is correct?',
      options: [
        'There is a 97% chance B is better',
        'The effect is large',
        'Data this extreme would be unlikely if there were no effect',
        'There is a 3% chance B is better',
      ],
      answer: 2,
      why: 'A p-value describes the data under the null hypothesis. It is not the probability the hypothesis is true, and not the effect size.',
      concept: 'p-value',
    },
    {
      q: 'Baseline conversion 10%. You want to detect +1 point. Roughly how many users per group (16 × p(1−p) / δ²)?',
      options: ['1,440', '14,400', '144,000', '900'],
      answer: 1,
      why: '16 × 0.09 / 0.0001 = 14,400 per group, about 28,800 in total.',
      concept: 'ab-design',
    },
    {
      q: 'Version B wins on mobile and on desktop but loses overall. The most likely reason?',
      options: [
        'A bug in the overall number',
        'B got a different mix of mobile and desktop users',
        'The test was too short',
        'Desktop users dislike B',
      ],
      answer: 1,
      why: 'Simpson’s paradox: the segment mix differs, so the overall comparison is confounded.',
      concept: 'simpson',
    },
    {
      q: 'Revenue fell 20%. What is the first thing to check?',
      options: [
        'Competitor prices',
        'Whether tracking or the metric definition changed',
        'Seasonality in last year’s data',
        'Customer complaints',
      ],
      answer: 1,
      why: 'Make sure the drop is real before explaining it. Then decompose: buyers × orders per buyer × order value.',
      concept: 'root-cause',
    },
  ],
  faqs: [
    {
      q: 'What concepts should I learn before a data analyst interview?',
      a: 'SQL first (joins, GROUP BY and HAVING, window functions, NULL handling, query order), then Excel and BI (lookups, pivots, star schema, DAX measures), basic statistics (mean vs median, p-values, A/B tests, correlation vs causation) and how to break down a metric. Every loop on our data analyst page includes a SQL round.',
    },
    {
      q: 'Which SQL concepts are asked most in data analyst interviews?',
      a: 'Of the 50 questions on our data analyst page, joins come up most (7 questions), then GROUP BY with HAVING (6) and ranking window functions such as ROW_NUMBER, RANK and DENSE_RANK (5). Expect edge cases: ties, NULLs and duplicate rows created by joins.',
    },
    {
      q: 'How much statistics does a data analyst need for interviews?',
      a: 'Enough to explain a p-value and a confidence interval in plain words, design a simple A/B test (metric, sample size, run to the end), prefer the median for skewed data, and spot confounding. Product companies probe this more than service firms.',
    },
    {
      q: 'Is Power BI or Tableau asked in data analyst interviews?',
      a: 'Often, when the job post names it. EY and Deloitte candidates reported Power BI questions on Import vs DirectQuery, SUM vs SUMX, measures vs calculated columns and data modelling. Learn one tool well and the concepts carry over.',
    },
    {
      q: 'How do I practise these concepts?',
      a: 'Take the 12-question quiz on this page, then answer the linked interview questions out loud before reading the model answers on our data analyst page, and do a free AI mock interview to practise explaining them.',
    },
  ],
}

export default dataAnalystConcepts
