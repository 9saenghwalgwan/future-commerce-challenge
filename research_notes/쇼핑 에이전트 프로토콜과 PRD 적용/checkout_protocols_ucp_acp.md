# Agentic checkout / commerce protocols (UCP, ACP, merchant-side agent surfaces) — status as of 2026-11-22

Research date: 2026-11-22. Evidence labels used below: **[Spec]** = read on the official spec site, repo, or vendor docs page in this session; **[Official]** = vendor blog or newsroom; **[Press]** = reputable trade press; **[3P blog]** = third-party or vendor blog, lower confidence; **[Snippet]** = seen only in a search-result summary, page body not read. Anything not verified in this session is in Gaps.

---

## 1. What does UCP specify, who governs and backs it, and how far has it been adopted (Nov 2026)?

### Takeaway
UCP (Universal Commerce Protocol) is an Apache-2.0 open standard. Google and Shopify launched it in January 2026, and by November 2026 it is the broadest agentic-commerce spec. It has capabilities for Catalog, Cart, Checkout, Identity Linking, Order and Booking. Extensions cover Discount, Fulfillment, Loyalty, Buyer Consent, AP2 Mandates, 3DS and Split Payments. Its governance now includes Stripe, Amazon, Meta, Microsoft and Salesforce, plus councils per vertical. Live consumer checkout is still mostly US-only and runs at a limited set of large retailers.

