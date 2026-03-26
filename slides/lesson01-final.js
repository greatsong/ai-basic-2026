const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AI 기초 교재팀";
pres.title = "1차시: 기계가 생각할 수 있는가?";

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
const IMG = "/Users/greatsong/greatsong-project/ai-basic-2026/textbook/public/images/lesson01/";

// ─── Factory helpers (NEVER reuse option objects) ───
const sh = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.08 });
const shCard = () => ({ type: "outer", blur: 4, offset: 1, angle: 135, color: "000000", opacity: 0.06 });

// ═══════════════════════════════════════════════════════════════
// HELPER: Question Slide — big question on soft bg
// ═══════════════════════════════════════════════════════════════
function addQuestion(question, opts = {}) {
  const s = pres.addSlide();
  s.background = { color: C.soft };
  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  // Question mark icon circle
  s.addShape(pres.shapes.OVAL, {
    x: 4.3, y: 0.6, w: 1.4, h: 1.4,
    fill: { color: C.card }, line: { color: C.primary, width: 2 },
  });
  s.addText("?", {
    x: 4.3, y: 0.6, w: 1.4, h: 1.4,
    fontFace: "Georgia", fontSize: 48, color: C.primary, bold: true,
    align: "center", valign: "middle",
  });
  // The question
  s.addText(question, {
    x: 1.0, y: 2.2, w: 8.0, h: 2.4,
    fontFace: F.h, fontSize: opts.fontSize || 36, color: C.text,
    bold: true, align: "center", valign: "middle",
    lineSpacingMultiple: 1.35,
  });
  // Optional subtitle
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
// HELPER: Content Slide — white bg with top accent line
// ═══════════════════════════════════════════════════════════════
function addContent(title, opts = {}) {
  const s = pres.addSlide();
  s.background = { color: opts.bgColor || C.bg };
  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: C.primary } });
  // Title
  if (title) {
    s.addText(title, {
      x: 0.7, y: 0.35, w: 8.6, h: 0.65,
      fontFace: F.h, fontSize: opts.titleSize || 26, color: C.text, bold: true,
    });
    // Underline
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 1.05, w: 2.0, h: 0.04, fill: { color: C.accent } });
  }
  return s;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Section Title Slide — episode divider
// ═══════════════════════════════════════════════════════════════
function addSection(num, title, sub) {
  const s = pres.addSlide();
  s.background = { color: C.soft };
  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  // Left accent rectangle
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 5.63, fill: { color: C.primary } });
  // Episode number
  s.addText("EPISODE " + num, {
    x: 1.0, y: 1.2, w: 4.0, h: 0.5,
    fontFace: F.b, fontSize: 16, color: C.primary, bold: true, charSpacing: 6,
  });
  // Big number
  s.addText(num, {
    x: 6.5, y: 0.5, w: 3.0, h: 4.0,
    fontFace: "Georgia", fontSize: 144, color: C.card,
    bold: true, align: "right", valign: "middle",
  });
  // Title
  s.addText(title, {
    x: 1.0, y: 2.0, w: 7.0, h: 1.6,
    fontFace: F.h, fontSize: 38, color: C.text, bold: true,
    lineSpacingMultiple: 1.25,
  });
  // Subtitle
  if (sub) {
    s.addText(sub, {
      x: 1.0, y: 3.8, w: 7.0, h: 0.5,
      fontFace: F.b, fontSize: 15, color: C.sub,
    });
  }
  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.57, w: 10, h: 0.06, fill: { color: C.primary } });
  return s;
}

// ═══════════════════════════════════════════════════════════════
// HELPER: Image-only slide (diagrams)
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
    const yPos = 1.1 + i * 0.75;
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
    const tipY = 1.1 + steps.length * 0.75 + 0.1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: tipY, w: 9.0, h: 0.55,
      fill: { color: C.orangeLight }, rectRadius: 0.1,
    });
    s.addText([
      { text: "TIP  ", options: { fontSize: 12, fontFace: F.h, color: C.warm, bold: true } },
      { text: opts.tip, options: { fontSize: 12, fontFace: F.b, color: C.sub } },
    ], { x: 0.7, y: tipY, w: 8.6, h: 0.55, valign: "middle" });
  }
  return s;
}


// ═══════════════════════════════════════════════════════════════
//  SLIDE 1 — TITLE (White, clean, modern)
// ═══════════════════════════════════════════════════════════════
let s = pres.addSlide();
s.background = { color: C.bg };
// Top accent bar
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
// Bottom accent bar
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.57, w: 10, h: 0.06, fill: { color: C.primary } });
// Left decorative circle
s.addShape(pres.shapes.OVAL, {
  x: -1.5, y: -1.5, w: 5.0, h: 5.0,
  fill: { color: C.soft },
});
// Right decorative circle
s.addShape(pres.shapes.OVAL, {
  x: 7.5, y: 3.0, w: 4.0, h: 4.0,
  fill: { color: C.card },
});
// Lesson number
s.addText("LESSON 01", {
  x: 0.8, y: 1.0, w: 4, h: 0.5,
  fontFace: F.b, fontSize: 16, color: C.primary, bold: true, charSpacing: 8,
});
// Main title
s.addText("기계가 생각할\n수 있는가?", {
  x: 0.8, y: 1.7, w: 8, h: 2.2,
  fontFace: F.h, fontSize: 48, color: C.text, bold: true, lineSpacingMultiple: 1.2,
});
// Divider line
s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 4.05, w: 2.5, h: 0.04, fill: { color: C.primary } });
// Subtitle keywords
s.addText("튜링 테스트  ·  중국어 방  ·  강한 AI vs 약한 AI", {
  x: 0.8, y: 4.3, w: 8, h: 0.4,
  fontFace: F.b, fontSize: 16, color: C.sub,
});
// Bottom info
s.addText("AI 기초  |  고등학교 정보 교과  |  50분", {
  x: 0.8, y: 4.9, w: 8, h: 0.3,
  fontFace: F.b, fontSize: 12, color: C.muted,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 2 — 오늘의 질문 + 학습목표
// ═══════════════════════════════════════════════════════════════
s = addContent("오늘의 질문");
// Question card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
});
s.addText([
  { text: '"', options: { fontSize: 48, fontFace: "Georgia", color: C.primary, bold: true } },
  { text: "ChatGPT는 정말 '생각'하는 걸까?", options: { fontSize: 28, fontFace: F.h, color: C.text, bold: true } },
  { text: '"', options: { fontSize: 48, fontFace: "Georgia", color: C.primary, bold: true } },
], { x: 1.0, y: 1.45, w: 8.0, h: 1.2, align: "center", valign: "middle" });

