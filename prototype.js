'use strict';
const $=s=>document.querySelector(s);
const defaults=()=>({phase:'chat',step:0,max:0,solution:'kvm',tab:'concept',question:'',computers:'맥북, Windows 데스크톱',monitor:'모니터 1대 · 모델/해상도 확인 필요',priorities:['가격','배송·AS','사용 편의성'],route:0});
let state=defaults(),slide=0;
const titles=['사용자의 질문','해결책','KVM에 대한 이해','사용자에게 질문','제품 탐색','구매 경로와 가격 조사'];
const escapeHTML=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slides=[
()=>`<div class="title-rule"></div><span class="eyebrow">FUTURE COMMERCE CHALLENGE · TRACK A</span><h1><span class="key">함께</span> 고르는 쇼핑</h1><p class="subtitle">더 깊이 이해하고,<br><span class="key-ink">내 상황에 더 잘 맞는 선택</span>을 만드는 AI.</p><div class="title-bottom">INTERACTIVE PRESENTATION / PROTOTYPE</div>`,
()=>`<span class="eyebrow">OUR CONCEPT</span><h2><span class="muted">빠르고 단순한 구매를 넘어,</span><br>나에게 <span class="key">더 맞고, 더 디테일한</span> 쇼핑.</h2><p class="subtitle">혼자서는 놓쳤을 조건까지 분석하고,<br>그 차이를 이해한 상태에서 선택할 수 있도록.</p><div class="concept-grid"><div><span class="eyebrow">01 · 정밀한 분석</span><h3>내 상황에 맞는 조건을 찾고</h3><p>사용 환경과 선택 후의 결과부터<br>배송·AS, 결제 경로와 혜택까지 살펴봅니다.</p></div><div><span class="eyebrow">02 · 사용자의 이해</span><h3>왜 맞는 선택인지 이해합니다</h3><p>필요한 지식을 배우고, 선택지의 차이를 확인하며<br>사용자가 자신의 기준으로 결정합니다.</p></div></div>`,
()=>`<span class="eyebrow">EXAMPLE</span><div class="example-layout"><div><h2>예시 : 데스크테리어를<br>시작하는 초보자</h2><p class="example-copy">컴퓨터 두 대와 모니터 하나.<br>관련 배경지식은 없지만,<br>나에게 맞는 사용 환경을 만들고 싶습니다.</p><p class="example-question">“두 대의 컴퓨터를 하나의 모니터에서<br>전환하면서 사용하고 싶어요.”</p><p class="small">이 질문에서 시작해, 함께 쇼핑하는 과정을 보여드릴게요.</p></div><div class="desk"><div class="screen">모니터 1대</div><div class="stand"></div><div class="stand-foot"></div><div class="desk-devices"><div class="laptop">노트북</div><div class="tower">PC</div></div><div class="desk-note">무엇을 사야 하고, 어떻게 연결해야 할까요?</div></div></div>`,
()=>`<span class="eyebrow">WHY UNDERSTANDING · 01</span><h2><span class="muted">아무리 뛰어난 에이전트도,</span><br><span class="key">묻지 않으면</span> 알 수 없는 것이 있습니다.</h2><div class="unknown-grid"><div class="unknown-card"><span class="eyebrow">사용자의 상황</span><h3>지금 가진 기기와 사용 환경</h3><ul class="unknown-list"><li><b>기존 기기</b><span>맥북과 PC의 단자는 USB-C? HDMI? DisplayPort?</span></li><li><b>모니터</b><span>해상도와 주사율, 지금 쓰는 케이블</span></li><li><b>사용 환경</b><span>키보드·마우스, 책상 배치, 전환 빈도</span></li></ul></div><div class="unknown-card"><span class="eyebrow">사용자가 우선하는 가치</span><h3>무엇을 먼저 두는지</h3><div class="value-chips"><span>추후 AS</span><span>끊기지 않는 품질</span><span>가격</span></div><div class="value-compare"><div><span class="small">A의 기준</span><p>AS <i>→</i> 품질 <i>→</i> 가격</p></div><div><span class="small">B의 기준</span><p>가격 <i>→</i> 품질 <i>→</i> AS</p></div></div><p class="small">같은 질문이라도 기준이 다르면, 맞는 제품도 달라집니다.</p></div></div><p class="unknown-statement">이 정보는 검색으로 찾을 수 없습니다. <strong>사용자에게 물어야만 알 수 있습니다.</strong></p>`,
()=>`<span class="eyebrow">WHY UNDERSTANDING · 02</span><div class="imagine-layout ${reveal?'revealed':''}"><div><h2>이런 답을 받았다고<br>상상해보세요.</h2><p class="example-copy">결론은 빠르지만,<br>그 결론이 어떻게 나왔는지는 보이지 않습니다.</p><div class="imagine-conclusion"><p>답은 있지만, 근거는 보이지 않습니다.</p><strong>에이전트가 얼마나 분석했는지,<br>내 상황에 얼마나 맞는 판단인지<br><span class="key">사용자는 알 수 없습니다.</span></strong></div></div><div class="mock-chat"><div class="bubble user">두 대의 컴퓨터를 하나의 모니터에서<br>전환하면서 사용하고 싶어요.</div><div class="typing"><i></i><i></i><i></i></div><div class="bubble agent"><span class="agent-name">AI 쇼핑 에이전트</span>바로 KVM 구매하시면 됩니다.<div class="mock-product"><div class="mock-thumb">KVM</div><div><strong>2포트 KVM 스위치</strong><span>추천 상품 · 바로 구매 →</span></div></div></div><div class="doubts">${['내 맥북에 그대로 연결될까?','몇 개의 제품을 비교하고 고른 걸까?','내가 AS를 중요하게 여기는 걸 알까?','화면이 끊기지는 않을까?','이 가격이 실제로 내가 내는 금액일까?'].map((q,i)=>`<span style="--d:${i*0.18}s">${q}</span>`).join('')}</div></div></div>`];
const DEMO=slides.length;let reveal=0;
function save(){if($('#chat-question'))state.question=$('#chat-question').value;if($('#question'))state.question=$('#question').value;if($('#computers'))state.computers=$('#computers').value;if($('#monitor'))state.monitor=$('#monitor').value;}
function showSlide(n,keepReveal){save();if(n!==DEMO&&state.phase==='loading'){cancelLoading();state.phase='chat';}if(n!==DEMO)cancelWork();if(!keepReveal)reveal=0;slide=n;$('#presentation').hidden=n===DEMO;$('#demo').hidden=n!==DEMO;$('#deck-back').disabled=n===0;$('#deck-next').hidden=n===DEMO;$('#deck-next').textContent=n===DEMO-1?(reveal?'프로토타입 시작 →':'사용자의 생각 보기 →'):'다음 →';$('#page-label').textContent=['제목','컨셉','예시 소개','왜 이해가 필요한가','결과만 받은 사용자','프로토타입'][n];$('#page-count').textContent=`0${n+1} / 0${DEMO+1}`;$('#mode-label').textContent=n===DEMO?'PROTOTYPE · KVM SHOPPING':'FUTURE COMMERCE CHALLENGE · TRACK A';if(n<DEMO){$('#presentation').innerHTML=`<section class="slide">${slides[n]()}</section>`;$('#presentation').scrollTop=0;}else renderDemo();}

