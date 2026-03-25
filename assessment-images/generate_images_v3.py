#!/usr/bin/env python3
"""
AI 기초 과정중심평가 — Gemini Nano Banana 2 이미지 재생성 (v3)
전문가 수준 프롬프트 + 정답 노출 방지
"""

import requests, base64, json, time, os, sys

API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = "gemini-3.1-flash-image-preview"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
OUTPUT_DIR = "/Users/greatsong/greatsong-project/ai-basic-2026/assessment-images"

# ============================================================
# 전문가 수준 프롬프트
# 공통 스타일: 고등학교 교과서 삽화, 깔끔하고 현대적인 디지털 일러스트
# ============================================================

IMAGES = [
    # ----------------------------------------------------------
    # 1. 튜링 테스트 (D-1)
    # ----------------------------------------------------------
    {
        "filename": "turing_test_illustration.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Scene: A conceptual depiction of the Turing Test. "
            "Layout — three zones separated by a thin opaque wall: "
            "(Left) a human 'judge' sitting at a desk with a monitor showing text chat, "
            "looking thoughtful with a speech bubble containing '?'. "
            "(Center) the wall/divider, semi-transparent to show the concept of hidden identity. "
            "(Right, top) a human responder typing at a desk. "
            "(Right, bottom) a humanoid robot also typing at a desk. "
            "Both hidden behind the wall from the judge's perspective. "
            "Style: Flat-design vector illustration with soft gradients. "
            "Color palette: calm blues (#3B82F6), warm grays, white background. "
            "Lighting: soft, even, no harsh shadows. "
            "Labels: None — no text, titles, or annotations anywhere in the image. "
            "Aspect ratio: 16:10 landscape. "
            "Quality: crisp lines, professional textbook grade, Kurzgesagt-inspired minimalism."
        )
    },

    # ----------------------------------------------------------
    # 2. 중국어 방 (D-1)
    # ----------------------------------------------------------
    {
        "filename": "chinese_room.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Scene: John Searle's Chinese Room thought experiment. "
            "A person (Western male, 30s) sits inside a closed room at a desk. "
            "On the desk: a thick rulebook and stacks of Chinese character cards. "
            "Through a mail slot on the left wall, a card with Chinese characters slides in. "
            "The person looks confused (question marks above head) but follows the rulebook, "
            "matching input patterns to response patterns. "
            "Through a mail slot on the right wall, a response card with Chinese characters slides out. "
            "Outside the right wall, a Chinese speaker looks impressed, "
            "thinking the person inside understands Chinese. "
            "Style: Isometric 3D cutaway view of the room, like an architectural cross-section. "
            "Color palette: warm yellows (#FCD34D) for the room interior, cool blues outside, "
            "Chinese characters in red ink. "
            "Labels: None — absolutely no English or Korean text, titles, or annotations. "
            "Aspect ratio: 16:10 landscape. "
            "Quality: detailed but clean, professional textbook grade."
        )
    },

    # ----------------------------------------------------------
    # 3. 손실함수 — 과녁 비유 (D-3)
    # ----------------------------------------------------------
    {
        "filename": "loss_function_target.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: Loss function as 'measuring how far off the target you are.' "
            "Scene: Three archery targets side by side, viewed from the front. "
            "(Left target) All arrows clustered tightly in the bullseye — small loss, high accuracy. "
            "A small green number '0.02' floats above. "
            "(Center target) Arrows scattered around the 3rd-4th ring — medium loss. "
            "An amber number '3.5' floats above. "
            "(Right target) Arrows wildly scattered, some missing the target entirely — large loss. "
            "A red number '28.7' floats above. "
            "Below all three targets, a subtle gradient bar goes from green (left) to red (right). "
            "Style: Clean vector illustration, slightly 3D perspective. "
            "Color palette: target rings in traditional red/white, arrows in dark gray, "
            "background clean white with subtle paper texture. "
            "Labels: Only the three numbers (0.02, 3.5, 28.7). "
            "No title, no 'loss function' text, no Korean/English annotations. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: print-ready, Korean textbook standard."
        )
    },

    # ----------------------------------------------------------
    # 4. 경사하강법 — 산 비유 (D-4, B-5)
    # ----------------------------------------------------------
    {
        "filename": "gradient_descent_mountain.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: Gradient descent as hiking down a foggy mountain to find the lowest valley. "
            "Scene: A misty mountain landscape in cross-section profile view. "
            "The mountain has a smooth, bowl-shaped valley (global minimum) on the right, "
            "and a small dip (local minimum) on the left slope. "
            "A small hiker character stands near the top, with dotted footprints "
            "showing a zigzag path downhill toward the valley. "
            "Each step is slightly smaller than the last (representing decreasing learning rate). "
            "Fog/clouds obscure parts of the mountain — the hiker can't see the whole landscape, "
            "only the slope immediately around them. "
            "A small compass-like dial near the hiker shows 'steepest direction ↓'. "
            "Style: Watercolor-digital hybrid, atmospheric and beautiful. "
            "Color palette: misty blues and purples for mountains, warm orange for the hiker, "
            "golden highlight on the valley floor. "
            "Labels: None — no text, titles, or annotations of any kind. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: artistic yet educational, studio Ghibli-inspired atmosphere."
        )
    },

    # ----------------------------------------------------------
    # 5. 다음 토큰 예측 (D-6)
    # ----------------------------------------------------------
    {
        "filename": "next_token_prediction.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: How language models predict the next word (token). "
            "Scene: A horizontal sequence of Korean word blocks flowing left to right: "
            "'오늘' → '날씨가' → '정말' → [?] "
            "The [?] block is highlighted with a glowing border. "
            "Above the [?] block, a fan-shaped probability display shows 3-4 candidate words "
            "with different-sized bars: '좋다' (35%, tallest bar), '덥다' (25%), "
            "'춥다' (20%), '흐리다' (12%), '...' (8%). "
            "The bars form a descending histogram. "
            "The word blocks look like Scrabble tiles or keyboard keys, "
            "connected by subtle curved arrows showing the sequential flow. "
            "Style: Modern infographic, clean geometric shapes. "
            "Color palette: deep indigo (#312E81) background for the probability fan, "
            "warm amber (#F59E0B) for word blocks, white text. "
            "Labels: Only the Korean words and percentage numbers shown above. "
            "No title, no 'next token prediction' text. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: infographic-grade, sharp typography."
        )
    },

    # ----------------------------------------------------------
    # 6. Temperature 비교 (D-6)
    # ----------------------------------------------------------
    {
        "filename": "temperature_comparison.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: How the Temperature parameter affects AI text generation randomness. "
            "Layout: Three panels side by side, each with a different temperature setting. "
            "(Left panel — T=0.1) A very sharp, tall single bar dominating a histogram. "
            "Below it, a robot character speaking with a rigid expression: '오늘 날씨가 좋습니다.' "
            "Label: 'T = 0.1' and a snowflake icon (cold = predictable). "
            "(Center panel — T=1.0) A balanced histogram with several medium bars. "
            "Below it, a robot with a neutral expression: '오늘 날씨가 화창해요!' "
            "Label: 'T = 1.0' and a sun icon (balanced). "
            "(Right panel — T=2.0) A nearly flat histogram with all bars similar height. "
            "Below it, a robot with wild/creative expression: '오늘 하늘에서 피자가 내립니다!' "
            "Label: 'T = 2.0' and a fire icon (hot = random/creative). "
            "Style: Playful yet educational, consistent character design across panels. "
            "Color palette: Left=ice blue, Center=warm yellow, Right=hot red-orange. "
            "Labels: Only T values and Korean sentences shown above. "
            "No title text. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: polished, animation-studio character design."
        )
    },

    # ----------------------------------------------------------
    # 7. AI 환각 (A-10, E-2) — ⚠️ "hallucination" 텍스트 없이
    # ----------------------------------------------------------
    {
        "filename": "ai_hallucination.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: When an AI confidently generates false information. "
            "Scene: A friendly robot assistant at a desk, confidently presenting a document "
            "to a student. The document has text lines visible but NOT readable. "
            "The twist: from the robot's back, we can see that the document is being "
            "assembled from scattered, mismatched puzzle pieces — some pieces are clearly "
            "the wrong shape/color, forced together. "
            "Above the robot: a confident green checkmark. "
            "Above the document: subtle red warning triangles that the student hasn't noticed yet. "
            "The student looks trusting but there's a hint of 'something is off.' "
            "Style: Split-perspective illustration — front view shows confidence, "
            "back/x-ray view reveals the fabrication. "
            "Color palette: trustworthy blue (#3B82F6) for the robot, "
            "warning amber/red for the hidden defects, clean white background. "
            "Labels: NONE. Absolutely no text, title, English words, or Korean words "
            "anywhere in the image. No word 'hallucination' or '환각' or any descriptive text. "
            "Aspect ratio: 16:10 landscape. "
            "Quality: conceptual illustration, New Yorker magazine editorial style."
        )
    },

    # ----------------------------------------------------------
    # 8. 토큰화 과정 (A-9) — ⚠️ "BPE" 텍스트 없이
    # ----------------------------------------------------------
    {
        "filename": "bpe_tokenization.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: How text is broken into smaller units (subwords) before an AI processes it. "
            "Scene: A conveyor belt / assembly line metaphor. "
            "(Left side) A complete Korean sentence '인공지능은 재미있다' enters the machine "
            "as a single long block. "
            "(Center) The machine (depicted as a clean, modern factory with gears and a magnifying glass) "
            "splits the text block into smaller colored pieces: "
            "'인공' | '지능' | '은' | '재미' | '있' | '다' — each piece a different pastel color. "
            "(Right side) The individual colored token blocks emerge on the conveyor belt, "
            "each with a small number tag (ID) attached. "
            "Below the conveyor, a small comparison: the English word 'Artificial Intelligence' "
            "splits into just 2-3 pieces (fewer, larger blocks), showing that Korean requires "
            "more token splits. "
            "Style: Rube Goldberg-inspired machine illustration, playful but precise. "
            "Color palette: pastel token colors (mint, peach, lavender, sky blue), "
            "industrial gray for the machine, white background. "
            "Labels: Only the Korean/English text pieces shown above. "
            "NO title, NO method name, NO acronym. Do NOT write 'BPE' or 'Byte Pair Encoding' "
            "or 'tokenization' or '토큰화' anywhere in the image. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: Pixar-quality rendering, clean and inviting."
        )
    },

    # ----------------------------------------------------------
    # 9. 훈련 손실 곡선 (A-5)
    # ----------------------------------------------------------
    {
        "filename": "loss_decreasing.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Scene: A clean, modern chart showing a training progress curve. "
            "The curve starts high on the left (around y=8) and smoothly decreases "
            "in an exponential decay shape, flattening near the bottom right (around y=0.5). "
            "The curve is drawn as a thick, smooth gradient line that transitions "
            "from red (high values) through orange and yellow to green (low values). "
            "X-axis: subtle tick marks, no label text. "
            "Y-axis: subtle tick marks, no label text. "
            "Background: clean white with faint grid lines. "
            "A subtle downward arrow alongside the curve suggests 'decreasing.' "
            "Style: Data visualization, clean infographic style. "
            "Color palette: the curve itself is the gradient from red→green, "
            "grid lines in light gray (#E5E7EB). "
            "Labels: NONE. No axis labels, no title, no numbers, no text of any kind. "
            "The image should be purely visual — just the decreasing curve. "
            "Aspect ratio: 16:10 landscape. "
            "Quality: dashboard-grade data visualization, Apple keynote style."
        )
    },

    # ----------------------------------------------------------
    # 10. 순전파 계산 예시 (B-7)
    # ----------------------------------------------------------
    {
        "filename": "forward_pass_example.jpg",
        "prompt": (
            "A high-quality educational diagram for a Korean high school AI textbook. "
            "Scene: A step-by-step forward pass through one neuron. "
            "Layout flows left to right: "
            "(1) Two input circles labeled 'x₁' and 'x₂' on the left. "
            "(2) Arrows from inputs to a central summation node (Σ), "
            "with weight labels 'w₁' and 'w₂' on the arrows, "
            "and a bias arrow labeled 'b' coming from below. "
            "(3) The summation result 'z = Σ(wᵢxᵢ) + b' shown in a box. "
            "(4) An arrow to an activation function box labeled 'f(z)'. "
            "(5) Output circle labeled 'y' on the right. "
            "Each stage has a distinct background color: "
            "inputs=sky blue, weights=amber, summation=purple, activation=green, output=red. "
            "Dotted guidelines connect the stages. "
            "Style: Technical diagram with rounded rectangles and circles, "
            "like a modern software architecture diagram. "
            "Labels: Only mathematical symbols (x₁, x₂, w₁, w₂, b, z, f(z), y). "
            "No title, no 'forward pass' text, no Korean text. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: engineering-diagram precision, clean vector style."
        )
    },

    # ----------------------------------------------------------
    # 11. 단층 vs 다층 비교 (D-2)
    # ----------------------------------------------------------
    {
        "filename": "nn_layers_comparison.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: Why a single layer can't solve XOR, but multiple layers can. "
            "Layout: Two panels side by side. "
            "(Left panel — '1 layer') A 2D coordinate plane with 4 data points: "
            "two red circles at (0,0) and (1,1), two blue circles at (0,1) and (1,0). "
            "A single straight dashed line attempts to separate them but clearly fails — "
            "both colors appear on each side of the line. "
            "A large red '✗' mark in the corner. "
            "Below: a tiny single-layer network diagram (2 inputs → 1 output). "
            "(Right panel — '2+ layers') The same 4 data points, but now the space "
            "has been warped/curved — imagine the flat paper being bent so that "
            "the same-colored points end up on the same side. "
            "A curved decision boundary successfully separates red from blue. "
            "A large green '✓' mark in the corner. "
            "Below: a tiny multi-layer network diagram (2 inputs → 3 hidden → 1 output). "
            "Style: Clean split-screen comparison, geometric and precise. "
            "Color palette: red (#EF4444) and blue (#3B82F6) for data points, "
            "left panel has a slightly gray/sad tint, right panel has a bright/happy tint. "
            "Labels: Only '1' and '2+' as layer counts. "
            "No title, no 'XOR' text, no Korean/English annotations. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: academic paper figure quality, Nature/Science journal style."
        )
    },

    # ----------------------------------------------------------
    # 12. McCulloch-Pitts 뉴런 (참고)
    # ----------------------------------------------------------
    {
        "filename": "mcculloch_pitts.jpg",
        "prompt": (
            "A high-quality educational illustration for a Korean high school AI textbook. "
            "Concept: The connection between biological neurons and artificial neuron models. "
            "Layout: Two-part comparison, left and right. "
            "(Left — Biological) A beautifully rendered biological neuron: "
            "dendrites (receiving branches) on the left, cell body (soma) in the center "
            "with a visible nucleus, and a long axon extending to the right "
            "ending in terminal buttons. Subtle glow where synapses meet dendrites. "
            "(Right — Artificial) A mathematical neuron model mirroring the same structure: "
            "input arrows (corresponding to dendrites) on the left, "
            "a summation circle (corresponding to soma) in the center, "
            "and an output arrow (corresponding to axon) on the right. "
            "Thin dotted lines connect each biological part to its artificial counterpart. "
            "Style: Medical-illustration quality for the biological side, "
            "clean diagram style for the artificial side. "
            "Color palette: organic greens and warm pinks for biological, "
            "cool blues and geometric shapes for artificial. "
            "Labels: None — no text, no title, no annotations. "
            "Aspect ratio: 16:9 landscape. "
            "Quality: Nature Neuroscience cover art quality, publication-ready."
        )
    },
]


