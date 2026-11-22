'use strict';
const $=s=>document.querySelector(s);
const defaults=()=>({phase:'chat',step:0,max:0,solution:'kvm',tab:'concept',question:'',computers:'MacBook Pro 16 (2019, 썬더볼트 3 ×4), Windows 데스크톱',monitor:'삼성 S27B610 · QHD 75Hz · HDMI 1.4 ×2, DP 1.2 ×1',priorities:['75Hz 화질','가격','나중에 듀얼 확장'],priceStage:1,priceMall:null,points:false});
let state=defaults(),slide=0;
const titles=['사용자의 질문','해결책','KVM에 대한 이해','사용자에게 질문','제품 탐색','구매 경로와 가격 조사'];
const escapeHTML=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slides=[
()=>`<div class="title-rule"></div><span class="eyebrow">FUTURE COMMERCE CHALLENGE · TRACK A</span><h1><span class="key">ALGOSA</span> (알고사)</h1><p class="subtitle">제품을 정확히 <span class="key-ink">이해하고</span> 사세요.<br>내게 맞는지 알고, 진짜 가격을 알고, 사는 쇼핑 에이전트.</p><div class="title-bottom">INTERACTIVE PRESENTATION / PROTOTYPE</div>`,
()=>`<span class="eyebrow">OUR CONCEPT · 알고 + 사</span><h2><span class="muted">빠르고 단순한 구매를 넘어,</span><br>나에게 <span class="key">더 맞고, 더 디테일한</span> 쇼핑.</h2><p class="subtitle">딸깍 대신, <span class="key-ink">알고 사도록.</span><br>혼자서는 놓쳤을 조건까지 분석하고, 결정은 사용자가 합니다.</p><div class="concept-grid"><div><span class="eyebrow">01 · 내게 맞는지 알고</span><h3>내 환경에 맞는 선택인지 이해합니다</h3><p>필요한 지식을 배우고, 내 기기·우선순위에 비춰<br>후보마다 사용 결과와 차이를 확인합니다.</p></div><div><span class="eyebrow">02 · 진짜 가격을 알고</span><h3>내가 실제로 내는 금액을 봅니다</h3><p>쿠폰·배송비·카드 청구할인·배송·AS까지<br>판매처마다 내 결제 조건으로 비교합니다.</p></div></div>`,
()=>`<span class="eyebrow">EXAMPLE</span><div class="example-layout"><div><h2>예시 : 데스크테리어를<br>시작하는 초보자</h2><p class="example-copy">컴퓨터 두 대와 모니터 하나.<br>관련 배경지식은 없지만,<br>나에게 맞는 사용 환경을 만들고 싶습니다.</p><p class="example-question">“두 대의 컴퓨터를 하나의 모니터에서<br>전환하면서 사용하고 싶어요.”</p><p class="small">이 질문에서 시작해, ALGOSA로 알고 사는 과정을 보여드릴게요.</p></div><div class="desk"><div class="screen">모니터 1대</div><div class="stand"></div><div class="stand-foot"></div><div class="desk-devices"><div class="laptop">노트북</div><div class="tower">PC</div></div><div class="desk-note">무엇을 사야 하고, 어떻게 연결해야 할까요?</div></div></div>`,
()=>`<span class="eyebrow">WHY UNDERSTANDING · 01</span><h2><span class="muted">아무리 뛰어난 에이전트도,</span><br><span class="key">묻지 않으면</span> 알 수 없는 것이 있습니다.</h2><div class="unknown-grid"><div class="unknown-card"><span class="eyebrow">사용자의 상황</span><h3>지금 가진 기기와 사용 환경</h3><ul class="unknown-list"><li><b>기존 기기</b><span>맥북과 PC의 단자는 USB-C? HDMI? DisplayPort?</span></li><li><b>모니터</b><span>해상도와 주사율, 지금 쓰는 케이블</span></li><li><b>사용 환경</b><span>키보드·마우스, 책상 배치, 전환 빈도</span></li></ul></div><div class="unknown-card"><span class="eyebrow">사용자가 우선하는 가치</span><h3>무엇을 먼저 두는지</h3><div class="value-chips"><span>추후 AS</span><span>끊기지 않는 품질</span><span>가격</span></div><div class="value-compare"><div><span class="small">A의 기준</span><p>AS <i>→</i> 품질 <i>→</i> 가격</p></div><div><span class="small">B의 기준</span><p>가격 <i>→</i> 품질 <i>→</i> AS</p></div></div><p class="small">같은 질문이라도 기준이 다르면, 맞는 제품도 달라집니다.</p></div></div><p class="unknown-statement">이 정보는 검색으로 찾을 수 없습니다. <strong>사용자에게 물어야만 알 수 있습니다.</strong></p>`,
()=>`<span class="eyebrow">WHY UNDERSTANDING · 02</span><div class="imagine-layout ${reveal?'revealed':''}"><div><h2>이런 답을 받았다고<br>상상해보세요.</h2><p class="example-copy">결론은 빠르지만,<br>그 결론이 어떻게 나왔는지는 보이지 않습니다.</p><div class="imagine-conclusion"><p>답은 있지만, 근거는 보이지 않습니다.</p><strong>에이전트가 얼마나 분석했는지,<br>내 상황에 얼마나 맞는 판단인지<br><span class="key">사용자는 알 수 없습니다.</span></strong></div></div><div class="mock-chat"><div class="bubble user">두 대의 컴퓨터를 하나의 모니터에서<br>전환하면서 사용하고 싶어요.</div><div class="typing"><i></i><i></i><i></i></div><div class="bubble agent"><span class="agent-name">AI 쇼핑 에이전트</span>바로 KVM 구매하시면 됩니다.<div class="mock-product"><div class="mock-thumb">KVM</div><div><strong>2포트 KVM 스위치</strong><span>추천 상품 · 바로 구매 →</span></div></div></div><div class="doubts">${['내 맥북에 그대로 연결될까?','몇 개의 제품을 비교하고 고른 걸까?','내가 AS를 중요하게 여기는 걸 알까?','화면이 끊기지는 않을까?','이 가격이 실제로 내가 내는 금액일까?'].map((q,i)=>`<span style="--d:${i*0.18}s">${q}</span>`).join('')}</div></div></div>`,
()=>`<span class="eyebrow">REAL RECORD · 실제 대화</span><div class="replay-layout"><div class="replay-side"><h2>실제로 KVM을 사려고<br><span class="key">AI와 나눈 대화</span>입니다.</h2><div class="replay-stats"><div><small>질문</small><b id="rp-q">0</b><span>번</span></div><div><small>바뀐 선택</small><b id="rp-c">0</b><span>번</span></div></div><ol class="replay-chain" id="rp-chain">${['HDMI 선택기','KVM','DP KVM','NEXT-8002KVM-DP','UGREEN 25962','UGREEN 55851'].map(c=>`<li>${c}</li>`).join('')}</ol><div class="replay-end" id="rp-end"><b>결국 가격도 몰랐습니다.</b><span>알리 ‘신규 회원가’ 63,648원 → 내 결제창에선 73,712원 <em>+10,064</em></span><span>케이블·어댑터 4개는 별도</span></div><button id="rp-again" class="rp-again">↺ 다시 재생</button><p class="small">팀원의 2026-11-09 실제 AI 채팅을 재구성했어요. 일부 질문은 줄였고, 순서는 실제와 조금 다를 수 있어요.</p></div><div class="gpt"><div class="gpt-top"><span>KVM 구매 상담</span><i>AI 채팅</i></div><div class="gpt-scroll" id="rp-scroll"><div class="gpt-thread" id="rp-thread"></div></div><div class="gpt-composer"><span>메시지를 입력하세요</span><b>↑</b></div></div></div>`,
()=>`<span class="eyebrow">WHY A MAP · F-PATTERN</span><div class="fp-layout"><div><h2>긴 답변은 읽히지 않고,<br><span class="key">F자로 훑어집니다.</span></h2><div class="fp-page" aria-hidden="true"><div class="fp-lines">${[100,96,92,88,64,58,40,34,30,26,22,18].map((w,i)=>`<i style="width:${w}%"></i>`).join('')}<em class="fp-buried">75Hz는 DP로만</em></div><div class="fp-heat"></div></div><ul class="fp-problems"><li><b>훑는다</b>첫 줄과 왼쪽만 읽혀서, 문단 중간의 ‘75Hz는 DP로만’ 같은 핵심 조건이 묻혀요.</li><li><b>흘러간다</b>대화가 길어질수록 앞에서 정한 조건이 위로 밀려나, 같은 확인을 여러 번 반복해요.</li><li><b>남지 않는다</b>왜 골랐고 무엇을 뺐는지, 25번의 질문 뒤에는 설명하기 어려워요.</li></ul><p class="small">NN/g 시선 추적 연구 · 웹 텍스트는 F자 패턴으로 훑어 읽히는 경우가 많아요 (2006 원 연구, 2017 재확인).</p></div><div class="fp-ours"><span class="eyebrow">ALGOSA의 화면</span><h3>대화 대신 지도.<br>대화는 흘러가도, 이해는 남도록.</h3><div class="fp-map" aria-hidden="true"><div class="fp-pin">내 조건 · 모니터 DP 1.2 · 75Hz는 DP로만 · 맥북 USB-C</div><div class="fp-nodes">${['요청','해결책','이해','내 조건','후보','가격'].map((t,i)=>`<span class="${i===5?'on':''}" style="--d:${i*.12}s">${t}</span>`).join('<i></i>')}</div></div><ul class="fp-answers"><li><b>훑는다 → 도식으로 본다</b>연결 구성도, 우선순위, 가격 막대로 한눈에</li><li><b>흘러간다 → 노드로 남는다</b>지난 단계도 제자리에 있고, 내 조건은 계속 보여요</li><li><b>남지 않는다 → 설명할 수 있다</b>후보마다 유지·제외 이유와 근거를 남겨요</li></ul></div></div>`];
const DEMO=slides.length,REVEAL=4,REPLAY=5;let reveal=0;
// 팀원의 실제 대화(KVM_구매_검토_과정.md)를 줄여 재구성. q: 누적 질문 수, c: 이 답 뒤의 선택 단계, flag: 대화의 문제 지점
const replayScript=[
 {u:'맥북이랑 데스크탑을 모니터 하나로 같이 쓰고 싶어',a:'HDMI 선택기는 화면만 바꿔 줘요. 키보드와 마우스까지 함께 바꾸려면 USB 포트가 있는 KVM 스위치나, 여러 기기에 페어링되는 블루투스 제품이 필요해요.',q:1,c:1},
 {u:'지금 모니터 사양 알아봐 줘',img:'디스플레이 설정 스크린샷 · LS27B61x',a:'모니터는 S27B610이에요. HDMI 1.4 2개와 DP 1.2 1개가 있어요. <mark>75Hz는 DP로 연결해야 나오고</mark>, 지금 59.95Hz인 건 HDMI로 연결했기 때문일 가능성이 높아요. 키보드·마우스까지 바꾸려면 KVM이 맞아요.',q:2,c:2},
 {u:'키보드랑 마우스는 다 유선이야',a:'그럼 2포트 DP KVM이 맞아요. DP KVM, DP 케이블 2개, USB-C to DP 1개, USB 케이블 2개, USB-C to USB-A 어댑터가 필요해요.',q:3,c:3},
 {u:'연결을 그림으로 보여 주고, 전환 방법도 알려 줘',a:'맥북 · 데스크탑 → KVM → 모니터 · 키보드 · 마우스 연결도를 그렸어요. 모니터 입력은 DP에 고정하고 KVM 버튼으로 전환해요.',q:4},
 {u:'dp kvm 뭐살까',a:'넥스트유 NEXT-8002KVM-DP를 추천해요. 79,800원(배송비 3,000원 별도), DP 1.2, 4K 60Hz. 단, QHD 75Hz 지원은 상품 정보에 없어서 판매처에 확인이 필요해요.',q:5,c:4},
 {u:'다른 선택지도 봐 줘',a:'UGREEN 25962, COMS OU109, KVM 없이 USB 스위치를 쓰는 방법도 있어요. 1순위는 그대로 8002KVM-DP예요.',q:6},
 {u:'이 제품의 장점을 가진 다른 제품들도 있을 거 아니야',a:'ATEN CS1922는 263,620원으로 3배 이상 비싸요. 가격까지 보면 8002KVM-DP가 여전히 가장 균형이 좋아요.',q:9},
 {u:'넥스트유 KVM 페이지의 모델을 전부 본 거야?',a:'처음에는 일부만 봤어요. 다시 모아 보니 넥스트유 DP 모델은 8002KVM-DP 하나뿐이에요.',flag:'일부만 봤다고 인정',q:10},
 {u:'4K 60Hz를 지원하는 KVM은 QHD 75Hz도 무리 없이 지원한다는데?',a:'대부분 맞아요. 4K 60Hz는 약 12.5Gbps, QHD 75Hz는 약 7Gbps예요. 다만 EDID 처리, 칩셋, 케이블 때문에 “무조건”은 아니에요.',q:12},
 {u:'KVM을 쓰면 맥북을 덮어 놔도 쓸 수 있어?',a:'클램셸 모드로 가능해요. 전원 어댑터와 외부 모니터·키보드·마우스가 필요하고, 잠자기 방지 앱을 쓰면 좋아요.',q:13},
 {u:'이게 좋아 보이는데? 후기도 다 좋고',img:'알리익스프레스 상품 링크',a:'알리는 자동 접속을 막아서 확인하지 못했어요. DP인지, 1440p 75Hz 표기가 있는지, 구성품을 직접 확인해 주세요.',flag:'페이지 확인 못 함',q:14},
 {u:'유그린에서 뭐 사지',a:'25962(DP, 모니터 1대용)를 추천해요. 모니터 1대 구성에서 75Hz를 노릴 수 있는 건 이 제품뿐이에요.',q:17,c:5},
 {u:'모니터 2개짜리 DP는 더 비싸?',a:'기기 가격은 거의 같아요. 앞서 말한 €69.99는 사실 55851 가격이었어요. 55851은 DP 케이블이 들어 있지 않아요.',flag:'앞서 말한 가격 정정',q:18},
 {u:'가격 차이가 없다는 55851 사도 되잖아',a:'사도 돼요. 모니터 1대로도 쓸 수 있어요.',q:19,c:6},
 {u:'여기서 사는 게 제일 쌀 거 같은데',img:'알리 상품 페이지 스크린샷 · ₩63,648',a:'Ugreen Official Store, ₩63,648, 무료 배송이에요. 다만 <mark>₩63,648은 ‘새로운 쇼핑객 전용’ 가격이라 원래 가격 ₩73,712가 적용될 수 있어요.</mark>',flag:'내 결제금액은 모름',q:22},
 {u:'케이블 뭐 사야 해?',a:'DP 1.4 케이블 2개, USB-C to DP 1.4 케이블 1개, USB-C to USB-A 어댑터 1개가 필요해요. 전원 플러그는 EU 옵션을 고르세요.',q:25},
];