function question(){return `<span class="tag">01 / 원하는 경험에서 시작</span><h2>어떤 환경을<br>만들고 싶으세요?</h2><p class="lead">제품 이름을 몰라도 괜찮아요. 하고 싶은 일을 들려주세요.</p><label class="field">나의 요청<textarea id="question" maxlength="500">${escapeHTML(state.question)}</textarea></label><div class="setup"><div class="setup-row"><div class="device">컴퓨터 A</div><div class="device">컴퓨터 B</div></div><div class="setup-line">↓ ↓</div><div class="device" style="width:180px;margin:auto">하나의 모니터</div></div><div class="why">먼저 원하는 사용 경험을 이해해요.<br>이 요청을 해결하는 방법은 하나만 있는 게 아닐 수 있어요.</div>`}
function solution(){return `<span class="tag">02 / 해결책 선택</span><h2>어떤 방식으로<br>연결할 수 있을까요?</h2><p class="lead">모니터 전환과 입력장치 공유를 어떻게 해결할지 살펴봐요.</p><div class="choices"><button class="choice" data-solution="kvm" aria-pressed="${state.solution==='kvm'}"><span class="radio"></span><span><strong>KVM 장치 구매</strong><span class="desc">모니터와 키보드·마우스 연결을 컴퓨터 사이에서 전환하는 방법을 살펴봐요. 지원 범위는 제품마다 확인해요.</span></span></button><button class="choice" data-solution="software" aria-pressed="${state.solution==='software'}"><span class="radio"></span><span><strong>프로그램 활용</strong><span class="desc">소프트웨어 기반의 공유 방법도 있어요. 화면 전환까지 원하는 방식으로 가능한지는 별도 확인이 필요해요.</span></span></button></div>${state.solution==='software'?'<div class="callout">이 구상안은 KVM 구매 경로까지 설계되어 있어요. 프로그램 경로의 상세 내용은 아직 준비하지 않았어요.</div>':'<div class="why">장치를 바로 추천하기 전에,<br>KVM이 무엇인지 함께 이해해볼게요.</div>'}`}
function learn(){return `<span class="tag">03 / 선택에 필요한 배경지식</span><h2>KVM을 이해하면<br>비교 기준이 보여요.</h2><div class="tabs" role="tablist" aria-label="KVM 설명"><button role="tab" aria-selected="${state.tab==='concept'}" class="${state.tab==='concept'?'selected':''}" data-tab="concept">① 개념</button><button role="tab" aria-selected="${state.tab==='types'}" class="${state.tab==='types'?'selected':''}" data-tab="types">② 종류와 확인점</button></div>${state.tab==='concept'?`<div class="definition"><strong>Keyboard · Video · Mouse</strong><p>여러 컴퓨터가 모니터와 키보드·마우스를 공유하도록 연결하고, 사용할 컴퓨터를 전환하는 장치예요.</p></div><div class="setup"><div class="setup-row"><div class="device">컴퓨터 A</div><div class="device">컴퓨터 B</div></div><div class="setup-line">↓ ↓</div><div class="switch">KVM 스위치</div><div class="setup-line">↓</div><div class="setup-row"><div class="device">모니터</div><div class="device">키보드 · 마우스</div></div></div><p class="small">연결 개념을 보여주는 도식이에요. 실제 포트와 케이블 구성은 장비 및 제품 확인 후 달라져요.</p>`:`<div class="type-list"><div><strong>영상 연결 방식</strong><p>내 컴퓨터와 모니터의 단자에 맞는 연결인지 확인해야 해요.</p></div><div><strong>연결할 컴퓨터와 모니터 수</strong><p>필요한 연결 수를 지원하는 제품인지 살펴봐요.</p></div><div><strong>화면 조건과 주변기기</strong><p>원하는 해상도·주사율과 사용할 입력장치의 지원 여부를 확인해요.</p></div></div><div class="why">같은 KVM이라도 내 장비에 따라 필요한 구성이 달라져요.<br>다음 단계에서 나의 환경과 우선순위를 정리해요.</div>`}`}
function environment(){return `<span class="tag">04 / 나의 상황 파악</span><h2>당신의 책상에 맞춰<br>살펴볼게요.</h2><p class="lead">예시를 수정하고, 중요하게 생각하는 순서를 정해주세요.</p><label class="field">두 컴퓨터의 종류<input id="computers" value="${escapeHTML(state.computers)}" placeholder="예: 맥북, Windows 데스크톱" maxlength="180"></label><label class="field">모니터의 종류와 개수<input id="monitor" value="${escapeHTML(state.monitor)}" placeholder="예: 모니터 1대, 모델명" maxlength="180"></label><div class="priority-title">중요하게 생각하는 가치 <span class="small">· 위쪽일수록 중요해요</span></div>${state.priorities.map((p,i)=>`<div class="priority-row"><span class="rank">${i+1}</span><span class="name">${p}</span><button data-move="${i},-1" aria-label="${p} 우선순위 올리기" ${i===0?'disabled':''}>↑</button><button data-move="${i},1" aria-label="${p} 우선순위 내리기" ${i===state.priorities.length-1?'disabled':''}>↓</button></div>`).join('')}<p class="small">모르는 정보는 ‘확인 필요’로 남겨도 괜찮아요.</p>`}