### Cited Findings
**Spec scope [Spec]**
- Capabilities listed on the spec home page: Catalog (search, lookup), Cart, Checkout, Identity Linking, Order, Booking (lodging). Food has its own Checkout flow. Two checkout modes: "power native checkout" through the seller's checkout API, or "embed business checkout UI." Transports: REST and JSON-RPC, with built-in support for AP2, A2A and MCP. OAuth 2.0 handles account linking. Named identifiers include `dev.ucp.shopping.checkout`, `dev.ucp.shopping.policy.return`, `dev.ucp.lodging.policy.cancellation`, and signals `dev.ucp.buyer_ip` and `dev.ucp.user_agent`. — [ucp.dev](https://ucp.dev/)
- Fields on the Checkout object: required `ucp`, `id`, `line_items`, `status`, `currency`, `totals`, `links`. Optional: `buyer`, `context` (provisional buyer signals), `signals`, `attribution`, `actions`, `messages`, `policies` (e.g., return or warranty terms), `expires_at` (default TTL 6h), `continue_url`, `payment`, `order`. — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/)
- Checkout `status` values: `incomplete`, `requires_escalation`, `ready_for_complete`, `complete_in_progress`, `completed`, `canceled`. — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/)
- Well-known `links` types: `privacy_policy`, `terms_of_service`, `refund_policy`, `shipping_policy`, `faq`. — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/)
- Extensions listed on the checkout spec: Fulfillment, Discounts, Buyer Consent, AP2 Mandates (`payment/extensions/ap2-mandates`), Loyalty (`common/extensions/loyalty`). Payment extensions in the nav: Payment Authentication, Payment Terms, Split Payments. — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/)
- Identity linking: capability `dev.ucp.common.identity_linking` (v2026-01-11). It MUST implement the OAuth 2.0 Authorization Code flow. Errors: 401 `identity_required`, 403 `insufficient_scope`. The draft adds an "Accelerated IdP Flow" in which platforms can chain identity from trusted external IdPs declared in `config.providers` and skip the browser flow. — [UCP identity linking](https://ucp.dev/specification/identity-linking/), [draft](https://ucp.dev/draft/specification/identity-linking/) [Snippet]
- A third-party source says v2026-04-08 moved identity linking to `config.scopes` with mandatory PKCE S256. — [ucptools on DEV](https://dev.to/ucptools/microsoft-dropped-acp-for-ucp-in-104-days-identity-linking-is-why-2ce9) [3P blog]

**Versions and timeline [Spec unless noted]**
- Protocol releases: v2026-01-11, v2026-01-23, v2026-04-08, and v2026-08-25. The last is described as "multi-vertical structural refactoring, 3DS2 payments security, structured request constraints, independent capability versioning, and grocery shopping readiness." — [UCP announcements](http://ucp.dev/documentation/announcements/)
- 2026-09-25: draft `dev.ucp.lodging.booking` capability (hotel reservations, real-time pricing and availability, complex payment schedules). 2026-11-12: draft `dev.ucp.food.checkout` capability with `dev.ucp.food.fulfillment` and `dev.ucp.food.tip` extensions. 2026-11-13: nominations open for Local Services TC and B2B Procurement TC, membership expected around 2026-12-11. — [UCP announcements](http://ucp.dev/documentation/announcements/)
- A vendor blog claims v2026-08-25 renamed fields (e.g., `signing_keys` to `keys`) in ways that still pass schema validation but break agents. — [ucptools.dev](https://ucptools.dev/blog/ucp-2026-08-25-silent-breaking-changes) [3P blog, vendor of a validator]

**Governance [Spec]**
- 2026-04-24: the Tech Council expanded to 16 seats. New members: Amazon, Meta, Microsoft, Stripe, Salesforce. 2026-04-28: Stripe joined Google and Shopify as a permanent member of the Governing Council. — [UCP announcements](http://ucp.dev/documentation/announcements/)
- Vertical councils: Food TC (2026-07-16): Block/Square, DoorDash, Google, Toast, Uber Eats. Lodging TC (2026-08-11): Amadeus, Booking.com, Expedia, Google, Hilton, Marriott, Trip.com. Payments TC (2026-09-02): Adyen, Ant International, Coinbase, Global Payments, Google, PayPal, Shopify, Stripe. — [UCP announcements](http://ucp.dev/documentation/announcements/)
- Co-developers listed on ucp.dev include Google, Shopify, Etsy, Wayfair, Target, Walmart, Amazon, Microsoft, Meta, Salesforce, Stripe, and travel and food players. Endorsers include Adyen, Amex, Best Buy, Klarna, Mastercard, PayPal, Visa, Macy's, Home Depot, Sephora, Ulta, Zalando and others. — [ucp.dev](https://ucp.dev/)

**Adoption and rollout**
- Google Marketing Live, 2026-05-20: "UCP-powered checkout is going live with major US retailers." Named partners: Nike, Sephora, Target, Ulta Beauty, Walmart, Wayfair, and Shopify merchants Fenty and Steve Madden. Payment is Google Pay. Canada and Australia "in the coming months," the UK later. — [Productrise, 2026-05-27](https://productrise.app/blog/ucp-rollout-update) [3P blog summarizing Google], [Google blog (GML)](https://blog.google/products-and-platforms/products/shopping/shopping-updates-google-marketing-live) [Official, Snippet]
- Google announced Universal Cart at I/O on 2026-05-19 as a cross-merchant agentic cart, with checkout running on UCP. — [Google blog](https://blog.google/products-and-platforms/products/shopping/google-shopping-cart/) [Official, Snippet]; [TechCrunch 2026-05-19](https://techcrunch.com/2026/05/19/googles-new-universal-cart-wants-to-follow-you-across-the-entire-internet/) [Press, Snippet]
- A TechCrunch URL dated 2026-10-15 is titled "Google's Universal Cart shopping tool launches in the US." Only the headline was seen. — [TechCrunch 2026-10-15](https://www.techcrunch.com/2026/10/15/googles-universal-cart-shopping-tool-launches-in-the-us/) [Snippet]. An unofficial guide site claims Canadian shopper-side checkout went live 2026-11-04. — [theuniversalcommerceprotocol.com](https://theuniversalcommerceprotocol.com/what-is-universal-commerce-protocol-ucp-complete-guide/) [3P, unverified]
- eMarketer: despite the hype, native UCP checkout is "live for a mere handful of retailers." — [eMarketer](https://www.emarketer.com/content/google-expands-push-agentic-shopping-with-universal-cart) [Press, Snippet; date ~May 2026]
- Microsoft added UCP-powered checkout to Copilot and made UCP feeds generally available in Merchant Center about 104 days after Copilot Checkout launched on ACP (i.e., ~late April 2026). Microsoft kept ACP alongside it. Ulta Beauty is reportedly live linking 46M loyalty members through UCP, and Target Circle is a launch partner. — [ucptools on DEV, posted 2026-04-24, edited 2026-07-17](https://dev.to/ucptools/microsoft-dropped-acp-for-ucp-in-104-days-identity-linking-is-why-2ce9) [3P blog; primary Microsoft post not read]
- Shopify Spring '26 Edition (2026-06-17) made its UCP-based agent stack generally available. — [Digital Applied](https://digitalapplied.com/blog/shopify-spring-2026-edition-agentic-commerce-ucp-catalog) [3P blog]; [Shopify Spring '26](https://www.shopify.com/news/spring-26-edition-merchant) [Official, Snippet]

### Inferences
- UCP has become the de facto multi-party standard: even ACP's co-maintainer Stripe and agent-blocking Amazon sit on its councils. Live buyer-facing checkout through UCP remains concentrated in the US with a few dozen large brands plus Shopify merchants.
- UCP is expanding by vertical (lodging, food, local services, B2B), which echoes the team's view that question sets and artifacts differ by product and situation.

### Gaps
- I couldn't read the UCP v2026-08-25 release notes or the full total-type enum (whether `tax` and `fee` are well-known types). The fetched portion showed only `subtotal`, `total`, `items_discount`, `discount`, `fulfillment`.
- I found no official count of live UCP merchants or volume as of Nov 2026.
- The October US Universal Cart launch and the Canada go-live date are not verified from primary pages.

---

## 2. What does ACP specify, what changed in 2026, and who has adopted it?

### Takeaway
OpenAI and Stripe jointly govern ACP (Agentic Commerce Protocol, Apache-2.0). It defines a checkout-session REST API (plus an MCP binding since 2026-04-17), delegated payment through Stripe Shared Payment Tokens, a product feed API, carts, orders, discounts, and 3DS2 delegated authentication. The protocol is still developed actively. However, OpenAI retreated from native in-ChatGPT "Instant Checkout" in March 2026, and in November 2026 launched a separate "ChatGPT Wallet" (network tokens, biometric approval).

### Cited Findings
**Spec [Spec]**
- Governance: "jointly governed by OpenAI and Stripe as Founding Maintainers," consensus-based, with "neutral foundation stewardship as ecosystem matures" listed as a future path. — [ACP GitHub](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- Version history: 2025-09-29 initial release; 2025-12-12 fulfillment enhancements; 2026-01-16 capability negotiation; 2026-01-30 extensions, discounts, payment handlers; 2026-04-17 "Cart, feed, orders, authentication, and MCP" (latest stable). Key OpenAPI files: `openapi.agentic_checkout.yaml`, `openapi.delegate_payment.yaml`. — [ACP GitHub](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
- Checkout endpoints: `POST /checkout_sessions`, `POST /checkout_sessions/{id}` (update), `GET /checkout_sessions/{id}`, `POST .../complete`, `POST .../cancel`. Status enum: `not_ready_for_payment`, `ready_for_payment`, `completed`, `canceled`, `in_progress` (+ `authentication_required` during 3DS). — [ACP RFC agentic checkout](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md)
- `totals[].type` enum: `items_base_amount`, `items_discount`, `subtotal`, `discount`, `fulfillment`, `tax`, `fee`, `total` (integer minor units). The 2026-04-17 release added `amount_refunded`. Line items have required `base_amount`, `discount`, `subtotal`, `tax`, `total`, and optional `marketplace_seller_details` and `disclosures`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md); [changelog 2026-04-17](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md)
- `fulfillment_options` (shipping / digital / pickup / local_delivery): `id`, `title`, `description`, `carrier`, `earliest_delivery_time`, `latest_delivery_time`, `totals`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md)
- `links` types: `terms_of_use`, `privacy_policy`, `return_policy` (URLs). Message error codes include `out_of_stock`, `payment_declined`, `requires_sign_in`, `requires_3ds`, `intervention_required`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md)
- 2026-04-17 additions: Carts (`POST /carts` etc., single-seller, estimated totals, `continue_url`). Product Feed API (`POST /feeds`, `PATCH /feeds/{id}/products`; "promotions are deferred"). Orders with `fulfillments`, `adjustments` (replacing `refunds[]`), and status `created`…`delivered`/`canceled`. `DiscountsResponse.rejected` with `DiscountErrorCode`. Delegated Authentication (3DS2) RFC. MCP transport binding with tools `create_checkout_session`, `get_checkout_session`, `update_checkout_session`, `complete_checkout_session`, `cancel_checkout_session`. Seller-backed payment handler `dev.acp.seller_backed` with types `saved_card`, `gift_card`, `points`, `store_credit`. Discovery doc `/.well-known/acp.json`. `Idempotency-Key` required. — [ACP changelog 2026-04-17](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md)
- The 2026-04-17 changelog contains **no loyalty, account-linking, or buyer-identity changes**. Its only authentication item is 3DS2. — [ACP changelog 2026-04-17](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md)

**Delegated payment / Shared Payment Token (SPT) [Spec]**
- The agent creates a `SharedPaymentIssuedToken` from the customer's PaymentMethod, scoped to a seller's `seller_details[network_business_profile]`, with `usage_limits[currency]`, `usage_limits[max_amount]`, and `usage_limits[expires_at]`. The seller creates a PaymentIntent with it. The token can be revoked (`/revoke`). Statuses: `active`, `requires_action` (e.g., 3DS), `deactivated`. Webhooks: `shared_payment.issued_token.requires_action|active|used|deactivated`. API version shown: `2026-09-30.preview`. — [Stripe SPT docs (agent)](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent)
- SPT methods: cards, Link, Apple Pay, Google Pay, Klarna, Affirm (limited; "the buyer must be the one navigating and confirming"). Stripe "might use tokens issued through network programs such as Mastercard's Agent Pay and Visa's Intelligent Commerce." Countries: US, CA and about 30 European countries. **KR is not listed.** — [Stripe SPT docs](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent)

**2026 changes at OpenAI**
- Early March 2026: OpenAI scaled back native Instant Checkout. On 2026-03-24 it said "the initial version of Instant Checkout did not offer the level of flexibility that we aspire to provide," letting merchants use their own checkout while ChatGPT focuses on discovery. Replacements are merchant apps inside ChatGPT (Walmart with account linking, loyalty and payments; Sephora; DoorDash; CarMax; Lowe's) and link-out checkout. — [Modern Retail, 2026-03-27](https://www.modernretail.co/technology/what-went-wrong-with-chatgpts-instant-checkout/) [Press]; [Digital Commerce 360, 2026-03-06](https://www.digitalcommerce360.com/2026/03/06/openai-shifts-checkout-plans-agentic-commerce-strategy/) [Press, Snippet]
- Walmart said in-chat purchase conversion was 3x lower than click-out. — [Modern Retail](https://www.modernretail.co/technology/what-went-wrong-with-chatgpts-instant-checkout/) [Press]
- 2026-11-13: OpenAI launched **ChatGPT Wallet**, rolling out in "dots" (OpenAI's agent product). Users add a card once and review items, total and card before each purchase, approving each one biometrically (Face ID or fingerprint). It uses network tokens, so the merchant never gets the PAN. It was built with Visa, Mastercard, Amex and Chase. Card rewards and dispute protections are kept. Pre-approved purchases within limits, categories or time periods are described only as a possible future option. Availability: US ChatGPT Pro, 18+. The page warns some sites may block agents and risk systems may decline purchases. The page **does not name ACP or UCP**. — [OpenAI: Introducing ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet/) [Official]
- OpenAI's commerce developer docs page now covers accepting ChatGPT Wallet payments: forwarded risk headers (`asn`, `ip-country`, `locale`…), single-use credentials, network tokens with PAR. — [OpenAI developers](https://developers.openai.com/commerce/specs/checkout) [Spec]
- One blog reports a 4% Instant Checkout fee from late January 2026. — [INITE](https://inite.ai/en/blog/agentic-commerce-after-instant-checkout) [3P blog, Snippet, unconfirmed elsewhere]

**Other ACP adopters**
- Microsoft Copilot Checkout launched 2026-01-08 on ACP "powered by Stripe." — [ucptools on DEV](https://dev.to/ucptools/microsoft-dropped-acp-for-ucp-in-104-days-identity-linking-is-why-2ce9) [3P blog]. Microsoft's own page lists Shopify, Stripe and PayPal as partners (see section 3).

### Inferences
- ACP as a spec is maturing toward UCP-like breadth (carts, feeds, orders, MCP), but OpenAI's flagship use of it, native checkout, was pulled back. In 2026 OpenAI's payment focus moved to a wallet built on network tokens that works on existing merchant checkouts, with no protocol required.
- ACP still has no loyalty or identity-linking model. That is the main functional gap relative to UCP for computing a member's real price.

### Gaps
- I found no official list of merchants or regions live on ACP checkout after March 2026.
- I couldn't confirm whether ChatGPT Wallet purchases run over ACP sessions, browser automation, or both.

---

## 3. Merchant-side agent surfaces: Shopify, Microsoft Copilot Checkout, PayPal, Google

### Takeaway
Each large merchant platform now exposes an agent-facing stack. Shopify has Catalog, Cart, Checkout and Shop MCP servers built on UCP, plus Checkout Kit. Microsoft has Copilot Checkout on ACP and later UCP, with PayPal, Stripe and Shopify as partners. PayPal uses store sync to make catalogs purchasable. Google has AI Mode/Gemini plus Universal Cart on UCP. All of them keep the merchant as merchant of record, and all fall back to the merchant's own checkout page when the agent isn't trusted or the buyer hasn't signed in.

### Cited Findings
**Shopify**
- Shop MCP (hosted) supports product search with no sign-in. Agents can build carts and create checkouts, one checkout per merchant. "Without Shop sign-in, buyers pay on the merchant's checkout page. With Shop sign-in, the agent completes checkout after the buyer confirms the total and selects a payment method." Order history is available after sign-in. Global Catalog and Storefront Catalog MCP servers let an agent apply its own ranking. The Catalog API does search only. If an agent uses UCP directly, "completing checkout inside your agent requires Shopify's permission," otherwise buyers finish on the merchant checkout page. — [shopify.dev/docs/agents](https://www.shopify.dev/docs/agents) [Spec]
- Shopify's MCP tools implement UCP across the buyer journey. — [shopify.dev/docs/ucp](https://shopify.dev/docs/ucp) [Spec, Snippet]
- Agentic Storefronts: merchants set up once and products appear in ChatGPT, Microsoft Copilot, Google AI Mode and Gemini. — [Shopify News](https://www.shopify.com/news/ai-commerce-at-scale) [Official, Snippet]
- Checkout Kit renders the merchant's checkout inside the agent UI. The buyer launches it from Universal Cart, or the agent calls it with a checkout URL. — [shopify.dev agents (search summary)](https://www.shopify.dev/docs/agents) [Snippet]
- The older Storefront Catalog MCP folded into UCP, with legacy endpoints kept until June 15. Mid-2026 developer forum threads report Checkout MCP auth failures and an August 31 sunset of deprecated Storefront MCP cart tools. — [DEV (r0bertini)](https://dev.to/r0bertini/shopifys-ucp-makes-your-catalog-agent-buyable-the-rest-of-your-storefront-still-isnt-heres-pi9) [3P blog]; [Shopify community forum](https://community.shopify.dev/c/agentic/30) [Snippet]
- Shopify extended WebMCP support to checkout for AI agents. — [The Paypers](https://thepaypers.com/payments/news/shopify-extends-webmcp-support-to-checkout-for-ai-agents) [Press, Snippet, date not seen]

**Microsoft Copilot Checkout**
- Launched 2026-01-08. Partners: PayPal, Shopify, Stripe. Launch retailers included Urban Outfitters, Anthropologie, Ashley Furniture and selected Etsy sellers. — [PayPal newsroom 2026-01-08](https://newsroom.paypal-corp.com/2026-01-08-PayPal-Powers-Microsofts-Launch-of-Copilot-Checkout) [Official]; [Windows Central](https://www.windowscentral.com/artificial-intelligence/microsoft-copilot/microsoft-and-paypals-copilot-checkout-allows-users-to-make-purchases-without-leaving-the-chatbot) [Press, Snippet]
- Eligibility is limited to English-language merchants selling to US buyers in USD. Microsoft takes no commission, and the merchant remains merchant of record. The merchant's own API handles validation, **pricing, shipping and fulfillment**, while PayPal handles agent interaction and payment. — [Microsoft Advertising: agentic commerce](https://about.ads.microsoft.com/en/solutions/technology/agentic-commerce) [Official, Snippet]
- Shopify merchants were auto-enrolled after an opt-out window. PayPal and Stripe merchants apply to join. — [FoneArena](https://www.fonearena.com/blog/473256/microsoft-copilot-checkout-brand-agents.html) [Press, Snippet]

**PayPal**
- Store sync is part of PayPal's agentic commerce services and makes merchant catalogs purchasable in Copilot. Merchants sign up via PayPal.ai. — [PayPal newsroom 2026-01-08](https://newsroom.paypal-corp.com/2026-01-08-PayPal-Powers-Microsofts-Launch-of-Copilot-Checkout) [Official]
- PayPal is a UCP endorser and a member of the UCP Payments TC (2026-09-02). — [ucp.dev](https://ucp.dev/); [UCP announcements](http://ucp.dev/documentation/announcements/) [Spec]
- PayPal and Google Cloud have an AP2 wallet integration. — [PayPal developer blog](https://developer.paypal.com/community/blog/PayPal-Agent-Payments-Protocol/) [Official, Snippet]

**Amazon (counter-example)**
- Amazon blocks many AI user agents in robots.txt and sued Perplexity over Comet. A court ruled for Amazon in March 2026 (citing CNBC 2026-03-10). Amazon's Agent Policy took effect 2026-03-04. — [Productrise](https://productrise.app/blog/ucp-rollout-update) [3P blog citing CNBC]
- 2026-09-21: Amazon blocked Meta's Muse agent, saying "agentic third-party applications such as Muse have the same obligations." — [Axios 2026-09-21](https://www.axios.com/2026/09/21/amazon-meta-muse-ai-agentic-shopping) [Press, Snippet]; [Cybernews](https://cybernews.com/security/amazon-blocks-ai-agents-chatgpt-claude-muse/) [Press, Snippet]
- Amazon's own agents: Rufus was rebranded as "Alexa for Shopping" in the search bar (May 2026). "Buy for Me" buys on other retailers' sites, and some retailers objected that they never opted in. — [The Next Web](https://thenextweb.com/news/amazon-alexa-shopping-search-bar-agentic-commerce) [Press, Snippet]; [Digital Commerce 360 2026-03-11](https://www.digitalcommerce360.com/2026/03/11/amazon-opens-up-new-ai-enabled-buy-for-me-shop-direct-options-for-merchants/amp/) [Press, Snippet]
- Amazon holds a UCP Tech Council seat (2026-04-24). — [UCP announcements](http://ucp.dev/documentation/announcements/) [Spec]

### Inferences
- In practice, an agent gets full in-agent checkout only where it is a trusted/permitted platform (Google, Microsoft, Shopify-approved agents, Shop sign-in). An independent buyer-side agent (like the team's) would mostly get catalog plus a `continue_url` or Checkout Kit handoff, i.e., the merchant's own checkout page. That is close to what the team's L1 already does through screen automation.

### Gaps
- I did not verify PayPal's "Agent Ready" program in this session. The only verified PayPal pieces are store sync and AP2.
- I didn't read Microsoft's primary announcement of UCP support.

---

## 4. How do UCP and ACP relate to MCP, A2A and AP2, and are they converging or competing (2026)?

### Takeaway
There has been no formal merger. The two protocols coexist and are converging at the data-model and vendor level: shared vocabulary (`totals` with `items_discount`/`discount`/`fulfillment`, `continue_url`, `requires_buyer_input`/`requires_buyer_review`), both offer MCP bindings, Stripe sits in governance of both, and Microsoft runs both. AP2 (payment mandates) sits underneath UCP as an extension. Google says AP2 was contributed to the FIDO Alliance in 2026.

### Cited Findings
- UCP transports: REST, JSON-RPC, MCP, A2A, with built-in AP2 support. AP2 Mandates is a UCP payment extension. — [ucp.dev](https://ucp.dev/); [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/) [Spec]
- ACP transports: REST plus an MCP binding (OpenRPC, five checkout tools) since 2026-04-17. Discovery `transports` includes `mcp`. — [ACP changelog 2026-04-17](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md) [Spec]
- ACP 2026-04-17 added message `resolution` values `recoverable`, `requires_buyer_input`, `requires_buyer_review`, the same names UCP uses for error `severity`. — [ACP changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md); [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/) [Spec]
- Stripe, ACP's co-founding maintainer, became a permanent UCP Governing Council member on 2026-04-28. — [UCP announcements](http://ucp.dev/documentation/announcements/) [Spec]
- Microsoft runs both, ACP for Copilot Checkout from January 2026 and UCP added around April 2026. The author corrected the story from "dropped ACP" to "added UCP alongside." — [ucptools on DEV](https://dev.to/ucptools/microsoft-dropped-acp-for-ucp-in-104-days-identity-linking-is-why-2ce9) [3P blog]
- Checkout.com says agentic commerce "isn't converging on one standard" and Google hasn't detailed how interoperability would work. — [Checkout.com](https://www.checkout.com/blog/openai-acp-google-ucp-difference) [Official vendor blog, Snippet; date ~early 2026]
- Adyen Agentic (announced 2026-06-16) reportedly supports UCP, ACP, AP2 and Meta's checkout through one layer. — [Digital Applied, 2026-06-20](https://www.digitalapplied.com/blog/agentic-commerce-standards-ucp-acp-ap2-2026-merchant-guide) [3P blog, single source]
- AP2 launched September 2025 with 60+ partners. It uses Intent Mandates (the user's request and constraints) and Cart Mandates (locks items, price, terms). The FIDO Alliance CTO describes the contribution of AP2 and Mastercard's Verifiable Intent to FIDO's agentic authentication and payments work. A secondary source dates the donation to April 2026. — [FIDO Alliance blog](https://fidoalliance.org/building-the-trust-layer-for-agentic-payments-with-ap2-and-verifiable-intent/) [Official, Snippet]; [Spark analysis](https://www.spark.money/research/google-ap2-agent-payment-protocol) [3P, Snippet]

### Inferences
- In practice, a merchant implements UCP and/or ACP, and payment providers (Stripe, PayPal, Adyen) translate between them. A buyer-side agent should normalize both into one internal price-breakdown model. The overlap in total types makes that feasible.
- Network tokens (Visa Intelligent Commerce, Mastercard Agent Pay) used by SPT and ChatGPT Wallet form a protocol-agnostic payment layer beneath both.

### Gaps
- I found no official joint statement or interop spec between UCP and ACP maintainers as of 2026-11-22.

---

## 5. Can an agent get the buyer's REAL personal price through these protocols? Which fields exist and which are missing?

### Takeaway
UCP covers merchant-side personalization. With identity linking it supports verified member pricing (as a non-provisional discount), membership free shipping, merchant coupons with eligibility error codes, merchant-funded "payment instrument perk" claims (as provisional discounts), loyalty points earning forecasts, shipping cost and time windows per option, and return/warranty policies. ACP covers coupons, shipping, tax and seller-backed points or gift cards, but has no loyalty or identity model. Neither protocol models issuer-side card benefits (청구할인 statement credits, previous-month spending thresholds 전월실적, interest-free installments), loyalty points balances or redemption value (UCP), cross-merchant comparison, or customs/duties. In Google's implementation, loyalty works only at checkout, not in search results.

### Cited Findings
**Member / logged-in pricing**
- UCP Loyalty (`dev.ucp.common.loyalty`, extends `dev.ucp.shopping.checkout`) requires `dev.ucp.shopping.discount` to also be enabled. The `loyalty` map is keyed by reverse-domain program, with membership fields `id`, `display_id` (masked, e.g., `****5678`), `name`, `provisional`, `tiers[]` (`id`, `name`, `benefits[]`), and `rewards[]` (`currency`, `earning_forecast` with `amount` and `breakdown[]` → `benefit_id`). Verified member pricing appears as `discounts.applied[]` with `provisional: false` and `allocations` → `$.line_items[0]`, plus an `items_discount` total on the line. — [Google UCP loyalty implementation (v2026-04-08)](https://developers.google.com/merchant/ucp/implementation/2026-04-08/loyalty) [Spec]
- Google: "Provisional loyalty claims are not supported." Loyalty is supported "only at checkout" for verified, account-linked users, and "personalized search results" are planned for a future release. Identity linking is the primary verification path. — [Google UCP loyalty overview](https://developers.google.com/merchant/ucp/guides/overview/loyalty) [Spec]
- ACP 2026-04-17 has no loyalty or account-linking fields. Only the error code `requires_sign_in` exists. — [ACP changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md); [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md) [Spec]

**Coupons / discounts**
- UCP `discounts.codes[]` (submitted by the platform, replacing prior codes) and `discounts.applied[]` with `code`, `title`, `amount`, `automatic`, `method` (`each`|`across`), `priority`, `provisional`, `eligibility`, `allocations[]`. Rejections go to `messages[]` with codes `discount_code_expired`, `discount_code_invalid`, `discount_code_already_applied`, `discount_code_combination_disallowed`, `discount_code_user_not_logged_in`, `discount_code_user_ineligible`. — [UCP discount extension](https://ucp.dev/latest/specification/shopping/extensions/discount/) [Spec]
- ACP: discount extension since 2026-01-30. Since 2026-04-17 it has `DiscountsResponse.rejected[]` and examples for stacked, percentage and order-level discounts. The feed's "promotions are deferred." — [ACP GitHub](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol); [changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md) [Spec]

**Card-linked / payment-method perks**
- UCP eligibility claims are buyer claims about "loyalty membership, payment instrument perks, and similar" (example: `com.example.store_card`). A business accepting a claim "MUST surface their effect on pricing as provisional discounts," platforms "MUST display provisional discounts to the buyer," and "all remaining provisional claims MUST be resolved" at completion. — [UCP discount extension](https://ucp.dev/latest/specification/shopping/extensions/discount/) [Spec]
- ChatGPT Wallet keeps the card's existing rewards but does not calculate them. — [OpenAI](https://openai.com/index/introducing-chatgpt-wallet/) [Official]

**Points / stored value**
- UCP loyalty examples show only `earning_forecast`, with no balance and no redemption. — [Google UCP loyalty implementation](https://developers.google.com/merchant/ucp/implementation/2026-04-08/loyalty) [Spec]
- ACP seller-backed payment handler `dev.acp.seller_backed` has instrument types `saved_card`, `gift_card`, `points`, `store_credit`. — [ACP changelog 2026-04-17](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md) [Spec]

**Shipping fee, membership free shipping, ETA**
- UCP fulfillment `methods[]` → `groups[]` → `options[]` with `id`, `title`, `description` (e.g., "Arrives Dec 12-15 via FedEx"), `carrier`, `earliest_fulfillment_time`, `latest_fulfillment_time`, `totals[]` (cost). Method types are `shipping` and `pickup`. There is no dedicated ETA or fee field, and examples are inconsistent between `fulfillment` and `total` types. — [UCP fulfillment extension](https://ucp.dev/latest/specification/shopping/extensions/fulfillment/) [Spec]
- UCP membership free shipping is a `discounts.applied[]` entry (`automatic: true`, `provisional: false`, no allocations) plus a negative `discount` total, with the `fulfillment` total at 0. — [Google UCP loyalty implementation](https://developers.google.com/merchant/ucp/implementation/2026-04-08/loyalty) [Spec]
- ACP `fulfillment_options`: `carrier`, `earliest_delivery_time`, `latest_delivery_time`, `totals`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md) [Spec]

**Tax, fees, totals**
- ACP totals include `tax` and `fee`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md) [Spec]. For UCP `tax`/`fee`, see Gaps.

**Return policy / post-purchase**
- UCP checkout has `policies` (return or warranty terms) and `links` (`refund_policy`, `shipping_policy`), and the identifier `dev.ucp.shopping.policy.return`. There is also an Order capability. Businesses "MUST send a confirmation email." — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/); [ucp.dev](https://ucp.dev/) [Spec]
- ACP links include `return_policy` (URL). Orders have `fulfillments`, `FulfillmentEvent`, `adjustments` (refunds), and total `amount_refunded`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md); [changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md) [Spec]

**Coverage matrix** (built from the fields above; "✓" = field exists, "△" = partial/indirect, "✗" = not found)

| Price / condition factor | UCP | ACP | Notes |
|---|---|---|---|
| List/base price per item | ✓ `line_items`, `totals` | ✓ `base_amount` | |
| Logged-in member price | ✓ via identity linking + loyalty + `discounts.applied` (`provisional:false`) | ✗ (only `requires_sign_in`) | Google: checkout only, not search |
| Merchant coupons | ✓ `discounts.codes`, rejection codes incl. `user_not_logged_in` | ✓ discount ext, `rejected[]` | No field found for listing a user's available coupons (Gap) |
| Membership free shipping | ✓ (automatic discount, fulfillment=0) | △ (generic discount) | |
| Merchant-funded card/store-card perk | △ provisional `eligibility` claim | ✗ | Claim must be resolved at completion |
| Issuer card discount / 청구할인 / 전월실적 threshold / 무이자 할부 | ✗ | ✗ | Lives in the issuer's and the user's context, not the merchant's |
| Loyalty points earned | ✓ `earning_forecast` | ✗ | |
| Points balance / redeem value | ✗ (in loyalty examples) | △ `points`, `gift_card`, `store_credit` payment handlers | |
| Shipping fee per option | ✓ `options[].totals` | ✓ `fulfillment_options[].totals` | |
| Delivery ETA | ✓ `earliest/latest_fulfillment_time` | ✓ `earliest/latest_delivery_time` | |
| Tax / fees | △ (not verified) | ✓ `tax`, `fee` | |
| Customs / import duties | ✗ (not found) | ✗ (not found) | Gap |
| Return policy | ✓ `policies`, `refund_policy` link | △ `return_policy` URL | Structured return cost not found |
| Post-purchase order / refund tracking | ✓ Order capability | ✓ Orders, `adjustments`, `amount_refunded` | |
| Cross-merchant comparison | ✗ (each session is single-business) | ✗ (single-seller carts) | Agent's job |

### Inferences
- In these protocols, "real price" means the merchant's view of the final checkout total (subtotal − merchant discounts + shipping + tax/fee). The user's view (after issuer card benefits, threshold effects on monthly card spending, point valuations, and comparison across stores) is outside every spec. That supports the team's thesis that a user-side agent holding cards and memberships stays valuable even where UCP exists.
- UCP's split between `provisional` claims and verified discounts matches the team's split between estimated and confirmed values. A team claim like "카드 X로 결제 시 Y원 청구할인" is a provisional user-side claim. A price read from the logged-in checkout screen is verified.
- Because Google applies loyalty only at checkout, an agent must open a checkout session per merchant to see member prices. This parallels the team's approach of entering the logged-in checkout page per candidate × store.

### Gaps
- I couldn't confirm whether UCP defines well-known `tax`/`fee` total types, or a structured return-cost or restocking-fee field.
- I found no field for customs/duties in either spec. They may arrive as a generic `fee` or `tax`, but I didn't verify that.
- I didn't verify whether UCP Catalog returns any per-user price (Google says personalized search is "future").

---

## 6. Where do these protocols stop for a human (confirmation, authorization, handoff)?

### Takeaway
Every protocol has a built-in "stop before pay" point. In UCP, checkout is finalized by the user through a trusted UI unless AP2 Mandates are supported, and `requires_escalation` forces a `continue_url` handoff. ACP has `requires_buyer_input` / `requires_buyer_review`, `intervention_required` and 3DS `authentication_required`. Shopify sends untrusted or non-signed-in agents to the merchant checkout page. ChatGPT Wallet requires biometric approval per purchase. Pre-authorized autonomous buying (spending limits, mandates) is either a spec extension (AP2) or announced as "future" (ChatGPT Wallet).

### Cited Findings
- UCP: businesses "MUST" provide `continue_url` when returning `requires_escalation`, and must include a message with severity `requires_buyer_input` (needs information the API doesn't collect) or `requires_buyer_review` (complete, but needs buyer authorization before placement). Platforms "MUST use `continue_url`" in that state. Checkout must be finalized by the user through a trusted UI "unless the AP2 Mandates extension is supported." — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/) [Spec]
- UCP checkout modes: native API checkout, or "embed business checkout UI." — [ucp.dev](https://ucp.dev/) [Spec]
- ACP: `resolution` (`recoverable` | `requires_buyer_input` | `requires_buyer_review`). `intervention_required` with merchant-declared `capabilities.interventions.required` and `enforcement`. 3DS2 `authentication_required` → client must return `authentication_result`. Cart has a `continue_url`. — [ACP RFC](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/rfcs/rfc.agentic_checkout.md); [changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md) [Spec]
- Stripe SPT: scoped to a seller with `max_amount`, `currency`, `expires_at`, and revocable. It enters `requires_action` for 3DS. For Affirm, "the buyer must be the one navigating and confirming." — [Stripe SPT docs](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent) [Spec]
- AP2: Intent Mandate (constraints for delegated or autonomous purchases) and Cart Mandate (user-signed lock of items and price). — [Spark analysis](https://www.spark.money/research/google-ap2-agent-payment-protocol) [3P, Snippet]; [Google Cloud AP2 announcement](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol/?hl=en) [Official, Snippet, 2025-09]
- Shopify: the agent completes checkout only after the buyer "confirms the total and selects a payment method" with Shop sign-in. Otherwise the buyer pays on the merchant page. — [shopify.dev/docs/agents](https://www.shopify.dev/docs/agents) [Spec]
- ChatGPT Wallet: the user reviews items, total and card, then approves biometrically each time, and each approval creates an authorization record. Pre-approval within limits, categories or time periods is described only as a possible future option. — [OpenAI](https://openai.com/index/introducing-chatgpt-wallet/) [Official]

### Inferences
- The team's L1 ("결제 직전 멈춤," stop just before payment) matches the industry default exactly. It is UCP's `requires_buyer_review` / trusted-UI finalization and ChatGPT Wallet's per-purchase approval. The team's L2 (conditional auto-pay within scoped authority) maps to AP2 Intent Mandates, SPT `usage_limits`, and ChatGPT Wallet's announced future pre-approval. That lets the team call L2 an industry roadmap, not a speculative feature.

### Gaps
- I didn't read the AP2 spec text directly this session, so mandate field names are not verified.

---

## 7. Known limitations, criticism and merchant reluctance

### Takeaway
2026 showed weak buyer adoption of in-chat checkout and strong merchant reluctance to give up the customer relationship. Missing pieces (loyalty, promotions, pickup, multi-item carts) were also a problem. In response, the ecosystem shifted toward merchant-controlled checkout (apps, link-out, Checkout Kit, identity linking) and away from agent-owned checkout. Large platforms like Amazon still block third-party agents.

### Cited Findings
- Instant Checkout gaps cited by retailers: real-time inventory, coupons/promotions, loyalty integration, store pickup, customer data collection. Merchants still handle returns and support. Circana's Marshal Cohen asked: "Why would I want to give someone else control of my customer base…?" Walmart said shoppers don't want split, one-item checkouts, and in-chat conversion was 3x lower. — [Modern Retail, 2026-03-27](https://www.modernretail.co/technology/what-went-wrong-with-chatgpts-instant-checkout/) [Press]
- Forrester: too soon to know what native checkout in answer engines will look like long term. — [Forrester](https://www.forrester.com/blogs/what-it-means-that-the-leader-in-agentic-commerce-just-pulled-back) [Press/analyst, Snippet]
- One commentary claims only about 12 Shopify merchants went live with ChatGPT checkout. — [Spree Commerce blog](https://spreecommerce.org/openai-just-blinked-nobody-seems-to-want-to-shop-inside-chatgpt/) [3P blog, Snippet, low confidence]
- UCP native checkout was live at "a mere handful of retailers" (~May 2026). — [eMarketer](https://www.emarketer.com/content/google-expands-push-agentic-shopping-with-universal-cart) [Press, Snippet]
- ChatGPT Wallet: "some websites may unintentionally block agents," and risk systems may decline legitimate agent purchases. — [OpenAI](https://openai.com/index/introducing-chatgpt-wallet/) [Official]
- Amazon blocks third-party agents and won in court against Perplexity Comet (2026-03). Amazon blocked Meta Muse (2026-09-21). — [Productrise](https://productrise.app/blog/ucp-rollout-update) [3P citing CNBC]; [Axios](https://www.axios.com/2026/09/21/amazon-meta-muse-ai-agentic-shopping) [Press, Snippet]
- Regional limits: Copilot Checkout only for US/USD/English merchants. — [Microsoft](https://about.ads.microsoft.com/en/solutions/technology/agentic-commerce) [Official, Snippet]. UCP checkout US first, then CA/AU, then UK. — [Productrise](https://productrise.app/blog/ucp-rollout-update) [3P]. SPT is not offered in KR. — [Stripe](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent) [Spec]
- Spec churn: breaking changes across UCP releases (v2026-04-08 had "five breaking changes" per a DEV post; v2026-08-25 field renames). ACP 2026-04-17 changed `quantity` to a decimal, marked breaking. — [DEV (integration-maestro)](https://dev.to/integration-maestro/ucp-april-2026-cart-catalog-and-signals-change-everything-chl) [3P, Snippet]; [ucptools.dev](https://ucptools.dev/blog/ucp-2026-08-25-silent-breaking-changes) [3P]; [ACP changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md) [Spec]

### Inferences
- Merchants accept agents that bring the buyer's identity (loyalty) and keep checkout on merchant terms. They resist agents that sit between them and the customer. A buyer-side agent that compares across stores and steers by price is exactly what merchants find threatening, which explains the platform blocking.

### Gaps
- I found no Korea-specific data: no evidence found (and no search run) on Coupang, Naver, 11st or Kakao adopting UCP, ACP or their own agent checkout APIs. The report writer should treat Korean adoption as unknown, not absent.

---

## 8. How could these protocols be woven into the team's PRD (이해하고 진짜 가격으로 사는 쇼핑 에이전트)?

### Takeaway
Use the protocols in three ways. First, as evidence for the thesis: specs cover only the merchant's slice of the real price, and nothing about the issuer or the user's own context. Second, as a data-model template: align the team's price-breakdown artifact with the `totals`/`discounts`/`provisional` semantics. Third, as a roadmap path: L1 screen automation in Korea now, a protocol adapter where UCP/ACP exist, and L2 scoped auto-pay through AP2 mandates, SPT limits or wallet pre-approval.

### Cited Findings (facts the PRD can lean on; all from sections above)
- UCP loyalty works only at checkout, only for verified members, and has no points balance or redemption. Personalized search is "future." — [Google UCP loyalty overview](https://developers.google.com/merchant/ucp/guides/overview/loyalty); [implementation](https://developers.google.com/merchant/ucp/implementation/2026-04-08/loyalty)
- Payment-instrument perks exist only as merchant-side provisional claims. No issuer-side benefit model exists in UCP or ACP. — [UCP discount extension](https://ucp.dev/latest/specification/shopping/extensions/discount/); [ACP changelog](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol/blob/main/changelog/2026-04-17.md)
- Every protocol stops for buyer review before payment unless mandates or pre-approval are used. — [UCP Checkout spec](https://ucp.dev/latest/specification/shopping/checkout/); [OpenAI ChatGPT Wallet](https://openai.com/index/introducing-chatgpt-wallet/)
- Live deployments are US-centric, and Stripe SPT does not list KR. — [Stripe](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens.md?agent-seller=agent); [Productrise](https://productrise.app/blog/ucp-rollout-update)

### Inferences (concrete PRD hooks; team's decision)
1. **Thesis slide, "UCP가 있어도 남는 가치" (the value that remains even with UCP).** Even in the US, where UCP is live, Google's spec shows member price, merchant coupons and shipping. It does not show card 청구할인, 전월실적 progress, 무이자 할부, point valuations, or a cross-store comparison. The team's agent fills exactly the ✗ rows in the matrix (section 5). Present it as "merchant-side price (protocol-coverable) + user-side price (only the user's agent can compute)."
2. **Price-breakdown schema aligned with UCP/ACP.** Model each candidate × store as `subtotal` → `items_discount` (member price) → `discount` (coupons, membership shipping) → `fulfillment` → `tax`/`fee` (incl. customs for overseas KVM) → merchant `total`, then user-side layers: `card_discount` (issuer), `points_value`, `threshold_effect` (전월실적), `extra_components` (cables, adapters). Tag each value `verified` (read from the logged-in checkout screen or an API) or `provisional` (computed from card rules or assumptions), mirroring UCP's `provisional` flag. This also enforces the team rule that numbers are assumptions unless verified.
3. **Roadmap path.** L1 (demo): screen automation of Coupang/Naver checkout via the user's own iPhone, because no Korean merchant protocol was found. L1.5: a protocol adapter. Where a merchant exposes UCP (or ACP), create a checkout session with the user's linked identity (UCP identity linking OAuth) and read `totals`/`discounts`/`fulfillment` directly instead of scraping. The same comparison UI and stop point stay. L2: conditional auto-pay within scoped authority, implemented as an AP2 Intent Mandate, Stripe SPT `usage_limits` (`max_amount`, `expires_at`, seller-scoped), or wallet-style pre-approval (as OpenAI says is "future"). Do not claim any Korean merchant supports UCP.
4. **Stop-point framing.** Present L1's "결제 직전 멈춤" as the same contract the standards adopted: UCP `requires_buyer_review` / trusted-UI finalization, Shopify "buyer confirms the total," ChatGPT Wallet biometric approval. This is a credibility point for judges.
5. **Post-purchase conditions in the understanding artifact.** Surface the return/refund policy (UCP `policies`, `refund_policy` link; ACP `return_policy`), ETA windows (`earliest/latest_*_time`), and carrier, and say plainly that structured return cost is usually not available, even via protocols.
6. **Risk and honesty notes for the PRD.** Platforms may block agents (Amazon vs Perplexity and Muse). OpenAI warns sites may block wallet agents. Screen automation through the user's own logged-in phone and session is a different access model from server-side bots, but the PRD should name ToS and blocking as a risk. The protocols also show merchants accept agents that carry the buyer's identity and loyalty, so a user-consented, identity-bearing agent is the pattern most likely to be tolerated.

### Gaps
- Korean merchant or PG readiness (Coupang, Naver Pay, Toss, KakaoPay) for UCP/ACP/AP2-style APIs was not researched in this scope.
- Whether any card issuer exposes benefit or threshold APIs usable by a user-side agent (e.g., via Korean MyData) was not researched here.