// 프로토타입 뒤에 이어지는 마무리 슬라이드
const post=[
()=>`<span class="eyebrow">EVERYDAY · 모든 구매에는 이해가 있습니다</span><h2><span class="muted">간단한 구매라도,</span><br>사람은 늘 <span class="key">이해하고</span> 삽니다.</h2><div class="every-grid">${[
 ['옷','청바지 하나',['요즘 어떤 핏이 많이 입히는지','내 체형에 맞는 사이즈와 기장','가진 옷과 어울리는 워싱']],
 ['화분','반려식물 하나',['우리 집 볕과 습도','물 주기를 챙길 수 있는 빈도','놓을 자리와 화분 크기']],
 ['숙소','1박 여행',['이동 동선과 교통','함께 가는 사람의 조건','취소 규정과 추가 요금']]
].map(([t,h,l],i)=>`<div class="every-card" style="--d:${i*.15}s"><span class="eyebrow">${t}</span><h3>${h}</h3><ul>${l.map(x=>`<li>${x}</li>`).join('')}</ul><p>지금은 검색 · 후기 · 커뮤니티를 오가며 혼자 합니다.</p></div>`).join('')}</div><div class="every-bottom"><p>이 과정은 없어지지 않습니다. ALGOSA는 이해를 건너뛰지 않고, <span class="key">수월하게</span> 만듭니다.</p><div class="every-verbs"><span>대신 조사하고</span><i>→</i><span>모르는 기준을 묻고</span><i>→</i><span>지도로 남겨</span><i>→</i><span>내가 결정</span></div></div>`,
()=>`<span class="eyebrow">EXAMPLE · 패알못의 청바지</span><div class="jeans-layout"><div><h2>옷은 <span class="key">요즘 흐름</span>을<br>읽는 것부터 시작합니다.</h2><p class="example-copy">같은 지도 위에서, 노드만 상품에 맞게 바뀝니다.<br>청바지는 커뮤니티의 흐름과 사이즈 후기가 핵심이에요.</p><div class="jeans-map">${['요청 · 청바지 하나 사고 싶어요','트렌드 조사','종류·핏 이해','내 체형·가진 옷','사이즈 실측 비교','반품비까지 진짜 가격'].map((t,i)=>`<span class="${i===1?'on':i>1?'next':''}">${t}</span>`).join('<i></i>')}</div><p class="small">개념 예시 · 실제 화면과 조사 데이터 없이 흐름만 보여줘요.<br>팀 리서치: 국내 쇼핑 불편 글 1,013건 중 ‘사이즈 실패’ 33건 (2026-11-19)</p></div><div class="trend-node"><div class="trend-head"><span class="node-number">02</span><b>트렌드 조사</b><span class="work-badge">조사 중</span></div><div class="agent-head"><span class="agent-orb" aria-hidden="true"></span><strong>에이전트가 커뮤니티 글을 살펴보고 있어요</strong></div><ol class="trend-log">${['패션 커뮤니티의 ‘요즘 청바지’ 글 모으는 중','쇼핑몰 구매 후기의 핏·사이즈 후기 읽는 중','SNS 코디 사진을 핏·워싱별로 나누는 중','자주 나온 기준과 엇갈리는 의견 정리 중'].map((t,i)=>`<li style="--d:${.5+i*1.1}s"><span class="mark" aria-hidden="true"></span>${t}</li>`).join('')}</ol><div class="trend-sources">${['패션 커뮤니티','구매 후기','코디 사진','사이즈 질문 글'].map((t,i)=>`<span style="--d:${.9+i*1.1}s">${t}</span>`).join('')}</div><div class="trend-result"><span class="eyebrow">정리된 비교 기준</span><div><b>핏</b><span>와이드 · 스트레이트 · 슬림</span></div><div><b>워싱</b><span>생지 · 중청 · 연청 · 흑청</span></div><div><b>사이즈</b><span>정사이즈 / 한 치수 업 후기 비교</span></div><p>→ 다음 노드에서 이 기준으로 내 체형과 가진 옷에 맞춰봐요.</p></div></div></div>`,
()=>`<span class="eyebrow">EXPECTED IMPACT · 기대효과</span><h2>이해하고 고른 선택이,<br>산 뒤의 <span class="key">만족</span>으로 이어지도록.</h2><div class="impact-grid">${[
 ['사용자','사기 전에 압니다',['몰랐던 조건을 사기 전에 발견해요','표시가가 아니라 내 결제금액으로 비교해요','왜 골랐는지 스스로 설명할 수 있어요'],'KVM 사례 · HDMI 선택기였다면 60Hz 제한을 산 뒤에 알았을 거예요'],
 ['커머스','덜 잘못 삽니다',['호환성·사이즈를 사기 전에 확인해요','오구매와 반품이 줄어드는 효과를 기대해요','근거가 남는 추천이 신뢰로 이어져요'],'KVM 사례 · 알리 63,648원 → 내 결제창 73,712원 (+10,064)'],
 ['재방문','다음에도 씁니다',['내 책상 지도가 남아 다음 구매에 이어 붙여요','모니터·허브를 살 때 내 조건을 다시 말하지 않아요','결제는 내가 하니 안심하고 맡겨요'],'결제 버튼 직전 멈춤이 기본값이에요']
].map(([e,h,l,n],i)=>`<div class="impact-card" style="--d:${i*.15}s"><span class="eyebrow">${e}</span><h3>${h}</h3><ul>${l.map(x=>`<li>${x}</li>`).join('')}</ul><p>${n}</p></div>`).join('')}</div><div class="impact-measure"><b>측정 계획</b><span>아직 측정 전</span><p>몰랐던 조건 발견 수 · 고른 이유 설명 가능 여부 · 표시가 대비 실제 총비용 차이 · 구매 후 만족과 반품</p></div>`,
()=>`<div class="closing-slide"><div class="title-rule"></div><h2>딸깍 대신, <span class="key">알고</span> 사세요.</h2><div class="closing-name"><span class="key">ALGOSA</span> (알고사)</div><p class="subtitle">내게 맞는지 알고, 진짜 가격을 알고, 사는 쇼핑 에이전트.</p><p class="small">github.com/9saenghwalgwan/future-commerce-challenge</p></div>`
];
const TOTAL=DEMO+1+post.length;
let replayTimers=[];
function stopReplay(){replayTimers.forEach(clearTimeout);replayTimers=[];}
function startReplay(){
 stopReplay();const thread=$('#rp-thread'),scroll=$('#rp-scroll');if(!thread)return;
 thread.innerHTML='';$('#rp-q').textContent='0';$('#rp-c').textContent='0';$('#rp-end').classList.remove('shown');
 document.querySelectorAll('#rp-chain li').forEach(li=>li.className='');
 const fast=reducedMotion(),at=(ms,fn)=>replayTimers.push(setTimeout(fn,fast?0:ms));
 const follow=()=>scroll.scrollTo({top:scroll.scrollHeight,behavior:fast?'auto':'smooth'});
 let t=500;
 replayScript.forEach((m,k)=>{
  at(t,()=>{thread.insertAdjacentHTML('beforeend',`<div class="gpt-msg user">${m.img?`<div class="gpt-attach">🖼 ${m.img}</div>`:''}<div class="gpt-user">${m.u}</div></div>`);$('#rp-q').textContent=m.q;follow();});
  t+=450;
  at(t,()=>{thread.insertAdjacentHTML('beforeend',`<div class="gpt-msg ai" id="rp-a${k}"><span class="gpt-avatar">✳</span><div class="gpt-ai"><span class="gpt-dots"><i></i><i></i><i></i></span></div></div>`);follow();});
  t+=550;
  at(t,()=>{const el=$(`#rp-a${k} .gpt-ai`);el.innerHTML=`${m.flag?`<span class="gpt-flag">⚠ ${m.flag}</span>`:''}<p>${m.a}</p>`;el.classList.add('typed');
   if(m.c){$('#rp-c').textContent=Math.max(0,m.c-1);document.querySelectorAll('#rp-chain li').forEach((li,i)=>li.className=i<m.c-1?'past':i===m.c-1?'now':'');}follow();});
  t+=m.flag?1250:800;
 });
 at(t+200,()=>$('#rp-end').classList.add('shown'));
}
function save(){if($('#chat-question'))state.question=$('#chat-question').value;if($('#question'))state.question=$('#question').value;if($('#computers'))state.computers=$('#computers').value;if($('#monitor'))state.monitor=$('#monitor').value;}
function showSlide(n,keepReveal){save();stopReplay();if(n!==DEMO&&state.phase==='loading'){cancelLoading();state.phase='chat';}if(n!==DEMO)cancelWork();if(!keepReveal)reveal=0;slide=n;$('#presentation').hidden=n===DEMO;$('#demo').hidden=n!==DEMO;$('#deck-back').disabled=n===0;$('#deck-next').hidden=false;$('#deck-next').disabled=n===TOTAL-1;$('#deck-next').textContent=n===REVEAL&&!reveal?'사용자의 생각 보기 →':n===DEMO-1?'프로토타입 시작 →':'다음 →';$('#page-label').textContent=['제목','컨셉','예시 소개','왜 이해가 필요한가','결과만 받은 사용자','실제 대화 기록','F자로 읽히는 답','프로토타입','일상의 구매','옷 구매 예시','기대효과','마무리'][n];$('#page-count').textContent=`${String(n+1).padStart(2,'0')} / ${String(TOTAL).padStart(2,'0')}`;$('#mode-label').textContent=n===DEMO?'PROTOTYPE · KVM SHOPPING':'FUTURE COMMERCE CHALLENGE · TRACK A';if(n!==DEMO){$('#presentation').innerHTML=`<section class="slide">${(n<DEMO?slides[n]:post[n-DEMO-1])()}</section>`;$('#presentation').scrollTop=0;if(n===REPLAY){$('#rp-again').onclick=startReplay;startReplay();}}else renderDemo();}

