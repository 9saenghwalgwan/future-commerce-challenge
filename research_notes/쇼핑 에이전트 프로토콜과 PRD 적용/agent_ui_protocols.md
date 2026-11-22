# Agent-to-User UI Protocols, Generative UI, and Evidence/Trust Patterns for Shopping Agents (status as of 2026-11-22)

Research conducted 2026-11-22. Each claim carries its source date where known. Labels used: **[Verified]** = read on the primary source page; **[Secondary]** = from a search-result summary or a third-party article, not confirmed on the primary page; **[Inference]** = my own reasoning, not a sourced fact.

---

## Q1. A2UI (Google Agent-to-User Interface): spec model, versions, adopters

### Takeaway
A2UI is a declarative, "data not code" UI protocol: the agent emits JSON that describes components chosen from a client-approved catalog, and native renderers (Lit, Angular, React, Flutter, SwiftUI) draw them. No agent-supplied code runs. v0.9 (2026-04-17) is the stable line, and v1.0 was at release-candidate stage by late 2026. Adoption is mostly in agent frameworks and dev tooling (CopilotKit/AG-UI, AG2, Oracle Agent Spec, Vercel proof of concept). I found no consumer commerce product publicly built on it.

### Cited Findings
- **Core model [Verified]:** The README says "A2UI expresses UI using data, not code". Exchanged data is validated against a schema that "enforces strict capability boundaries for the agent". Its listed guardrails are "validating inputs and outputs against a schema" and "disallowing arbitrary executable code". A widget **catalog** defines the components an agent may compose. A framework-agnostic core builds an in-memory UI plus data model, and framework adapters map that model to native widgets. Progressive rendering (streaming) is supported. — [A2UI README, GitHub](https://github.com/google/A2UI/blob/main/README.md) (fetched 2026-11-22)
- **Renderers and catalogs [Verified]:** Web renderers are Lit, Angular and React. Mobile/desktop renderers are Flutter (`a2ui_flutter`) and SwiftUI (`A2UISwiftUI`). Shared packages are `@a2ui/web_core` and `@a2ui/markdown-it`. There is an MCP catalog (`@a2ui/catalog-mcp`) and a VegaChart catalog (`@a2ui/catalog-vegachart`, not yet published). The spec link points to a `v1.0` path, and the roadmap shows "Protocol v1.1" as gathering requirements. — [A2UI README](https://github.com/google/A2UI/blob/main/README.md)
- **Version status [Secondary]:** The current production release is v0.9.1, v1.0 is a release candidate (with a v0.9.1→v1.0 migration guide), and v0.8 is legacy. v0.8 dates to December 2025. — search summary of [A2UI README](https://github.com/google/A2UI/blob/main/README.md) and [InfoQ, Jul 2026](https://www.infoq.com/news/2026/07/google-a2ui-genui/). The README I fetched did not state version status explicitly, so treat the RC label as secondary.
- **v0.9 release, 2026-04-17 [Verified]:**
  - The optional component set was renamed from "Standard" to "Basic" so teams can bring their own design system.
  - New: a shared web-core library, an official React renderer, and a Python Agent SDK (`pip install a2ui-agent-sdk`; Go and Kotlin "coming soon").
  - **Client-defined functions** (described as "perfect for validation") and client-to-server data sync.
  - **Version negotiation, dynamic catalogs** that switch at runtime to match "user permissions or device constraints", and resilient streaming that heals partial LLM JSON so UI can render before generation finishes.
  - Transports: "A2UI over MCP, Websockets, REST, AG UI, A2A".
  - Source: [Google Developers Blog, 2026-04-17](https://developers.googleblog.com/a2ui-v0-9-generative-ui/)
- **Adopters named by Google [Verified]:**
  - AG2 has a native A2UIAgent.
  - Vercel's json-renderer supports A2UI as a proof of concept.
  - Oracle shipped Agent Spec support for A2UI, AG-UI and CopilotKit. Oracle's framing: "Agent Spec defines what runs, AG‑UI carries the interaction, and A2UI defines what the user touches."
  - AG-UI supports A2UI alongside MCP Apps and Open Generative UI.
  - CopilotKit offers a starter (`npx copilotkit@latest create my-app --framework a2ui`).
  - Showcase apps: GenUI Personal Health Companion; Life Goal Simulator (Very Good Ventures, Gemini plus the Flutter GenUI SDK).
  - "Better MCP Apps integration" is on the roadmap.
  - The post makes **no commerce/shopping claims**.
  - Source: [Google Developers Blog, 2026-04-17](https://developers.googleblog.com/a2ui-v0-9-generative-ui/)
- **CopilotKit's description [Secondary]:** A2UI lets agents describe UI (forms, tables, multi-step flows) as structured JSONL that CopilotKit renders in the host app. — [CopilotKit blog on A2UI v0.9](https://www.copilotkit.ai/blog/a2ui-whats-new-in-google-generative-ui-spec)

### Inferences
- [Inference] A2UI fits a **product-adaptive artifact** idea well. The team can define its own catalog (e.g., `ConnectionDiagram`, `FitComparison`, `PlacementMap`, `RouteMap`, `PriceBreakdownTable`, `EvidenceList`), and the agent picks and fills components per product category. Because the agent can only use catalog components, the UI stays safe and on-brand. "Dynamic catalogs" map naturally to "different artifact sets per product type."
- [Inference] The "client-defined functions for validation" feature is a natural home for deterministic price arithmetic. Totals can be recomputed on the client instead of trusting LLM-generated numbers.

### Gaps
- I could not confirm on a primary page the exact date v1.0 entered RC, or whether v1.0 went final before 2026-11-22.
- I found no public list of production consumer apps (Google or third-party) shipping A2UI, and no confirmation that Gemini app or AI Mode use A2UI internally.

---

## Q2. MCP Apps and OpenAI Apps SDK (and other generative-UI approaches): delivery, sandboxing, hosts, commerce use

### Takeaway
MCP Apps (SEP-1865, official MCP extension since 2026-01-26) standardizes the iframe approach pioneered by MCP-UI and the OpenAI Apps SDK. A tool links to a `ui://` HTML resource (`text/html;profile=mcp-app`). The host renders it in a sandboxed iframe with CSP derived from declared domains. UI↔host talk is auditable JSON-RPC over `postMessage`, and the host can require user approval for UI-initiated tool calls. Hosts include Claude (web/desktop), ChatGPT, VS Code/GitHub Copilot, Goose and others. In commerce, Shopify pioneered MCP-UI commerce widgets, and OpenAI pivoted from in-chat Instant Checkout to discovery plus merchant-owned checkout (2026-03-24).

### Cited Findings
**MCP Apps: spec and timeline**
- **Timeline [Verified]:** Proposed 2025-11-21 ([MCP blog](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/)). Announced as "the first official MCP extension" on 2026-01-26: "tools can now return interactive UI components" ([MCP blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)).
- **Delivery [Verified]:** A tool declares `_meta.ui.resourceUri`. The resource uses the `ui://` scheme and is bundled HTML/JS served by the MCP server, and the host "renders it in a sandboxed iframe." MCP Apps "builds on" MCP-UI and the OpenAI Apps SDK, which "pioneered the patterns". MCP-UI remains maintained. — [MCP blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
- **Spec details [Verified]:**
  - MIME type "MUST be `text/html;profile=mcp-app`".
  - CSP is declared in `_meta.ui.csp`: `connectDomains` (empty = "no external connections (secure default)"), `resourceDomains`, `frameDomains` (nested iframes blocked if omitted) and `baseUriDomains`. "Host MUST block connections to undeclared domains."
  - Web hosts "MUST wrap the View and communicate with it through an intermediate Sandbox proxy" on a different origin.
  - Messages include `ui/initialize`, `ui/notifications/tool-input`, `ui/notifications/tool-result`, `tools/call`, `ui/message` (adds content to the conversation), `ui/update-model-context` ("Each request overwrites the previous context") and `ui/open-link`.
  - Display modes are `inline`, `fullscreen` and `pip`.
  - Tool visibility is `["model","app"]`. App-only tools are hidden from the model, and hosts must reject app calls to tools without `"app"`.
  - Host context passes `theme`, `locale`, `timeZone`, `displayMode` and container dimensions.
  - Security guidance: hosts should log view-initiated RPC, review/hash/sign resources, and "clearly mark sandbox boundaries". The spec names social engineering via misleading UI as a residual risk.
  - Source: [ext-apps spec 2026-01-26](https://raw.githubusercontent.com/modelcontextprotocol/ext-apps/main/specification/2026-01-26/apps.mdx)
- **Security model summary [Verified]:** Sandboxed iframes; hosts can pre-review HTML; "all UI-to-host messages use loggable JSON-RPC"; "hosts can require explicit user approval for tool calls initiated by the UI." — [MCP blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
- **Use cases named by MCP [Verified]:** Dashboards with filter/drill-down, configuration wizards whose fields depend on earlier choices, document review with approve/flag, and real-time monitoring. — [MCP blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)

**MCP Apps: hosts and adoption**
- **Hosts at launch [Verified]:** Claude (web and desktop), Goose, VS Code Insiders, and ChatGPT "starting the week of the announcement". JetBrains and AWS were exploring support, and Google's Antigravity team said it would explore it. — [MCP blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
- **Later host lists [Secondary, conflicting]:**
  - One list: Claude, Claude Desktop, VS Code GitHub Copilot, Microsoft 365 Copilot, ChatGPT, Cursor, Goose, Postman, MCPJam, Archestra.AI and PostHog Code.
  - Another (citing the official site on 2026-09-14) lists 8 hosts without ChatGPT.
  - One source says OpenAI's changelog states ChatGPT has been "fully compatible with the MCP Apps spec" since 2026-02-22.
  - Official SDK `@modelcontextprotocol/ext-apps` v2.0.0 dated 2026-09-08.
  - Sources: [mcp.so guide](https://mcp.so/blog/mcp-apps-guide), [ecorpit guide](https://ecorpit.com/mcp-apps-server-rendered-ui-extension-build-guide-2026/). Not verified on primary pages.
- **Gemini/Google as an MCP Apps host [Gap]:** I found no confirmation that the Gemini app renders MCP Apps as of Nov 2026. Only "explore" statements exist (above).

**OpenAI Apps SDK**
- **Status in Nov 2026 [Verified, partial]:** `developers.openai.com/apps-sdk` now serves a "Plugins" documentation index: "Build and publish plugins with skills, MCP servers, and optional UI". Its UI guide says "Return optional UI resources from selected MCP tools". The index has a "Reference for the legacy window.openai APIs", a ChatGPT Directory with review requirements, and a "Checkout API reference… Implement checkout from optional plugin UI". — [OpenAI developer docs index](https://developers.openai.com/apps-sdk) (fetched 2026-11-22)
- [Inference] This suggests that by late 2026 OpenAI's apps were folded into "plugins" built on MCP plus optional UI. The proprietary `window.openai` bridge is marked legacy, which is consistent with convergence on MCP Apps. The original Apps SDK launch (DevDay, October 2025) comes from my background knowledge and was not re-verified in this session.

**OpenAI commerce in ChatGPT**
- **Commerce pivot [Secondary, from search summaries of the OpenAI post]:** On 2026-03-24 OpenAI published "Powering product discovery in ChatGPT". It extended the Agentic Commerce Protocol (ACP) to discovery (merchant feeds and promotions) and said the first Instant Checkout "did not offer the level of flexibility" wanted, so merchants now use their own checkout. Retailers integrating ACP for discovery: Target, Sephora, Nordstrom, Lowe's, Best Buy, The Home Depot, Wayfair. Shopify merchants are covered via Shopify Catalog. **Walmart launched an in-ChatGPT app** that moves users into a Walmart environment for account linking, loyalty and payments. — [OpenAI, 2026-03-24](https://openai.com/index/powering-product-discovery-in-chatgpt/) (search summary; full page not fetched)
- **ACP status and Instant Checkout uptake [Secondary]:** ACP is "maintained by OpenAI and Stripe and is currently in beta", with latest stable version 2026-04-17. Reports say only about 30 (or about a dozen) Shopify merchants were live on Instant Checkout before the reset. — [swell.is](https://www.swell.is/content/agentic-commerce-protocol-explained), [eseospace](https://eseospace.com/blog/what-happened-to-chatgpt-instant-checkout/). These are low-to-medium reliability sources.

**Shopify (commerce precedent for UI-in-agent)**
- **MCP-UI commerce widgets (Aug 2025) [Secondary]:** Shopify published an open MCP-UI approach in which agents render interactive commerce components (search, product, cart, checkout) via Storefront Web Components. Components use "intent-based messaging" so the agent stays in control. — [Shopify Engineering](https://shopify.engineering/mcp-ui-breaking-the-text-wall), [The New Stack](https://thenewstack.io/how-mcp-ui-powers-shopifys-new-commerce-widgets-in-agents/)
- **Checkout handoff [Secondary]:** Shopify Checkout MCP/WebMCP exposes `get_checkout` and `complete_checkout`, the latter described as "Submit checkout after buyer confirmation". Most agents receive a `continue_url` and hand the buyer to the real Shopify checkout. — search summary of [shopify.dev agents docs](https://www.shopify.dev/docs/agents), [shopify.dev UCP](https://shopify.dev/docs/ucp)

**Other generative-UI approaches**
- **Google Gemini generative UI [Verified via search summary of Google Research post]:** On 2025-11-18 Google Research launched "dynamic view" (Gemini designs and **codes** a fully custom interactive response per prompt) and "visual layout" as Gemini app experiments. The same research powers generative UI in AI Mode for Google AI Pro/Ultra subscribers in the US. Human-expert-designed sites had the highest preference, generative UI came close behind, and other formats trailed by a large gap. Stated limits: generation "can sometimes take a minute or more" and there are "occasional inaccuracies". Paper: "Generative UI: LLMs are Effective UI Generators". — [Google Research blog, 2025-11-18](https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/)
- **Vercel AI SDK generative UI [Secondary, docs mirrors]:** "Generative UI is the process of connecting the results of a tool call to a React component." Since AI SDK 5, tool parts are typed `tool-${toolName}` with states `input-available` / `output-available` / `output-error`. Apps render `message.parts`, and `addToolOutput` returns user-provided results to the model (human-in-the-loop). — [AI SDK docs (unpkg mirror, ai@7.x)](https://app.unpkg.com/ai@7.0.40/files/docs/04-ai-sdk-ui/04-generative-user-interfaces.mdx)
- **Claude:** Claude (web/desktop) is an MCP Apps host. — [MCP blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/). I did not research Claude Artifacts specifics in this session (see Gaps).

### Inferences
- [Inference] There are three implementation families:
  - **(a) Declarative catalog:** A2UI, Vercel tool→component mapping, Shopify web components. Safe and consistent, but limited to predefined components.
  - **(b) Sandboxed HTML app:** MCP Apps, OpenAI Apps/plugins. Arbitrary rich UI from a third-party server, isolated by iframe and CSP, portable across hosts.
  - **(c) Fully model-coded UI:** Gemini dynamic view. Maximally flexible, but the slowest and least predictable. Google itself flags minute-plus latency and inaccuracies.
  - For a price-critical decision board, (a) or (b) is the defensible choice. Numbers come from deterministic code, not free-form model output.
- [Inference] The industry direction in 2026 is "discovery in the agent, checkout at the merchant": OpenAI's reset, Shopify's `continue_url`, and Google's handoff option in UCP. This aligns with the team's "결제 직전 멈춤" (stop before payment) default.

### Gaps
- Primary confirmation of ChatGPT's MCP Apps compatibility date (2026-02-22) and of the current official host matrix was not obtained.
- I did not fetch OpenAI's current plugin UI docs pages (sandbox and display-mode details) or the full 2026-03-24 post. Retailer names come from search summaries.
- Claude Artifacts specifics (sandboxing, sharing, persistent storage) were not researched in this pass. I found no named commerce MCP App in Claude.
- I found no evidence of Gemini rendering third-party MCP Apps.

---

## Q3. AG-UI (CopilotKit's Agent–User Interaction protocol): events, state sync, interrupts, relation to A2UI/MCP Apps

### Takeaway
AG-UI is the **transport/interaction layer** between an agent backend and a user-facing app. It defines a typed event stream (lifecycle, text, tool calls, state snapshot/delta, activity, reasoning, subagents) and a formal **interrupt** mechanism for human-in-the-loop pauses. A2UI and MCP Apps are **UI payload formats** that ride on top of it. Oracle summarizes the stack as: AG-UI carries the interaction, A2UI defines what the user touches.

### Cited Findings
- **Event categories [Verified]:**
  - Lifecycle: `RunStarted`, `RunFinished`, `RunError`, `StepStarted`, `StepFinished`. "`RunStarted` and either `RunFinished` or `RunError` events are mandatory".
  - Text messages: `TextMessageStart/Content/End` and `TextMessageChunk`.
  - Tool calls: `ToolCallStart/Args/End/Result`.
  - State: `StateSnapshot`, `StateDelta` (RFC 6902 JSON Patch), `MessagesSnapshot`.
  - **Activity:** `ActivitySnapshot`/`ActivityDelta`, describing in-progress activity between chat messages.
  - **Reasoning:** `Reasoning*` events let agents "surface reasoning signals" without "exposing raw chain-of-thought". These replace the deprecated `THINKING_*` events.
  - **Subagents:** `SubagentStarted/Finished/Error`, with output attributed via `subagentRunId`.
  - `Raw` and `Custom` events.
  - Source: [AG-UI docs, Events](https://docs.ag-ui.com/concepts/events) (fetched 2026-11-22)
- **Interrupts [Verified]:** `RunFinished.outcome = { type: "interrupt", interrupts: [...] }` means "the run paused for human input". The client resumes by starting a new run with a `resume` array that must address every open interrupt. Subagents can report `{ type: "suspended" }`. — [AG-UI docs, Events](https://docs.ag-ui.com/concepts/events)
- **State sync [Verified]:** Snapshots replace client state ("Frontends should replace their existing state model with the contents of this snapshot"). Deltas are JSON Patch applied in sequence, and the client can request a fresh snapshot on inconsistency. Subagent attribution on state events "records provenance only". — [AG-UI docs, Events](https://docs.ag-ui.com/concepts/events)
- **Maturity [Secondary]:** AG-UI 1.0 is described as a stable spec with a JSON Schema from which the TypeScript, Python and .NET SDKs are generated, and interrupts became part of the stable spec in 1.0. CopilotKit ships clients for React, Angular, Vue and React Native. — [GitHub ag-ui-protocol](https://github.com/ag-ui-protocol/ag-ui), [CopilotKit .NET SDK blog](https://www.copilotkit.ai/blog/agui-dotnet-sdk), [AG-UI intro](https://docs.ag-ui.com/introduction)
- **Relation to A2UI/MCP Apps [Verified + Secondary]:**
  - Google: any AG-UI agent can drive A2UI v0.9 via middleware, and AG-UI supports A2UI, MCP Apps and Open Generative UI. — [Google Developers Blog, 2026-04-17](https://developers.googleblog.com/a2ui-v0-9-generative-ui/)
  - CopilotKit's MCP Apps renderer relays app requests as AG-UI runs (`forwardedProps.__proxiedMCPRequest`) and reads results from `RUN_FINISHED.result`. — [Secondary, search summary](https://deepwiki.com/CopilotKit/CopilotKit/6-ag-ui-protocol)
- **Layering [Secondary]:** MCP = agent↔tools, A2A = agent↔agent, AG-UI = agent↔user app. — [DEV Community](https://dev.to/jubinsoni/the-agent-protocol-stack-mcp-vs-a2a-vs-ag-ui-when-to-use-what-6dn)

### Inferences
- [Inference] AG-UI maps closely onto the team's needs:
  - `ActivitySnapshot/Delta` → a live "explored scope" panel (stores searched, candidates found or excluded so far).
  - `StateDelta` → incremental updates to the decision board's candidate×store price matrix.
  - `Reasoning*` events → a summarized "why" trace without raw chain-of-thought.
  - `Subagent*` provenance → "price-check subagent found X at store Y".
  - `RunFinished{outcome: interrupt}` → formal **decision points**, e.g., "Which card do you hold?", "Is this option acceptable?", and the **결제 직전 멈춤** checkpoint.

### Gaps
- I did not fetch the separate AG-UI "Interrupts" document, so exact payload fields for interrupt reasons and options are not captured.
- I found no public consumer shopping product that states it uses AG-UI.

---

## Q4. How production shopping agents visualize comparisons, sources, uncertainty — and what they do NOT show

### Takeaway
Production agents (ChatGPT shopping research, Google AI Mode/Universal Cart, Perplexity, Amazon Help Me Decide/Rufus) converge on **product cards plus a buyer's-guide summary**. They support user-driven steering ("Not interested"/"More like this"), price-drop tracking with a spending cap, and merchant handoff. Uncertainty is handled mostly by a **generic disclaimer** ("might make mistakes about price and availability… visit the merchant site"). None of the reviewed sources shows a **per-user final price** (coupons, card discounts, monthly spend thresholds, points, membership, customs) or an **agent-initiated exclusion list with reasons**, or labels facts as verified vs. assumed. That gap is the team's opportunity.

### Cited Findings
**ChatGPT shopping research**
- **Launch and model [Verified]:** Launched 2025-11-24 and powered by "a version of GPT-5 mini trained with reinforcement learning for shopping tasks".
- **Flow [Verified]:** It asks clarifying questions (budget, recipient, features) and can use memory. It researches price, availability, reviews, specs and images, and **presents product cards as it goes**. Users steer with **"Not interested" / "More like this"**, and research adapts "in real time". After a few minutes it delivers a **buyer's guide** covering top products, key differences, tradeoffs and retailer details, with click-through to retailers.
- **Disclaimer [Verified]:** "Shopping research might make mistakes about product details like price and availability… we encourage you to visit the merchant site for the most accurate details."
- **Product accuracy [Verified]:** OpenAI defines product accuracy as the share of products meeting user requirements. No percentage appears in the page text.
- **Neutrality and data sharing [Verified]:** Results are "organic and based on publicly available retail sites", and chats are not shared with retailers. Merchants can request allowlisting.
- Source: [OpenAI, 2025-11-24](https://openai.com/index/chatgpt-shopping-research)
- **Coverage limit [Secondary]:** It only reads sites that permit OpenAI's crawler and respects robots.txt, so Amazon listings may be absent. — [IBTimes](https://www.ibtimes.com/openai-chatgpt-shopping-research-tool-asks-you-questions-first-putting-shoppers-control-3791271), [OpenAI Help Center](https://help.openai.com/en/articles/12911370)

**Google AI Mode, agentic checkout, UCP and Universal Cart**
- **Agentic checkout [Secondary, quoting Google I/O 2025 blog]:** Users tap "track price" and set size, color and the **amount they want to spend**. After a price-drop alert they confirm and tap "buy for me". Google adds the item to the merchant cart and completes checkout with Google Pay. Eligible US merchants since Nov 2025 (Wayfair, Chewy, Quince, some Shopify stores). One guide says a purchase **does not go through if the final price exceeds the approved total**. — [Google blog, I/O 2025](https://blog.google/products-and-platforms/products/shopping/google-shopping-ai-mode-virtual-try-on-update/), [ALM Corp guide](https://almcorp.com/blog/google-ai-shopping-tools-nov-2025-complete-guide/)
- **UCP and Universal Cart [Secondary]:**
  - UCP was released as an open standard in January 2026 ([TechCrunch, 2026-01-11](https://www.techcrunch.com/2026/01/11/google-announces-a-new-protocol-to-facilitate-commerce-using-ai-agents/)).
  - At I/O 2026 (2026-05-19) Google announced **Universal Cart**, a persistent cross-merchant cart spanning Search, Gemini, YouTube and Gmail, with **deal tracking and compatibility checks**. It is built on UCP, which allows checkout through Google or handoff to the merchant site, and AP2 (Agent Payments Protocol) was updated. — [The Next Web](https://thenextweb.com/news/google-universal-cart-agent-payments-shopping-io-2026), [GIGAZINE, 2026-05-20](https://gigazine.net/gsc_news/en/20260520-google-universal-cart/)
  - Launch timing conflicts: "summer 2026" vs. "October 15, 2026" for Search/AI Mode and the Gemini app. Unverified.
- **Shopping Graph [Secondary]:** Over 60B listings by May 2026 (CiteCue); other sources say 50B. — [CiteCue](https://citecue.com/academy/ecommerce/shopping-in-google-ai-mode)

**Perplexity**
- **Shopping launch [Secondary]:** Free shopping launched in late November 2025 for US users with PayPal checkout. Results are **product cards** with images, prices, delivery estimates, merchant names, specs, and **pros/cons drawn from reviews**. Comparisons are conversational rather than a dedicated table, and the format is characterized as "bite-sized cards" for quick decisions, versus ChatGPT's in-depth buyer's guides. — [Engadget](https://www.engadget.com/ai/perplexity-announces-its-own-take-on-an-ai-shopping-assistant-210500961.html), [MacRumors, 2025-11-26](https://www.macrumors.com/2025/11/26/perplexity-ai-shopping-feature/), [Free Press Journal](https://www.freepressjournal.in/tech/perplexity-launches-new-shopping-tool-to-rival-chatgpt-shopping-research-heres-how-they-compare)

**Amazon Help Me Decide / Rufus**
- **Help Me Decide [Verified]:** Launched 2025-10-23 in the US. It uses a shopper's searches, browsing and purchase history to recommend **one** product with reasons it fits. It starts within the shopper's browsing price range but can show cheaper or pricier items on request, and appears after browsing several similar listings. Built on LLMs with Bedrock, OpenSearch and SageMaker. — [TechCrunch, 2025-10-23](https://techcrunch.com/2025/10/23/amazons-new-ai-shopping-tool-tells-you-why-you-should-buy-a-recommended-product/)
- **Critiques [Secondary]:** TechRadar calls it "more assertive" because it picks the exact product, and raises privacy concerns about deep behavioral data. — [TechRadar](https://www.techradar.com/ai-platforms-assistants/amazons-new-help-me-decide-button-picks-what-you-were-going-to-buy-anyway-just-faster)

**Shopify checkout pattern**
- **Confirmation step [Secondary]:** `complete_checkout` = "Submit checkout after buyer confirmation", with `continue_url` handoff. — [shopify.dev agents](https://www.shopify.dev/docs/agents)

### Inferences
- [Inference] What these products **do not show**, based on the reviewed sources:
  - **(1) Personal final price:** Displayed prices are list or retailer prices. No source mentions card-specific discounts, monthly-spend-threshold logic, membership pricing, stacked coupons, points valuation or customs per user. Google's spending cap is a guardrail, not a breakdown.
  - **(2) Agent-side exclusions:** ChatGPT exposes only user-driven "Not interested". No source describes a list of candidates the agent dropped, with reasons.
  - **(3) Fact-status labeling:** Uncertainty is a page-level disclaimer, not per-field "verified at store page at time T" vs. "assumed" vs. "unverified".
  - **(4) Post-purchase usage context:** Universal Cart's "compatibility checks" are the closest analogue to the team's KVM connection diagram. No source describes visual setup or usage-environment artifacts.
  - **(5) Search scope:** No source shows which stores or sites were or were not covered, though ChatGPT's robots.txt limit means coverage is partial by design.
- [Inference] Amazon Help Me Decide is the opposite of the team's concept: one assertive pick inside one retailer's catalog. ChatGPT shopping research is the closest competitor on "understanding" (clarifying questions, tradeoffs) but lacks personal pricing and per-fact provenance.

### Gaps
- I did not fetch current (Nov 2026) ChatGPT, Gemini or AI Mode UI screenshots or help pages. Late-2026 changes, for example whether ChatGPT added price history or Universal Cart's actual launch UI, are unverified.
- I found no reliable source on Rufus 2026 features (price history, auto-buy).
- Korean market agents (Naver, Coupang AI shopping) were out of scope and not researched.

---

## Q5. Research on consumer trust, verification behavior, and failures from opaque agent decisions (2025–2026)

### Takeaway
Consumers are adopting AI for shopping research but **verify heavily** and want **approval before payment**. The best behavioral evidence (IAB/Talk Shoppe: 450+ recorded sessions, n=600) shows AI **added** steps (1.6→3.8), with 95% taking extra steps to feel confident. Trust broke on missing sources, mismatched specs or prices, stale availability, and budget or compatibility misfits. Large surveys (Accenture n=25,590; Riskified n=5,100) show only 7–9% accept fully autonomous purchase, while 32–43% want to decide or approve themselves. **Impartiality** (no hidden sponsorship) is a key trust requirement.

### Cited Findings
- **IAB × Talk Shoppe, "When AI Guides the Shopping Journey" (reported 2025-10-28) [Verified via SEJ]:**
  - Sample: 450+ screen-recorded AI shopping sessions plus a US survey of n=600.
  - Shoppers averaged **1.6 steps before AI and 3.8 after**, and **95%** took extra steps to feel confident.
  - 78% visited a retailer or marketplace, 32% clicked directly from the AI tool to a retailer, and retailer-site visits rose from 20% (before AI) to 50% (after).
  - On retailer pages they checked **prices and deals, variants, reviews, availability**.
  - **46%** fully trusted AI shopping recommendations.
  - Trust broke on **missing links or sources, mismatched specs or pricing, outdated availability, and recommendations that didn't fit budget or compatibility needs**.
  - Source: [Search Engine Journal, 2025-10-28](https://www.searchenginejournal.com/trust-in-ai-shopping-is-limited-as-shoppers-verify-on-websites/559497/)
- **Accenture Consumer Pulse 2026 [Secondary via search summaries of Accenture pages]:**
  - Sample: n=25,590 in 16 countries, online, fielded 2026-01-07 to 2026-01-22.
  - 74% would trust a personal AI agent more than their best friend to buy for them (task execution).
  - **32%** accept delegated decision-making where AI decides and the consumer pays.
  - **9%** accept autonomous purchasing within guardrails.
  - "Perceived impartiality" is a key requirement for autonomous purchasing.
  - A news write-up's "12%" figure conflicts and is likely a different framing.
  - Source: [Accenture](https://www.accenture.com/gb-en/insights/consulting/talk-my-ai-agent), [AI News](https://www.artificialintelligence-news.com/news/ai-shopping-agents-consumer-trust-accenture-report/)
- **Riskified Agentic Commerce Pulse (press release 2026-10-27; fieldwork Sept 2026) [Verified]:**
  - Sample: n=5,100 in the US, UK, Japan, Mexico and Brazil (adults who bought online in the past 3 months).
  - 80% used AI for some part of shopping, and **11%** completed a purchase inside an AI tool.
  - **43% want to approve every purchase**, 29% would allow auto-buy within their own rules, and **7%** are comfortable with AI buying without approval.
  - Top concerns: payment-credential security and **"AI choosing the wrong product"**.
  - 51% say the AI platform should handle refunds when AI errs.
  - "Wouldn't trust any company" fell from 47% (Q2) to 17%.
  - Source: [Riskified, 2026-10-27](https://www.riskified.com/press/agentic-commerce-pulse-consumer-survey-november-2026/)
- **Product.ai Trust in AI Commerce Report (Oct 2026 edition) [Secondary; the primary page returned 403]:**
  - **41.0% always verify, 48.9% sometimes, 10.1% trust as given**. The "verified at least once" share rose to 89.9% from 85.7% in June 2026.
  - People who always verify bought through AI more often (28.8% vs. 8.8% for those who never verify).
  - 50.4% would trust less after discovering an undisclosed paid recommendation, vs. 39.8% for a labeled sponsored one.
  - An earlier edition: 86% verify through another source.
  - The sample (US online shoppers who use AI for research) and its size were not confirmed.
  - Source: [Product.ai report](https://product.ai/research/trust-in-ai-commerce-report/), [Martechcube](https://www.martechcube.com/product-ai-survey-reveals-consumer-trust-gap-in-ai-shopping-tools/)
- **Other surveys [Secondary; vendor-commissioned, samples not confirmed]:**
  - Quad/Harris Poll: **75%** would trust AI agents less if recommendations were swayed by brand dollars ([Quad](https://www.quad.com/newsroom/americans-say-they-would-lose-trust-in-ai-shopping-if-results-were-sponsored)).
  - Spreedly State of Checkout 2026: 52% of US adults cite fraud fear, and 42% would trust "none" of the listed companies to run a spending agent ([Spreedly](https://www.spreedly.com/blog/nobody-owns-consumer-trust-in-ai-shopping-assistants)).
  - Cover Genius/Gather: 5% are comfortable with unilateral agent purchases ([Cover Genius](https://covergenius.com/resources/blog/do-consumers-trust-ai-shopping-agents/)).
  - Profitero: AI assistants rank last among trusted recommendation sources at 23% ([eMarketer](https://www.emarketer.com/content/shoppers-ask-ai-help-don-t-trust-its-advice)).
- **Nielsen Norman Group / Baymard:** I found no NN/g or Baymard study specifically on AI shopping agents in this search.

### Inferences
- [Inference] Trust-breakers in the IAB study map one-to-one onto the team's axes:
  - "missing sources" → evidence links per claim
  - "mismatched specs/pricing" + "outdated availability" → verified-at timestamps and price re-check
  - "didn't fit budget or compatibility" → requested-conditions checklist and compatibility artifact (KVM diagram)
- [Inference] Users verify mainly to check **price, deals, variants, availability**. A decision board that shows the per-store final price breakdown with source links and a "checked at" time removes the most common reason to leave the agent.
- [Inference] The survey data supports "결제 직전 멈춤" as the default. The largest groups want to approve every purchase (43%, Riskified) or to decide while the agent assists (32%, Accenture), and ≤9% accept full autonomy.
- [Inference] Because impartiality and undisclosed sponsorship are major trust risks (Accenture, Quad/Harris, Product.ai), the board should disclose ranking basis and any affiliate or sponsor relationship.
- [Inference] Note the tension with the team's concept: the IAB finding that AI *increased* steps does not undermine it, since the project explicitly does not treat speed or step reduction as success criteria. The steps were spent on verification, which suggests that **bringing verification into the agent's UI** is the value.

### Gaps
- Korean consumer data (e.g., KCA, Opensurvey) on AI shopping trust was not researched.
- No peer-reviewed HCI study on explainability in agentic shopping was retrieved in this pass. All numbers above are industry or vendor surveys with differing definitions of "trust".
- The Product.ai sample size and methodology are unconfirmed (403 on fetch).

---

## Q6. Implications: how to cite A2UI / MCP Apps / AG-UI in the PRD architecture, and which UI patterns to adopt for the decision board

### Takeaway
Cite the 2026 protocol stack as the **architectural rationale for product-adaptive artifacts**:
- AG-UI for the live agent↔UI event stream and formal decision-point interrupts.
- A2UI-style declarative catalog for safe, category-specific artifact components.
- MCP Apps as the path to deliver the same board inside ChatGPT, Claude or VS Code hosts.

Build the decision board around the gaps production agents leave open: personal final price breakdown, exclusion reasons, per-fact verification status, explored scope, and an explicit pre-payment stop.

### Cited Findings (anchors for the PRD)
- Declarative, catalog-bounded, no-code-execution UI: [A2UI README](https://github.com/google/A2UI/blob/main/README.md). Dynamic catalogs per "user permissions or device constraints" and client-defined validation functions: [Google Developers Blog, 2026-04-17](https://developers.googleblog.com/a2ui-v0-9-generative-ui/)
- Sandboxed, host-portable interactive UI with auditable JSON-RPC, CSP and host approval of UI-initiated tool calls: [MCP Apps blog, 2026-01-26](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/), [spec](https://raw.githubusercontent.com/modelcontextprotocol/ext-apps/main/specification/2026-01-26/apps.mdx)
- Activity, reasoning-summary, subagent provenance, state-delta and interrupt events: [AG-UI Events](https://docs.ag-ui.com/concepts/events)
- Production precedents: product cards plus "Not interested/More like this" steering and buyer's guide with tradeoffs ([OpenAI](https://openai.com/index/chatgpt-shopping-research)); price tracking with a user-set spending cap and "buy for me" confirmation ([Google](https://blog.google/products-and-platforms/products/shopping/google-shopping-ai-mode-virtual-try-on-update/)); compatibility checks in Universal Cart ([TNW](https://thenextweb.com/news/google-universal-cart-agent-payments-shopping-io-2026)); review-derived pros/cons cards ([Engadget](https://www.engadget.com/ai/perplexity-announces-its-own-take-on-an-ai-shopping-assistant-210500961.html)); "after buyer confirmation" checkout ([shopify.dev](https://www.shopify.dev/docs/agents))
- Trust evidence: [IAB/Talk Shoppe via SEJ](https://www.searchenginejournal.com/trust-in-ai-shopping-is-limited-as-shoppers-verify-on-websites/559497/), [Riskified](https://www.riskified.com/press/agentic-commerce-pulse-consumer-survey-november-2026/), [Accenture](https://www.accenture.com/gb-en/insights/consulting/talk-my-ai-agent)

### Inferences (concrete suggestions; all are [Inference])

**A. PRD architecture wording (suggested)**
1. **"Product-adaptive artifact rendering (A2UI-style declarative catalog)".** The agent outputs a structured artifact spec (JSON) that references only components from a team-owned catalog. Example catalog:
   - `RequirementChecklist`
   - `ScopeMap` (stores/sources searched)
   - `CandidateTable` (kept / excluded with reasons)
   - `ProsConsCard`
   - `EvidenceItem` (status: confirmed / assumed / unverified; source URL; checked-at time)
   - `DecisionPoint`
   - `PriceBreakdown`
   - Category-specific components: `KvmConnectionDiagram`, `FitComparison` (apparel), `PlacementPlan` (plants: light/space), `RouteMap` (lodging)

   Claim: "Following A2UI's 'data, not code' model (v0.9, 2026-04), the agent can only compose pre-approved components, so artifacts vary by product while staying safe and consistent." Using the A2UI renderer itself is optional. For a hackathon, a JSON schema plus React renderer that *mirrors* the A2UI model is enough and honest if described as "A2UI-inspired".
2. **"Agent↔UI event stream (AG-UI-compatible)".** Stream exploration progress as activity updates, candidate and price matrix updates as state deltas, and pause at decision points via interrupts: missing personal info such as card held or membership, option ambiguity, and the **pre-payment stop**. Claim: "Decision points are modeled as AG-UI `RunFinished{outcome: interrupt}`, so the agent never proceeds past a user decision implicitly."
3. **"Host portability (MCP Apps)".** State as future or extension scope, not demo scope: "The decision board can be packaged as an MCP App (`ui://` resource, sandboxed iframe) so it renders inside MCP Apps hosts such as Claude and ChatGPT." Note that host-side approval of UI-initiated tool calls matches the "user makes the final decision" principle.
4. **Deterministic price engine separated from the LLM.** Price math (coupon stacking, card discount and monthly threshold, points, shipping, customs) runs in code. The LLM only extracts conditions and explains them. This echoes A2UI's client-side validation functions and avoids the "mismatched pricing" trust-breaker from the IAB study.
5. **Checkout boundary.** "Discovery and verification in the agent, payment at the merchant." This aligns with OpenAI's 2026-03 reset and with Shopify's `continue_url` / "after buyer confirmation" pattern.

**B. Decision board UI patterns to adopt**
1. **Summary-first, evidence-on-demand.** Top row: recommended candidate(s) with personal final price, one-line why, and a confidence or verification badge. Each row expands into evidence (source links plus checked-at time).
2. **Requirement checklist ("요청 조건").** Each user condition shows a status per candidate: met / not met / unknown. This targets the IAB "didn't fit budget or compatibility" failure.
3. **Explored-scope panel ("탐색 범위").** Stores and sources searched, count found, sources not covered (and why: no access, out of stock). No production agent shows this.
4. **Kept vs. excluded list ("제외 후보와 이유").** Agent-initiated exclusions with a reason tag (e.g., incompatible port, over budget, poor seller rating, shipping >7 days). Include a "restore" control, mirroring ChatGPT's user-side "Not interested" but in the agent→user direction.
5. **Three-state fact labeling.**
   - ✅ Confirmed: read from a store page, with URL and time.
   - ◐ Assumed: e.g., "assumes you hold card X", "assumes the monthly spend threshold is met".
   - ? Unverified: e.g., coupon eligibility unclear.
   - Make assumptions editable inline. Changing one recomputes the price, using `StateDelta`-style updates.
6. **Price waterfall per candidate × store ("진짜 가격").** List price → option surcharge → coupon(s) → card discount (with monthly-threshold condition) → points (shown separately as non-cash value) → shipping → customs/tax → **final payable**. Show which items are confirmed vs. assumed. Highlight when a discount depends on a condition the user must confirm.
7. **Decision points as explicit cards ("결정 지점").** Example: "Do you have card X / membership Y?" or "Accept 2-day slower shipping for ₩8,000 less?" Rendered as interrupts the user must answer, never silently defaulted.
8. **Usage-context artifact ("사용 환경").** A category-specific visual (KVM connection diagram showing ports and cables needed; fit chart; placement plan; route map), analogous to but richer than Universal Cart's "compatibility checks".
9. **Pre-payment stop screen.** Final checklist (item, option, store, final price breakdown, assumptions still open) plus a handoff link to the merchant. Optional price guardrail: re-check the price at handoff and warn if it is higher than shown, similar to Google's "won't buy above approved total".
10. **Disclosure line.** "No sponsored ranking; ranked by your conditions and final price." Show affiliate status if any. This addresses the impartiality findings (Accenture; Quad/Harris 75%).
11. **Avoid** the generic page-level disclaimer as the only uncertainty signal (ChatGPT's pattern). Put uncertainty at the field level instead.

### Gaps
- I have no evidence that any judge-relevant Korean platform (Naver, Coupang, Kakao) supports A2UI, MCP Apps or AG-UI. The PRD should present these as **design references and an extension path**, not as integrations already working, unless the team actually implements them.
- Whether to call the implementation "A2UI-compliant" depends on actually using the A2UI schema or renderer. Otherwise use "A2UI-inspired declarative catalog" to avoid overstating.
