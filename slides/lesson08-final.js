const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AI 기초 교재팀";
pres.title = "8차시: ChatGPT의 작동 원리, 다음 단어 맞추기";

// ─── COLOR PALETTE (REFINED INDIGO — warm, professional) ───
const C = {
  bg: "FAFBFF",
  soft: "F0F4FF",
  card: "E0E7FF",
  primary: "4F46E5",
  primaryDark: "3730A3",
  accent: "818CF8",
  accentLight: "C7D2FE",
  text: "1E293B",
  sub: "475569",
  muted: "94A3B8",
  white: "FFFFFF",
  green: "10B981",
  greenLight: "D1FAE5",
  red: "EF4444",
  redLight: "FEE2E2",
  orange: "F59E0B",
  orangeLight: "FEF3C7",
  purple: "8B5CF6",
  teal: "14B8A6",
  warm: "F97316",
};
const F = { h: "NanumSquare", b: "Apple SD Gothic Neo" };
const IMG = "/Users/greatsong/greatsong-project/ai-basic-2026/textbook/public/images/lesson08/";

// ─── Factory helpers (NEVER reuse option objects) ───
const sh = () => ({ type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.08 });
const shCard = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.06 });

// ═══════════════════════════════════════════════════════════════
// HELPER: Question Slide
// ═══════════════════════════════════════════════════════════════
function addQuestion(question, opts = {}) {
  const s = pres.addSlide();
  s.background = { color: C.soft };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s.addShape(pres.shapes.OVAL, {
    x: 4.3, y: 0.6, w: 1.4, h: 1.4,
    fill: { color: C.card }, line: { color: C.primary, width: 2 },
  });
  s.addText("?", {
    x: 4.3, y: 0.6, w: 1.4, h: 1.4,
    fontFace: "Georgia", fontSize: 48, color: C.primary, bold: true,
    align: "center", valign: "middle",
  });
  s.addText(question, {
    x: 1.0, y: 2.2, w: 8.0, h: 2.4,
    fontFace: F.h, fontSize: opts.fontSize || 36, color: C.text,
    bold: true, align: "center", valign: "middle",
    lineSpacingMultiple: 1.35,
  });
  if (opts.sub) {
    s.addText(opts.sub, {
      x: 1.5, y: 4.6, w: 7.0, h: 0.5,
      fontFace: F.b, fontSize: 14, color: C.sub,
      align: "center", valign: "middle",
    });
  }
  return s;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Content Slide
// ═══════════════════════════════════════════════════════════════
function addContent(title, opts = {}) {
  const s = pres.addSlide();
  s.background = { color: opts.bgColor || C.bg };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
  if (title) {
    s.addText(title, {
      x: 0.7, y: 0.35, w: 8.6, h: 0.65,
      fontFace: F.h, fontSize: opts.titleSize || 26, color: C.text, bold: true,
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.05, w: 2.0, h: 0.04, fill: { color: C.accent } });
  }
  return s;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Section Title Slide
// ═══════════════════════════════════════════════════════════════
function addSection(num, title, sub) {
  const s = pres.addSlide();
  s.background = { color: C.soft };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 5.63, fill: { color: C.primary } });
  s.addText("EPISODE " + num, {
    x: 1.0, y: 1.2, w: 4.0, h: 0.5,
    fontFace: F.b, fontSize: 16, color: C.primary, bold: true, charSpacing: 6,
  });
  s.addText(num, {
    x: 6.5, y: 0.5, w: 3.0, h: 4.0,
    fontFace: "Georgia", fontSize: 144, color: C.card,
    bold: true, align: "right", valign: "middle",
  });
  s.addText(title, {
    x: 1.0, y: 2.0, w: 7.0, h: 1.6,
    fontFace: F.h, fontSize: 38, color: C.text, bold: true,
    lineSpacingMultiple: 1.25,
  });
  if (sub) {
    s.addText(sub, {
      x: 1.0, y: 3.8, w: 7.0, h: 0.5,
      fontFace: F.b, fontSize: 15, color: C.sub,
    });
  }
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.57, w: 10, h: 0.06, fill: { color: C.primary } });
  return s;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Image-only slide
// ═══════════════════════════════════════════════════════════════
function addImageSlide(title, imgPath) {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
  if (title) {
    s.addText(title, {
      x: 0.7, y: 0.25, w: 8.6, h: 0.55,
      fontFace: F.h, fontSize: 22, color: C.text, bold: true,
    });
  }
  s.addImage({
    path: imgPath,
    x: 0.5, y: title ? 1.0 : 0.3,
    w: 9.0, h: title ? 4.3 : 5.0,
    sizing: { type: "contain", w: 9.0, h: title ? 4.3 : 5.0 },
  });
  return s;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Activity Guide Slide (for teacher)
// ═══════════════════════════════════════════════════════════════
function addActivityGuide(title, steps, opts = {}) {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  // Top bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.warm } });
  // Teacher badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 0.25, w: 1.8, h: 0.45,
    fill: { color: C.warm }, rectRadius: 0.22,
  });
  s.addText("교사 안내", {
    x: 0.5, y: 0.25, w: 1.8, h: 0.45,
    fontFace: F.h, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle",
  });
  // Title
  s.addText(title, {
    x: 2.5, y: 0.25, w: 7.0, h: 0.5,
    fontFace: F.h, fontSize: 22, color: C.text, bold: true,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 9.0, h: 0.03, fill: { color: C.orangeLight } });

  steps.forEach((step, i) => {
    const yPos = 1.1 + i * 0.85;
    // Step number circle
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: yPos + 0.08, w: 0.5, h: 0.5,
      fill: { color: step.color || C.primary },
    });
    s.addText(String(i + 1), {
      x: 0.6, y: yPos + 0.08, w: 0.5, h: 0.5,
      fontFace: F.h, fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle",
    });
    // Step content
    s.addText(step.title, {
      x: 1.3, y: yPos, w: 4.0, h: 0.35,
      fontFace: F.h, fontSize: 15, color: step.color || C.primaryDark, bold: true,
    });
    s.addText(step.desc, {
      x: 1.3, y: yPos + 0.32, w: 8.0, h: 0.4,
      fontFace: F.b, fontSize: 13, color: C.sub,
    });
  });

  if (opts.tip) {
    const tipY = 1.1 + steps.length * 0.85 + 0.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: tipY, w: 9.0, h: 0.7,
      fill: { color: C.orangeLight }, rectRadius: 0.1,
    });
    s.addText([
      { text: "TIP  ", options: { fontSize: 13, fontFace: F.h, color: C.warm, bold: true } },
      { text: opts.tip, options: { fontSize: 13, fontFace: F.b, color: C.sub } },
    ], { x: 0.7, y: tipY, w: 8.6, h: 0.7, valign: "middle" });
  }
  return s;
}


// ═══════════════════════════════════════════════════════════════
//  SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════
let s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.57, w: 10, h: 0.06, fill: { color: C.primary } });
s.addShape(pres.shapes.OVAL, { x: -1.5, y: -1.5, w: 5.0, h: 5.0, fill: { color: C.soft } });
s.addShape(pres.shapes.OVAL, { x: 7.5, y: 3.0, w: 4.0, h: 4.0, fill: { color: C.card } });
s.addText("LESSON 08", {
  x: 0.8, y: 1.0, w: 4, h: 0.5,
  fontFace: F.b, fontSize: 16, color: C.primary, bold: true, charSpacing: 8,
});
s.addText("ChatGPT의 작동 원리,\n다음 단어 맞추기", {
  x: 0.8, y: 1.7, w: 8, h: 2.2,
  fontFace: F.h, fontSize: 44, color: C.text, bold: true, lineSpacingMultiple: 1.2,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.05, w: 2.5, h: 0.04, fill: { color: C.primary } });