function question(){return `<span class="tag">01 / 원하는 경험에서 시작</span><h2>어떤 환경을<br>만들고 싶으세요?</h2><p class="lead">제품 이름을 몰라도 괜찮아요. 하고 싶은 일을 들려주세요.</p><label class="field">나의 요청<textarea id="question" maxlength="500">${escapeHTML(state.question)}</textarea></label><div class="setup"><div class="setup-row"><div class="device">컴퓨터 A</div><div class="device">컴퓨터 B</div></div><div class="setup-line">↓ ↓</div><div class="device" style="width:180px;margin:auto">하나의 모니터</div></div><div class="why">먼저 원하는 사용 경험을 이해해요.<br>이 요청을 해결하는 방법은 하나만 있는 게 아닐 수 있어요.</div>`}
function solution(){return `<span class="tag">02 / 해결책 선택</span><h2>어떤 방식으로<br>연결할 수 있을까요?</h2><p class="lead">모니터 전환과 입력장치 공유를 어떻게 해결할지 살펴봐요.</p><div class="choices"><button class="choice" data-solution="selector" aria-pressed="${state.solution==='selector'}"><span class="radio"></span><span><strong>HDMI 선택기</strong><span class="desc">화면 입력만 바꿔줘요. 키보드·마우스는 따로 옮겨 꽂아야 해요.</span></span></button><button class="choice" data-solution="kvm" aria-pressed="${state.solution==='kvm'}"><span class="radio"></span><span><strong>KVM 장치 구매</strong><span class="desc">모니터와 키보드·마우스 연결을 컴퓨터 사이에서 전환하는 방법을 살펴봐요. 지원 범위는 제품마다 확인해요.</span></span></button><button class="choice" data-solution="software" aria-pressed="${state.solution==='software'}"><span class="radio"></span><span><strong>프로그램 활용</strong><span class="desc">소프트웨어 기반의 공유 방법도 있어요. 화면 전환까지 원하는 방식으로 가능한지는 별도 확인이 필요해요.</span></span></button></div>${state.solution==='selector'?'<div class="callout">선택기는 화면만 바꿔요. 키보드·마우스까지 함께 바꾸려면 KVM이 필요해요.<br>게다가 이 모니터는 HDMI로 연결하면 60Hz까지만 나와요. 75Hz는 DP로만 나와요.</div>':state.solution==='software'?'<div class="callout">이 구상안은 KVM 구매 경로까지 설계되어 있어요. 프로그램 경로의 상세 내용은 아직 준비하지 않았어요.</div>':'<div class="why">장치를 바로 추천하기 전에,<br>KVM이 무엇인지 먼저 알아볼게요.</div>'}`}
function learn(){return `<span class="tag">03 / 선택에 필요한 배경지식</span><h2>KVM을 알면<br>비교 기준이 보여요.</h2><div class="tabs" role="tablist" aria-label="KVM 설명"><button role="tab" aria-selected="${state.tab==='concept'}" class="${state.tab==='concept'?'selected':''}" data-tab="concept">① 개념</button><button role="tab" aria-selected="${state.tab==='types'}" class="${state.tab==='types'?'selected':''}" data-tab="types">② 종류와 확인점</button></div>${state.tab==='concept'?`<div class="definition"><strong>Keyboard · Video · Mouse</strong><p>여러 컴퓨터가 모니터와 키보드·마우스를 공유하도록 연결하고, 사용할 컴퓨터를 전환하는 장치예요.</p></div><div class="setup"><div class="setup-row"><div class="device">컴퓨터 A</div><div class="device">컴퓨터 B</div></div><div class="setup-line">↓ ↓</div><div class="switch">KVM 스위치</div><div class="setup-line">↓</div><div class="setup-row"><div class="device">모니터</div><div class="device">키보드 · 마우스</div></div></div><p class="small">연결 개념을 보여주는 도식이에요. 실제 포트와 케이블 구성은 장비 및 제품 확인 후 달라져요.</p>`:`<div class="type-list"><div><strong>영상 연결 방식 · HDMI / DP</strong><p>모니터가 75Hz를 내는 단자가 DP뿐이라면, KVM도 DP여야 75Hz를 쓸 수 있어요.</p></div><div><strong>컴퓨터와 모니터 수</strong><p>2대 → 모니터 1대인지, 나중에 듀얼로 늘릴지에 따라 후보가 달라져요.</p></div><div><strong>컴퓨터 쪽 단자와 케이블</strong><p>맥북은 USB-C to DP 케이블과 USB-A 어댑터가 따로 필요할 수 있어요. 케이블값도 가격이에요.</p></div></div><div class="why">몰랐던 조건 하나가 선택을 바꿔요: HDMI 선택기 → DP KVM.<br>다음 단계에서 내 장비와 우선순위를 정리해요.</div>`}`}
function environment(){return `<span class="tag">04 / 나의 상황 파악</span><h2>당신의 책상에 맞춰<br>살펴볼게요.</h2><p class="lead">예시를 수정하고, 중요하게 생각하는 순서를 정해주세요.</p><label class="field">두 컴퓨터의 종류<input id="computers" value="${escapeHTML(state.computers)}" placeholder="예: 맥북, Windows 데스크톱" maxlength="180"></label><label class="field">모니터의 종류와 개수<input id="monitor" value="${escapeHTML(state.monitor)}" placeholder="예: 삼성 S27B610, 단자와 주사율" maxlength="180"></label><div class="priority-title">중요하게 생각하는 가치 <span class="small">· 위쪽일수록 중요해요</span></div>${state.priorities.map((p,i)=>`<div class="priority-row"><span class="rank">${i+1}</span><span class="name">${p}</span><button data-move="${i},-1" aria-label="${p} 우선순위 올리기" ${i===0?'disabled':''}>↑</button><button data-move="${i},1" aria-label="${p} 우선순위 내리기" ${i===state.priorities.length-1?'disabled':''}>↓</button></div>`).join('')}<p class="small">모르는 정보는 ‘확인 필요’로 남겨도 괜찮아요.</p>`}