function candidates(){return `<h2>제품별로 살펴볼게요.</h2><p class="lead">내 장비와 우선순위를 기준으로, 각 후보의 탐색을 이어가요.</p><div class="summary">${escapeHTML(state.computers)}<br>${escapeHTML(state.monitor)}<br>우선순위: ${state.priorities.join(' → ')}</div><div class="why">오른쪽의 UGREEN 후보를 선택해<br>구매 경로 탐색으로 이어가세요.</div><p class="small">구상안의 후보를 보여주는 시연이에요.<br>제품 사양과 개인 적합성은 아직 검증하지 않았어요.</p>`;}
function routes(){return `<h2>구매 경로와 가격 조사</h2><p class="lead">UGREEN KVM의 구매 옵션을 나누어 살펴봐요.</p><div class="summary">구매처 · 상품과 옵션 가격<br>결제 경로 · 적용 가능한 혜택</div><div class="why">오른쪽의 각 구매 옵션을 펼쳐보세요.</div><div class="end">여기까지가 이번 구상안의 범위예요.<p>구매처와 가격의 실제 데이터는 아직 연결하지 않았어요.</p></div>`;}

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
 $('#chat-screen').innerHTML=`<div class="chat-home"><div class="chat-mark" aria-hidden="true">✳</div><h2>어떤 선택을 함께 고민해볼까요?</h2><p class="chat-subtitle">제품 이름을 몰라도 괜찮아요.<br>만들고 싶은 환경, 원하는 경험을 이야기해주세요.</p><form id="chat-form" class="composer"><label class="sr-only" for="chat-question">원하는 쇼핑 경험</label><textarea id="chat-question" maxlength="500" rows="3" placeholder="어떤 도움이 필요한가요?">${escapeHTML(state.question)}</textarea><div class="composer-bottom"><span>Enter로 보내기 · Shift + Enter로 줄바꿈</span><button id="send-question" type="submit" aria-label="질문 보내기">↑</button></div></form><button id="example-question" class="prompt-chip">예시 : 두 컴퓨터를 하나의 모니터로 사용하고 싶어요 ↗</button><p class="chat-note">KVM 구매 과정을 보여주는 프로토타입입니다.</p></div>`;
 $('#example-question').onclick=()=>{$('#chat-question').value=exampleQuestion;$('#chat-question').focus();$('#chat-question').dispatchEvent(new Event('input'));};
 $('#chat-form').onsubmit=e=>{e.preventDefault();submitQuestion();};
 $('#chat-question').oninput=()=>{state.question=$('#chat-question').value;$('#chat-question').setCustomValidity('');};
 $('#chat-question').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing&&e.keyCode!==229){e.preventDefault();submitQuestion();}};
}
function renderLoading(){
 $('#chat-screen').innerHTML=`<div class="loading-scene"><div class="sent-question">${escapeHTML(state.question)}</div><div class="thinking"><div class="thinking-symbol" aria-hidden="true">✳</div><div><strong id="loading-label" role="status">요청에서 시작할 지점을 찾고 있어요</strong><p>함께 살펴볼 내용을 그래프로 펼칠게요.</p><div class="loading-dots" aria-hidden="true"><i></i><i></i><i></i></div></div></div><div class="loading-preview" aria-hidden="true"><span></span><b></b><span></span><b></b><span></span></div><p class="chat-note">그래프 생성 연출 · 실제 AI 분석은 연결 전입니다.</p></div>`;
}
function submitQuestion(){
 if(state.phase!=='chat')return;
 const input=$('#chat-question'),text=input.value.trim();
 if(!text){input.setCustomValidity('원하는 사용 경험을 입력해주세요.');input.reportValidity();return;}
 cancelLoading();state.question=text;state.phase='loading';renderDemo();
 loadingTimers.push(setTimeout(()=>{if($('#loading-label'))$('#loading-label').textContent='질문과 설명을 하나의 흐름으로 연결하고 있어요';},700));
 loadingTimers.push(setTimeout(()=>{if(slide!==DEMO||state.phase!=='loading')return;state.phase='graph';state.step=1;state.max=1;renderDemo();loadingTimers=[];},1550));
}
function summaries(i){return [state.question,state.solution==='kvm'?'KVM 장치 구매':'프로그램 활용','개념과 종류 살펴보기',`${state.computers} / ${state.monitor}`,state.priorities.join(' → '),'구매 옵션별 조사'][i];}
function advance(){
 save();
 if(state.step===0&&!state.question.trim()){$('#question').setCustomValidity('원하는 사용 경험을 입력해주세요.');$('#question').reportValidity();$('#question').oninput=()=>$('#question').setCustomValidity('');return;}
 if(state.step===1&&state.solution!=='kvm')return;
 if(state.step===2&&state.tab==='concept'){state.tab='types';renderGraph(false);return;}
 if(state.step<5)goForward(state.step+1);
}
const workScripts={1:['요청에서 원하는 사용 경험 파악 중','가능한 해결 방식 조사 중','방식별 필요 조건 정리 중'],2:['KVM 관련 자료 조사 중','개념과 종류 정리 중','선택에 필요한 확인점 추리는 중'],3:['선택을 바꿀 수 있는 조건 찾는 중','사용자에게만 확인할 수 있는 항목 정리 중'],4:['입력한 장비와 우선순위 반영 중','제품 후보 검색 중','후보별 호환 조건 확인 중'],5:['구매처 탐색 중','결제창 금액 확인 중','쿠폰·카드 혜택 계산 중']};
let workTimers=[],freshGroup=null,freshWork=false;
function cancelWork(){workTimers.forEach(clearTimeout);workTimers=[];if(state.working!=null)state.working=null;}
function markLine(i){document.querySelectorAll('.agent-log li').forEach((li,k)=>{li.classList.toggle('done',k<i);li.classList.toggle('running',k===i);li.classList.toggle('shown',k<=i);});}
const reducedMotion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
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
const S=640,C=230,G=-140,BW=220;
const slotX=i=>{let x=70;for(let k=0;k<i;k++)x+=k===4?S+90+BW+120:S+G;return x;};
function workingBody(i){const lines=workScripts[i]||['조사 중'];return `<div class="node-body agent-work"><div class="agent-head"><span class="agent-orb" aria-hidden="true"></span><strong>에이전트가 조사하고 있어요</strong></div><ol class="agent-log" role="status">${lines.map(l=>`<li><span class="mark" aria-hidden="true"></span><span>${l}<span class="ellipsis" aria-hidden="true">…</span></span></li>`).join('')}</ol><p class="small">시연 연출 · 실제 검색과 조사는 아직 연결 전이에요.</p></div>`;}
function renderGraph(move){
 const nodes=[];
 for(let i=0;i<=state.max;i++){const active=i===state.step,w=active?S:C;nodes.push({i,x:active?slotX(i):slotX(i)+(S-C)/2,w,y:active?28:210});}
 const parts=[],paths=[];let x=0;
 const link=(a,b,fresh)=>({d:`M${a.x} ${a.y} C${a.x+45} ${a.y},${b.x-45} ${b.y},${b.x} ${b.y}`,fresh});
 const g4={bx:slotX(4)+S+90,by:state.step===4?60:165};
 nodes.forEach((n,j)=>{
  const working=n.i===state.working;
  if(j){const prev=nodes[j-1];const from=n.i===5?{x:g4.bx+BW,y:g4.by+40}:{x:prev.x+prev.w,y:prev.y+35};paths.push(link(from,{x:n.x,y:n.y+35},working&&freshWork));}
  const active=n.i===state.step;
  const body=working?workingBody(n.i):active?`<div class="node-body ${freshGroup===n.i?'reveal-body':''}">${[question,solution,learn,environment,candidates,routes][n.i]()}${n.i<4?`<div class="node-action"><button id="node-next" class="primary" ${n.i===1&&state.solution==='software'?'disabled':''}>${n.i===2&&state.tab==='concept'?'종류도 이해하기':'다음'} →</button></div>`:''}</div>`:`<div class="node-summary">${escapeHTML(summaries(n.i))}</div>`;
  parts.push(`<section class="graph-node ${active?'active':''} ${working?'working':''} ${working&&freshWork?'enter':''}" style="left:${n.x}px;top:${n.y}px;width:${n.w}px" data-node="${n.i}"><button class="node-heading" data-open="${n.i}" aria-expanded="${active}"><span class="node-number">0${n.i+1}</span><span class="node-title">${titles[n.i]}</span><span class="node-status">${working?'<span class="work-badge">조사 중</span>':active?'−':'＋'}</span></button>${body}</section>`);
  x=Math.max(x,n.x+n.w);
 });
 if(state.max>=4&&state.working!==4){const source=nodes[4],{bx,by}=g4;
  [0,1,2].forEach(i=>{const y=by+i*165;paths.push(link({x:source.x+source.w,y:source.y+35},{x:bx,y:y+40},freshGroup===4));parts.push(`<section class="graph-node branch-node ${i===0?'selected':''} ${freshGroup===4?'enter':''}" data-branch-group="4" style="left:${bx}px;top:${y}px;animation-delay:${i*.12}s"><div class="branch-body"><div class="branch-label">제품 후보 0${i+1}</div><h3>${i===0?'UGREEN KVM':'후보 미정'}</h3><p>${i===0?'모델 번호 확인 필요':'구상안의 제품 자리'}</p>${i===0?'<button id="product-open">구매 경로 살펴보기 →</button>':''}</div></section>`);});x=Math.max(x,bx+BW);
 }
 if(state.max>=5&&state.working!==5){const source=nodes[5],bx=slotX(5)+S+90;let y=30;
  [1,2,3].forEach(i=>{paths.push(link({x:source.x+source.w,y:source.y+35},{x:bx,y:y+40},freshGroup===5));parts.push(`<section class="graph-node branch-node ${freshGroup===5?'enter':''}" data-branch-group="5" style="left:${bx}px;top:${y}px;animation-delay:${(i-1)*.12}s"><div class="branch-body"><div class="branch-label">구매 옵션 0${i}</div><h3>구매 옵션 ${i}</h3><button data-route="${i}" aria-expanded="${state.route===i}">${state.route===i?'접기 −':'상세 보기 ＋'}</button>${state.route===i?'<div class="route-fields">구매처: 확인 필요<br>가격: 확인 필요<br>결제 혜택: 확인 필요</div>':''}</div></section>`);y+=state.route===i?250:165;});x=Math.max(x,bx+BW);
 }
 x+=300;
 const height=900;$('#world').style.width=`${x}px`;$('#world').style.height=`${height}px`;
 $('#world').innerHTML=`<svg class="links" width="${x}" height="${height}" aria-hidden="true">${paths.map(p=>`<path class="${p.fresh?'fresh':''}" d="${p.d}"/>`).join('')}</svg>${parts.join('')}`;
 document.querySelectorAll('[data-open]').forEach(el=>el.onclick=()=>openStep(+el.dataset.open));
 if($('#node-next'))$('#node-next').onclick=advance;
 document.querySelectorAll('[data-solution]').forEach(el=>el.onclick=()=>{state.solution=el.dataset.solution;if(state.solution==='software')state.max=1;renderGraph(false);});
 document.querySelectorAll('[data-tab]').forEach(el=>el.onclick=()=>{state.tab=el.dataset.tab;renderGraph(false);});
 document.querySelectorAll('[data-move]').forEach(el=>el.onclick=()=>{save();const [i,d]=el.dataset.move.split(',').map(Number);[state.priorities[i],state.priorities[i+d]]=[state.priorities[i+d],state.priorities[i]];renderGraph(false);});
 if($('#product-open'))$('#product-open').onclick=()=>goForward(5);
 document.querySelectorAll('[data-route]').forEach(el=>el.onclick=()=>{state.route=state.route===+el.dataset.route?0:+el.dataset.route;renderGraph(false);});
 $('#previous-step').disabled=state.step===0;
 $('#journey-status').textContent=`${String(state.step+1).padStart(2,'0')} / 06 · ${titles[state.step]}${state.working!=null?' · 에이전트 조사 중':''}`;
 if(expandMode!=null){playExpand($('.graph-node.active'),expandMode);expandMode=null;}
 scheduleCamera(true);$('#announcement').textContent=titles[state.step];
}
function deckNext(){if(slide===DEMO-1&&!reveal){reveal=1;$('.imagine-layout').classList.add('revealed');$('#deck-next').textContent='프로토타입 시작 →';$('#announcement').textContent='사용자의 의문이 나타났습니다.';return;}if(slide<DEMO)showSlide(slide+1);}
$('#deck-next').onclick=deckNext;
$('#deck-back').onclick=()=>{if(slide===DEMO){reveal=1;showSlide(DEMO-1,true);}else if(slide>0)showSlide(slide-1);};
$('#previous-step').onclick=()=>{if(state.step>0)openStep(state.step-1);};
$('#reset').onclick=()=>{cancelLoading();cancelWork();freshGroup=null;navBusy=false;expandMode=null;state=defaults();$('#world').style.transform='';renderDemo();};
$('#fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('#announcement').textContent='브라우저의 F11 키를 사용해주세요.';}};
document.addEventListener('fullscreenchange',()=>{$('#fullscreen').textContent=document.fullscreenElement?'전체 화면 종료 ↙':'전체 화면 ↗';scheduleCamera(false);});
window.addEventListener('resize',()=>scheduleCamera(false));
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,button')||e.ctrlKey||e.metaKey||e.altKey)return;if(slide<DEMO&&['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();deckNext();}else if(['ArrowLeft','PageUp'].includes(e.key)&&slide>0){e.preventDefault();showSlide(slide-1);}});
showSlide(0);