def generate_image(prompt, filename, max_retries=3):
    """Call Gemini API to generate an image and save it."""
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
    }
    headers = {"Content-Type": "application/json"}

    for attempt in range(max_retries):
        try:
            print(f"\n{'='*60}")
            print(f"[{attempt+1}/{max_retries}] Generating: {filename}")
            print(f"Prompt length: {len(prompt)} chars")

            response = requests.post(ENDPOINT, headers=headers, json=payload, timeout=120)

            if response.status_code == 500:
                wait = 10 * (attempt + 1)
                print(f"  [RETRY] HTTP 500 — waiting {wait}s...")
                time.sleep(wait)
                continue

            if response.status_code != 200:
                print(f"  [FAIL] HTTP {response.status_code}: {response.text[:200]}")
                return False

            data = response.json()
            candidates = data.get("candidates", [])
            if not candidates:
                print(f"  [FAIL] No candidates")
                return False

            parts = candidates[0].get("content", {}).get("parts", [])
            for part in parts:
                if "inlineData" in part:
                    b64_data = part["inlineData"].get("data", "")
                    if not b64_data:
                        continue
                    image_bytes = base64.b64decode(b64_data)
                    filepath = os.path.join(OUTPUT_DIR, filename)
                    with open(filepath, "wb") as f:
                        f.write(image_bytes)
                    size_kb = len(image_bytes) / 1024
                    print(f"  ✅ Saved: {filepath} ({size_kb:.1f} KB)")
                    return True
                elif "text" in part:
                    print(f"  📝 Text: {part['text'][:100]}")

            print(f"  [FAIL] No image data in response")
            return False

        except requests.exceptions.Timeout:
            print(f"  [RETRY] Timeout — waiting 10s...")
            time.sleep(10)
        except Exception as e:
            print(f"  [FAIL] Error: {e}")
            return False

    return False


def main():
    print(f"🎨 AI 기초 평가 이미지 재생성 (v3 — 전문가 프롬프트)")
    print(f"Model: {MODEL}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Images: {len(IMAGES)}")

    success, fail = 0, 0
    for i, img in enumerate(IMAGES):
        if generate_image(img["prompt"], img["filename"]):
            success += 1
        else:
            fail += 1
        if i < len(IMAGES) - 1:
            print(f"  ⏳ 5초 대기 (rate limit 방지)...")
            time.sleep(5)

    print(f"\n{'='*60}")
    print(f"📊 결과: {success}/{len(IMAGES)} 성공, {fail} 실패")
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