function candidates(){return `<h2>제품별로 살펴볼게요.</h2><p class="lead">내 장비와 우선순위를 기준으로, 각 후보의 탐색을 이어가요.</p><div class="summary">${escapeHTML(state.computers)}<br>${escapeHTML(state.monitor)}<br>우선순위: ${state.priorities.join(' → ')}</div><div class="kit"><b>함께 사야 하는 것</b><span>DP 1.4 케이블 ×2</span><span>USB-C to DP 케이블 ×1</span><span>USB-C → USB-A 어댑터 ×1</span></div><div class="why">오른쪽에 유지·제외 이유를 남겼어요.<br>UGREEN 55851을 골라 구매 경로를 살펴보세요.</div><p class="small">팀원의 실제 구매 검토 기록(2026-11-09)을 바탕으로 한 후보예요.</p>`;}
const PSTAGES=[{n:1,label:'표시가',pill:'표시가',sub:'검색 결과에 보이는 가격',next:'결제창 금액 확인하기'},{n:2,label:'결제할 때 내는 돈',pill:'결제할 때',sub:'결제창에서 읽은 금액',next:'카드 혜택까지 계산하기'},{n:3,label:'청구 후 실제 부담',pill:'청구 후',sub:'카드 청구할인 반영 · 적립은 따로'}];
// k: base | add | sub | fail(할인 적용 실패) | miss(혜택 미적용) | zero(무료) | point(나중에 돌아오는 적립, 기본 순위 제외)
const MALLS=[
 {id:'naver',name:'네이버 스마트스토어',short:'네이버',seller:'유그린 공식스토어',badge:['N','#03C75A','#fff'],note1:'공식스토어 · 쿠폰 받기 전 가격',lines:[{s:1,k:'base',label:'표시가',amt:76000},{s:2,k:'sub',label:'스토어 알림받기 쿠폰',amt:-3000,tag:'결제창',short:'스토어 쿠폰'},{s:3,k:'sub',label:'현대카드 5% 청구할인',amt:-3650,tag:'실적 충족',tagc:'good',short:'현대카드 청구할인'},{s:3,k:'point',label:'네이버플러스 적립 5%',amt:-3650,tag:'현금 아님',short:'멤버십 적립'}],meta:{arrive:'11/25(수) 도착',as:'국내 A/S'}},
 {id:'coupang',name:'쿠팡',short:'쿠팡',seller:'유그린 공식 스토어',badge:['C','#FFF1EF','#E4302B'],note1:'와우 회원가',lines:[{s:1,k:'base',label:'표시가',amt:79900},{s:2,k:'sub',label:'웰컴백 쿠폰 (나에게만)',amt:-8000,tag:'개인 쿠폰',short:'나만 받은 쿠폰'},{s:2,k:'zero',label:'배송비',val:'무료'},{s:3,k:'point',label:'와우 쿠팡캐시 적립 1%',amt:-719,tag:'현금 아님',short:'캐시 적립'}],meta:{arrive:'내일 11/23(월) 도착',as:'국내 A/S'}},
 {id:'11st',name:'11번가',short:'11번가',seller:'유그린샵',badge:['11','#FF0038','#fff'],note1:'배송비 별도 가격',lines:[{s:1,k:'base',label:'표시가',amt:69900},{s:2,k:'add',label:'배송비',amt:3000,tag:'별도',tagc:'bad',short:'배송비'},{s:3,k:'miss',label:'삼성카드 7% 청구할인',tag:'실적 미달',tagc:'bad',short:'삼성카드 할인 (실적 미달)'}],meta:{arrive:'11/25(수) 도착',as:'국내 A/S'}},
 {id:'ali',name:'알리익스프레스',short:'알리',seller:'Ugreen Official Store',badge:['A','#FF4747','#fff'],note1:"'새로운 쇼핑객 전용' 가격",lines:[{s:1,k:'base',label:'표시가 (새로운 쇼핑객 전용)',amt:63648},{s:2,k:'fail',label:'신규 회원가 → 원래 가격',amt:10064,tag:'적용 안 됨',tagc:'bad',short:'신규 회원가 미적용'},{s:2,k:'zero',label:'배송비',val:'무료'},{s:3,k:'miss',label:'현대카드 5% 청구할인',tag:'해외 가맹점 제외',tagc:'bad',short:'카드 할인 (해외 가맹점 제외)'}],meta:{arrive:'11/28~12/4 도착 예정',as:'해외 판매처 경유'}},
];
const PMIN=60000,PMAX=88000,PTICK=5000,PROW=62;
const won=n=>Math.abs(n).toLocaleString('ko-KR');
const ppct=v=>(v-PMIN)/(PMAX-PMIN)*100;
const mallById=id=>MALLS.find(m=>m.id===id);
const isPoint=l=>l.k==='point';
const mallPrice=(m,st,pts=state.points)=>m.lines.filter(l=>l.s<=st&&(pts||!isPoint(l))).reduce((a,l)=>a+(l.amt||0),0);
const mallRank=(st,pts=state.points)=>[...MALLS].sort((a,b)=>mallPrice(a,st,pts)-mallPrice(b,st,pts)).map(m=>m.id);
function amtText(l){
 if(l.k==='zero')return `<b class="pc-muted">${l.val}</b>`;
 if(l.k==='miss')return `<b class="pc-muted">미적용</b>`;
 if(l.k==='point')return state.points?`<b class="pc-down">−${won(l.amt)}</b>`:`<b class="pc-muted">${won(l.amt)}P 따로</b>`;
 return l.amt>0?`<b class="pc-up">+${won(l.amt)}</b>`:`<b class="pc-down">−${won(l.amt)}</b>`;
}
function routes(){
 const ticks=[];for(let v=PMIN;v<PMAX;v+=PTICK)ticks.push(v);
 return `<h2>구매 경로와 진짜 가격</h2><p class="lead">UGREEN 55851을 판매처 4곳에서, 내 지갑 조건으로 다시 계산해요. 케이블·어댑터 4개는 별도예요.</p>
<div class="pc-wallet"><span>내 지갑 프로필</span><i>현대카드 · 전월실적 충족</i><i class="warn">삼성카드 · 전월실적 미달</i><i>네이버플러스</i><i>쿠팡 와우</i></div>
<div class="pc-tabs" role="tablist">${PSTAGES.map((t,k)=>`${k?'<span class="pc-arrow" aria-hidden="true">→</span>':''}<button data-pstage="${t.n}" role="tab"><span class="n">${t.n}</span><span><b>${t.label}</b><small>${t.sub}</small></span></button>`).join('')}</div>
<div class="pc-chart"><div class="pc-hd"><span id="pc-sub"></span><div class="pc-legend"><span><i class="lg win"></i>현재 1위</span><span><i class="lg up"></i>늘어난 금액</span><span><i class="lg down"></i>줄어든 금액</span><span><i class="lg tk"></i>표시가</span></div><button class="pc-ptog" id="pc-ptog" role="switch" aria-checked="false"><i></i>적립까지 포함</button></div>
<div class="pc-rows" style="height:${MALLS.length*PROW}px"><div class="pc-grid">${ticks.map(v=>`<i style="left:${ppct(v)}%"></i>`).join('')}</div>${MALLS.map(m=>{const [t,bg,fg]=m.badge;return `<div class="pc-row" id="pc-row-${m.id}" data-mall="${m.id}"><div class="pc-rank"><b></b><em></em></div><div class="pc-mall"><span class="pc-badge" style="background:${bg};color:${fg}">${t}</span><span><b>${m.name}</b><small>${m.seller}</small></span></div><div class="pc-bar"><div class="bar"></div><div class="over"></div><div class="saved"></div><div class="tick"></div><div class="price"><b></b><em></em></div><div class="reason"></div></div></div>`;}).join('')}</div>
<div class="pc-axis">${ticks.map(v=>`<span style="left:${ppct(v)}%">${v/10000}만${v===PMIN?' 원':''}</span>`).join('')}</div></div>
<div class="pc-insight"><span id="pc-step"></span><div><div id="pc-title" class="pc-title"></div><div id="pc-text" class="pc-text"></div></div><div id="pc-stats" class="pc-stats"></div></div>
<div class="node-action pc-actions"><p class="small">시연용 예시 데이터 · 알리 63,648원과 73,712원만 팀원의 2026-11-09 구매 검토 기록이고, 나머지 가격·쿠폰·카드 조건은 예시예요.</p><button id="pc-next" class="primary"></button></div>`;
}
function priceDetail(){
 if(!state.priceMall)state.priceMall=mallRank(state.priceStage)[0];
 const st=state.priceStage,m=mallById(state.priceMall),r=mallRank(st).indexOf(m.id)+1,[t,bg,fg]=m.badge;
 const icons={base:['₩','#EEF0F4','#475569'],add:['+','#FFF1F3','#E11D48'],sub:['−','#E7F8F1','#059669'],fail:['!','#FFF1F3','#E11D48'],miss:['×','#F1F5F9','#94A3B8'],zero:['0','#F1F5F9','#94A3B8']};
 const line=(l,dim)=>{const [ic,b,f]=icons[l.k];return `<div class="ln${dim?' dim':''}"><span class="l"><span class="ic" style="background:${b};color:${f}">${ic}</span>${l.k==='miss'?`<s>${l.label}</s>`:l.label}${l.tag?`<span class="tag ${l.tagc||''}">${l.tag}</span>`:''}</span>${l.k==='base'?`<b>${won(l.amt)}원</b>`:`<span>${amtText(l)}</span>`}</div>`;};
 let rows='';
 m.lines.filter(l=>l.s<=2).forEach(l=>rows+=line(l,l.s>st));
 rows+=`<div class="ln subtotal${st<2?' dim':''}"><span>결제할 때 내는 돈</span><span>${won(mallPrice(m,2))}원</span></div>`;
 m.lines.filter(l=>l.s===3&&!isPoint(l)).forEach(l=>rows+=line(l,false));
 rows+=`<div class="ln total${st<3?' dim':''}"><span>청구 후 실제 부담</span><b>${won(mallPrice(m,3,false))}원</b></div>`;
 m.lines.filter(isPoint).forEach(l=>rows+=`<div class="ln point${st<3?' dim':''}"><span class="l"><span class="ic" style="background:var(--accent-soft);color:var(--accent)">P</span>나중에 돌아올 적립<span class="tag">현금 아님</span></span><b>${state.points?`적립 포함 ${won(mallPrice(m,3,true))}원`:won(l.amt)+'P'}</b></div>`);
 return `<div class="pc-detail"><div class="p-hd"><span class="pc-badge" style="background:${bg};color:${fg}">${t}</span><span><b>${m.name}</b><small>${m.seller}</small></span><span class="pill">${PSTAGES[st-1].pill} ${r}위</span></div><div class="lines">${rows}</div><div class="meta"><div><small>도착 예정</small><b>${m.meta.arrive}</b></div><div><small>AS · 보증</small><b>${m.meta.as}</b></div></div><div class="pc-cta" role="note">🔒 ${m.short} 결제창 열기 <span>결제는 내가 직접</span></div><p class="pc-cta-note">에이전트는 결제 버튼 바로 앞에서 멈춰요</p></div>`;
}
function updatePrice(){
 if(!$('.pc-rows'))return;
 const st=state.priceStage,pts=state.points,rk=mallRank(st),rk1=mallRank(1);
 if(!state.priceMall||!mallById(state.priceMall))state.priceMall=rk[0];
 document.querySelectorAll('[data-pstage]').forEach(b=>{const n=+b.dataset.pstage;b.classList.toggle('on',n===st);b.classList.toggle('done',n<st);b.setAttribute('aria-selected',n===st);});
 MALLS.forEach(m=>{
  const el=$('#pc-row-'+m.id),r=rk.indexOf(m.id),mv=rk1.indexOf(m.id)-r,p=mallPrice(m,st),d0=mallPrice(m,1);
  el.style.transform=`translateY(${r*PROW}px)`;el.classList.toggle('win',r===0);el.classList.toggle('sel',state.priceMall===m.id);
  el.querySelector('.pc-rank b').textContent=r+1;
  const em=el.querySelector('.pc-rank em');em.className=mv>0?'pc-down':mv<0?'pc-up':'pc-muted';em.textContent=st===1?'':mv>0?`▲${mv}`:mv<0?`▼${-mv}`:'–';
  el.querySelector('.bar').style.width=ppct(p)+'%';
  const over=el.querySelector('.over'),saved=el.querySelector('.saved'),tick=el.querySelector('.tick');
  over.style.left=ppct(d0)+'%';over.style.width=Math.max(0,ppct(p)-ppct(d0))+'%';
  saved.style.left=ppct(Math.min(p,d0))+'%';saved.style.width=Math.max(0,ppct(d0)-ppct(p))+'%';saved.style.opacity=p<d0?1:0;
  tick.style.left=ppct(d0)+'%';tick.style.opacity=st===1?0:1;
  const pr=el.querySelector('.price'),diff=p-d0;pr.style.left=ppct(Math.max(p,d0))+'%';pr.querySelector('b').textContent=won(p)+'원';
  const de=pr.querySelector('em');de.className=diff>0?'pc-up':'pc-down';de.textContent=st===1||diff===0?'':(diff>0?'+':'−')+won(diff);
  const ls=m.lines.filter(l=>l.s===st&&l.short);
  el.querySelector('.reason').innerHTML=st===1?`<span class="pc-muted">${m.note1}</span>`:ls.length?ls.map(l=>`${l.short} ${amtText(l)}`).join('<span class="pc-muted"> · </span>'):'<span class="pc-muted">추가 혜택 없음</span>';
 });
 const top1=mallById(rk1[0]),top2=mallById(mallRank(2)[0]),cash=mallById(mallRank(3,false)[0]),withPts=mallById(mallRank(3,true)[0]),cp=mallById('coupang');
 let title,text,stats;
 if(st===1){const ps=MALLS.map(m=>mallPrice(m,1));title=`표시가만 보면 최저가는 <mark>${top1.short} ${won(mallPrice(top1,1))}원</mark>`;text=`${top1.note1}이에요. 검색 결과가 보여주는 건 여기까지예요.`;stats=[['비교한 판매처',`${MALLS.length}곳`],['표시가 최대 차이',won(Math.max(...ps)-Math.min(...ps))+'원']];}
 else if(st===2){const moved=MALLS.filter(m=>rk1.indexOf(m.id)!==mallRank(2).indexOf(m.id)).length;title=`결제창에 들어가 보니 1위가 <mark>${top2.short}</mark>으로 바뀌었어요`;text=`알리 63,648원은 '새로운 쇼핑객 전용' 가격이라 원래 가격이 됐고, 11번가는 배송비가 붙었어요.`;stats=[['순위가 바뀐 판매처',`${MALLS.length}곳 중 ${moved}곳`],[`표시가 1위(${top1.short})의 숨은 비용`,'+'+won(mallPrice(top1,2)-mallPrice(top1,1))+'원','bad']];}
 else if(!pts){title=`카드 청구할인까지 넣은 실제 부담은 <mark>${cash.short} ${won(mallPrice(cash,3,false))}원</mark>이 가장 적어요`;text=`적립은 나중에 돌아오는 포인트라 따로 봤어요. 적립까지 치면 ${withPts.short} ${won(mallPrice(withPts,3,true))}원이에요.`;stats=[[`표시가 1위(${top1.short})보다`,won(mallPrice(top1,3,false)-mallPrice(cash,3,false))+'원 적게','good'],['내일 받아야 한다면',`쿠팡 +${won(mallPrice(cp,3,false)-mallPrice(cash,3,false))}원`]];}
 else{title=`적립까지 치면 <mark>${withPts.short} ${won(mallPrice(withPts,3,true))}원</mark> (1포인트 = 1원)`;text=`적립은 결제 뒤 그 몰에서만 쓰는 포인트예요. 현금 기준 최저는 ${cash.short} ${won(mallPrice(cash,3,false))}원이에요.`;stats=[['현금 기준 1위',`${cash.short} ${won(mallPrice(cash,3,false))}원`],['적립 포함 1위',`${withPts.short} ${won(mallPrice(withPts,3,true))}원`,'good']];}
 $('#pc-step').textContent='STEP '+st;$('#pc-title').innerHTML=title;$('#pc-text').textContent=text;
 $('#pc-stats').innerHTML=stats.map(([l,v,c])=>`<div class="${c||''}"><small>${l}</small><b>${v}</b></div>`).join('');
 $('#pc-sub').textContent=(st===3&&pts?'적립 포함 기준':PSTAGES[st-1].label+' 기준')+' · 싼 순서';
 const tog=$('#pc-ptog');tog.classList.toggle('hide',st!==3);tog.setAttribute('aria-checked',String(pts));
 const next=$('#pc-next');next.textContent=st<3?PSTAGES[st-1].next+' →':'↺ 표시가부터 다시 보기';
 const detail=$('.price-detail-node .branch-body');if(detail)detail.innerHTML=priceDetail();
}
function setPriceStage(st){save();state.priceStage=st;if(!state.pickedMall)state.priceMall=null;updatePrice();scheduleCamera(true);}

