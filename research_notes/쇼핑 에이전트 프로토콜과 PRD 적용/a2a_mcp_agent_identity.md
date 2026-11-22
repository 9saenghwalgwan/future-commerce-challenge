# Agent Interoperability (A2A, MCP) and Agent Identity/Trust for Shopping Agents, plus Hackathon Partners AIR and Minds (status as of 2026-11-22)

Notes conventions: "[company claim]" = from the vendor's own announcement or site; "[secondary]" = blog/aggregator, not primary; "[unverified]" = single weak source or conflicting sources. Everything under "Inferences" is the researcher's reasoning, not a sourced fact.

## Q1. A2A (Agent2Agent): core concepts, commerce use, relation to AP2/UCP, adoption as of Nov 2026

### Takeaway
A2A is the open agent-to-agent protocol (Agent Card discovery + task lifecycle over JSON-RPC/gRPC/REST), stable at v1.0 since spring 2026 and, since Aug 2026, hosted by the Linux Foundation's Agentic AI Foundation (AAIF) next to MCP. In commerce it is mainly used as a transport for higher-level protocols: Google's Universal Commerce Protocol (UCP) defines an A2A binding, and AP2 payment mandates ride on top as an extension for buyer-not-present purchases.

### Cited Findings
**Core concepts (spec v1.0.0)**
- The latest released spec version is 1.0.0 (earlier 0.3.0, 0.2.6, 0.1.0). — [A2A Specification](https://a2a-protocol.org/latest/specification/)
- Agent Card: a public JSON document at the well-known URI `/.well-known/agent-card.json` listing name, capabilities, accepted authentication, endpoint URL/binding, and skills. — [Turing Post, v1.0 guide](https://www.turingpost.com/p/a2a) [secondary]; structures in spec include AgentCard, AgentProvider, AgentCapabilities, AgentExtension, AgentSkill, AgentInterface, AgentCardSignature. — [A2A Specification](https://a2a-protocol.org/latest/specification/)
- Agent Cards can be signed (spec section 8.4, canonicalization + signature verification) and an authenticated "extended" card can be fetched via `GetExtendedAgentCard`, which clients should use in place of the public card for that session. — [A2A Specification](https://a2a-protocol.org/latest/specification/)
- v1.0 data model is normative in Protocol Buffers with three bindings: JSON-RPC 2.0, gRPC, HTTP+JSON/REST; each `supportedInterfaces[]` entry advertises its binding and `protocolVersion` so an agent can serve old and new versions during migration. — [Turing Post](https://www.turingpost.com/p/a2a) [secondary]; [A2A v1.0 What's New](https://www.testmuai.com/blog/a2a-protocol-v1/) [secondary]
- Task states: `SUBMITTED`, `WORKING`; terminal `COMPLETED`, `FAILED`, `CANCELED`, `REJECTED`; interrupted `INPUT_REQUIRED`, `AUTH_REQUIRED` (prefixed `TASK_STATE_`). — [A2A Specification](https://a2a-protocol.org/latest/specification/)
- Operations: `SendMessage` (blocking by default, `returnImmediately` for async), `SendStreamingMessage` / `SubscribeToTask` (requires `capabilities.streaming`), `GetTask`, `ListTasks`, `CancelTask`, push-notification config CRUD (webhook HTTP POSTs, requires `capabilities.pushNotifications`). — [A2A Specification](https://a2a-protocol.org/latest/specification/)
- Auth: servers must reject missing/invalid credentials; supported schemes are API key, HTTP auth, OAuth 2.0, OpenID Connect, mutual TLS, declared in `securitySchemes`/`security` on the card; credentials are obtained out-of-band (e.g., OAuth flow) and in-task auth uses the `AUTH_REQUIRED` state. — [A2A Specification](https://a2a-protocol.org/latest/specification/)
- Extensions are declared in the Agent Card (`AgentExtension`), requested via the `A2A-Extensions` parameter; a `required: true` extension the client doesn't support triggers `ExtensionSupportRequiredError`. — [A2A Specification](https://a2a-protocol.org/latest/specification/)

**Governance and adoption (dated)**
- Google launched A2A in April 2025 and contributed it to the Linux Foundation in June 2025. — [Turing Post](https://www.turingpost.com/p/a2a) [secondary]
- v1.0 release date conflicts: "March 12, 2026, followed by v1.0.1 in May" vs "April 2026". — [Turing Post](https://www.turingpost.com/p/a2a); [A2A v1.0 guide](https://www.testmuai.com/blog/a2a-protocol-v1/) [secondary, conflicting]
- Linux Foundation's April 2026 announcement counted 150+ supporting organizations and 22,000+ GitHub stars on the core repo. — [Stellagent A2A one-year review](https://stellagent.ai/insights/a2a-protocol-google-agent-to-agent) [secondary]
- A2A joined the Agentic AI Foundation (AAIF) as a hosted project, announced Aug 17, 2026 (some outlets say effective Aug 20; the spec site's blog post is dated 2026-08-27). AAIF frames A2A = agent-to-agent collaboration, MCP = tool integration. — [AAIF blog: A2A joins AAIF](https://aaif.io/blog/a2a-joins-aaif); [Axios, 2026-08-17](https://axios.com/2026/08/17/a2a-agentic-ai-foundation-open-ai-standards); [Techzine](https://www.techzine.eu/news/devops/143659/google-transfers-a2a-to-the-agentic-ai-foundation/) [dates conflict slightly]
- AAIF launched Dec 2025 with MCP, Block's goose and OpenAI's AGENTS.md; reported 250+ members by Aug 2026. — [AI2Work](https://ai2.work/blog/google-s-a2a-protocol-joins-the-agentic-ai-foundation-with-mcp) [secondary]
- Korean press covered the A2A-under-AAIF move. — [Digital Today (EN)](https://www.digitaltoday.co.kr/en/view/94171/a2a-agent-to-agent-protocol-to-be-managed-alongside-mcp-under-aaif)

**Commerce use: UCP and AP2**
- UCP (Universal Commerce Protocol) is transport-agnostic: capabilities can be exposed via REST, MCP, or A2A; a business may expose an A2A agent supporting UCP as an A2A Extension. Spec versions exist dated 2026-01-23 and 2026-04-08. — [UCP A2A Binding (2026-01-23)](http://ucp.dev/2026-01-23/specification/checkout-a2a/); [UCP Overview (2026-04-08)](http://ucp.dev/2026-04-08/specification/overview/)
- AP2 mandates are a UCP extension (`dev.ucp.shopping.ap2_mandate`) that adds cryptographic proof of user authorization for autonomous (buyer-not-present) commerce; the mandate credential structure (claims, selective disclosure, key binding) is defined by the AP2 spec. — [UCP AP2 Mandates Extension](https://ucp.dev/2026-01-23/specification/ap2-mandates/)
- In the A2A binding, the merchant signs the checkout object with a detached JWS returned as `ap2.merchant_authorization`; the extension is active when both platform and business agents advertise it. — [UCP A2A Binding](http://ucp.dev/2026-01-23/specification/checkout-a2a/) (via search summary)
- One guide states the UCP Checkout spec requires a trusted interface for buyer finalization (i.e., human confirmation) unless both sides support AP2 Mandates. — [Glance: UCP guide](https://glanceinspires.substack.com/p/universal-commerce-protocol-ucp-the) [secondary]

### Inferences
- Canonical "buyer agent delegates to merchant agent" pattern in 2026: buyer agent discovers merchant's Agent Card -> opens an A2A task speaking UCP checkout -> task pauses in `INPUT_REQUIRED`/`AUTH_REQUIRED` for user confirmation -> AP2 mandate only if the user pre-authorized autonomous purchase. This maps well onto the team's "stop before payment" (L1) vs "conditional auto-pay" (L2).
- Korean marketplaces (Coupang, Naver) are not known to publish A2A Agent Cards or UCP endpoints (see Q2 gaps), so A2A is a roadmap/interop story for the team, not something usable on stage today.

### Gaps
- Exact v1.0 release date (March vs April 2026) unresolved; official LF/A2A release notes not fetched.
- AP2 mandate types (Intent/Cart/Payment mandates, known from AP2's Sept 2025 launch) were not re-verified this session; check ap2-protocol.org before quoting.
- No hard 2026 production-adoption numbers for A2A in commerce (vs. org count) found.

## Q2. MCP: commerce servers, authorization model, 2026 spec changes, MCP vs A2A roles

### Takeaway
MCP is the agent-to-tool/data standard, donated by Anthropic to AAIF on 2025-12-09; the current spec is 2026-07-28 (stateless core, Client ID Metadata Documents replacing Dynamic Client Registration, RFC 9207 issuer validation, tasks moved to an extension). Commerce MCP servers exist from Shopify, PayPal, Stripe and others, and in Korea Musinsa, Lotte ON and CJ Olive Young have built MCP servers; no Coupang or Naver public MCP server was found.

### Cited Findings
**Governance and spec**
- Anthropic donated MCP to the AAIF (a Linux Foundation directed fund co-founded by Anthropic, Block, OpenAI) on Dec 9, 2025. — [Wikipedia: MCP](https://en.wikipedia.org/wiki/Model_Context_Protocol); [AAIF blog on 2026-07-28](https://aaif.io/blog/mcp-2026-07-28-whats-changing-and-how-to-migrate)
- 2026-07-28 is the current spec; RC on 2026-05-21, beta SDKs 2026-06-29. — [MCP version timeline](https://hidekazu-konishi.com/entry/mcp_specification_version_timeline.html) [secondary]; [MCP blog: The 2026-07-28 Specification](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- Stateless core: `initialize` handshake and `Mcp-Session-Id` retired; each request carries protocol version, client identity, capabilities in `_meta`; optional `server/discover`; server-to-client requests (sampling, elicitation) move to Multi Round-Trip Requests (`resultType: "input_required"`); `Mcp-Method`/`Mcp-Name` routing headers required on Streamable HTTP. — [MCP blog 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- Authorization changes: authorization servers should return `iss` (RFC 9207) and clients must validate it before redeeming a code (mix-up attack fix); client credentials bound to issuing AS; `application_type` in DCR for desktop/CLI localhost redirects; Dynamic Client Registration formally deprecated in favor of Client ID Metadata Documents (CIMD); Enterprise Managed Authorization (EMA) listed as an extension (IT admins provision server access via IdP). — [MCP blog 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/); [AAIF migration post](https://aaif.io/blog/mcp-2026-07-28-whats-changing-and-how-to-migrate)
- Tasks moved to the `io.modelcontextprotocol/tasks` extension; Roots, Sampling, Logging deprecated (>=12-month window); legacy HTTP+SSE transport deprecated; MCP Apps named as an extension. Tier-1 SDKs (TS, Python, Go, C#) support 2026-07-28 from release day. — [MCP blog 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- An enterprise guide dates EMA's stable declaration to 2026-06-18; the official blog gives no separate date. — [Gupta MCP enterprise guide](https://guptadeepak.com/the-complete-guide-to-model-context-protocol-mcp-enterprise-adoption-market-trends-and-implementation-strategies/) [unverified]

**Commerce MCP servers**
- Shopify: sources disagree on count (3-5 official servers: Storefront, Customer Account, Checkout (preview), Dev, and a "UCP Catalog MCP" using OAuth 2.0 + PKCE for customer accounts); one says Storefront MCP is live by default on eligible stores since Q1 2026. — [e-tailize: Best e-commerce MCP servers 2026](https://e-tailize.com/blog/best-ecommerce-mcp-servers/); [Tripleminds Shopify MCP](https://tripleminds.co/blogs/technology/shopify-mcp-servers-capabilities-cost/) [secondary, conflicting]
- PayPal: remote server (`mcp.sandbox.paypal.com` / `mcp.paypal.com`) and local `@paypal/mcp` package with 30+ tools (invoices, orders, payments, refunds, disputes, subscriptions). Stripe: hosted server over much of the Stripe API, asks for human confirmation on refunds and outbound payments. — [AgentsPay comparison](https://agentspay.ai/vs/payment-mcp-servers) [secondary]
- Korea (May 2026): Musinsa and Lotte ON have built or are building MCP servers; CJ Olive Young connected an internal MCP server to Kakao; Zigzag (Kakao Style), Ohouse (오늘의집), SSG.com are preparing. Coupang and Naver are not mentioned. Article frames robots.txt as passive vs MCP as an active channel the merchant designs. — [Byline Network, "[AI 전환 커머스 ⑤] MCP 구축하는 이커머스 플랫폼" (posted 2026-05-04, updated 05-13)](https://byline.network/2026/05/28_129874/)
- Naver launched a "쇼핑 AI 에이전트" beta inside the Naver Plus Store app on 2026-02-26 (first-party agent, not an open protocol); Naver Plus Store MAU hit 7,769,721 in March 2026. — [CEO Score Daily, 2026-04-06](https://www.ceoscoredaily.com/page/view/2026040616531873531); [Brunch @aboutcommerce](https://brunch.co.kr/@aboutcommerce/668) [secondary]

**MCP vs A2A division**
- AAIF's own framing: A2A = agent-to-agent collaboration; MCP = connecting agents to tools and data. — [AAIF blog: A2A joins AAIF](https://aaif.io/blog/a2a-joins-aaif); [AAIF: Where A2A fits](https://aaif.io/blog/where-a2a-fits-in-the-open-agent-ecosystem)
- UCP treats both as interchangeable transports for the same commerce capabilities. — [UCP Overview](http://ucp.dev/2026-04-08/specification/overview/)

### Inferences
- For the team: MCP is the natural internal architecture choice (the on-device orchestrator exposes "iPhone control", "price calculator", "card-benefit DB", "user wallet profile" as MCP tools to the LLM). A2A is the natural *external* interface story (future: buyer agent <-> merchant/brand agents, or <-> a Minds agent).
- The Byline list shows Korean merchants are opening MCP channels selectively, but the two platforms the team demos on (Coupang, Naver) have not, which justifies the GUI-automation approach at L1 as a bridge, not a permanent design.

### Gaps
- The MCP base authorization model (OAuth 2.1 resource server, RFC 9728 Protected Resource Metadata, RFC 8707 resource indicators, from the 2025 spec revisions) was not re-fetched; the 2026 blog only lists deltas.
- No Visa-branded MCP server or Naver/Coupang MCP server found in this session; official Shopify/Stripe/PayPal docs not fetched (counts/endpoints from secondary sources).

## Q3. Agent identity: how merchants tell a trusted buyer agent from a scraper (Web Bot Auth, signed agents, Visa TAP, KYA, IETF, OAuth, VCs)

### Takeaway
The 2025-2026 industry answer is cryptographic request signing (Web Bot Auth = HTTP Message Signatures, RFC 9421) with operator public keys in directories (Cloudflare, Visa, Mastercard), plus token-based "Know Your Agent" (Skyfire/Akamai). These prove *which operator/agent platform* sent a request and its intent (browse vs pay); binding to *the specific user* and *scoped authority* is handled separately (TAP consumer-recognition data, AP2 mandates, verifiable-credential systems like AIR), and IETF explicitly leaves delegation out of Web Bot Auth's scope.

### Cited Findings
**Web Bot Auth / Cloudflare**
- Web Bot Auth uses HTTP Message Signatures (RFC 9421): the `keyid` in `Signature-Input` points to a public key published in a well-known directory; signatures carry created/expires timestamps and a nonce (anti-replay); example uses Ed25519. Cloudflare performs seven checks (headers, key retrieval, timestamps, nonce uniqueness, tag, signature base, Ed25519 verify). Blog published 2025-10-24, modified 2026-07-15. — [Cloudflare: Securing agentic commerce](https://blog.cloudflare.com/secure-agentic-commerce)
- Visa TAP and Mastercard Agent Pay both use Web Bot Auth as the agent-authentication layer; each network hosts its own key directory; a tag in `Signature-Input` distinguishes browsing (`agent-browser-auth`) from paying (`agent-payer-auth`); merchants can link an agent to a consumer identity and indicate expected payment method (network token, browser-use guest checkout, micropayment). — [Cloudflare: Securing agentic commerce](https://blog.cloudflare.com/secure-agentic-commerce)
- Cloudflare: "signed agents" are now part of the Verified bot category; from 2026-07-01 the distinction is a BotBase metadata field, Direct vs Intermediary access. Verification requires honest self-identification (Web Bot Auth signature, published IPs + stable UA, or reverse DNS) and non-abusive behavior (robots.txt etc.). Site owners can block/allow via AI Crawler and Agent access policies (managed presets Search, Agent, Training). For Intermediary bots, Cloudflare is experimenting with the `Forwarded` header (RFC 7239) so sites can apply preferences to the *end user*, not just the operator. Page modified 2026-11-12. — [Cloudflare Docs: Signed agents / Verified bots](https://developers.cloudflare.com/bots/concepts/bot/signed-agents/)

**Visa Trusted Agent Protocol (TAP)**
- Visa introduced TAP on 2025-10-14 with Cloudflare; built on RFC 9421 and aligned with Web Bot Auth; listed as beta; covers agent intent, consumer recognition data, optional payment information. — [Cloudflare press release (2025)](https://www.cloudflare.net/news/news-details/2025/Cloudflare-Collaborates-with-Leading-Payments-Companies-to-Secure-and-Enable-Agentic-Commerce/default.aspx); [agenticcommerceprotocol.info: TAP](https://agenticcommerceprotocol.info/standards/tap) [secondary]
- Merchants verify Ed25519 signatures against a Visa-operated directory of agent keys. — [eco.com TAP explainer](https://eco.com/support/en/articles/14845482-visa-trusted-agent-protocol-tap-explained) [secondary]; an "eight-minute validity window" detail appears only in one blog. — [Karter McKinley](https://kartermckinley.com/insights/web-bot-auth-trusted-agent-protocol) [unverified]

**KYA (Know Your Agent): Akamai, Skyfire, Experian, Mastercard**
- Akamai announced its Agentic Security Framework on 2026-06-15 and works with Skyfire and Experian on a KYA framework so agents declare identity, origin and intent, linked to both their platform and the user they represent. — [Akamai press release](https://www.akamai.com/newsroom/press-release/akamai-unveils-agentic-security-framework-to-power-trusted-ai-driven-interactions-and-commerce)
- Akamai Bot & Agent Control natively verifies Skyfire KYA tokens (signed JWTs obtained from Skyfire); Akamai reports 2.5 million KYA-powered agentic transactions from one financial-data provider. — [Akamai blog](https://www.akamai.com/blog/security/how-skyfire-akamai-enabled-25-million-agentic-transactions) [company claim]
- Mastercard reportedly works with Skyfire for KYA and lists Cloudflare as a trust-signal partner (Sept 2026 summary). — [fintechspecs](https://fintechspecs.com/blog/mastercard-agent-pay-trust-intelligence-skyfire-kya-2026/) [secondary/unverified]

**IETF / OAuth / delegation**
- IETF has a Web Bot Auth registry/"Signature Agent card" draft (draft-meunier-webbotauth-registry-04). — [IETF Datatracker](https://datatracker.ietf.org/doc/draft-meunier-webbotauth-registry/)
- Reported: the webbotauth WG adopted draft-ietf-webbotauth-httpsig-protocol-00 on 2026-09-01; the draft states a valid signature does not show the operator is honest or the request authorized, and authorization/delegation/revocation are out of scope (signature identifies operator, not end user). — [nhimg.org Web Bot Auth guide](https://nhimg.org/web-bot-auth-http-message-signatures-guide); [Where AI agent authorization standards stand](https://hidekazu-konishi.com/entry/where_ai_agent_authorization_standards_stand.html) [secondary]
- AI-agent auth draft "AIMS" (draft-klrc-aiagent-auth-03, 2026-07-06) covers authentication, context preservation across delegation, audit, human/agent authority; one source says adopted 2026-09-09 as draft-ietf-wimse-aims. OAuth 2.1 at draft-ietf-oauth-v2-1-15 (March 2026), WG milestone for IESG submission Dec 2026. — [arXiv 2609.15906: Authorization Architectures for Tool-Using AI Agents](https://arxiv.org/pdf/2609.15906); [hidekazu-konishi standards tracker](https://hidekazu-konishi.com/entry/where_ai_agent_authorization_standards_stand.html) [adoption dates unverified]
- Verifiable-credential approach for agents: Moca Chain mainnet (2026-09-29) positions on-chain credentials so a user, their agent, and businesses form a chain of trust; AIR lets users set scoped permissions and businesses verify agent, owner and authorized scope. — [TNW (contributed article)](https://thenextweb.com/news/moca-chain-mainnet-ai-agents-digital-identity)

### Inferences
- Three distinct questions a merchant asks, solved by different layers: (1) "Is this a known agent, not a scraper?" -> Web Bot Auth / signed agents / KYA token; (2) "Which user is it acting for?" -> TAP consumer-recognition object, KYA user linkage, or user-held credentials (AIR Identity); (3) "Is it allowed to do *this*?" -> mandates/scoped credentials (AP2, Reap scoped card in the AIR pilot, AIR Agent permissions). The team should present identity and authority as separate rows.
- All merchant-side mechanisms above assume the agent itself emits HTTP requests it can sign. The team's L1 agent emits no requests: the official Coupang/Naver iOS apps do, under the user's own session. So at L1, the merchant sees the user (as with any human app use), and Web Bot Auth/TAP/KYA are not applicable; they become relevant only if/when the agent talks to merchants directly (MCP/UCP/A2A) or pays autonomously (L2).

### Gaps
- Visa's own TAP docs/GitHub not fetched; field names of the consumer-recognition and payment objects not verified.
- Skyfire's primary docs not fetched; whether KYA tokens carry user-scoped spending limits is unconfirmed.
- No Korean-merchant adoption of Web Bot Auth/TAP/KYA found.

## Q4. Amazon v. Perplexity (Comet): status as of Nov 2026 and implications for user-side agents in the user's own logged-in session

### Takeaway
A district court enjoined Perplexity's Comet from Amazon in March 2026, but the Ninth Circuit unanimously vacated that injunction on 2026-08-04, reasoning that the user, not Perplexity, "accesses" Amazon when the assistant runs on the user's own device. The holding is explicitly narrow (CFAA/CDAFA "access" element only), leaves terms-of-service and tort theories open, and the case is back in district court.

### Cited Findings
- Judge Maxine Chesney (N.D. Cal.) granted Amazon a preliminary injunction in March 2026 (sources say March 9 or 10), finding strong evidence Comet accessed Amazon without authorization even at the user's direction; ordered Perplexity to stop Comet from accessing Amazon account pages and delete collected customer data. — [CNBC, 2026-03-10](https://www.cnbc.com/2026/03/10/amazon-wins-court-order-to-block-perplexitys-ai-shopping-agent.html); [GeekWire](https://www.geekwire.com/2026/judge-blocks-perplexitys-ai-bot-from-shopping-on-amazon-in-early-test-of-agentic-commerce/)
- *Amazon.com Services, LLC v. Perplexity AI, Inc.*, No. 26-1444 (9th Cir.): injunction vacated 2026-08-04. The court called the assistant "a tool, not a person"; it runs on the user's device, takes screenshots locally, and receives instructions from Perplexity's servers; Perplexity does not directly communicate with Amazon's servers, so the user is the accessor. CDAFA claim failed on the same element. — [Pearl Cohen, 2026-08-31](https://www.pearlcohen.com/ninth-circuit-vacates-injunction-against-perplexitys-ai-shopping-agent/); [MediaPost, 2026-08-05](https://www.mediapost.com/publications/article/417007/appeals-court-sides-against-amazon-lifts-perplexi.html)
- Explicit limits: court disclaimed creating "a new legal regime governing agentic AI"; did not address tort liability or limit Amazon's ability to regulate access via private terms of service; remanded. Commentators expect contract/ToS enforceability to become the main battleground. — [Pearl Cohen](https://www.pearlcohen.com/ninth-circuit-vacates-injunction-against-perplexitys-ai-shopping-agent/); [PYMNTS](https://www.pymnts.com/news/artificial-intelligence/2026/ninth-circuit-narrows-cfaa-reach-in-perplexity-agentic-commerce-ruling/)
- Perplexity reportedly moved on 2026-09-11 to dismiss Amazon's CFAA and CDAFA claims; no ruling found. — [TopDisputes](https://topdisputes.com/disputes/amazon-v-perplexity) [single source]

### Inferences
- The team's architecture (agent on the user's Mac, driving the user's own iPhone via iPhone Mirroring, inside the user's own logged-in Coupang/Naver apps, no agent-to-merchant server traffic) is structurally closer to the Comet fact pattern the Ninth Circuit favored than to server-side scrapers. This is a useful *framing* ("the user is the actor; the agent is the user's tool"), not a legal shield: it is US law, non-binding in Korea, narrow, and ToS claims remain open. Korean law (e.g., 정보통신망법 unauthorized-access provisions) and Coupang/Naver ToS were not researched here.
- "Stop before payment" (L1) further reduces risk: the user performs the final authorizing act.

### Gaps
- Exact complaint date (widely reported as Nov 2025) not verified from a fetched source this session.
- Outcome of the Sept 2026 motion to dismiss unknown.
- No Korean precedent on user-side automation agents researched.

## Q5. What exactly is "AIR" (hackathon partner)?

### Takeaway
No ambiguity: "AIR" is Moca Network's (Animoca Brands') identity-and-trust product suite (site air3.com, docs docs.air3.com). The event page itself defines it as infrastructure for decentralized Identity, Money and Loyalty, with AIR Agent for verifying AI-agent identity and granting verifiable, scoped permissions to act on behalf of users and businesses. Its agentic-commerce flow (with Minds, Reap, Pivota) was announced 2026-10-08 as a planned single-merchant controlled demo, not a live product.

### Cited Findings
**Event-page definition (primary for the pitch)**
- Luma page (Future Commerce Challenge, 2026-11-22, Google for Startups Campus Seoul, hosted by INF/INF CryptoLab) lists AIR as providing "탈중앙화된 신원(Identity), 금융(Money), 로열티(Loyalty)를 위한 인프라"; components: AIR Identity (selective disclosure of attributes), AIR Money (payments, settlement, payouts), AIR Loyalty (programmable rewards, points settled at fixed rate), AIR Agent (verifying AI-agent identities for safer transactions); can grant verifiable, scoped permissions for agents acting for users and businesses; developed by Moca Network. The page lists no judges and no specific partner session. — [Luma event page](https://luma.com/tle6unnl)

**Product site and docs**
- air3.com: AIR Kit is "a modular SDK that enables platforms to embed identity verification, identity for AI agents, fintech services, and programmable loyalty", "the delivery layer for the Moca Network"; AIR Agent: "Know the user behind every AI agent", builds on AIR Identity; AIR Money services provided by licensed third-party partners; claims 570+ portfolio/enterprise partners and 700M+ addressable users; "one SDK", 2-4 week deployment; docs + demo.air3.com. Site does not describe how scoped permissions, spending limits or KYA work, and does not mention MCP/A2A or Korea. — [air3.com](https://air3.com) [company claim]
- Docs: AIR Account SDK (login, SSO, wallet services) and AIR Credential (issue/verify ZK-based credentials; Issuer SDK, Verifier SDK; server-to-server REST API); AIR Kit doc versions 1.2.x/1.3.x; web SDK, Flutter SDK, wagmi connector `@mocanetwork/airkit-connector`; example repo MocaNetwork/airkit-example. — [docs.air3.com intro](https://docs.air3.com/air-kit-1.3.x/introduction/introduction); [Verifier SDK](https://docs.air3.com/air-credentials/core-technologies-and-key-components/verifier-sdk); [Issuer SDK](https://docs.air3.com/air-credentials/core-technologies-and-key-components/issuer-sdk); [HackerNoon review](https://hackernoon.com/air-kit-deep-dive-is-air-kit-the-best-zk-identity-sdk-in-web3-a-developers-hands-on-review) [secondary]
- An "AIR agentic wallet" agent skill (repo mocanetwork/air-agentic-wallet-skill, first seen 2026-03-18) lets an external agent authenticate to AIR with a signed message and request signatures from `POST /v2/wallet/agent-sign` to control the user's AIR smart account for wallet/token/NFT actions; it presumes an agent key already exists. — [skills.sh listing](https://www.skills.sh/mocanetwork/air-agentic-wallet-skill/air-agentic-wallet)
- Moca Chain (identity-focused L1) mainnet launched 2026-09-29; AIR is the integration layer for identity, payments, loyalty on top; for agents, users set scoped permissions and businesses can verify agent, owner, and authorized scope; Moca's Kenneth Shek: "the trust framework for delegation and authority is lacking." Partners listed include SK Planet, OneFootball, Automobili Lamborghini, Open Campus, Plume, Nansen. — [TNW (contributed, not newsroom)](https://thenextweb.com/news/moca-chain-mainnet-ai-agents-digital-identity)

**Agentic-commerce partnership (2026-10-08)**
- AIR + Minds + Reap (HK stablecoin cards/payments) + Pivota (Palo Alto commerce index/decision layer). Described flow: AIR verifies user attributes -> user selectively shares verified attributes/entitlements with their Minds agent -> Minds interprets intent -> agent presents cryptographic proof of eligibility for offers -> Pivota selects product/merchant/path (exact-match price routing across stacked promotions and shipping) and orchestrates order via merchant's existing stack -> Reap applies coupons, issues a payment credential limited to specific merchants, amounts, timeframes, executes checkout -> agents transact only within pre-approved limits. Status: "will commence with an initial controlled use case demonstration featuring a single merchant integration"; architecture "proposed". Pivota says merchants remain merchant of record and it never handles funds. Korea not mentioned. — [Animoca Brands announcement](https://www.animocabrands.com/announcement/animoca-brands-air-and-minds-partner-with-reap-and-pivota-to-enable-identity-powered-personalized-agentic-commerce); [The Paypers](https://thepaypers.com/payments/news/air-and-minds-partner-with-reap-and-pivota-on-agentic-commerce)
- Yat Siu (paraphrase): AI agents should not operate as unverified entities; Minds' user understanding + AIR's privacy-preserving identity lets agents act with context, consent, and strict limits. — [Animoca Brands announcement](https://www.animocabrands.com/announcement/animoca-brands-air-and-minds-partner-with-reap-and-pivota-to-enable-identity-powered-personalized-agentic-commerce)
- A self-published DEV post claims a live test and notes verified identity doesn't stop an agent executing a bad instruction. — [DEV Community](https://dev.to/scriptmasterlabs01/animoca-x-reap-x-pivota-identity-proves-who-credentials-confine-how-much-but-who-judges-fef) [unverified]

**Korea relevance**
- Moca Network x SK Planet (OK Cashbag): partnership announced 2024-11-26; OKI Club launched Feb 2025 inside the OK Cashbag app, described as first large-scale enterprise AIR Kit deployment, 600,000+ KYC-verified pre-registrations; rewards OCB Points + MOCA. — [Decrypt](https://decrypt.co/308002/moca-network-and-sk-planet-launch-oki-club-marking-first-large-scale-enterprise-use-of-air-kit-for-web3-onboarding?amp=1) [company claim via press release]
- Oct 2025: SK Planet to buy MOCA on the open market and adopt AIR Account and AIR Identity; plan to let its 95,000 merchant partners verify user data with explicit permission. — [Animoca Brands](https://www.animocabrands.com/sk-planet-to-purchase-moca-coin-on-open-market) [company claim; outcome not independently confirmed]

### Inferences
- Product naming drifted: 2025 docs use AIR Kit / AIR Account / AIR Credential; 2026 marketing (and the Luma page) uses AIR Identity / Money / Loyalty / Agent. In the pitch, use the Luma names (that's how the partner presented itself to participants) and say "AIR Agent / scoped permissions" rather than inventing API names.
- Pivota's "exact-match price routing across stacked promotions and shipping" overlaps directly with the team's "real personal final price" idea. Differentiation the team can honestly claim: user-side and on-device; works on closed Korean platforms (Coupang/Naver apps) that are not indexed/API-exposed; includes user-specific conditions (cards, memberships, payment-path benefits) and visual explanation for user understanding; L1 needs no merchant integration.
- SK Planet/OK Cashbag (Korean loyalty points) is the strongest Korea tie-in for AIR Loyalty / AIR Identity (e.g., verified membership/point entitlements feeding the real-price calculation).

### Gaps
- No public AIR Agent API reference (how a permission credential is structured, revocation, spending caps) was found; air3.com does not describe it.
- No evidence the Reap/Pivota pilot is live or available in Korea.
- Content of the on-site AIR partner session was not available online.

## Q6. What is "Minds by Animoca Brands" and its 2026 status?

### Takeaway
Minds (aka Animoca Minds) is Animoca's hosted, persistent (always-on, non-resetting) personal AI-agent platform built on CryptoSlam's Ethoswarm protocol: launched in early access 2026-02-05, backed by a US$10M ecosystem programme (2026-05-05), and currently in BETA at hellominds.ai with ~19 preset Minds, app integrations, and a paid Skills marketplace. It does not currently advertise shopping, wallet monitoring, or AIR integration on its product site; commerce appears only via the 2026-10-08 planned pilot.

### Cited Findings
- Launch: 2026-02-05, Animoca Brands + CryptoSlam's Ethoswarm; persistent, always-on cloud agents ("awaken" a personalized agent), no local servers/hardware; preset profiles (market researcher, crypto scout); natural-language via email and Telegram; blockchain for identity, economics, provenance hidden from users; early access. — [Animoca Brands announcement](https://www.animocabrands.com/announcement/animoca-brands-and-ethoswarm-launch-animoca-minds-to-accelerate-agentic-economy)
- Minds Investment Programme up to US$10M announced 2026-05-05; first disclosed deal US$1M co-investment in Superior.Trade (agentic trading). — [TNGlobal, 2026-05-06](https://technode.global/2026/05/06/hong-kong-based-animoca-brands-launches-10m-investment-for-ai-agent-platform/); [Animoca: Superior.Trade](https://www.animocabrands.com/announcement/animoca-brands-and-affiliates-co-invest-us-1-million-in-superior-trade-to-advance-agentic-trading-built-on-minds-by-animoca-brands)
- Oct 2026 description: persistent personal AI agent starting from one message on Telegram or email; no hardware/setup; retains user context and selects tools per task; shareable with friends/teams/orgs; does not reset between sessions so it becomes more tailored. — [Animoca Brands, 2026-10-08](https://www.animocabrands.com/announcement/animoca-brands-air-and-minds-partner-with-reap-and-pivota-to-enable-identity-powered-personalized-agentic-commerce)
- Event page: "영구형 AI 에이전트 플랫폼"; deploy and direct a "지속적으로 작동하는 주권적 AI 에이전트" without managing servers/hardware. — [Luma event page](https://luma.com/tle6unnl)
- Product site (BETA): ~19 pre-built Minds (General Assistant, Email Manager, Scrum Master, Fitness Coach, Personal Chef, Research Mind, Chief of Staff, etc.); Telegram; integrations incl. Gmail, Google Calendar/Drive, Slack, Discord, GitHub, Notion, Spotify, Strava, Duffel (travel); Skills buildable by describing a problem, sold on a Marketplace (4,000+ community Skills claimed); "Cognition Credits" pricing (200 credits on each of first 3 Minds + 200 daily top-up); English only; no mention of AIR, wallet, shopping, or monitoring/alerts. — [hellominds.ai](https://hellominds.ai) [company claim]

### Inferences
- Positioning Minds as "always-on monitoring/memory of the user's wallet profile" is consistent with what Minds is (persistent, memory, tool use, messaging channels) and with the Oct 2026 pilot (Minds holds user context; AIR supplies verified entitlements). But "wallet-profile monitoring" and "price-drop watching" are the team's proposed use, not a documented Minds feature; phrase it as "a Minds-style persistent agent could..." or "roadmap integration with Minds".
- A natural division for the pitch: Minds = persistent context + watching over time (price/condition triggers, membership/card changes); team's on-device agent = execution and comparison inside the user's own Korean apps; AIR = who the agent is and what it may do.

### Gaps
- A search summary claimed a Japanese LINE official account for the personal agent launched Oct 2026; no primary source fetched, so unverified.
- No Korean-language availability found; Minds' data/permission controls not documented on the site.

## Q7. How identity + scoped authority could be shown to end users, and how to weave A2A/MCP/identity/AIR/Minds into the PRD without overstating

### Takeaway
Shipping patterns in 2026 converge on: (a) a visible distinction between "browsing" and "paying" modes, (b) explicit human confirmation at payment unless a signed, scoped mandate exists, and (c) scoped credentials bounded by merchant, amount, and time. The team can map its L1/L2 roadmap directly onto these patterns and onto the hackathon's 4 layers, while labeling AIR/Minds/A2A as roadmap integrations, not current features.

### Cited Findings
- Browse vs pay is an explicit protocol signal (`agent-browser-auth` vs `agent-payer-auth`) in Visa TAP / Mastercard Agent Pay. — [Cloudflare blog](https://blog.cloudflare.com/secure-agentic-commerce)
- UCP checkout reportedly requires a trusted interface for buyer finalization unless AP2 mandates (cryptographic proof of user authorization) are supported by both sides. — [Glance UCP guide](https://glanceinspires.substack.com/p/universal-commerce-protocol-ucp-the) [secondary]; [UCP AP2 Mandates](https://ucp.dev/2026-01-23/specification/ap2-mandates/)
- Scoped payment credential = limited to specific merchants, amounts, timeframes; agents transact only within pre-approved limits (AIR/Minds/Reap/Pivota pilot design). — [Animoca Brands, 2026-10-08](https://www.animocabrands.com/announcement/animoca-brands-air-and-minds-partner-with-reap-and-pivota-to-enable-identity-powered-personalized-agentic-commerce)
- Selective disclosure: user shares verified attributes/entitlements without exposing underlying personal data (AIR Identity); enterprises can issue credentials to a user's AIR Account, but use depends on user consent. — [Animoca Brands, 2026-10-08](https://www.animocabrands.com/announcement/animoca-brands-air-and-minds-partner-with-reap-and-pivota-to-enable-identity-powered-personalized-agentic-commerce); [HackerNoon: Moca on identity for humans and AI agents](https://hackernoon.com/your-passport-scan-is-a-liability-moca-network-on-identity-for-humans-and-ai-agents?source=rss) [secondary]
- Human confirmation for money-moving tool calls (e.g., Stripe MCP asks before refunds/outbound payments); A2A has `INPUT_REQUIRED`/`AUTH_REQUIRED` task states and MCP 2026-07-28 has `input_required` multi-round-trip requests for elicitation. — [AgentsPay](https://agentspay.ai/vs/payment-mcp-servers) [secondary]; [A2A Spec](https://a2a-protocol.org/latest/specification/); [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- Delegation/revocation are out of scope for Web Bot Auth; a valid signature identifies the operator, not the end user or authorization. — [nhimg.org](https://nhimg.org/web-bot-auth-http-message-signatures-guide) [secondary]

### Inferences
**Permission UI suggestions (researcher's proposals)**
- "Mandate card" before any L2 auto-pay: Agent (which device/agent instance) / On behalf of (user, verified via AIR Identity) / Scope (merchant(s), product category or exact SKU set, max final price incl. shipping, payment method, expiry) / Disclosed attributes (e.g., "holds card X", "Naver membership active" as yes/no proofs, not card numbers) / Revoke button. Mirrors the Reap scoped-credential fields and AP2 mandate concept.
- Persistent mode indicator: "탐색 중 (browsing)" vs "결제 권한 사용 중 (paying)", echoing TAP's tags, plus an activity log the user can audit.
- L1 default: the agent pauses at the payment screen and hands control back (equivalent of A2A `INPUT_REQUIRED`), showing the computed real final price and evidence.

**4-layer explanation (identity/authority, AI agent, commerce, payment)**
- Identity/authority, L1 (demo): "The user is the actor. The agent runs on the user's own Mac/iPhone, inside the user's own logged-in apps, holds no merchant credentials of its own, and stops before payment." Optionally cite the Ninth Circuit's Aug 2026 "tool, not a person" reasoning as US context only (not Korean law, not a guarantee). Note that merchant-side agent-verification standards (Web Bot Auth, Visa TAP, KYA) target agents that send their own HTTP requests, which this L1 agent does not.
- Identity/authority, L2 (roadmap): "AIR Agent binds the agent to the verified user; AIR Identity lets the user prove entitlements (membership, card/benefit eligibility) by selective disclosure; a scoped permission (merchant/amount/time/condition) defines what the agent may pay for; revocable." Say "designed to use AIR" / "AIR-compatible roadmap", never "integrated with AIR" unless actually built.
- AI agent layer: on-device orchestrator with internal tools exposed via MCP (iPhone control, price/benefit calculator, comparison artifact generator). Minds = optional persistent companion for long-running watching (price/condition triggers) and memory of the user's wallet/benefit profile, positioned as a roadmap integration consistent with Minds' persistent-agent design and the Oct 2026 AIR+Minds pilot.
- Commerce layer: L1 uses GUI automation of the user's own Coupang/Naver apps because these platforms expose no public MCP/UCP/A2A interface (none found as of Nov 2026); where Korean merchants already open MCP servers (Musinsa, Lotte ON, CJ Olive Young per May 2026 reporting), the same agent could call MCP tools instead of reading screens; A2A/UCP is the future buyer-agent <-> merchant-agent channel.
- Payment layer: L1 = no payment by the agent. L2 = conditional auto-pay only within a scoped credential (pattern shown by the AIR/Reap pilot and AP2 mandates); if the KSNET judge asks, stablecoin settlement (AIR Money/Reap) is an option in the partner ecosystem, but the pilot is a planned single-merchant demo, so present it as such.
- Things to avoid claiming: that AIR or Minds are live in Korea for commerce; that Minds monitors wallets today; that Coupang/Naver support agent protocols; that the Ninth Circuit ruling makes user-side automation legal in Korea; any satisfaction/optimality guarantee (also per project rules).

### Gaps
- No primary-source UX patterns (screenshots) from Visa/Mastercard/Google agent-permission consent screens were reviewed; the UI proposals above are the researcher's synthesis.
- Korean regulatory constraints on delegated/auto payments (전자금융거래법, card-network rules) not researched.