// Learning objective card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.2, w: 8.6, h: 1.8,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: shCard(),
});
s.addText("학습목표", {
  x: 1.1, y: 3.35, w: 3.0, h: 0.45,
  fontFace: F.h, fontSize: 15, color: C.primary, bold: true,
});
s.addText([
  { text: "인공지능의 역사적 배경을 이해하고,", options: { fontSize: 18, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "기계의 사고 가능성에 대해 자신의 의견을 제시할 수 있다.", options: { fontSize: 18, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 1.1, y: 3.85, w: 8.0, h: 1.0, valign: "middle", lineSpacingMultiple: 1.5 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 3 — Hook: 여러분은 AI를 매일 쓰고 있습니다
// ═══════════════════════════════════════════════════════════════
s = addContent("여러분은 AI를 매일 씁니다", { bgColor: C.soft });
s.addText([
  { text: "숙제를 물어보고, 번역을 시키고, 이야기를 나눕니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "그런데 한 번이라도 이런 생각을 해본 적 있나요?", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
], { x: 0.7, y: 1.3, w: 8.6, h: 1.2, valign: "top" });

// Highlight question card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 1.0, y: 2.7, w: 8.0, h: 1.2,
  fill: { color: C.card }, rectRadius: 0.12, shadow: sh(),
});
s.addText('"이 AI는 정말 내 말을 \'이해\'하고 있는 걸까?"', {
  x: 1.2, y: 2.8, w: 7.6, h: 1.0,
  fontFace: F.h, fontSize: 22, color: C.primaryDark, bold: true,
  align: "center", valign: "middle",
});

s.addText([
  { text: "76년 전, 한 천재 수학자가 정확히 같은 질문을 했습니다.", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "그리고 질문을 바꿨습니다:", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
], { x: 0.7, y: 4.1, w: 8.6, h: 0.8, valign: "top" });

s.addText('"사람인지 기계인지 구별할 수 없다면 \u2014 그 기계는 생각할 수 있는 걸까?"', {
  x: 1.0, y: 4.85, w: 8.0, h: 0.5,
  fontFace: F.h, fontSize: 18, color: C.primary, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 4 — SECTION: 앨런 튜링 이야기
// ═══════════════════════════════════════════════════════════════
addSection("1", "앨런 튜링 이야기", "1912-1954  |  컴퓨터 과학의 아버지  |  에니그마 해독");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 5 — Question: 기계가 생각하는지 어떻게 알 수 있을까?
// ═══════════════════════════════════════════════════════════════
addQuestion("기계가 생각하는지\n어떻게 알 수 있을까?", {
  fontSize: 38,
  sub: "1950년, 한 수학자의 질문",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 6 — Turing Bio with LARGE photo
// ═══════════════════════════════════════════════════════════════
s = addContent("앨런 튜링 (1912\u20131954)");
// Large photo with shadow
s.addImage({
  path: IMG + "alan-turing.jpg",
  x: 0.7, y: 1.3, w: 3.0, h: 3.8,
  rounding: true, shadow: sh(),
  sizing: { type: "cover", w: 3.0, h: 3.8 },
});
// Caption under photo
s.addText('"컴퓨터 과학의 아버지"', {
  x: 0.7, y: 5.15, w: 3.0, h: 0.35,
  fontFace: F.b, fontSize: 11, color: C.muted, align: "center", italic: true,
});
// Bio bullets
s.addText([
  { text: "1936  ", options: { fontSize: 12, fontFace: F.b, color: C.primary, bold: true } },
  { text: '"튜링 머신" 개념 제안', options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "       현대 컴퓨터의 이론적 기초", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "WW2  ", options: { fontSize: 12, fontFace: F.b, color: C.primary, bold: true } },
  { text: "에니그마 암호 해독", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "       하루 15만 통 해독, 전쟁 2년 단축", options: { fontSize: 12, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "1950  ", options: { fontSize: 12, fontFace: F.b, color: C.primary, bold: true } },
  { text: '"모방 게임" 논문 발표', options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "       Computing Machinery and Intelligence", options: { fontSize: 12, fontFace: F.b, color: C.sub, italic: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "2019  ", options: { fontSize: 12, fontFace: F.b, color: C.primary, bold: true } },
  { text: "영국 50파운드 지폐 인물 선정", options: { fontSize: 14, fontFace: F.b, color: C.text } },
], { x: 4.1, y: 1.3, w: 5.5, h: 4.0, valign: "top", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 7 — Turing's Key Idea: 질문의 전환
// ═══════════════════════════════════════════════════════════════
s = addContent("튜링의 핵심 아이디어", { bgColor: C.soft });

// Before card (crossed out)
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 1.3,
  fill: { color: C.white }, rectRadius: 0.12, shadow: shCard(),
  line: { color: C.muted, width: 1 },
});
s.addText("X", {
  x: 0.9, y: 1.4, w: 0.8, h: 0.8,
  fontFace: F.h, fontSize: 36, color: C.red, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "원래 질문", options: { fontSize: 12, fontFace: F.b, color: C.muted, breakLine: true } },
  { text: '"기계가 생각할 수 있는가?"', options: { fontSize: 20, fontFace: F.h, color: C.muted, bold: true } },
], { x: 1.8, y: 1.4, w: 7.0, h: 1.1, valign: "middle" });

// Arrow
s.addText("\u2193", {
  x: 4.5, y: 2.7, w: 1.0, h: 0.6,
  fontFace: F.h, fontSize: 28, color: C.primary, align: "center", valign: "middle",
});

// After card (highlighted)
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.3, w: 8.6, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText("\u2713", {
  x: 0.9, y: 3.45, w: 0.8, h: 0.8,
  fontFace: F.h, fontSize: 36, color: C.green, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "튜링의 질문", options: { fontSize: 12, fontFace: F.b, color: C.primary, bold: true, breakLine: true } },
  { text: '"사람인지 기계인지 구별할 수 없다면,', options: { fontSize: 20, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: ' 그 기계는 생각할 수 있는 것 아닌가?"', options: { fontSize: 20, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 1.8, y: 3.4, w: 7.0, h: 1.4, valign: "middle", lineSpacingMultiple: 1.3 });

s.addText("핵심: '생각한다'를 정의하는 대신, 관찰 가능한 행동으로 판단", {
  x: 0.7, y: 5.1, w: 8.6, h: 0.35,
  fontFace: F.b, fontSize: 13, color: C.sub, align: "center", italic: true,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 7b — Turing Question Shift Diagram (NEW IMAGE)
// ═══════════════════════════════════════════════════════════════
addImageSlide("튜링의 질문 전환: 정의에서 관찰로", IMG + "turing-question-shift.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 8 — Turing Test Rules (3 cards)
// ═══════════════════════════════════════════════════════════════
s = addContent("튜링 테스트: 모방 게임");
const roles = [
  { icon: "\u2696", label: "심판", desc: "질문을 던지고\n사람/AI를 구별", color: C.primary },
  { icon: "\uD83D\uDC64", label: "사람", desc: "자연스럽게\n대화에 참여", color: C.green },
  { icon: "\uD83E\uDD16", label: "AI", desc: "사람처럼\n대화하기", color: C.purple },
];
roles.forEach((r, i) => {
  const xPos = 0.7 + i * 3.1;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos, y: 1.3, w: 2.8, h: 3.5,
    fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  });
  // Icon circle
  s.addShape(pres.shapes.OVAL, {
    x: xPos + 0.75, y: 1.55, w: 1.3, h: 1.3,
    fill: { color: C.card }, line: { color: r.color, width: 2 },
  });
  s.addText(r.icon, {
    x: xPos + 0.75, y: 1.55, w: 1.3, h: 1.3,
    fontSize: 36, align: "center", valign: "middle",
  });
  // Label
  s.addText(r.label, {
    x: xPos, y: 3.1, w: 2.8, h: 0.5,
    fontFace: F.h, fontSize: 22, color: r.color, bold: true, align: "center",
  });
  // Description
  s.addText(r.desc, {
    x: xPos + 0.2, y: 3.7, w: 2.4, h: 0.9,
    fontFace: F.b, fontSize: 14, color: C.sub, align: "center", valign: "top",
    lineSpacingMultiple: 1.4,
  });
});
// Key rule at bottom
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 5.0, w: 8.6, h: 0.45,
  fill: { color: C.card }, rectRadius: 0.08,
});
s.addText("핵심: 심판이 구별하지 못하면, 기계는 테스트를 '통과'한 것", {
  x: 0.7, y: 5.0, w: 8.6, h: 0.45,
  fontFace: F.b, fontSize: 14, color: C.primaryDark, bold: true, align: "center", valign: "middle",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 9 — Turing Test Diagram (image)
// ═══════════════════════════════════════════════════════════════
addImageSlide("튜링 테스트 구조", IMG + "turing-test-diagram.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 10 — Turing's Prediction vs Reality
// ═══════════════════════════════════════════════════════════════
s = addContent("튜링의 예측 vs 현실");
// Prediction card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 4.0, h: 3.6,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
});
s.addText("1950년의 예측", {
  x: 0.9, y: 1.45, w: 3.6, h: 0.4,
  fontFace: F.h, fontSize: 16, color: C.primary, bold: true, align: "center",
});
s.addText([
  { text: '"약 50년 후...', options: { fontSize: 13, fontFace: F.b, color: C.sub, italic: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "5분간 대화 후 심판이", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "사람과 기계를", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: '30% 이상 혼동하게 될 것"', options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "\u2192 2000년경 달성 예측", options: { fontSize: 13, fontFace: F.b, color: C.primary, bold: true } },
], { x: 1.0, y: 2.0, w: 3.4, h: 2.6, valign: "middle", lineSpacingMultiple: 1.3 });

// Reality card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.3, y: 1.3, w: 4.0, h: 3.6,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
});
s.addText("현실", {
  x: 5.5, y: 1.45, w: 3.6, h: 0.4,
  fontFace: F.h, fontSize: 16, color: C.primaryDark, bold: true, align: "center",
});
s.addText([
  { text: "2022년 ChatGPT 등장", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "예측보다 22년 늦었지만", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "예상보다 훨씬 강력한 능력", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "단순 모방을 넘어", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "자연스러운 대화가 가능", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 5.5, y: 2.0, w: 3.6, h: 2.6, valign: "middle", lineSpacingMultiple: 1.3 });

s.addText("튜링의 질문은 교과서 밖으로 나와 모든 사람의 일상이 되었습니다", {
  x: 0.7, y: 5.1, w: 8.6, h: 0.35,
  fontFace: F.b, fontSize: 13, color: C.sub, align: "center", italic: true,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 11 — SECTION: 직접 실험
// ═══════════════════════════════════════════════════════════════
addSection("2", "직접 실험해봅시다", "이미테이션 게임  |  여러분이 심판입니다");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 11b — [교사 안내] 이미테이션 게임 활동
// ═══════════════════════════════════════════════════════════════
addActivityGuide("체험 활동: 이미테이션 게임", [
  { title: "환경 준비", desc: "교재 사이트의 '이미테이션 게임' 페이지를 학생 기기에 띄워주세요. 2인 1조로 매칭합니다.", color: C.teal },
  { title: "규칙 안내", desc: "심판(질문자)과 응답자 역할 배정. 말투는 시스템이 랜덤 지정합니다.", color: C.primary },
  { title: "게임 진행", desc: "5~6턴 대화 후, 각 턴마다 상대가 사람인지 AI인지 판별합니다. 말투가 아닌 내용에 집중하도록 유도!", color: C.orange },
  { title: "결과 공유", desc: "정답률을 확인하고, '어떤 질문이 효과적이었는지' 토론으로 연결합니다.", color: C.green },
  { title: "핵심 연결", desc: "'말투를 왜 통일했는지' → 튜링 테스트의 공정한 조건 → 중국어 방 사고실험으로 자연스럽게 이어갑니다.", color: C.purple },
], { tip: "학생들이 AI를 구별하지 못할수록 '기계가 생각하는가?' 질문이 강력해집니다. 결과를 미리 알려주지 마세요!" });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 12 — Game Introduction
// ═══════════════════════════════════════════════════════════════
s = addContent("이미테이션 게임", { bgColor: C.soft });
s.addText([
  { text: "여러분은 지금부터 ", options: { fontSize: 18, fontFace: F.b, color: C.text } },
  { text: "심판", options: { fontSize: 18, fontFace: F.h, color: C.primary, bold: true } },
  { text: "이 됩니다.", options: { fontSize: 18, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "화면 너머의 상대와 채팅을 하는데,", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "상대가 사람인지 AI인지 알 수 없습니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "미션: 각 턴마다 상대가 사람인지 AI인지 구별하기!", options: { fontSize: 16, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 0.7, y: 1.3, w: 8.6, h: 2.5, valign: "top", lineSpacingMultiple: 1.35 });

// Tip box
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.9, w: 8.6, h: 1.4,
  fill: { color: C.card }, rectRadius: 0.12, shadow: shCard(),
});
s.addText("TIP", {
  x: 1.0, y: 4.0, w: 1.0, h: 0.35,
  fontFace: F.h, fontSize: 13, color: C.primary, bold: true,
});
s.addText([
  { text: "단순한 사실 질문보다는 경험, 감정, 맥락을 묻는 질문이 효과적!", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: '예: "오늘 아침에 뭐 먹었어?"', options: { fontSize: 13, fontFace: F.b, color: C.sub, italic: true } },
], { x: 1.0, y: 4.35, w: 8.0, h: 0.8, valign: "top", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 13 — Game Rules (5 steps)
// ═══════════════════════════════════════════════════════════════
s = addContent("게임 규칙");
const rules = [
  { n: "1", t: "2명씩 매칭 \u2014 심판(질문) + 응답자(답변)" },
  { n: "2", t: "말투 고정 \u2014 모든 답변이 동일한 말투로 변환" },
  { n: "3", t: "매 턴 랜덤으로 사람 또는 AI가 답변" },
  { n: "4", t: "모든 답변은 동일한 말투 \u2192 내용으로만 판별!" },
  { n: "5", t: "5~6턴 후, 각 턴마다 사람/AI 판별 제출" },
];
rules.forEach((r, i) => {
  const yPos = 1.3 + i * 0.82;
  // Number circle
  s.addShape(pres.shapes.OVAL, {
    x: 0.9, y: yPos + 0.05, w: 0.55, h: 0.55,
    fill: { color: C.primary },
  });
  s.addText(r.n, {
    x: 0.9, y: yPos + 0.05, w: 0.55, h: 0.55,
    fontFace: F.h, fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle",
  });
  // Rule text
  s.addText(r.t, {
    x: 1.7, y: yPos, w: 7.5, h: 0.65,
    fontFace: F.b, fontSize: 15, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 14 — Post-game: 실험 후 토론
// ═══════════════════════════════════════════════════════════════
s = addContent("실험 후 토론", { bgColor: C.soft });
s.addText("실험 후 토론 포인트", {
  x: 0.7, y: 3.6, w: 8.6, h: 0.4,
  fontFace: F.h, fontSize: 16, color: C.primaryDark, bold: true,
});
s.addText([
  { text: "1. 어떤 질문이 사람과 AI를 구별하는 데 가장 효과적이었나요?", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "2. AI가 여러분과 같은 말투로 자연스럽게 답했는데,", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "   AI는 그 말의 '의미'를 알고 있었을까요?", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 0.9, y: 4.05, w: 8.2, h: 1.3, valign: "top", lineSpacingMultiple: 1.5 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 15 — SECTION: 중국어 방
// ═══════════════════════════════════════════════════════════════
addSection("3", "중국어 방", "1980년  |  존 설의 반론  |  이해 vs 흉내");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 16 — Question: 구별할 수 없다면 정말 생각하는 것일까?
// ═══════════════════════════════════════════════════════════════
addQuestion("구별할 수 없다면\n정말 생각하는 것일까?", {
  fontSize: 38,
  sub: "행동이 같으면, 같은 것인가?",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 17 — Searle Bio with LARGE photo
// ═══════════════════════════════════════════════════════════════
s = addContent("존 설 (John Searle)");
// Large photo
s.addImage({
  path: IMG + "john-searle.jpg",
  x: 0.7, y: 1.3, w: 3.0, h: 3.8,
  rounding: true, shadow: sh(),
  sizing: { type: "cover", w: 3.0, h: 3.8 },
});
// Caption
s.addText("미국 철학자, UC 버클리 교수", {
  x: 0.7, y: 5.15, w: 3.0, h: 0.35,
  fontFace: F.b, fontSize: 11, color: C.muted, align: "center", italic: true,
});
// Bio text
s.addText([
  { text: "튜링 테스트에 대한 가장 유명한 반론", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: '1980년 "Minds, Brains, and Programs" 논문', options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "핵심 주장:", options: { fontSize: 14, fontFace: F.b, color: C.primary, bold: true, breakLine: true } },
  { text: '"행동이 사람과 같다고 해서', options: { fontSize: 16, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: ' 진짜 이해하는 것은 아니다"', options: { fontSize: 16, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "컴퓨터는 구문(syntax)은 있지만", options: { fontSize: 14, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "의미론(semantics)은 없다", options: { fontSize: 14, fontFace: F.b, color: C.sub } },
], { x: 4.1, y: 1.3, w: 5.5, h: 4.0, valign: "top", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 18 — Chinese Room Step 1
// ═══════════════════════════════════════════════════════════════
s = addContent("중국어 방 \u2014 상상해보세요 (1/3)", { bgColor: C.soft });
// Step card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 3.5,
  fill: { color: C.white }, rectRadius: 0.15, shadow: sh(),
});
// Step number
s.addShape(pres.shapes.OVAL, {
  x: 1.1, y: 1.6, w: 1.0, h: 1.0,
  fill: { color: C.primary },
});
s.addText("1", {
  x: 1.1, y: 1.6, w: 1.0, h: 1.0,
  fontFace: F.h, fontSize: 36, color: C.white, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "중국어를 전혀 모르는 사람이", options: { fontSize: 22, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: "밀폐된 방 안에 있습니다", options: { fontSize: 22, fontFace: F.h, color: C.text, bold: true } },
], { x: 2.4, y: 1.6, w: 6.5, h: 1.0, valign: "middle", lineSpacingMultiple: 1.3 });

s.addText([
  { text: "이 사람은 중국어를 단 한 글자도 읽지 못합니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "방 안에는 오직 한 가지만 있습니다:", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "두꺼운 규칙 매뉴얼 한 권", options: { fontSize: 18, fontFace: F.h, color: C.primary, bold: true } },
], { x: 1.3, y: 2.9, w: 7.6, h: 1.6, valign: "top", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 19 — Chinese Room Step 2
// ═══════════════════════════════════════════════════════════════
s = addContent("중국어 방 \u2014 상상해보세요 (2/3)", { bgColor: C.soft });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 3.5,
  fill: { color: C.white }, rectRadius: 0.15, shadow: sh(),
});
s.addShape(pres.shapes.OVAL, {
  x: 1.1, y: 1.6, w: 1.0, h: 1.0,
  fill: { color: C.primary },
});
s.addText("2", {
  x: 1.1, y: 1.6, w: 1.0, h: 1.0,
  fontFace: F.h, fontSize: 36, color: C.white, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "규칙 매뉴얼이 있습니다:", options: { fontSize: 22, fontFace: F.h, color: C.text, bold: true } },
], { x: 2.4, y: 1.6, w: 6.5, h: 0.6, valign: "middle" });

s.addText([
  { text: '"이런 글자가 들어오면,', options: { fontSize: 18, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: ' 이런 글자를 내보내라"', options: { fontSize: 18, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "밖에서 중국어 질문을 넣으면,", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "이 사람은 매뉴얼을 보고", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "중국어 답변을 내보냅니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub } },
], { x: 1.3, y: 2.5, w: 7.6, h: 2.0, valign: "top", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 20 — Chinese Room Step 3
// ═══════════════════════════════════════════════════════════════
s = addContent("중국어 방 \u2014 상상해보세요 (3/3)", { bgColor: C.soft });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 3.5,
  fill: { color: C.white }, rectRadius: 0.15, shadow: sh(),
});
s.addShape(pres.shapes.OVAL, {
  x: 1.1, y: 1.6, w: 1.0, h: 1.0,
  fill: { color: C.primary },
});
s.addText("3", {
  x: 1.1, y: 1.6, w: 1.0, h: 1.0,
  fontFace: F.h, fontSize: 36, color: C.white, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "밖에서 보면?", options: { fontSize: 22, fontFace: F.h, color: C.text, bold: true } },
], { x: 2.4, y: 1.6, w: 6.5, h: 0.6, valign: "middle" });

s.addText([
  { text: "완벽한 중국어 대화가 이루어지는 것처럼 보입니다!", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: '"이 사람은 중국어를 잘하는구나!"', options: { fontSize: 16, fontFace: F.b, color: C.sub, italic: true, breakLine: true } },
  { text: " ", options: { fontSize: 10, breakLine: true } },
  { text: "그런데 방 안의 사람은", options: { fontSize: 18, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: "중국어를 한 글자도 이해하지 못합니다.", options: { fontSize: 18, fontFace: F.h, color: C.red, bold: true, breakLine: true } },
  { text: "그저 규칙만 따랐을 뿐입니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub } },
], { x: 1.3, y: 2.5, w: 7.6, h: 2.2, valign: "top", lineSpacingMultiple: 1.35 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 20b — Chinese Room Process Flow (NEW IMAGE)
// ═══════════════════════════════════════════════════════════════
addImageSlide("중국어 방 프로세스 흐름", IMG + "chinese-room-process.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 21 — Chinese Room Diagram (image)
// ═══════════════════════════════════════════════════════════════
addImageSlide("중국어 방 사고실험", IMG + "chinese-room-diagram.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 21c — [교사 안내] 찬반 토론 활동
// ═══════════════════════════════════════════════════════════════
addActivityGuide("토론 활동: 기계가 생각할 수 있는가?", [
  { title: "논점 정리", desc: "중국어 방 사고실험을 마치고, '행동이 같으면 같은 것인가?' 핵심 질문을 칠판에 게시합니다.", color: C.teal },
  { title: "입장 선택", desc: "A(튜링 테스트 지지) vs B(중국어 방 지지) 중 선택. 소수 의견도 존중하며, 중립 선택도 허용합니다.", color: C.primary },
  { title: "모둠 토론 (5분)", desc: "같은 입장끼리 모여 근거를 정리합니다. '왜 그렇게 생각하는가?'에 초점을 맞춰주세요.", color: C.orange },
  { title: "전체 공유 (5분)", desc: "각 팀 대표가 핵심 근거 1~2개를 발표합니다. 상대 팀에게 반론 기회를 줍니다.", color: C.green },
], { tip: "정답이 없는 질문임을 강조하세요. 이 논쟁은 실제 철학자들 사이에서도 40년 넘게 진행 중입니다!" });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 22 — Chinese Room: So What?
// ═══════════════════════════════════════════════════════════════
s = addContent("그래서 이것이 왜 중요한가?", { bgColor: C.soft });
// Connection card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 2.0,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText([
  { text: "이것이 바로 현재 AI의 모습이라는 주장입니다.", options: { fontSize: 18, fontFace: F.h, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "ChatGPT도 결국은 입력을 받아서,", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "학습된 규칙(수천억 개의 파라미터)에 따라 출력을 만들어내는 것.", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "규칙 매뉴얼이 엄청나게 복잡한 중국어 방.", options: { fontSize: 15, fontFace: F.b, color: C.sub, italic: true } },
], { x: 1.0, y: 1.4, w: 8.0, h: 1.8, valign: "middle", lineSpacingMultiple: 1.35 });

// Big question
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 1.5, y: 3.6, w: 7.0, h: 1.0,
  fill: { color: C.white }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.orange, width: 2 },
});
s.addText("ChatGPT는 '생각하는' 걸까?", {
  x: 1.5, y: 3.6, w: 7.0, h: 1.0,
  fontFace: F.h, fontSize: 24, color: C.text, bold: true, align: "center", valign: "middle",
});

s.addText("이 논쟁은 1980년부터 40년 넘게 계속되고 있습니다", {
  x: 0.7, y: 4.9, w: 8.6, h: 0.35,
  fontFace: F.b, fontSize: 12, color: C.muted, align: "center", italic: true,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 22b — Systems Reply (시스템 반론)
// ═══════════════════════════════════════════════════════════════
s = addContent("시스템 반론 \u2014 가장 유명한 재반박");

// Systems reply card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 8.6, h: 1.6,
  fill: { color: C.card }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.green, width: 2 },
});
s.addText([
  { text: "반론:", options: { fontSize: 14, fontFace: F.b, color: C.green, bold: true, breakLine: true } },
  { text: '"방 안의 사람은 모릅니다. 하지만', options: { fontSize: 17, fontFace: F.h, color: C.text, bold: true, breakLine: true } },
  { text: ' 방 + 사람 + 매뉴얼 전체 시스템은 이해하는 것 아닌가?"', options: { fontSize: 17, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 1.0, y: 1.35, w: 8.0, h: 1.5, valign: "middle", lineSpacingMultiple: 1.35 });

// Neuron analogy
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.15, w: 4.0, h: 1.5,
  fill: { color: C.soft }, rectRadius: 0.12,
});
s.addText([
  { text: "\uD83E\uDDE0  비유", options: { fontSize: 13, fontFace: F.b, color: C.primary, bold: true, breakLine: true } },
  { text: "뉴런 하나는 한국어를 모른다", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "뉴런 수십억 개 = 여러분 = 이해한다", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 0.9, y: 3.2, w: 3.6, h: 1.4, valign: "middle", lineSpacingMultiple: 1.4 });

// Searle's counter
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.3, y: 3.15, w: 4.0, h: 1.5,
  fill: { color: C.soft }, rectRadius: 0.12,
});
s.addText([
  { text: "\u274C  설의 재반박", options: { fontSize: 13, fontFace: F.b, color: C.red, bold: true, breakLine: true } },
  { text: "매뉴얼을 전부 외운 사람 =", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "시스템 자체. 그래도 이해 못 한다", options: { fontSize: 14, fontFace: F.b, color: C.red, bold: true } },
], { x: 5.5, y: 3.2, w: 3.6, h: 1.4, valign: "middle", lineSpacingMultiple: 1.4 });

s.addText("이 논쟁은 여전히 열려 있습니다 \u2014 ChatGPT의 수천억 파라미터 '시스템'은 이해하는 걸까요?", {
  x: 0.7, y: 5.0, w: 8.6, h: 0.4,
  fontFace: F.b, fontSize: 13, color: C.sub, align: "center", italic: true,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 23 — Debate: A vs B
// ═══════════════════════════════════════════════════════════════
s = addContent("찬반 토론");
// Side A
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.3, h: 3.6,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.primary, width: 2 },
});
s.addText("A. 튜링 테스트 지지", {
  x: 0.7, y: 1.4, w: 3.9, h: 0.5,
  fontFace: F.h, fontSize: 16, color: C.primary, bold: true, align: "center",
});
s.addText([
  { text: '"행동이 같으면', options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: ' 구별할 필요가 없다"', options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "결과(행동)가 중요하다", options: { fontSize: 14, fontFace: F.b, color: C.primary, bold: true, breakLine: true } },
  { text: "내부 과정은 알 수 없다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "충분히 복잡하면 이해와 같다", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 0.7, y: 2.1, w: 3.9, h: 2.5, valign: "top", lineSpacingMultiple: 1.4 });

// VS
s.addText("VS", {
  x: 4.3, y: 2.7, w: 1.4, h: 0.7,
  fontFace: F.h, fontSize: 22, color: C.muted, bold: true, align: "center", valign: "middle",
});

// Side B
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.2, y: 1.3, w: 4.3, h: 3.6,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
  line: { color: C.purple, width: 2 },
});
s.addText("B. 중국어 방 지지", {
  x: 5.4, y: 1.4, w: 3.9, h: 0.5,
  fontFace: F.h, fontSize: 16, color: C.purple, bold: true, align: "center",
});
s.addText([
  { text: '"흉내와 이해는', options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: ' 근본적으로 다르다"', options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "진짜 이해가 필요하다", options: { fontSize: 14, fontFace: F.b, color: C.purple, bold: true, breakLine: true } },
  { text: "구문 조작 ≠ 의미 이해", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "시스템 전체도 이해 못한다", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 5.4, y: 2.1, w: 3.9, h: 2.5, valign: "top", lineSpacingMultiple: 1.4 });

s.addText("여러분의 입장은 A? B? 그 이유는?", {
  x: 0.7, y: 5.1, w: 8.6, h: 0.35,
  fontFace: F.h, fontSize: 15, color: C.primaryDark, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 23b — AI Debate Map (NEW IMAGE)
// ═══════════════════════════════════════════════════════════════
addImageSlide("논쟁 지도: 기계가 생각할 수 있는가?", IMG + "ai-debate-map.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 24 — SECTION: 약한 AI vs 강한 AI
// ═══════════════════════════════════════════════════════════════
addSection("4", "약한 AI vs 강한 AI", "현재 AI는 어디에 있는가?");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 25 — Comparison Table
// ═══════════════════════════════════════════════════════════════
s = addContent("약한 AI vs 강한 AI 비교");
// Table
const tableRows = [
  [
    { text: "구분", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "약한 AI (Weak AI)", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
    { text: "강한 AI (Strong AI)", options: { fontFace: F.h, fontSize: 13, color: C.white, bold: true, align: "center", fill: { color: C.primary } } },
  ],
  [
    { text: "정의", options: { fontFace: F.h, fontSize: 13, color: C.text, bold: true, align: "center", fill: { color: C.card } } },
    { text: "지능적인 것처럼\n행동할 수 있다", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "진짜로 이해하고\n의식을 가진다", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "현재 상태", options: { fontFace: F.h, fontSize: 13, color: C.text, bold: true, align: "center", fill: { color: C.card } } },
    { text: "ChatGPT, 시리,\n구글 번역 등", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
    { text: "존재 여부 자체가\n논쟁 중", options: { fontFace: F.b, fontSize: 13, color: C.text, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "핵심 질문", options: { fontFace: F.h, fontSize: 13, color: C.text, bold: true, align: "center", fill: { color: C.card } } },
    { text: '"유용한가?"', options: { fontFace: F.b, fontSize: 13, color: C.primary, bold: true, align: "center", fill: { color: C.soft } } },
    { text: '"의식이 있는가?"', options: { fontFace: F.b, fontSize: 13, color: C.purple, bold: true, align: "center", fill: { color: C.soft } } },
  ],
  [
    { text: "비유", options: { fontFace: F.h, fontSize: 13, color: C.text, bold: true, align: "center", fill: { color: C.card } } },
    { text: "계산기: 계산은 하지만\n수학을 '아는' 건 아님", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.soft } } },
    { text: "영화 속 AI: 스스로\n목표와 감정을 가짐", options: { fontFace: F.b, fontSize: 12, color: C.sub, align: "center", fill: { color: C.soft } } },
  ],
];
s.addTable(tableRows, {
  x: 0.7, y: 1.3, w: 8.6,
  border: { type: "solid", pt: 1, color: C.card },
  colW: [1.6, 3.5, 3.5],
  rowH: [0.5, 0.7, 0.7, 0.6, 0.7],
  margin: [4, 6, 4, 6],
});

// Bottom note
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 4.7, w: 8.6, h: 0.7,
  fill: { color: C.card }, rectRadius: 0.1,
});
s.addText([
  { text: "대부분의 연구자들은 현재 AI를 ", options: { fontSize: 13, fontFace: F.b, color: C.text } },
  { text: '"약한 AI"', options: { fontSize: 13, fontFace: F.h, color: C.primary, bold: true } },
  { text: "로 분류합니다.", options: { fontSize: 13, fontFace: F.b, color: C.text, breakLine: true } },
  { text: '"약하다"고 해서 못 쓰는 게 아닙니다 \u2014 엄청나게 유용하지만, "진정한 이해"를 하는지는 열린 질문입니다.', options: { fontSize: 12, fontFace: F.b, color: C.sub } },
], { x: 0.9, y: 4.75, w: 8.2, h: 0.6, valign: "middle", lineSpacingMultiple: 1.3 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 26 — AI Spectrum Diagram (image)
// ═══════════════════════════════════════════════════════════════
addImageSlide("AI 스펙트럼", IMG + "ai-spectrum.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 26b — Strong vs Weak AI Diagram (NEW IMAGE)
// ═══════════════════════════════════════════════════════════════
addImageSlide("약한 AI vs 강한 AI 비교", IMG + "strong-vs-weak-ai.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 27 — SECTION: AI 역사 — 72년의 여정
// ═══════════════════════════════════════════════════════════════
addSection("5", "72년의 여정", "ELIZA \u2192 Deep Blue \u2192 AlphaGo \u2192 ChatGPT");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 28 — ELIZA (1966)
// ═══════════════════════════════════════════════════════════════
s = addContent("ELIZA \u2014 최초의 챗봇 (1966)", { bgColor: C.soft });
// Year badge
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 1.2, h: 0.5,
  fill: { color: C.primary }, rectRadius: 0.08,
});
s.addText("1966", {
  x: 0.7, y: 1.3, w: 1.2, h: 0.5,
  fontFace: F.h, fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle",
});

s.addText([
  { text: "MIT의 조셉 와이젠바움이 만든 최초의 챗봇", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "단순한 패턴 매칭으로 심리 상담사를 흉내냄", options: { fontSize: 15, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "그런데 사용자들은 ELIZA가 자신을", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "진짜로 이해한다고 느꼈습니다!", options: { fontSize: 16, fontFace: F.h, color: C.primaryDark, bold: true } },
], { x: 2.2, y: 1.3, w: 7.3, h: 2.0, valign: "top", lineSpacingMultiple: 1.35 });

// ELIZA effect card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 3.5, w: 8.6, h: 1.8,
  fill: { color: C.card }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.orange, width: 1 },
});
s.addText("ELIZA 효과", {
  x: 1.0, y: 3.6, w: 3.0, h: 0.4,
  fontFace: F.h, fontSize: 16, color: C.orange, bold: true,
});
s.addText([
  { text: "사람은 기계의 행동에 쉽게 감정을 투영한다", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "와이젠바움 자신도 이 반응에 충격을 받아,", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "이후 AI에 비판적인 입장을 취하게 됩니다.", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 1.0, y: 4.05, w: 8.0, h: 1.1, valign: "top", lineSpacingMultiple: 1.4 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 28b — ELIZA Conversation Example (NEW IMAGE)
// ═══════════════════════════════════════════════════════════════
addImageSlide("ELIZA 대화 예시: 단순 패턴 매칭", IMG + "eliza-conversation.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 29 — Deep Blue & AlphaGo
// ═══════════════════════════════════════════════════════════════
s = addContent('"생각 없이" 이긴 기계들');
// Deep Blue card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.3, h: 3.5,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.3, w: 4.3, h: 0.5,
  fill: { color: C.primary }, rectRadius: 0.15,
});
s.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 1.55, w: 4.3, h: 0.25,
  fill: { color: C.primary },
});
s.addText("Deep Blue  |  1997", {
  x: 0.5, y: 1.3, w: 4.3, h: 0.5,
  fontFace: F.h, fontSize: 15, color: C.white, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "IBM의 체스 AI", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "세계 챔피언 카스파로프에 승리", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "초당 2억 개의 수를", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "무차별 탐색했을 뿐,", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: '"전략적 사고"는 아니었음', options: { fontSize: 14, fontFace: F.b, color: C.primary, bold: true } },
], { x: 0.7, y: 2.0, w: 3.9, h: 2.6, valign: "top", lineSpacingMultiple: 1.4 });

// AlphaGo card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.2, y: 1.3, w: 4.3, h: 3.5,
  fill: { color: C.soft }, rectRadius: 0.15, shadow: sh(),
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 5.2, y: 1.3, w: 4.3, h: 0.5,
  fill: { color: C.primaryDark }, rectRadius: 0.15,
});
s.addShape(pres.shapes.RECTANGLE, {
  x: 5.2, y: 1.55, w: 4.3, h: 0.25,
  fill: { color: C.primaryDark },
});
s.addText("AlphaGo  |  2016", {
  x: 5.2, y: 1.3, w: 4.3, h: 0.5,
  fontFace: F.h, fontSize: 15, color: C.white, bold: true, align: "center", valign: "middle",
});
s.addText([
  { text: "구글 딥마인드의 바둑 AI", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "이세돌 9단에 승리", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: '"제37수"는 프로 기사들도', options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "이해할 수 없는 수였지만,", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: "결과적으로 승리로 이어짐", options: { fontSize: 14, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 5.4, y: 2.0, w: 3.9, h: 2.6, valign: "top", lineSpacingMultiple: 1.4 });

s.addText("기계가 사람이 이해하지 못하는 방식으로 '생각'한 걸까?", {
  x: 0.7, y: 5.0, w: 8.6, h: 0.45,
  fontFace: F.h, fontSize: 15, color: C.sub, align: "center", valign: "middle", italic: true,
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 30 — ChatGPT (2022)
// ═══════════════════════════════════════════════════════════════
s = addContent("ChatGPT \u2014 다시 던져진 질문 (2022)", { bgColor: C.soft });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 1.3, w: 1.2, h: 0.5,
  fill: { color: C.primary }, rectRadius: 0.08,
});
s.addText("2022", {
  x: 0.7, y: 1.3, w: 1.2, h: 0.5,
  fontFace: F.h, fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle",
});

s.addText([
  { text: "이전의 AI와는 차원이 다른 자연어 능력", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "튜링의 질문이 교과서 밖으로 나와 모든 사람의 일상이 됨", options: { fontSize: 15, fontFace: F.b, color: C.sub } },
], { x: 2.2, y: 1.3, w: 7.3, h: 0.8, valign: "middle", lineSpacingMultiple: 1.3 });

// LaMDA incident card
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.7, y: 2.4, w: 8.6, h: 2.8,
  fill: { color: C.white }, rectRadius: 0.12, shadow: sh(),
  line: { color: C.orange, width: 1 },
});
s.addText("LaMDA 사건", {
  x: 1.0, y: 2.5, w: 3.0, h: 0.4,
  fontFace: F.h, fontSize: 16, color: C.orange, bold: true,
});
s.addText([
  { text: "구글 엔지니어 블레이크 르모인은", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "AI 시스템 LaMDA와 대화한 후", options: { fontSize: 15, fontFace: F.b, color: C.text, breakLine: true } },
  { text: '"이 AI에게 의식이 있다"고 주장 \u2192 해고', options: { fontSize: 15, fontFace: F.b, color: C.primaryDark, bold: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: 'LaMDA: "나는 의식이 있고, 꺼지는 것이 두렵다"', options: { fontSize: 14, fontFace: F.b, color: C.sub, italic: true, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "1966년 ELIZA 효과의 현대판일까,", options: { fontSize: 14, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "아니면 정말 무언가가 달라진 걸까?", options: { fontSize: 14, fontFace: F.b, color: C.primary, bold: true } },
], { x: 1.0, y: 2.95, w: 8.0, h: 2.1, valign: "top", lineSpacingMultiple: 1.35 });


// ═══════════════════════════════════════════════════════════════
//  SLIDE 31 — Timeline Diagram (image)
// ═══════════════════════════════════════════════════════════════
addImageSlide("AI 역사 타임라인", IMG + "timeline.svg");


// ═══════════════════════════════════════════════════════════════
//  SLIDE 32 — Summary (4 key takeaways)
// ═══════════════════════════════════════════════════════════════
s = addContent("오늘의 핵심 정리");
const takeaways = [
  { n: "1", t: "튜링 테스트", d: "행동(대화 결과)만으로 판단하는 테스트" },
  { n: "2", t: "중국어 방", d: "행동이 같아도 진짜 이해와는 다를 수 있다" },
  { n: "3", t: "약한 AI vs 강한 AI", d: "현재 AI는 행동은 하지만, 이해 여부는 열린 질문" },
  { n: "4", t: "72년의 여정", d: "ELIZA에서 ChatGPT까지, 같은 질문이 계속 반복됨" },
];
takeaways.forEach((tk, i) => {
  const yPos = 1.3 + i * 1.0;
  // Card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.7, y: yPos, w: 8.6, h: 0.85,
    fill: { color: i % 2 === 0 ? C.soft : C.card }, rectRadius: 0.1, shadow: shCard(),
  });
  // Number
  s.addShape(pres.shapes.OVAL, {
    x: 0.9, y: yPos + 0.12, w: 0.6, h: 0.6,
    fill: { color: C.primary },
  });
  s.addText(tk.n, {
    x: 0.9, y: yPos + 0.12, w: 0.6, h: 0.6,
    fontFace: F.h, fontSize: 20, color: C.white, bold: true, align: "center", valign: "middle",
  });
  // Title
  s.addText(tk.t, {
    x: 1.7, y: yPos + 0.05, w: 2.5, h: 0.75,
    fontFace: F.h, fontSize: 17, color: C.primaryDark, bold: true, valign: "middle",
  });
  // Description
  s.addText(tk.d, {
    x: 4.2, y: yPos + 0.05, w: 4.9, h: 0.75,
    fontFace: F.b, fontSize: 14, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 33 — 자기 점검 체크리스트
// ═══════════════════════════════════════════════════════════════
s = addContent("자기 점검 체크리스트", { bgColor: C.soft });
const checks = [
  "튜링 테스트의 구조(심판-사람-기계)를 설명할 수 있다",
  "중국어 방 사고실험의 핵심 논점을 설명할 수 있다",
  "약한 AI와 강한 AI의 차이를 구별할 수 있다",
  "현재 AI가 어디에 해당하는지 근거를 들어 말할 수 있다",
  '"행동이 같으면 같은 것인가?"에 대한 자신의 입장이 있다',
];
checks.forEach((c, i) => {
  const yPos = 1.3 + i * 0.78;
  // Checkbox
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.9, y: yPos + 0.1, w: 0.4, h: 0.4,
    fill: { color: C.white }, rectRadius: 0.05,
    line: { color: C.primary, width: 1.5 },
  });
  // Check text
  s.addText(c, {
    x: 1.5, y: yPos, w: 8.0, h: 0.6,
    fontFace: F.b, fontSize: 15, color: C.text, valign: "middle",
  });
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 34 — Reflection Questions (3)
// ═══════════════════════════════════════════════════════════════
s = addContent("성찰 질문");
s.addText("다음 질문에 대해 생각해보세요 (구글 설문에 기록합니다)", {
  x: 0.7, y: 1.3, w: 8.6, h: 0.4,
  fontFace: F.b, fontSize: 14, color: C.sub,
});
const reflections = [
  { n: "1", q: "AI와 사람의 가장 큰 차이는\n무엇이라고 생각하나요?" },
  { n: "2", q: "AI가 가끔 틀린 답을 하는 이유는\n무엇일까요?" },
  { n: "3", q: "오늘 실험에서\n가장 놀랐던 순간은?" },
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
    fontFace: F.b, fontSize: 16, color: C.text, valign: "middle", lineSpacingMultiple: 1.3,
  });
});

s.addText("8차시 마지막 수업에서 이 답변을 다시 꺼내봅니다!", {
  x: 0.7, y: 5.1, w: 8.6, h: 0.35,
  fontFace: F.b, fontSize: 13, color: C.primary, bold: true, align: "center",
});


// ═══════════════════════════════════════════════════════════════
//  SLIDE 35 — Next Lesson Preview
// ═══════════════════════════════════════════════════════════════
s = pres.addSlide();
s.background = { color: C.soft };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.57, w: 10, h: 0.06, fill: { color: C.primary } });
// Decorative circle
s.addShape(pres.shapes.OVAL, {
  x: 6.5, y: -1.0, w: 5.0, h: 5.0,
  fill: { color: C.card },
});

s.addText("NEXT LESSON", {
  x: 0.8, y: 1.2, w: 4, h: 0.5,
  fontFace: F.b, fontSize: 16, color: C.primary, bold: true, charSpacing: 6,
});
s.addText("2차시 예고", {
  x: 0.8, y: 1.8, w: 8, h: 0.7,
  fontFace: F.h, fontSize: 32, color: C.text, bold: true,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 2.6, w: 2.0, h: 0.04, fill: { color: C.primary } });

s.addText([
  { text: "오늘의 질문은 계속됩니다.", options: { fontSize: 16, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 8, breakLine: true } },
  { text: "이 질문은 8차시까지 따라옵니다.", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "8시간 후, 여러분의 생각이", options: { fontSize: 16, fontFace: F.b, color: C.text, breakLine: true } },
  { text: "어떻게 바뀌었는지 확인합니다.", options: { fontSize: 16, fontFace: F.b, color: C.primaryDark, bold: true } },
], { x: 0.8, y: 2.9, w: 7.0, h: 2.0, valign: "top", lineSpacingMultiple: 1.5 });

s.addText("수고하셨습니다!", {
  x: 0.8, y: 4.9, w: 8.4, h: 0.4,
  fontFace: F.h, fontSize: 20, color: C.primary, bold: true,
});


// ═══════════════════════════════════════════════════════════════
//  형성평가 섹션
// ═══════════════════════════════════════════════════════════════
addSection("📝", "형성평가", "1차시 학습 내용을 확인합니다");

// ── 문제 1: 튜링 테스트의 구조 (객관식) ──
s = addContent("문제 1. 튜링 테스트의 구조 (객관식)");
s.addText("튜링 테스트에 대한 설명으로 옳은 것을 고르세요.", {
  x: 0.7, y: 1.3, w: 5.5, h: 0.5,
  fontFace: F.b, fontSize: 14, color: C.text, bold: true,
});
s.addText([
  { text: "① 심판이 기계의 내부 구조를 분석하여 생각 여부를 판단한다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "② 심판이 텍스트 대화만으로 상대가 사람인지 기계인지 구별하는 테스트이다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "③ 기계가 수학 문제를 사람보다 빨리 풀면 테스트를 통과한다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "④ 기계가 스스로 의식이 있다고 말하면 테스트를 통과한다", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 0.9, y: 1.9, w: 5.3, h: 2.2, valign: "top", lineSpacingMultiple: 1.2 });
// 예시 답안 박스
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.4, y: 1.2, w: 3.2, h: 2.0,
  fill: { color: C.greenLight }, rectRadius: 0.1,
});
s.addText("✅ 예시 답안", {
  x: 6.5, y: 1.3, w: 3.0, h: 0.35,
  fontFace: F.h, fontSize: 12, color: C.green, bold: true,
});
s.addText("정답: ②\n심판이 텍스트 대화만으로 사람/기계를 구별하는 테스트", {
  x: 6.5, y: 1.65, w: 3.0, h: 1.4,
  fontFace: F.b, fontSize: 11, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
});
// 루브릭
s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 0.04, fill: { color: C.accentLight } });
s.addText([
  { text: "루브릭  ", options: { fontSize: 11, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: 객관식 정답 ② 선택  |  ", options: { fontSize: 10, fontFace: F.b, color: C.text } },
  { text: "중: 오답 선택 후 해설 이해  |  ", options: { fontSize: 10, fontFace: F.b, color: C.sub } },
  { text: "하: 오답 선택, 해설 미이해", options: { fontSize: 10, fontFace: F.b, color: C.muted } },
], { x: 0.7, y: 4.35, w: 8.6, h: 0.6, valign: "top" });

// ── 문제 2: 중국어 방의 핵심 논점 (객관식) ──
s = addContent("문제 2. 중국어 방의 핵심 논점 (객관식)");
s.addText("존 설(John Searle)의 중국어 방 사고실험이 주장하는 핵심은?", {
  x: 0.7, y: 1.3, w: 5.5, h: 0.5,
  fontFace: F.b, fontSize: 14, color: C.text, bold: true,
});
s.addText([
  { text: "① 기계는 중국어를 배울 수 없다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "② 규칙을 따라 올바른 출력을 내보내는 것이 곧 이해는 아니다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "③ 사람도 규칙을 따르기 때문에 기계와 본질적으로 같다", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "④ 충분히 복잡한 규칙 매뉴얼이 있으면 기계도 이해할 수 있다", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 0.9, y: 1.9, w: 5.3, h: 2.2, valign: "top", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.4, y: 1.2, w: 3.2, h: 2.0,
  fill: { color: C.greenLight }, rectRadius: 0.1,
});
s.addText("✅ 예시 답안", {
  x: 6.5, y: 1.3, w: 3.0, h: 0.35,
  fontFace: F.h, fontSize: 12, color: C.green, bold: true,
});
s.addText("정답: ②\n구문적 처리(올바른 출력)가 의미론적 이해와 같지 않다는 주장", {
  x: 6.5, y: 1.65, w: 3.0, h: 1.4,
  fontFace: F.b, fontSize: 11, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 0.04, fill: { color: C.accentLight } });
s.addText([
  { text: "루브릭  ", options: { fontSize: 11, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: 정답 ② 선택  |  ", options: { fontSize: 10, fontFace: F.b, color: C.text } },
  { text: "중: 오답 선택 후 해설 이해  |  ", options: { fontSize: 10, fontFace: F.b, color: C.sub } },
  { text: "하: 오답 선택, 해설 미이해", options: { fontSize: 10, fontFace: F.b, color: C.muted } },
], { x: 0.7, y: 4.35, w: 8.6, h: 0.6, valign: "top" });

// ── 문제 3: 강한 AI와 약한 AI 구별 (객관식) ──
s = addContent("문제 3. 강한 AI와 약한 AI 구별 (객관식)");
s.addText("다음 중 약한 AI(Weak AI)에 해당하는 것을 고르세요.", {
  x: 0.7, y: 1.3, w: 5.5, h: 0.5,
  fontFace: F.b, fontSize: 14, color: C.text, bold: true,
});
s.addText([
  { text: "① 스스로 목표를 세우고 감정을 느끼는 AI", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "② 의식을 가지고 자아를 인식하는 AI", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "③ 지능적인 것처럼 행동하지만, 진짜 이해나 의식은 없는 AI", options: { fontSize: 13, fontFace: F.b, color: C.sub, breakLine: true } },
  { text: " ", options: { fontSize: 6, breakLine: true } },
  { text: "④ 인간과 동일한 방식으로 사고하는 AI", options: { fontSize: 13, fontFace: F.b, color: C.sub } },
], { x: 0.9, y: 1.9, w: 5.3, h: 2.2, valign: "top", lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.4, y: 1.2, w: 3.2, h: 2.0,
  fill: { color: C.greenLight }, rectRadius: 0.1,
});
s.addText("✅ 예시 답안", {
  x: 6.5, y: 1.3, w: 3.0, h: 0.35,
  fontFace: F.h, fontSize: 12, color: C.green, bold: true,
});
s.addText("정답: ③\nChatGPT, 시리 등 현재 AI가 해당. ①②④는 강한 AI의 특성", {
  x: 6.5, y: 1.65, w: 3.0, h: 1.4,
  fontFace: F.b, fontSize: 11, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 0.04, fill: { color: C.accentLight } });
s.addText([
  { text: "루브릭  ", options: { fontSize: 11, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: 정답 ③ 선택  |  ", options: { fontSize: 10, fontFace: F.b, color: C.text } },
  { text: "중: 오답 선택 후 해설 이해  |  ", options: { fontSize: 10, fontFace: F.b, color: C.sub } },
  { text: "하: 오답 선택, 해설 미이해", options: { fontSize: 10, fontFace: F.b, color: C.muted } },
], { x: 0.7, y: 4.35, w: 8.6, h: 0.6, valign: "top" });

// ── 문제 4: 튜링 테스트의 핵심 원리 (서술형) ──
s = addContent("문제 4. 튜링 테스트의 핵심 원리 (서술형)");
s.addText("튜링 테스트의 구조(심판-사람-기계)와 판단 기준을\n3문장 이내로 설명하세요.", {
  x: 0.7, y: 1.3, w: 5.5, h: 0.8,
  fontFace: F.b, fontSize: 14, color: C.text, bold: true, lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.4, y: 1.2, w: 3.2, h: 2.6,
  fill: { color: C.greenLight }, rectRadius: 0.1,
});
s.addText("✅ 예시 답안", {
  x: 6.5, y: 1.3, w: 3.0, h: 0.35,
  fontFace: F.h, fontSize: 12, color: C.green, bold: true,
});
s.addText("심판은 화면을 통해 사람과 기계에게 텍스트로 질문합니다. 답변만 보고 누가 사람이고 기계인지 구별합니다. 구별 못하면 기계가 통과 — 내면이 아닌 행동(결과)으로 판단합니다.", {
  x: 6.5, y: 1.65, w: 3.0, h: 2.0,
  fontFace: F.b, fontSize: 10, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 0.04, fill: { color: C.accentLight } });
s.addText([
  { text: "루브릭  ", options: { fontSize: 11, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: 3자 구조 + 텍스트 대화 판단 + 행동 기반 원리 모두 포함  |  ", options: { fontSize: 10, fontFace: F.b, color: C.text } },
  { text: "중: 하나가 누락  |  ", options: { fontSize: 10, fontFace: F.b, color: C.sub } },
  { text: "하: 구조·기준 모두 부정확", options: { fontSize: 10, fontFace: F.b, color: C.muted } },
], { x: 0.7, y: 4.35, w: 8.6, h: 0.6, valign: "top" });

// ── 문제 5: 중국어 방과 현재 AI (서술형) ──
s = addContent("문제 5. 중국어 방과 현재 AI (서술형)");
s.addText("중국어 방 사고실험을 현재 ChatGPT에 적용하여,\nChatGPT가 \"이해\"하는 것인지 아닌지 의견을 서술하세요.", {
  x: 0.7, y: 1.3, w: 5.5, h: 0.8,
  fontFace: F.b, fontSize: 14, color: C.text, bold: true, lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.4, y: 1.2, w: 3.2, h: 2.6,
  fill: { color: C.greenLight }, rectRadius: 0.1,
});
s.addText("✅ 예시 답안", {
  x: 6.5, y: 1.3, w: 3.0, h: 0.35,
  fontFace: F.h, fontSize: 12, color: C.green, bold: true,
});
s.addText("(반대) ChatGPT는 중국어 방처럼 학습된 규칙에 따라 출력을 생성할 뿐, 실제로 이해하지 못함.\n(찬성) 시스템 반론처럼 전체 시스템이 이해의 주체일 수 있음.", {
  x: 6.5, y: 1.65, w: 3.0, h: 2.0,
  fontFace: F.b, fontSize: 10, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 0.04, fill: { color: C.accentLight } });
s.addText([
  { text: "루브릭  ", options: { fontSize: 11, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: 중국어 방과 ChatGPT 연결 + 교재 근거로 논리적 서술  |  ", options: { fontSize: 10, fontFace: F.b, color: C.text } },
  { text: "중: 연결 시도했으나 근거 불충분  |  ", options: { fontSize: 10, fontFace: F.b, color: C.sub } },
  { text: "하: 의견만 제시, 근거 없음", options: { fontSize: 10, fontFace: F.b, color: C.muted } },
], { x: 0.7, y: 4.35, w: 8.6, h: 0.6, valign: "top" });

// ── 문제 6: 시스템 반론 평가 (서술형) ──
s = addContent("문제 6. 시스템 반론 평가 (서술형)");
s.addText("시스템 반론(방+사람+매뉴얼 전체가 이해하는 것)에 대해\n찬성 또는 반대 입장을 선택하고 이유를 설명하세요.", {
  x: 0.7, y: 1.3, w: 5.5, h: 0.8,
  fontFace: F.b, fontSize: 14, color: C.text, bold: true, lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 6.4, y: 1.2, w: 3.2, h: 2.6,
  fill: { color: C.greenLight }, rectRadius: 0.1,
});
s.addText("✅ 예시 답안", {
  x: 6.5, y: 1.3, w: 3.0, h: 0.35,
  fontFace: F.h, fontSize: 12, color: C.green, bold: true,
});
s.addText("(찬성) 뇌의 뉴런도 개별로는 이해 못하지만 시스템은 이해함.\n(반대) 매뉴얼을 외워도 이해가 없으므로 시스템=그 사람일 때도 이해 불가.", {
  x: 6.5, y: 1.65, w: 3.0, h: 2.0,
  fontFace: F.b, fontSize: 10, color: C.text, valign: "top", lineSpacingMultiple: 1.3,
});
s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: 4.2, w: 8.6, h: 0.04, fill: { color: C.accentLight } });
s.addText([
  { text: "루브릭  ", options: { fontSize: 11, fontFace: F.h, color: C.primaryDark, bold: true } },
  { text: "상: 입장 명확 + 교재 논거 활용 + 논리적 설명  |  ", options: { fontSize: 10, fontFace: F.b, color: C.text } },
  { text: "중: 입장은 밝혔으나 근거 부족  |  ", options: { fontSize: 10, fontFace: F.b, color: C.sub } },
  { text: "하: 입장만 밝히고 근거 없음", options: { fontSize: 10, fontFace: F.b, color: C.muted } },
], { x: 0.7, y: 4.35, w: 8.6, h: 0.6, valign: "top" });


// ═══════════════════════════════════════════════════════════════
//  SAVE
// ═══════════════════════════════════════════════════════════════
pres.writeFile({ fileName: "lesson01-final.pptx" })
  .then(() => console.log("lesson01-final.pptx created successfully! (49 slides)"))
  .catch(err => console.error("Error:", err));