s.addText("다음 단어 예측  ·  Temperature  ·  어텐션  ·  트랜스포머  ·  환각", {
  x: 0.8, y: 4.3, w: 8, h: 0.4,
  fontFace: F.b, fontSize: 15, color: C.sub,
});
s.addText("AI 기초  |  고등학교 정보 교과  |  50분", {
  x: 0.8, y: 4.9, w: 8, h: 0.3,
  fontFace: F.b, fontSize: 12, color: C.muted,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 2 — 오늘의 질문 + 학습목표
// ═══════════════════════════════════════════════════════════════
s = addContent("오늘의 질문");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
});
s.addText([
  { text: '"', options: { fontSize: 48, fontFace: "Georgia", color: C.primary, bold: true } },
  { text: "AI가 하는 일의 본질이 '다음 단어 맞추기'라면,\n왜 이렇게 똑똑해 보일까?", options: { fontSize: 22, fontFace: F.h, color: C.text, bold: true } },
  { text: '"', options: { fontSize: 48, fontFace: "Georgia", color: C.primary, bold: true } },
], { x: 1.0, y: 1.45, w: 8.0, h: 1.2, align: "center", valign: "middle", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.2, w: 8.6, h: 1.8,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText("학습목표", {
  x: 1.1, y: 3.35, w: 3.0, h: 0.45,
  fontFace: F.h, fontSize: 15, color: C.primary, bold: true,
});
s.addText([
  { text: "언어 모델의 다음 단어 예측 원리를 이해하고,", options: { fontSize: 18, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "트랜스포머와 어텐션의 핵심 아이디어를 설명할 수 있다.", options: { fontSize: 18, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 1.1, y: 3.85, w: 8.0, h: 1.0, valign: "middle", lineSpacingMultiple: 1.5 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 3 — 7차시 복습 연결
// ═══════════════════════════════════════════════════════════════
s = addContent("지난 시간 복습", { bgColor: C.soft });
s.addText([
  { text: "7차시에서 우리는 문장을 토큰으로 쪼개고,", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "임베딩으로 의미가 담긴 숫자 벡터로 바꾸는 과정을 배웠습니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "이제 마지막 퍼즐 조각이 남았습니다.", options: { fontSize: 18, fontFace: F.h, color: C.text, bold: true } },
], { x: 0.7, y: 1.3, w: 8.6, h: 1.5, valign: "top" });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 1.0, y: 3.0, w: 8.0, h: 1.4,
  fill: { color: C.card }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: "AI는 이 숫자들로 정확히 무엇을 하는 걸까?", options: { fontSize: 20, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "번역, 글쓰기, 코딩, 대화 -- 이 모든 것이 하나의 원리로 가능하다면?", options: { fontSize: 16, fontFace: F.b, color: C.text } },
], { x: 1.3, y: 3.1, w: 7.4, h: 1.2, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });
s.addText("답을 말하기 전에, 먼저 직접 체험해봅시다.", {
  x: 0.7, y: 4.7, w: 8.6, h: 0.4,
  fontFace: F.b, fontSize: 15, color: C.primary, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 4 — SECTION: 다음 단어 예측
// ═══════════════════════════════════════════════════════════════
addSection("1", "빈칸을 채워봅시다", "다음 단어 예측  |  확률 분포  |  직접 체험");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 5 — Question
// ═══════════════════════════════════════════════════════════════
addQuestion("오늘 점심에 나는\n___을 먹었다", {
  fontSize: 38,
  sub: "빈칸에 뭐가 들어갈까요?",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 6 — 실습 안내
// ═══════════════════════════════════════════════════════════════
s = addContent("다음 단어 예측 체험", { bgColor: C.soft });
const steps = [
  { n: "1", t: '"오늘 점심에 나는 ___을 먹었다" -- 빈칸에 뭐가 들어갈지 예상해서 입력' },
  { n: "2", t: "AI의 예측 확인: 막대그래프로 각 단어의 확률 표시 (밥 35%, 김치 12%...)" },
  { n: "3", t: '"한국의 수도는 ___이다" -- 특정 단어가 압도적으로 높은 확률?' },
  { n: "4", t: "Temperature 슬라이더를 움직여보세요 (다음 슬라이드에서 설명)" },
  { n: "5", t: "존재하지 않는 사실에 대해 질문 -- AI가 어떻게 반응하는지 관찰" },
];
steps.forEach((r, i) => {
  const yPos = 1.3 + i * 0.82;
  s.addShape(pres.shapes.OVAL, {
    x: 0.9, y: yPos + 0.05, w: 0.55, h: 0.55,
    fill: { color: C.primary },
  });
  s.addText(r.n, {
    x: 0.9, y: yPos + 0.05, w: 0.55, h: 0.55,
    fontFace: F.h, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle",
  });
  s.addText(r.t, {
    x: 1.7, y: yPos, w: 7.5, h: 0.65,
    fontFace: F.b, fontSize: 14, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 7 — 핵심 원리: 다음 단어 맞추기
// ═══════════════════════════════════════════════════════════════
s = addContent("결국, 다음 단어를 맞추는 것");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 2.2,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: "AI가 하는 일의 본질은 단 하나:", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "다음 단어를 맞추는 것", options: { fontSize: 30, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "ChatGPT, 번역기, 코드 자동완성 등 모든 언어 AI의 핵심 원리", options: { fontSize: 15, fontFace: F.b, color: C.text } },
], { x: 1.0, y: 1.4, w: 8.0, h: 2.0, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

s.addText([
  { text: "여러분은 살아오면서 읽고 들은 경험을 바탕으로,", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "AI는 수십억 개의 텍스트 데이터를 바탕으로 -- 같은 일을 합니다.", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "결정적 차이: 여러분은 경험과 이해를 기반으로,", options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "AI는 오직 텍스트 패턴만을 기반으로 예측합니다.", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 0.7, y: 3.7, w: 8.6, h: 1.8, valign: "top", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 7-B — 다음 단어 예측 시각화 (NEW)
// ═══════════════════════════════════════════════════════════════
addImageSlide("다음 단어 예측 — 확률 분포와 Temperature", IMG + "next-word-prediction.svg");

// ═══════════════════════════════════════════════════════════════
//  SLIDE 7-C — 활동 안내: 다음 단어 예측 체험 (NEW)
// ═══════════════════════════════════════════════════════════════
addActivityGuide("활동 1: 다음 단어 예측 체험하기", [
  { title: "시연 도구 접속", desc: "교사가 준비한 다음 단어 예측 도구(웹 앱)를 화면에 띄웁니다.", color: C.primary },
  { title: "빈칸 문장 입력", desc: '"오늘 점심에 나는 ___을 먹었다" — 학생들의 예상을 먼저 모읍니다.', color: C.green },
  { title: "AI 확률 비교", desc: "AI가 제시하는 확률 분포를 학생 예상과 비교합니다.", color: C.purple },
  { title: "추가 실험", desc: '"한국의 수도는 ___이다" — 특정 단어가 압도적으로 높은 경우를 확인합니다.', color: C.teal },
  { title: "정리", desc: "AI의 예측과 사람의 예측이 닮아 있는 이유에 대해 토의합니다.", color: C.orange },
], { tip: "학생들이 직접 문장을 만들어 입력하면 참여도가 높아집니다. 3~4개 문장이면 충분합니다." });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 8 — SECTION: Temperature
// ═══════════════════════════════════════════════════════════════
addSection("2", "얼마나 모험적으로\n고를 것인가", "Temperature  |  확률 분포 조절  |  창의성 vs 정확성");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 9 — Temperature 개념
// ═══════════════════════════════════════════════════════════════
s = addContent("Temperature(온도)란?");
s.addText([
  { text: "AI가 단어를 고를 때 ", options: { fontSize: 17, fontFace: F.b, color: C.text } },
  { text: "얼마나 모험적으로 선택할지", options: { fontSize: 17, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "를 조절하는 값", options: { fontSize: 17, fontFace: F.b, color: C.text } },
], { x: 0.7, y: 1.3, w: 8.6, h: 0.5, valign: "middle" });

const tempRows = [
  [
    { text: "Temperature", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "행동", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "비유", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
  ],
  [
    { text: "낮음 (0.1)", options: { fontFace: F.h, fontSize: 13, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "1등 확률의 단어만 고집", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "시험에서 가장 확실한\n답만 쓰는 학생", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "중간 (1.0)", options: { fontFace: F.h, fontSize: 13, color: C.primaryDark, bold: true, align: "center", fill: { color: C.card } } },
    { text: "확률에 비례해서 고름", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "보통 상태", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.card } } },
  ],
  [
    { text: "높음 (2.0)", options: { fontFace: F.h, fontSize: 13, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "낮은 확률 단어도 자주 선택", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "감으로 엉뚱한 답을\n쓰는 학생", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
];
s.addTable(tempRows, {
  x: 0.7, y: 2.0, w: 8.6,
  border: { type: "solid", pt: 1, color: C.card },
  colW: [2.0, 3.3, 3.3],
  rowH: [0.45, 0.65, 0.55, 0.65],
  margin: [4, 6, 4, 6],
});

s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 4.5, w: 8.6, h: 0.9,
  fill: { color: C.card }, rectRadius: 0.1,
});
s.addText([
  { text: "ChatGPT에서 코드 작성 시 Temperature 낮게, 시 작성 시 높게 설정하는 이유!", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 0.9, y: 4.55, w: 8.2, h: 0.8, valign: "middle" });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 10 — Temperature 체험 안내
// ═══════════════════════════════════════════════════════════════
s = addContent("Temperature 체험", { bgColor: C.soft });
const tempExp = [
  { n: "1", t: "0.1로 낮추면: AI가 '밥'만 반복 -- 안전하지만 지루", color: C.green },
  { n: "2", t: "2.0으로 높이면: '우주선', '행복' 같은 엉뚱한 답 -- 창의적이지만 엉터리", color: C.red },
  { n: "3", t: "0.7~1.0 사이: 자연스러운 문장이 만들어짐", color: C.primary },
];
tempExp.forEach((r, i) => {
  const yPos = 1.3 + i * 1.3;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: yPos, w: 8.6, h: 1.1,
    fill: { color: C.white }, rectRadius: 0.12, shadow: sh(),
    line: { color: r.color, width: 2 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.0, y: yPos + 0.25, w: 0.6, h: 0.6,
    fill: { color: r.color },
  });
  s.addText(r.n, {
    x: 1.0, y: yPos + 0.25, w: 0.6, h: 0.6,
    fontFace: F.h, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle",
  });
  s.addText(r.t, {
    x: 1.9, y: yPos + 0.05, w: 7.0, h: 1.0,
    fontFace: F.b, fontSize: 16, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 11 — Temperature 수학적 원리
// ═══════════════════════════════════════════════════════════════
s = addContent("Temperature의 원리");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 3.8,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "로짓(logit): 신경망이 각 단어에 매긴 원점수", options: { fontSize: 16, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "로짓을 Temperature 값으로 나눈 뒤 확률로 변환합니다.", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "Temperature 낮으면", options: { fontSize: 15, fontFace: F.h, color: C.green, bold: true } },
  { text: "  점수 차이가 극대화 -> 1등만 살아남음", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "Temperature 높으면", options: { fontSize: 15, fontFace: F.h, color: C.red, bold: true } },
  { text: "  점수 차이가 줄어듦 -> 여러 단어가 비슷한 확률", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "이 하나의 슬라이더가 AI의 출력을", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: '"판에 박은 답변"에서 "창의적인 글쓰기"까지 바꿀 수 있습니다.', options: { fontSize: 15, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 1.0, y: 1.5, w: 8.0, h: 3.4, valign: "middle", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 11-B — Temperature 비교 시각화 (NEW)
// ═══════════════════════════════════════════════════════════════
addImageSlide("Temperature 비교 — 낮음 vs 보통 vs 높음", IMG + "temperature-comparison.svg");

// ═══════════════════════════════════════════════════════════════
//  SLIDE 11-C — 활동 안내: Temperature 실험 (NEW)
// ═══════════════════════════════════════════════════════════════
addActivityGuide("활동 2: Temperature 슬라이더 실험", [
  { title: "Temperature 0.1 실험", desc: "같은 문장으로 5번 생성하면 거의 같은 결과 — '안전하지만 지루'를 체감합니다.", color: C.green },
  { title: "Temperature 2.0 실험", desc: "같은 문장으로 5번 생성하면 매번 다른 결과 — '창의적이지만 엉뚱'을 체감합니다.", color: C.red },
  { title: "최적값 찾기", desc: "0.7~1.0 사이에서 자연스러운 문장이 만들어지는 것을 확인합니다.", color: C.primary },
  { title: "실제 용도 연결", desc: "코드 작성(낮게) vs 시 쓰기(높게) — 왜 다른 값이 필요한지 토의합니다.", color: C.purple },
], { tip: "ChatGPT 실제 사용 시 Temperature 조절이 가능합니다. 실생활 연결을 강조하세요." });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 12 — SECTION: 어텐션
// ═══════════════════════════════════════════════════════════════
addSection("3", "어디를 주목할 것인가", "어텐션(Attention)  |  문맥 파악  |  형광펜 비유");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 13 — Question: 어텐션
// ═══════════════════════════════════════════════════════════════
addQuestion("나는 프랑스에서 태어나서\n... ___를 잘합니다.", {
  fontSize: 32,
  sub: "빈칸에 들어갈 단어는? 어디에 주목해야 할까?",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 14 — 어텐션 개념
// ═══════════════════════════════════════════════════════════════
s = addContent("어텐션(Attention)이란?");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 2.2,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: "각 단어가 문장의 다른 단어를", options: { fontSize: 17, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "얼마나 주목해야 하는지를 계산하는 것", options: { fontSize: 17, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "수업 시간에 선생님이 '여기 중요합니다'라고 강조한 부분에", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "형광펜을 칠하는 것과 같습니다.", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "관련 있는 단어끼리 강하게 연결, 관련 없는 것은 무시", options: { fontSize: 16, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 1.0, y: 1.4, w: 8.0, h: 2.0, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

s.addText([
  { text: "예시: '프랑스어'를 예측하려면", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "'프랑스에서 태어나서'에 주목해야 합니다.", options: { fontSize: 15, fontFace: F.h, color: C.primary, bold: true, breakLine: true } },
  { text: "'초등학교', '중학교' 같은 중간 단어들은 이 예측에 별로 중요하지 않습니다.", options: { fontSize: 14, fontFace: F.b, color: C.sub } },
], { x: 0.7, y: 3.8, w: 8.6, h: 1.5, valign: "top", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 15 — 동음이의어 예시
// ═══════════════════════════════════════════════════════════════
s = addContent("같은 글자, 다른 의미");
// Card 1
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.3, h: 2.0,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 1 },
});
s.addText([
  { text: '"나는 은행에 갔다"', options: { fontSize: 18, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "은행 = 금융기관 (Bank)", options: { fontSize: 15, fontFace: F.b, color: C.primary, bold: true } },
], { x: 0.7, y: 1.4, w: 3.9, h: 1.8, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

// Card 2
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.2, y: 1.3, w: 4.3, h: 2.0,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.purple, width: 1 },
});
s.addText([
  { text: '"강 은행에 꽃이 피었다"', options: { fontSize: 18, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "은행 = 강가 (Riverbank)", options: { fontSize: 15, fontFace: F.b, color: C.purple, bold: true } },
], { x: 5.4, y: 1.4, w: 3.9, h: 1.8, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.6, w: 8.6, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.12, shadow: shCard(),
});
s.addText([
  { text: "어텐션은 각 단어가 문장의 다른 단어들과", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "얼마나 관련이 있는지를 점수로 계산하여,", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "관련 높은 단어의 정보를 더 많이 가져옵니다.", options: { fontSize: 15, fontFace: F.b, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "7차시: 같은 '사과'도 문맥에 따라 임베딩 공간의 다른 위치 -> 어텐션이 가능하게!", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 1.0, y: 3.7, w: 8.0, h: 1.4, valign: "middle", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 16 — 멀티헤드 어텐션
// ═══════════════════════════════════════════════════════════════
s = addContent("심화: 멀티헤드 어텐션");
s.addText([
  { text: "사람이 문장을 읽을 때, 여러 관점에서 동시에 이해합니다.", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
], { x: 0.7, y: 1.3, w: 8.6, h: 0.4, valign: "top" });

const heads = [
  { icon: "A", label: "문법적 관점", desc: "'나는'이 주어,\n'태어났다'가 서술어", color: C.primary },
  { icon: "B", label: "의미적 관점", desc: "'프랑스'가 장소,\n'태어났다'가 사건", color: C.green },
  { icon: "C", label: "맥락적 관점", desc: "이후 문장에서\n'프랑스어'가 등장 예측", color: C.purple },
];
heads.forEach((h, i) => {
  const xPos = 0.7 + i * 3.1;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 1.9, w: 2.8, h: 2.8,
    fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  });
  s.addShape(pres.shapes.OVAL, {
    x: xPos + 0.75, y: 2.1, w: 1.3, h: 1.3,
    fill: { color: C.card }, line: { color: h.color, width: 2 },
  });
  s.addText(h.icon, {
    x: xPos + 0.75, y: 2.1, w: 1.3, h: 1.3,
    fontFace: F.h, fontSize: 36, color: h.color, bold: true, align: "center", valign: "middle",
  });
  s.addText(h.label, {
    x: xPos, y: 3.5, w: 2.8, h: 0.45,
    fontFace: F.h, fontSize: 15, color: h.color, bold: true, align: "center",
  });
  s.addText(h.desc, {
    x: xPos + 0.2, y: 4.0, w: 2.4, h: 0.7,
    fontFace: F.b, fontSize: 13, color: C.sub, align: "center", valign: "top",
    lineSpacingMultiple: 1.3,
  });
});
s.addText("트랜스포머는 어텐션을 여러 개(8~96개) 동시에 적용하여 다양한 관점의 정보를 종합", {
  x: 0.7, y: 5.0, w: 8.6, h: 0.45,
  fontFace: F.b, fontSize: 13, color: C.primaryDark, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 16-B — 어텐션 메커니즘 시각화 (NEW)
// ═══════════════════════════════════════════════════════════════
addImageSlide("어텐션 메커니즘 — 형광펜 비유", IMG + "attention-mechanism.svg");

// ═══════════════════════════════════════════════════════════════
//  SLIDE 16-C — 활동 안내: 어텐션 형광펜 활동 (NEW)
// ═══════════════════════════════════════════════════════════════
addActivityGuide("활동 3: 어텐션 형광펜 활동", [
  { title: "문장 카드 배포", desc: "긴 문장이 적힌 카드를 모둠별로 배포합니다.", color: C.primary },
  { title: "마지막 단어 가리기", desc: "문장 마지막 단어를 가리고 '어디를 보면 예측할 수 있을까?' 토의합니다.", color: C.green },
  { title: "형광펜 칠하기", desc: "예측에 중요한 단어에 진한 형광펜, 덜 중요한 단어에 연한 형광펜을 칩니다.", color: C.orange },
  { title: "동음이의어 비교", desc: '"은행에 갔다" vs "강 은행에 꽃이 피었다" — 같은 글자가 다른 의미를 가지는 예시를 확인합니다.', color: C.purple },
], { tip: "실제 형광펜 2~3색을 준비하면 효과적입니다. 어텐션 점수를 색의 진하기로 표현하세요." });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 17 — SECTION: 트랜스포머
// ═══════════════════════════════════════════════════════════════
addSection("4", "한 줄씩 읽던 기계,\n한 번에 보는 기계", "RNN vs Transformer  |  병렬 처리  |  2017년 혁명");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 18 — RNN의 한계
// ═══════════════════════════════════════════════════════════════
s = addContent("2017년 이전: RNN의 시대");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 2.0,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.red, width: 1 },
});
s.addText("RNN (Recurrent Neural Network, 순환 신경망)", {
  x: 1.0, y: 1.4, w: 8.0, h: 0.4,
  fontFace: F.h, fontSize: 16, color: C.red, bold: true,
});
s.addText([
  { text: "문장을 순서대로 한 단어씩 읽음", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "마치 한 줄씩 베껴 쓰는 것처럼, 앞의 단어를 다 처리해야 다음으로", options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "문제: 문장이 길어지면 앞부분을 잊어버린다!", options: { fontSize: 16, fontFace: F.h, color: C.red, bold: true } },
], { x: 1.0, y: 1.9, w: 8.0, h: 1.3, valign: "top", lineSpacingMultiple: 1.3 });

s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.6, w: 8.6, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.12, shadow: shCard(),
});
s.addText([
  { text: "예시:", options: { fontSize: 14, fontFace: F.b, color: C.primary, bold: true, breakLine: true } },
  { text: "100단어짜리 문장의 마지막 단어를 예측할 때,", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "첫 번째 단어의 정보는 거의 사라져 있었습니다.", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: '"프랑스에서 태어나서... ___를 잘합니다"에서', options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "RNN은 '프랑스'라는 핵심 단서를 놓칠 수 있었습니다.", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 1.0, y: 3.7, w: 8.0, h: 1.4, valign: "middle", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 19 — RNN vs Transformer 이미지
// ═══════════════════════════════════════════════════════════════
addImageSlide("RNN vs Transformer", IMG + "rnn-vs-transformer.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 20 — 트랜스포머 혁신
// ═══════════════════════════════════════════════════════════════
s = addContent("트랜스포머의 혁신 (2017)");
s.addText([
  { text: "2017년, 구글 연구자 8명이 완전히 다른 접근을 제안합니다.", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "순서대로 읽지 말고, 문장 전체를 한 번에 보면서 어텐션으로 중요한 연결을 찾자.", options: { fontSize: 15, fontFace: F.b, color: C.text } },
], { x: 0.7, y: 1.3, w: 8.6, h: 0.8, valign: "top", lineSpacingMultiple: 1.3 });

// Two innovation cards
const innovations = [
  { n: "1", t: "병렬 처리", d: "문장의 모든 단어를 동시에 처리\n순서대로 읽을 필요가 없으므로\n엄청나게 빨라진다", color: C.primary },
  { n: "2", t: "어텐션만으로", d: "RNN 같은 순환 구조 없이\n어텐션만으로 문맥을 파악\n아무리 긴 문장이라도 앞부분을\n잊지 않는다", color: C.green },
];
innovations.forEach((inv, i) => {
  const xPos = 0.5 + i * 4.7;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 2.3, w: 4.3, h: 2.6,
    fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
    line: { color: inv.color, width: 2 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: xPos + 0.3, y: 2.5, w: 0.7, h: 0.7,
    fill: { color: inv.color },
  });
  s.addText(inv.n, {
    x: xPos + 0.3, y: 2.5, w: 0.7, h: 0.7,
    fontFace: F.h, fontSize: 24, color: C.white, bold: true, align: "center", valign: "middle",
  });
  s.addText(inv.t, {
    x: xPos + 1.2, y: 2.5, w: 2.8, h: 0.7,
    fontFace: F.h, fontSize: 18, color: inv.color, bold: true, valign: "middle",
  });
  s.addText(inv.d, {
    x: xPos + 0.3, y: 3.4, w: 3.7, h: 1.4,
    fontFace: F.b, fontSize: 14, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
  });
});

s.addText("이 하나의 구조에서 GPT-1, GPT-2, GPT-3, ChatGPT가 탄생했습니다.", {
  x: 0.7, y: 5.1, w: 8.6, h: 0.35,
  fontFace: F.b, fontSize: 14, color: C.primaryDark, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 20-B — 트랜스포머 아키텍처 시각화 (NEW)
// ═══════════════════════════════════════════════════════════════
addImageSlide("트랜스포머 아키텍처 (간략)", IMG + "transformer-architecture.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 21 — GPT 시리즈 타임라인
// ═══════════════════════════════════════════════════════════════
s = addContent("트랜스포머 이후: GPT 시리즈");
const gpts = [
  { year: "2018", name: "GPT-1", param: "1.1억 파라미터", note: "'다음 단어 예측'만으로 문장 생성 가능 증명" },
  { year: "2019", name: "GPT-2", param: "15억 파라미터", note: "너무 잘 써서 처음에 공개 거부" },
  { year: "2020", name: "GPT-3", param: "1,750억 파라미터", note: "번역, 요약, 코딩 등 별도 학습 없이 수행" },
  { year: "2022", name: "ChatGPT", param: "GPT-3.5 기반", note: "2개월 만에 1억 사용자 돌파" },
];
gpts.forEach((g, i) => {
  const yPos = 1.3 + i * 1.0;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: yPos, w: 8.6, h: 0.85,
    fill: { color: i % 2 === 0 ? C.soft : C.card }, rectRadius: 0.1, shadow: shCard(),
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: yPos + 0.17, w: 1.0, h: 0.5,
    fill: { color: C.primary }, rectRadius: 0.08,
  });
  s.addText(g.year, {
    x: 0.9, y: yPos + 0.17, w: 1.0, h: 0.5,
    fontFace: F.h, fontSize: 14, color: C.white, bold: true, align: "center", valign: "middle",
  });
  s.addText(g.name, {
    x: 2.1, y: yPos + 0.05, w: 1.5, h: 0.75,
    fontFace: F.h, fontSize: 17, color: C.primaryDark, bold: true, valign: "middle",
  });
  s.addText(g.param, {
    x: 3.6, y: yPos + 0.05, w: 2.0, h: 0.75,
    fontFace: F.b, fontSize: 12, color: C.sub, valign: "middle",
  });
  s.addText(g.note, {
    x: 5.6, y: yPos + 0.05, w: 3.5, h: 0.75,
    fontFace: F.b, fontSize: 13, color: C.text, valign: "middle",
  });
});

s.addText("3차시의 파라미터 카운터를 기억하세요? GPT-4의 파라미터는 추정 수천억~수조 개!", {
  x: 0.7, y: 5.1, w: 8.6, h: 0.35,
  fontFace: F.b, fontSize: 13, color: C.primary, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 22 — SECTION: 환각
// ═══════════════════════════════════════════════════════════════
addSection("5", "그럴듯하지만\n틀린 답: 환각", "Hallucination  |  구조적 필연  |  버그가 아니다");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 23 — Question: 환각
// ═══════════════════════════════════════════════════════════════
addQuestion("환각은 고칠 수 있는\n버그일까?", {
  fontSize: 38,
  sub: "아니면 구조적으로 피할 수 없는 것일까?",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 24 — 환각 개념
// ═══════════════════════════════════════════════════════════════
s = addContent("환각(Hallucination)이란?");
s.addText([
  { text: "AI가 사실이 아닌 내용을 마치 사실인 것처럼 생성하는 현상", options: { fontSize: 17, fontFace: F.b, color: C.text } },
], { x: 0.7, y: 1.3, w: 8.6, h: 0.5, valign: "middle" });

const halluRows = [
  [
    { text: "상황", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "AI의 행동", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "결과", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
  ],
  [
    { text: "학습 데이터에\n정답이 있는 질문", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "높은 확률로\n정확한 단어 선택", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "정확한 답변", options: { fontFace: F.h, fontSize: 13, color: C.green, bold: true, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "학습 데이터에\n정답이 없는 질문", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "가장 그럴듯한\n단어를 선택", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "환각", options: { fontFace: F.h, fontSize: 13, color: C.red, bold: true, align: "center", fill: { color: C.card } } },
  ],
];
s.addTable(halluRows, {
  x: 0.7, y: 2.0, w: 8.6,
  border: { type: "solid", pt: 1, color: C.card },
  colW: [2.87, 2.87, 2.86],
  rowH: [0.45, 0.7, 0.7],
  margin: [4, 6, 4, 6],
});

s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 4.1, w: 8.6, h: 1.2,
  fill: { color: C.card }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.orange, width: 2 },
});
s.addText([
  { text: "환각의 결과:", options: { fontSize: 14, fontFace: F.b, color: C.orange, bold: true, breakLine: true } },
  { text: "존재하지 않는 논문을 인용하고, 일어나지 않은 사건을 설명하며,", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "틀린 계산 결과를 자신 있게 제시합니다.", options: { fontSize: 14, fontFace: F.b, color: C.text } },
], { x: 1.0, y: 4.2, w: 8.0, h: 1.0, valign: "middle", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 25 — 환각은 버그가 아니다
// ═══════════════════════════════════════════════════════════════
s = addContent("환각은 버그가 아니다", { bgColor: C.soft });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 3.2,
  fill: { color: C.white }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.red, width: 2 },
});
s.addText([
  { text: "환각은 버그가 아니라,", options: { fontSize: 22, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: '"다음 토큰 확률 예측"이라는 구조의 필연적 결과', options: { fontSize: 20, fontFace: F.h, color: C.red, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "AI의 메커니즘은 항상 다음 단어를 예측하는 것이기 때문에,", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "모르는 질문에도 가장 높은 확률의 단어를 이어붙입니다.", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: '"정답을 모를 때 모른다고 말하라"고 추가 학습을 시킬 수는 있지만,', options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: '"다음 단어를 예측하는" 기본 메커니즘이 바뀌지 않는 한', options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "환각의 가능성은 완전히 제거되지 않습니다.", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 1.0, y: 1.5, w: 8.0, h: 2.8, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

s.addText("Temperature를 아무리 낮춰도, 학습 데이터에 없는 정보에 대해서는 환각이 발생할 수 있습니다.", {
  x: 0.7, y: 4.7, w: 8.6, h: 0.5,
  fontFace: F.b, fontSize: 13, color: C.sub, align: "center", italic: true,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 25-B — 환각 메커니즘 시각화 (NEW)
// ═══════════════════════════════════════════════════════════════
addImageSlide("환각(Hallucination) 발생 메커니즘", IMG + "hallucination-mechanism.svg");

// ═══════════════════════════════════════════════════════════════
//  SLIDE 25-C — 활동 안내: 환각 탐지 활동 (NEW)
// ═══════════════════════════════════════════════════════════════
addActivityGuide("활동 4: AI 환각 탐지 도전", [
  { title: "환각 유도 질문", desc: "AI에게 존재하지 않는 사실을 물어봅니다. (예: 가상의 인물 경력, 없는 논문 제목)", color: C.red },
  { title: "사실 확인", desc: "AI의 답변을 검색엔진으로 사실 확인(팩트체크)합니다.", color: C.primary },
  { title: "환각 패턴 발견", desc: "어떤 유형의 질문에서 환각이 더 많이 발생하는지 모둠별로 정리합니다.", color: C.purple },
  { title: "대응 전략 토의", desc: "환각을 줄이려면 어떻게 해야 하는지, AI 사용 시 주의할 점을 토의합니다.", color: C.green },
  { title: "결론 공유", desc: "환각은 '버그'가 아니라 '구조적 한계'라는 점을 재확인합니다.", color: C.orange },
], { tip: "환각 예시를 미리 3~4개 준비하세요. 학생들이 직접 발견하면 더 강한 인상을 남깁니다." });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 26 — SECTION: 전체 파이프라인
// ═══════════════════════════════════════════════════════════════
addSection("6", "퍼셉트론에서\nChatGPT까지", "1~8차시 통합 파이프라인  |  하나의 흐름");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 27 — ChatGPT 내부 파이프라인
// ═══════════════════════════════════════════════════════════════
s = addContent("ChatGPT 내부에서 일어나는 일");
const pipelineRows = [
  [
    { text: "단계", options: { fontFace: F.h, fontSize: 12, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "하는 일", options: { fontFace: F.h, fontSize: 12, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "배운 차시", options: { fontFace: F.h, fontSize: 12, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
  ],
  [
    { text: "1. 토큰화", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "문장을 토큰으로 쪼갠다", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "7차시", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "2. 임베딩", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.card } } },
    { text: "숫자 벡터로 변환", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "7차시", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.card } } },
  ],
  [
    { text: "3. 어텐션", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "단어 간 관련성 계산", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "8차시", options: { fontFace: F.b, fontSize: 12, color: C.primary, bold: true, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "4. 신경망", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.card } } },
    { text: "여러 층을 통과하며 처리", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "2~3차시", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.card } } },
  ],
  [
    { text: "5. 확률 출력", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "모든 단어의 확률 계산", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "8차시", options: { fontFace: F.b, fontSize: 12, color: C.primary, bold: true, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "6. 선택", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.card } } },
    { text: "Temperature에 따라 선택", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "8차시", options: { fontFace: F.b, fontSize: 12, color: C.primary, bold: true, align: "center", fill: { color: C.card } } },
  ],
  [
    { text: "7. 반복", options: { fontFace: F.h, fontSize: 12, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "선택된 단어를 추가, 1~6 반복", options: { fontFace: F.b, fontSize: 12, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "--", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
];
s.addTable(pipelineRows, {
  x: 0.7, y: 1.25, w: 8.6,
  border: { type: "solid", pt: 1, color: C.card },
  colW: [2.0, 4.6, 2.0],
  rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
  margin: [3, 5, 3, 5],
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 28 — 학습 파이프라인
// ═══════════════════════════════════════════════════════════════
s = addContent("전체 시스템의 학습 과정");
const learnRows = [
  [
    { text: "단계", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "하는 일", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "배운 차시", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
  ],
  [
    { text: "손실 측정", options: { fontFace: F.h, fontSize: 14, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "예측한 단어와 실제 다음 단어의\n차이를 숫자로 잰다", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "4차시", options: { fontFace: F.b, fontSize: 13, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "역전파", options: { fontFace: F.h, fontSize: 14, color: C.primaryDark, bold: true, align: "center", fill: { color: C.card } } },
    { text: "오차를 거꾸로 보내 각 가중치의\n책임을 계산한다", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.card } } },
    { text: "6차시", options: { fontFace: F.b, fontSize: 13, color: C.sub, align: "center", fill: { color: C.card } } },
  ],
  [
    { text: "경사하강법", options: { fontFace: F.h, fontSize: 14, color: C.primaryDark, bold: true, align: "center", fill: { color: C.soft } } },
    { text: "손실이 줄어드는 방향으로\n가중치를 조금씩 수정한다", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "5차시", options: { fontFace: F.b, fontSize: 13, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
];
s.addTable(learnRows, {
  x: 0.7, y: 1.3, w: 8.6,
  border: { type: "solid", pt: 1, color: C.card },
  colW: [2.0, 4.6, 2.0],
  rowH: [0.45, 0.7, 0.7, 0.7],
  margin: [4, 6, 4, 6],
});

s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.9, w: 8.6, h: 1.4,
  fill: { color: C.card }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: "이것이 전부입니다.", options: { fontSize: 20, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "2차시에서 퍼셉트론이 파라미터 3개로 AND를 배웠던 것을 기억하세요?", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "원리는 정확히 같습니다. 다른 것은 규모뿐 -- GPT-4는 수천억 파라미터로 언어를 배운 것입니다.", options: { fontSize: 14, fontFace: F.b, color: C.text } },
], { x: 1.0, y: 4.0, w: 8.0, h: 1.2, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 29 — 전체 파이프라인 이미지
// ═══════════════════════════════════════════════════════════════
addImageSlide("1~8차시 통합 파이프라인", IMG + "full-pipeline-1-8.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 30 — 다시, 기계가 생각할 수 있는가?
// ═══════════════════════════════════════════════════════════════
s = addContent("다시, 기계가 생각할 수 있는가?", { bgColor: C.soft });
s.addText([
  { text: "1차시 첫날, 우리는 물었습니다:", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: '"기계가 생각할 수 있는가?"', options: { fontSize: 26, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "8시간이 지난 지금, 여러분은 AI의 내부를 알고 있습니다.", options: { fontSize: 16, fontFace: F.b, color: C.text } },
], { x: 0.7, y: 1.3, w: 8.6, h: 2.0, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.4, w: 8.6, h: 1.8,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: "AI가 하는 일의 본질은 다음 토큰의 확률을 예측하는 것.", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "이것을 엄청난 규모로 반복하면 번역, 시, 코드, 대화가 됩니다.", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "다음 단어의 확률을 계산할 뿐인데,", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "밖에서 보기에는 이해하는 것처럼 보입니다.", options: { fontSize: 15, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 1.0, y: 3.5, w: 8.0, h: 1.6, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 31 — 하나의 논문, 하나의 시대
// ═══════════════════════════════════════════════════════════════
s = addContent("하나의 논문, 하나의 시대");
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 2.0,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: '"Attention Is All You Need"', options: { fontSize: 24, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: "(이것만 있으면 된다)", options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "Vaswani et al. (2017)", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "인용 횟수 10만 회 이상  |  저자 8명", options: { fontSize: 13, fontFace: F.b, color: C.muted } },
], { x: 1.0, y: 1.4, w: 8.0, h: 1.8, align: "center", valign: "middle", lineSpacingMultiple: 1.3 });

s.addText("1~8차시에서 배운 모든 개념이 이 논문 안에 들어 있습니다:", {
  x: 0.7, y: 3.5, w: 8.6, h: 0.4,
  fontFace: F.b, fontSize: 14, color: C.text,
});
const concepts = [
  { lesson: "2차시", concept: "뉴런과 가중치" },
  { lesson: "3차시", concept: "활성화함수, 다층 신경망" },
  { lesson: "4차시", concept: "손실함수" },
  { lesson: "5차시", concept: "경사하강법" },
  { lesson: "6차시", concept: "역전파" },
  { lesson: "7차시", concept: "토큰화, 임베딩" },
  { lesson: "8차시", concept: "어텐션, 확률적 예측" },
];
concepts.forEach((c, i) => {
  const col = i < 4 ? 0 : 1;
  const row = i < 4 ? i : i - 4;
  const xPos = 0.9 + col * 4.3;
  const yPos = 4.0 + row * 0.35;
  s.addText(c.lesson, {
    x: xPos, y: yPos, w: 1.0, h: 0.3,
    fontFace: F.b, fontSize: 11, color: C.primary, bold: true,
  });
  s.addText(c.concept, {
    x: xPos + 1.0, y: yPos, w: 3.0, h: 0.3,
    fontFace: F.b, fontSize: 12, color: C.text,
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 32 — 오늘의 핵심 정리
// ═══════════════════════════════════════════════════════════════
s = addContent("오늘의 핵심 정리");
const takeaways = [
  { n: "1", t: "다음 단어 예측", d: "AI가 하는 일의 본질은 단 하나: 다음 단어를 맞추는 것" },
  { n: "2", t: "Temperature", d: "얼마나 모험적으로 고를지 조절하는 하나의 슬라이더" },
  { n: "3", t: "어텐션", d: "관련 있는 단어끼리 강하게 연결, 관련 없는 것은 무시" },
  { n: "4", t: "트랜스포머", d: "문장 전체를 한 번에 보는 구조 -- 모든 언어 AI의 심장" },
  { n: "5", t: "환각", d: "버그가 아니라 '확률 예측' 구조의 필연적 결과" },
];
takeaways.forEach((tk, i) => {
  const yPos = 1.2 + i * 0.88;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: yPos, w: 8.6, h: 0.75,
    fill: { color: i % 2 === 0 ? C.soft : C.card }, rectRadius: 0.1, shadow: shCard(),
  });
  s.addShape(pres.shapes.OVAL, {
    x: 0.9, y: yPos + 0.08, w: 0.58, h: 0.58,
    fill: { color: C.primary },
  });
  s.addText(tk.n, {
    x: 0.9, y: yPos + 0.08, w: 0.58, h: 0.58,
    fontFace: F.h, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle",
  });
  s.addText(tk.t, {
    x: 1.7, y: yPos + 0.02, w: 2.3, h: 0.7,
    fontFace: F.h, fontSize: 16, color: C.primaryDark, bold: true, valign: "middle",
  });
  s.addText(tk.d, {
    x: 4.0, y: yPos + 0.02, w: 5.1, h: 0.7,
    fontFace: F.b, fontSize: 13, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 33 — 자기 점검 체크리스트
// ═══════════════════════════════════════════════════════════════
s = addContent("자기 점검 체크리스트", { bgColor: C.soft });
const checks = [
  "AI가 하는 일의 본질이 '다음 단어 예측'이라는 것을 설명할 수 있다",
  "Temperature가 AI 출력에 미치는 영향을 설명할 수 있다",
  "어텐션이 무엇인지, 왜 필요한지를 자신의 말로 설명할 수 있다",
  "환각이 왜 구조적으로 발생하는지를 설명할 수 있다",
  "1~8차시의 개념이 하나의 흐름으로 연결된다는 것을 설명할 수 있다",
];
checks.forEach((c, i) => {
  const yPos = 1.3 + i * 0.78;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: yPos + 0.1, w: 0.4, h: 0.4,
    fill: { color: C.white }, rectRadius: 0.05,
    line: { color: C.primary, width: 1.5 },
  });
  s.addText(c, {
    x: 1.5, y: yPos, w: 8.0, h: 0.6,
    fontFace: F.b, fontSize: 15, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 34 — 성찰 질문
// ═══════════════════════════════════════════════════════════════
s = addContent("성찰 질문");
s.addText("다음 질문에 대해 생각해보세요 (구글 설문에 기록합니다)", {
  x: 0.7, y: 1.3, w: 8.6, h: 0.4,
  fontFace: F.b, fontSize: 14, color: C.sub,
});
const reflections = [
  { n: "1", q: 'AI가 하는 일의 본질이 "다음 단어 예측"이라는 것을\n알고 나서, AI에 대한 인식이 어떻게 바뀌었나요?' },
  { n: "2", q: '환각이 "구조적 필연"이라면,\nAI를 사용할 때 어떤 태도를 가져야 할까요?' },
  { n: "3", q: '1차시에서 "기계가 생각할 수 있는가?"에 대해\n썼던 답을 떠올려보세요. 답이 바뀌었나요?' },
];
reflections.forEach((r, i) => {
  const yPos = 1.9 + i * 1.15;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: yPos, w: 8.6, h: 1.0,
    fill: { color: i % 2 === 0 ? C.soft : C.card }, rectRadius: 0.12, shadow: shCard(),
  });
  s.addShape(pres.shapes.OVAL, {
    x: 1.0, y: yPos + 0.2, w: 0.6, h: 0.6,
    fill: { color: C.primary },
  });
  s.addText(r.n, {
    x: 1.0, y: yPos + 0.2, w: 0.6, h: 0.6,
    fontFace: F.h, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle",
  });
  s.addText(r.q, {
    x: 1.9, y: yPos + 0.05, w: 7.0, h: 0.9,
    fontFace: F.b, fontSize: 15, color: C.text, valign: "middle", lineSpacingMultiple: 1.3,
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 35 — 수업 마무리
// ═══════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.soft };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.57, w: 10, h: 0.06, fill: { color: C.primary } });
s.addShape(pres.shapes.OVAL, { x: 6.5, y: -1.0, w: 5.0, h: 5.0, fill: { color: C.card } });
s.addText("FINAL", {
  x: 0.8, y: 1.2, w: 4, h: 0.5,
  fontFace: F.b, fontSize: 16, color: C.primary, bold: true, charSpacing: 6,
});
s.addText("8차시 여정을 마치며", {
  x: 0.8, y: 1.8, w: 8, h: 0.7,
  fontFace: F.h, fontSize: 32, color: C.text, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.6, w: 2.0, h: 0.04, fill: { color: C.primary } });
s.addText([
  { text: "1차시에서 쓴 설문 답변을 기억하시나요?", options: { fontSize: 18, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: "\"기계가 생각할 수 있는가?\"에 대한 여러분의 첫 번째 답변.", options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "퍼셉트론 → 활성화함수 → 손실함수 → 경사하강법 → 역전파", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "→ 임베딩 → 어텐션 → 다음 토큰 예측", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "이 모든 것을 배운 지금,", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "여러분의 답은 어떻게 바뀌었나요?", options: { fontSize: 18, fontFace: F.b, color: C.primary, bold: true } },
], { x: 0.8, y: 2.9, w: 7.0, h: 2.5, valign: "top", lineSpacingMultiple: 1.4 });

s.addText("8시간의 여정, 수고하셨습니다!", {
  x: 0.8, y: 4.9, w: 8.4, h: 0.4,
  fontFace: F.h, fontSize: 20, color: C.primary, bold: true,
});


// ═══════════════════════════════════════════════════════════════
//  형성평가 섹션
// ═══════════════════════════════════════════════════════════════
addSection("📝", "형성평가", "8차시 학습 내용을 확인합니다");

// ── 문제 1: AI의 핵심 원리 (객관식) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText("문제 1. AI의 핵심 원리 (객관식)", {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 2.8,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "ChatGPT, 번역기, 코드 자동완성 등\n모든 언어 AI의 핵심 원리로 가장 적절한 것은?", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "① 인터넷에서 정답을 검색하여 보여주는 것", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "② 주어진 문맥을 보고 다음에 올 가능성이\n    높은 단어를 예측하는 것", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "③ 사람의 뇌를 완벽하게 복제하여 생각하는 것", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "④ 모든 질문의 정답을 DB에 저장해두고 찾는 것", options: { fontSize: 12, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 1.15, w: 4.9, h: 2.7, valign: "middle", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 2.8,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 정답: ②", options: { fontSize: 16, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "오답 해설:", options: { fontSize: 12, fontFace: F.h, color: C.sub, bold: true, breakLine: true } },
  { text: "① 검색 엔진이 아님", options: { fontSize: 11, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "③ 뇌 복제가 아닌 수학적 연산", options: { fontSize: 11, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "④ DB 저장이 아닌 패턴 학습", options: { fontSize: 11, fontFace: F.b, color: C.sub } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.6, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 4.15, w: 9.0, h: 1.0,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭  ", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: ② 선택  |  하: 다른 보기 선택", options: { fontSize: 11, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 4.2, w: 8.4, h: 0.9, valign: "middle", lineSpacingMultiple: 1.3 });

// ── 문제 2: Temperature의 역할 (객관식) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText("문제 2. Temperature의 역할 (객관식)", {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 3.0,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "Temperature에 대한 설명으로 옳지 않은 것은?", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "① 낮으면 확률 최고 단어만 선택 → 안전/지루", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "② 높으면 낮은 확률 단어도 선택\n    → 창의적/엉뚱할 수 있음", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "③ AI가 학습하는 데이터의 양을\n    조절하는 값이다", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "④ 코드 작성 시 낮게, 시 작성 시 높게 설정", options: { fontSize: 12, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 1.15, w: 4.9, h: 2.9, valign: "middle", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 3.0,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 정답: ③", options: { fontSize: 16, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "Temperature는 학습 데이터\n양과 무관합니다.", options: { fontSize: 12, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "다음 단어 선택 시 얼마나\n모험적으로 선택할지를\n조절하는 값입니다.", options: { fontSize: 12, fontFace: F.b, color: C.text } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.8, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 4.35, w: 9.0, h: 1.0,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭  ", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: ③ 선택  |  하: 다른 보기 선택", options: { fontSize: 11, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 4.4, w: 8.4, h: 0.9, valign: "middle", lineSpacingMultiple: 1.3 });

// ── 문제 3: 어텐션의 역할 (객관식) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText("문제 3. 어텐션의 역할 (객관식)", {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 3.0,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: '"나는 프랑스에서 태어나서 어릴 때부터\n쭉 그곳에서 살았고 ... ___를 잘합니다."', options: { fontSize: 13, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "AI가 가장 주목해야 하는 부분은?", options: { fontSize: 14, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: '① "초등학교와 중학교도 거기서 다녔기 때문에"', options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: '② "나는 프랑스에서 태어나서"', options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: '③ "어릴 때부터 쭉 그곳에서 살았고"', options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: '④ "잘합니다"', options: { fontSize: 12, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 1.15, w: 4.9, h: 2.9, valign: "middle", lineSpacingMultiple: 1.15 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 3.0,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 정답: ②", options: { fontSize: 16, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: '"프랑스어"를 예측하려면\n"프랑스에서 태어나서"가\n핵심 단서입니다.', options: { fontSize: 12, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "어텐션의 핵심:\n관련 있는 단어에 강하게 주목!", options: { fontSize: 12, fontFace: F.h, color: C.primary, bold: true } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.8, valign: "middle", lineSpacingMultiple: 1.25 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 4.35, w: 9.0, h: 1.0,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭  ", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: ② 선택  |  하: 다른 보기 선택", options: { fontSize: 11, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 4.4, w: 8.4, h: 0.9, valign: "middle", lineSpacingMultiple: 1.3 });

// ── 문제 4: 트랜스포머와 RNN 비교 (객관식) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText("문제 4. 트랜스포머와 RNN 비교 (객관식)", {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 2.6,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "트랜스포머가 RNN에 비해 가지는\n장점으로 옳은 것을 모두 고르세요.", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "① 모든 단어를 동시에 처리 → 속도 빠름", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "② 어텐션으로 긴 문장도 앞부분 잊지 않음", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "③ 학습 데이터가 전혀 필요 없다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "④ 파라미터 수가 항상 더 적다", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 1.15, w: 4.9, h: 2.5, valign: "middle", lineSpacingMultiple: 1.25 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 2.6,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 정답: ①, ②", options: { fontSize: 16, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "③ 학습 데이터 반드시 필요", options: { fontSize: 11, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "④ 파라미터가 반드시 적지 않음\n   (GPT-4: 수천억~수조 개)", options: { fontSize: 11, fontFace: F.b, color: C.sub } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.4, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3.95, w: 9.0, h: 1.2,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭  ", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: ①② 모두 선택  |  중: 하나만 선택  |  하: ③④ 포함 선택", options: { fontSize: 11, fontFace: F.b, color: C.sub } },
], { x: 0.8, y: 4.05, w: 8.4, h: 1.0, valign: "middle", lineSpacingMultiple: 1.3 });

// ── 문제 5: 환각의 구조적 원인 (서술형) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText("문제 5. 환각의 구조적 원인 (서술형)", {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 2.4,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "AI에게 존재하지 않는 논문을 물으면\n마치 사실인 것처럼 답을 만들어냅니다.", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "이 환각(hallucination)이 단순한 버그가\n아니라 AI의 구조적 필연인 이유를,\n'다음 단어 예측' 원리를 근거로\n설명하세요.", options: { fontSize: 14, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 0.8, y: 1.2, w: 4.9, h: 2.2, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 2.4,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 예시 답안", options: { fontSize: 14, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "AI는 항상 다음 단어를 예측.\n정답이 없어도 멈추지 않고\n가장 그럴듯한 단어를 이어붙임\n→ 구조적 필연", options: { fontSize: 12, fontFace: F.b, color: C.text } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.2, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3.75, w: 9.0, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: "상(5점): '다음 단어 예측' 근거 + 정답 유/무 대비 + 구조적 필연 논리적 설명", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "중(3점): '다음 단어 예측' 근거 언급, 구조적 성격 설명하나 논리 다소 불완전", options: { fontSize: 11, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "하(1점): 환각 이유 대략 이해하나 '다음 단어 예측'과의 연결 불명확", options: { fontSize: 11, fontFace: F.b, color: C.muted } },
], { x: 0.8, y: 3.85, w: 8.4, h: 1.4, valign: "middle", lineSpacingMultiple: 1.35 });

// ── 문제 6: 전체 파이프라인 정리 (서술형) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText("문제 6. 전체 파이프라인 정리 (서술형)", {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 2.6,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: '"오늘 날씨가 좋아서 산책을 ___"에\n"갔습니다"를 생성하기까지의 과정을\n다음 순서로 설명하세요:', options: { fontSize: 13, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "토큰화 → 임베딩 → 어텐션\n→ 신경망 처리 → 확률 출력 → 선택", options: { fontSize: 14, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 0.8, y: 1.2, w: 4.9, h: 2.4, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 2.6,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 예시 답안 (요약)", options: { fontSize: 14, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "1. 토큰화: 문장을 조각으로 쪼갬", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "2. 임베딩: 의미 담긴 벡터로 변환", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "3. 어텐션: 토큰 간 관련성 계산", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "4. 신경망: 여러 층 통과 처리", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "5. 확률: 모든 단어의 확률 계산", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "6. 선택: Temperature로 단어 선택", options: { fontSize: 11, fontFace: F.b, color: C.text } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.4, valign: "middle", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3.95, w: 9.0, h: 1.4,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: "상(5점): 6단계 모두 순서대로 + 각 단계 구체적 설명 + '반복'까지 언급", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "중(3점): 주요 단계 순서대로 설명하나 일부 누락/부족", options: { fontSize: 11, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "하(1점): 전체 흐름 대략 이해하나 단계별 설명 부정확 또는 순서 틀림", options: { fontSize: 11, fontFace: F.b, color: C.muted } },
], { x: 0.8, y: 4.05, w: 8.4, h: 1.2, valign: "middle", lineSpacingMultiple: 1.35 });

// ── 문제 7: "기계가 생각할 수 있는가?" (서술형) ──
s = pres.addSlide();
s.background = { color: C.bg };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
s.addText('문제 7. "기계가 생각할 수 있는가?" (서술형)', {
  x: 0.5, y: 0.25, w: 9.0, h: 0.55,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.85, w: 2.0, h: 0.04, fill: { color: C.accent } });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.1, w: 5.5, h: 2.6,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: '1차시의 "중국어 방" 사고실험과\n8차시의 AI 작동 원리를 연결하여,', options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: '"ChatGPT가 정말 언어를\n이해하는 것인지"에 대한\n자신의 의견을 근거와 함께\n서술하세요.', options: { fontSize: 14, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 0.8, y: 1.2, w: 4.9, h: 2.4, valign: "middle", lineSpacingMultiple: 1.3 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.2, y: 1.1, w: 3.3, h: 2.6,
  fill: { color: C.greenLight }, rectRadius: 0.15, shadow: shCard(),
});
s.addText([
  { text: "✅ 예시 답안 (양쪽 모두 가능)", options: { fontSize: 13, fontFace: F.h, color: C.green, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "이해한다: 시스템 반론 관점에서\n전체가 이해할 수 있다", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 4, breakLine: true } },
  { text: "이해 못한다: 다음 토큰 확률\n예측일 뿐, 진위를 판별하지\n않음 = 중국어 방과 동일", options: { fontSize: 11, fontFace: F.b, color: C.text } },
], { x: 6.4, y: 1.2, w: 2.9, h: 2.4, valign: "middle", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3.95, w: 9.0, h: 1.4,
  fill: { color: C.card }, rectRadius: 0.15,
});
s.addText([
  { text: "📊 루브릭", options: { fontSize: 13, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: "상(5점): 중국어 방 + '다음 단어 예측' 연결 + 구체적 근거(환각, 어텐션 등 활용)", options: { fontSize: 11, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "중(3점): 중국어 방과 AI 원리 연결하여 의견 제시, 근거 다소 피상적", options: { fontSize: 11, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "하(1점): 의견은 있으나 중국어 방/AI 원리와의 연결 불명확", options: { fontSize: 11, fontFace: F.b, color: C.muted } },
], { x: 0.8, y: 4.05, w: 8.4, h: 1.2, valign: "middle", lineSpacingMultiple: 1.35 });


// ═══════════════════════════════════════════════════════════════
//  SAVE
// ═══════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "lesson08-final.pptx" })
  .then(() => console.log("lesson08-final.pptx created successfully! (54 slides - 46 + 8 assessment slides)"))
  .catch(err => console.error("Error:", err));