const exampleQuestion='두 대의 컴퓨터를 하나의 모니터에서 전환하면서 사용하고 싶어요.';
let loadingTimers=[],cameraFrame=0;
function cancelLoading(){loadingTimers.forEach(clearTimeout);loadingTimers=[];}
function renderDemo(){
 const graph=state.phase==='graph';
 $('#chat-screen').hidden=graph;$('#viewport').hidden=!graph;$('#camera-hint').hidden=!graph;
 $('#previous-step').hidden=!graph;$('#previous-step').disabled=state.step===0;
 $('#journey-status').textContent=graph?`${String(state.step+1).padStart(2,'0')} / 06 · ${titles[state.step]}`:'원하는 사용 경험을 이야기해주세요.';
 if(graph){renderGraph(true);return;}
 if(state.phase==='loading'){renderLoading();return;}
 $('#chat-screen').innerHTML=`<div class="chat-home"><div class="chat-mark" aria-hidden="true">✳</div><h2>무엇을 알고 사볼까요?</h2><p class="chat-subtitle">제품 이름을 몰라도 괜찮아요.<br>만들고 싶은 환경, 원하는 경험을 이야기해주세요.</p><form id="chat-form" class="composer"><label class="sr-only" for="chat-question">원하는 쇼핑 경험</label><textarea id="chat-question" maxlength="500" rows="3" placeholder="어떤 도움이 필요한가요?">${escapeHTML(state.question)}</textarea><div class="composer-bottom"><span>Enter로 보내기 · Shift + Enter로 줄바꿈</span><button id="send-question" type="submit" aria-label="질문 보내기">↑</button></div></form><button id="example-question" class="prompt-chip">예시 : 두 컴퓨터를 하나의 모니터로 사용하고 싶어요 ↗</button><p class="chat-note">KVM 구매 과정을 보여주는 프로토타입입니다.</p></div>`;
 $('#example-question').onclick=()=>{$('#chat-question').value=exampleQuestion;$('#chat-question').focus();$('#chat-question').dispatchEvent(new Event('input'));};
 $('#chat-form').onsubmit=e=>{e.preventDefault();submitQuestion();};
 $('#chat-question').oninput=()=>{state.question=$('#chat-question').value;$('#chat-question').setCustomValidity('');};
 $('#chat-question').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&e.keyCode!==229){e.preventDefault();submitQuestion();}};
}
function renderLoading(){
 $('#chat-screen').innerHTML=`<div class="loading-scene"><div class="sent-question">${escapeHTML(state.question)}</div><div class="thinking"><div class="thinking-symbol" aria-hidden="true">✳</div><div><strong id="loading-label" role="status">요청에서 시작할 지점을 찾고 있어요</strong><p>알아야 할 내용을 그래프로 펼칠게요.</p><div class="loading-dots" aria-hidden="true"><i></i><i></i><i></i></div></div></div><div class="loading-preview" aria-hidden="true"><span></span><b></b><span></span><b></b><span></span></div><p class="chat-note">그래프 생성 연출 · 실제 AI 분석은 연결 전입니다.</p></div>`;
}
function submitQuestion(){
 if(state.phase!=='chat')return;
 const input=$('#chat-question'),text=input.value.trim();
 if(!text){input.setCustomValidity('원하는 사용 경험을 입력해주세요.');input.reportValidity();return;}
 cancelLoading();state.question=text;state.phase='loading';renderDemo();
 loadingTimers.push(setTimeout(()=>{if($('#loading-label'))$('#loading-label').textContent='질문과 설명을 하나의 흐름으로 연결하고 있어요';},700));
 loadingTimers.push(setTimeout(()=>{if(slide!==DEMO||state.phase!=='loading')return;state.phase='graph';state.step=1;state.max=1;renderDemo();loadingTimers=[];},1550));
}
function summaries(i){return [state.question,state.solution==='kvm'?'KVM 장치 구매':state.solution==='selector'?'HDMI 선택기':'프로그램 활용','개념과 종류 살펴보기',`${state.computers} / ${state.monitor}`,state.priorities.join(' → '),`${PSTAGES[state.priceStage-1].label} 기준 1위 · ${mallById(mallRank(state.priceStage)[0]).short}`][i];}
function advance(){
 save();
 if(state.step===0&&!state.question.trim()){$('#question').setCustomValidity('원하는 사용 경험을 입력해주세요.');$('#question').reportValidity();$('#question').oninput=()=>$('#question').setCustomValidity('');return;}
 if(state.step===1&&state.solution!=='kvm')return;
 if(state.step===2&&state.tab==='concept'){state.tab='types';renderGraph(false);return;}
 if(state.step<5)goForward(state.step+1);
}
const workScripts={1:['요청에서 원하는 사용 경험 파악 중','가능한 해결 방식 조사 중','방식별 필요 조건 정리 중'],2:['KVM 개념과 종류 정리 중','모니터 S27B610 단자·주사율 확인 중','75Hz가 나오는 연결 방식 추리는 중'],3:['선택을 바꿀 수 있는 조건 찾는 중','사용자에게만 확인할 수 있는 항목 정리 중'],4:['DP KVM 후보 검색 중','75Hz·맥북 호환 확인 중','필요한 케이블까지 정리 중'],5:['구매처 탐색 중','결제창 금액 확인 중','쿠폰·카드 혜택 계산 중']};
let workTimers=[],freshGroup=null,freshWork=false;
function cancelWork(){workTimers.forEach(clearTimeout);workTimers=[];if(state.working!=null)state.working=null;}
function markLine(i){document.querySelectorAll('.agent-log li').forEach((li,k)=>{li.classList.toggle('done',k<i);li.classList.toggle('running',k===i);li.classList.toggle('shown',k<=i);});}
const reducedMotion=()=>false; // 발표용: OS의 '동작 줄이기' 설정과 상관없이 애니메이션을 보여준다
let navBusy=false,expandMode=null;
// Shrink the open explanation card into its collapsed spot before the canvas moves on.
function collapseActive(done){
 const el=$('.graph-node.active');
 if(!el||el.classList.contains('working')||reducedMotion()){done();return;}
 const W=el.offsetWidth,H=el.offsetHeight,top=210-parseFloat(el.style.top),left=(S-C)/2,ch=96;
 if(H<top+ch){done();return;}
 el.classList.add('collapsing');
 const anim=el.animate([{clipPath:'inset(0px 0px 0px 0px round 10px)'},{clipPath:`inset(${top}px ${W-left-C}px ${H-top-ch}px ${left}px round 10px)`}],{duration:480,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
 anim.onfinish=done;
}
function playExpand(el,mode){
 if(!el||reducedMotion())return;
 const W=el.offsetWidth,H=el.offsetHeight;
 const from=mode==='collapsed'?`inset(${Math.min(182,H-96)}px ${W-(S-C)/2-C}px ${Math.max(0,H-182-96)}px ${(S-C)/2}px round 10px)`:`inset(0px 0px ${Math.max(0,H-mode)}px 0px round 10px)`;
 el.animate([{clipPath:from},{clipPath:'inset(0px 0px 0px 0px round 10px)'}],{duration:620,easing:'cubic-bezier(.2,.8,.2,1)'});
 const body=el.querySelector('.node-body');if(body)body.animate([{opacity:0},{opacity:1}],{duration:380,delay:mode==='collapsed'?260:180,fill:'backwards'});
}
function navigate(apply){if(navBusy)return;save();navBusy=true;collapseActive(()=>{navBusy=false;apply();});}
function openStep(n){if(n===state.step&&state.working==null)return;navigate(()=>{cancelWork();state.step=n;expandMode='collapsed';renderGraph(true);});}
function goForward(t){if(t<=state.max){openStep(t);return;}
 navigate(()=>{cancelWork();
 state.step=t;state.max=t;state.working=t;freshWork=true;renderGraph(true);freshWork=false;
 const lines=workScripts[t]||['조사 중'],gap=780,start=950;
 lines.forEach((_,i)=>workTimers.push(setTimeout(()=>markLine(i),start+i*gap)));
 workTimers.push(setTimeout(()=>markLine(lines.length),start+lines.length*gap-150));
 workTimers.push(setTimeout(()=>{if(state.working!==t)return;workTimers=[];const w=$('.graph-node.working');state.working=null;freshGroup=t;expandMode=w?w.offsetHeight:null;renderGraph(true);freshGroup=null;},start+lines.length*gap+350));
 });
}
function focusCurrent(animate=true){
 if(slide!==DEMO||state.phase!=='graph')return;
 const viewport=$('#viewport'),world=$('#world'),active=$('.graph-node.active');if(!active||!viewport.clientHeight)return;
 const relevant=[active];
 if(state.working==null&&state.step>=4)relevant.push(...document.querySelectorAll(`[data-branch-group="${state.step}"]`));
 // Every node stays on the canvas; neighbours slide past and fade into the blurred edges.
 document.querySelectorAll('.graph-node').forEach(el=>el.classList.toggle('context',!relevant.includes(el)));
 const left=Math.min(...relevant.map(el=>el.offsetLeft)),top=Math.min(...relevant.map(el=>el.offsetTop));
 const right=Math.max(...relevant.map(el=>el.offsetLeft+el.offsetWidth)),bottom=Math.max(...relevant.map(el=>el.offsetTop+el.offsetHeight));
 const padding=viewport.clientWidth<700?16:28;
 const scale=Math.min(1,(viewport.clientWidth-2*padding)/(right-left),(viewport.clientHeight-2*padding)/(bottom-top));
 const tx=(viewport.clientWidth-(right-left)*scale)/2-left*scale,ty=padding-top*scale;
 if(!animate)world.classList.add('no-camera-animation');
 world.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`;
 world.dataset.scale=scale.toFixed(3);
 if(!animate){world.getBoundingClientRect();world.classList.remove('no-camera-animation');}
}
function scheduleCamera(animate=true){cancelAnimationFrame(cameraFrame);cameraFrame=requestAnimationFrame(()=>focusCurrent(animate));}
const S=640,C=230,G=-140,BW=220,W5=820,DW=330;
const slotX=i=>{let x=70;for(let k=0;k<i;k++)x+=k===4?S+90+BW+120:S+G;return x;};
function workingBody(i){const lines=workScripts[i]||['조사 중'];return `<div class="node-body agent-work"><div class="agent-head"><span class="agent-orb" aria-hidden="true"></span><strong>에이전트가 조사하고 있어요</strong></div><ol class="agent-log" role="status">${lines.map(l=>`<li><span class="mark" aria-hidden="true"></span><span>${l}<span class="ellipsis" aria-hidden="true">…</span></span></li>`).join('')}</ol><p class="small">시연 연출 · 실제 검색과 조사는 아직 연결 전이에요.</p></div>`;}
function renderGraph(move){
 const nodes=[];
 for(let i=0;i<=state.max;i++){const active=i===state.step,w=active?(i===5?W5:S):C;nodes.push({i,x:active?slotX(i):slotX(i)+(S-C)/2,w,y:active?28:210});}
 const parts=[],paths=[];let x=0;
 const link=(a,b,fresh)=>({d:`M${a.x} ${a.y} C${a.x+45} ${a.y},${b.x-45} ${b.y},${b.x} ${b.y}`,fresh});
 const g4={bx:slotX(4)+S+90,by:state.step===4?60:165};
 nodes.forEach((n,j)=>{
  const working=n.i===state.working;
  if(j){const prev=nodes[j-1];const from=n.i===5?{x:g4.bx+BW,y:g4.by+40}:{x:prev.x+prev.w,y:prev.y+35};paths.push(link(from,{x:n.x,y:n.y+35},working&&freshWork));}
  const active=n.i===state.step;
  const body=working?workingBody(n.i):active?`<div class="node-body ${freshGroup===n.i?'reveal-body':''}">${[question,solution,learn,environment,candidates,routes][n.i]()}${n.i<4?`<div class="node-action"><button id="node-next" class="primary" ${n.i===1&&state.solution!=='kvm'?'disabled':''}>${n.i===2&&state.tab==='concept'?'종류도 이해하기':'다음'} →</button></div>`:''}</div>`:`<div class="node-summary">${escapeHTML(summaries(n.i))}</div>`;
  parts.push(`<section class="graph-node ${active?'active':''} ${working?'working':''} ${working&&freshWork?'enter':''}" style="left:${n.x}px;top:${n.y}px;width:${n.w}px" data-node="${n.i}"><button class="node-heading" data-open="${n.i}" aria-expanded="${active}"><span class="node-number">0${n.i+1}</span><span class="node-title">${titles[n.i]}</span><span class="node-status">${working?'<span class="work-badge">조사 중</span>':active?'−':'＋'}</span></button>${body}</section>`);
  x=Math.max(x,n.x+n.w);
 });
 if(state.max>=4&&state.working!==4){const source=nodes[4],{bx,by}=g4;
  const cands=[{h:'UGREEN 55851',p:'DP 1.4 · 컴퓨터 2대 · 모니터 최대 2대',r:'유지 · 75Hz 여유, 1대용과 가격 비슷, 듀얼 확장',keep:1},{h:'NEXT-8002KVM-DP',p:'79,800원 + 배송비 3,000원',r:'제외 · 국내 1순위였지만 더 비싸고 듀얼 불가'},{h:'UGREEN 25962',p:'DP · 모니터 1대용',r:'제외 · 55851과 가격이 거의 같음'}];
  cands.forEach((c,i)=>{const y=by+i*212;paths.push(link({x:source.x+source.w,y:source.y+35},{x:bx,y:y+40},freshGroup===4));parts.push(`<section class="graph-node branch-node ${c.keep?'selected':'dropped'} ${freshGroup===4?'enter':''}" data-branch-group="4" style="left:${bx}px;top:${y}px;animation-delay:${i*.12}s"><div class="branch-body"><div class="branch-label">제품 후보 0${i+1}</div><h3>${c.h}</h3><p>${c.p}</p><p class="cand-reason">${c.r}</p>${c.keep?'<button id="product-open">구매 경로 살펴보기 →</button>':''}</div></section>`);});x=Math.max(x,bx+BW);
 }
 if(state.max>=5&&state.working!==5){const source=nodes[5],bx=slotX(5)+(state.step===5?W5:S)+90,y=state.step===5?28:130;
  paths.push(link({x:source.x+source.w,y:source.y+35},{x:bx,y:y+40},freshGroup===5));
  parts.push(`<section class="graph-node branch-node price-detail-node ${freshGroup===5?'enter':''}" data-branch-group="5" style="left:${bx}px;top:${y}px;width:${DW}px"><div class="branch-body"></div></section>`);x=Math.max(x,bx+DW);
 }
 x+=300;
 const height=900;$('#world').style.width=`${x}px`;$('#world').style.height=`${height}px`;
 $('#world').innerHTML=`<svg class="links" width="${x}" height="${height}" aria-hidden="true">${paths.map(p=>`<path class="${p.fresh?'fresh':''}" d="${p.d}"/>`).join('')}</svg>${parts.join('')}`;
 document.querySelectorAll('[data-open]').forEach(el=>el.onclick=()=>openStep(+el.dataset.open));
 if($('#node-next'))$('#node-next').onclick=advance;
 document.querySelectorAll('[data-solution]').forEach(el=>el.onclick=()=>{state.solution=el.dataset.solution;if(state.solution!=='kvm')state.max=1;renderGraph(false);});
 document.querySelectorAll('[data-tab]').forEach(el=>el.onclick=()=>{state.tab=el.dataset.tab;renderGraph(false);});
 document.querySelectorAll('[data-move]').forEach(el=>el.onclick=()=>{save();const [i,d]=el.dataset.move.split(',').map(Number);[state.priorities[i],state.priorities[i+d]]=[state.priorities[i+d],state.priorities[i]];renderGraph(false);});
 if($('#product-open'))$('#product-open').onclick=()=>goForward(5);
 if($('.pc-rows')){updatePrice();document.querySelectorAll('[data-pstage]').forEach(el=>el.onclick=()=>setPriceStage(+el.dataset.pstage));document.querySelectorAll('[data-mall]').forEach(el=>el.onclick=()=>{state.priceMall=el.dataset.mall;state.pickedMall=true;updatePrice();scheduleCamera(true);});$('#pc-next').onclick=()=>setPriceStage(state.priceStage<3?state.priceStage+1:1);$('#pc-ptog').onclick=()=>{state.points=!state.points;updatePrice();};}
 else if($('.price-detail-node .branch-body'))$('.price-detail-node .branch-body').innerHTML=priceDetail();
 $('#previous-step').disabled=state.step===0;
 $('#journey-status').textContent=`${String(state.step+1).padStart(2,'0')} / 06 · ${titles[state.step]}${state.working!=null?' · 에이전트 조사 중':''}`;
 if(expandMode!=null){playExpand($('.graph-node.active'),expandMode);expandMode=null;}
 scheduleCamera(true);$('#announcement').textContent=titles[state.step];
}
function deckNext(){if(slide===REVEAL&&!reveal){reveal=1;$('.imagine-layout').classList.add('revealed');$('#deck-next').textContent='다음 →';$('#announcement').textContent='사용자의 의문이 나타났습니다.';return;}if(slide<TOTAL-1)showSlide(slide+1);}
$('#deck-next').onclick=deckNext;
const deckBack=()=>{if(slide===REVEAL+1){reveal=1;showSlide(REVEAL,true);}else if(slide>0)showSlide(slide-1);};
$('#deck-back').onclick=deckBack;
$('#previous-step').onclick=()=>{if(state.step>0)openStep(state.step-1);};
$('#reset').onclick=()=>{cancelLoading();cancelWork();freshGroup=null;navBusy=false;expandMode=null;state=defaults();$('#world').style.transform='';renderDemo();};
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('#announcement').textContent='브라우저의 F11 키를 사용해주세요.';}};
document.addEventListener('fullscreenchange',()=>{$('#fullscreen').textContent=document.fullscreenElement?'전체 화면 종료 ↙':'전체 화면 ↗';scheduleCamera(false);});
window.addEventListener('resize',()=>scheduleCamera(false));
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,button')||e.ctrlKey||e.metaKey||e.altKey)return;if(slide!==DEMO&&slide<TOTAL-1&&['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();deckNext();}else if(['ArrowLeft','PageUp'].includes(e.key)&&slide>0){e.preventDefault();deckBack();}});
showSlide(0);
