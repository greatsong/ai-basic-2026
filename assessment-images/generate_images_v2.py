#!/usr/bin/env python3
"""Generate educational images using Gemini API for AI assessment - with retry logic."""

import requests
import base64
import json
import time
import os
import sys

API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = "gemini-3.1-flash-image-preview"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"
OUTPUT_DIR = "/Users/greatsong/greatsong-project/ai-basic-2026/assessment-images"

# Only the 8 images that failed
IMAGES = [
    {
        "filename": "mcculloch_pitts.jpg",
        "prompt": "Educational illustration showing McCulloch and Pitts' neuron model concept (1943). Show a simple biological neuron on one side and an artificial mathematical neuron model on the other, with an arrow connecting them. Clean, educational style."
    },
    {
        "filename": "sigmoid_graph_question.jpg",
        "prompt": "A clean mathematical graph showing the Sigmoid activation function curve. S-shaped curve going from 0 to 1, with x-axis from -6 to 6 and y-axis from 0 to 1. Clear grid lines, but NO label or title saying 'Sigmoid' - this is a quiz question where students must identify the function. White background, textbook quality."
    },
    {
        "filename": "loss_decreasing.jpg",
        "prompt": "Educational chart showing a training loss curve decreasing over epochs/iterations. The curve starts high on the left and gradually decreases in a smooth curve toward the right. X-axis labeled 'Epoch', Y-axis labeled 'Loss'. Clean, simple educational graph, textbook style."
    },
    {
        "filename": "forward_pass_example.jpg",
        "prompt": "Educational diagram showing a simple neural network forward pass calculation. Show input values flowing through weights, summation, and activation function to produce an output. Include actual numbers at each step. Clean, colorful, textbook style diagram."
    },
    {
        "filename": "bpe_tokenization.jpg",
        "prompt": "Educational infographic showing BPE (Byte Pair Encoding) tokenization. Show the Korean text '인공지능은 재미있다' being split into subword tokens, with each token shown as a colored block. Show how Korean needs more tokens than English for the same meaning. Clean, modern educational style."
    },
    {
        "filename": "word2vec_analogy.jpg",
        "prompt": "Educational illustration showing word vector analogy. Show the classic example: King - Man + Woman = Queen, with each word as a point in 2D space, connected by arrows showing the relationship. The arrows for Man to King and Woman to Queen should be parallel. Clean vector diagram style."
    },
    {
        "filename": "perceptron_and_gate.jpg",
        "prompt": "Clean educational diagram of a perceptron implementing an AND gate. Show 2 inputs (x1, x2), weights (w1=1, w2=1), bias (b=-1.5), summation, step activation function, and output. Include the actual values. Textbook quality, white background."
    },
    {
        "filename": "nn_layers_comparison.jpg",
        "prompt": "Educational illustration comparing a single-layer neural network vs multi-layer neural network. Left side shows a simple single layer that can only draw straight lines. Right side shows multiple layers that can draw curved decision boundaries. Show simple XOR-like data points to illustrate. Clean, educational."
    },
]


def generate_image(prompt, filename, max_retries=3):
    """Call Gemini API to generate an image and save it, with retries."""
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
    }
    headers = {"Content-Type": "application/json"}

    for attempt in range(1, max_retries + 1):
        try:
            print(f"\n  Attempt {attempt}/{max_retries}...")
            response = requests.post(ENDPOINT, headers=headers, json=payload, timeout=120)

            if response.status_code == 429 or response.status_code == 500:
                wait_time = 10 * attempt
                print(f"  HTTP {response.status_code} - Rate limit/server error. Waiting {wait_time}s...")
                time.sleep(wait_time)
                continue

            if response.status_code != 200:
                print(f"  [FAIL] HTTP {response.status_code}: {response.text[:200]}")
                if attempt < max_retries:
                    time.sleep(5)
                continue

            data = response.json()
            candidates = data.get("candidates", [])
            if not candidates:
                print(f"  [FAIL] No candidates in response")
                continue

            parts = candidates[0].get("content", {}).get("parts", [])
            for part in parts:
                if "inlineData" in part:
                    inline_data = part["inlineData"]
                    mime_type = inline_data.get("mimeType", "image/png")
                    b64_data = inline_data.get("data", "")
                    if not b64_data:
                        continue
                    image_bytes = base64.b64decode(b64_data)
                    filepath = os.path.join(OUTPUT_DIR, filename)
                    with open(filepath, "wb") as f:
                        f.write(image_bytes)
                    size_kb = len(image_bytes) / 1024
                    print(f"  [SUCCESS] Saved {filename} ({size_kb:.1f} KB, {mime_type})")
                    return True
                elif "text" in part:
                    print(f"  Text: {part['text'][:100]}")

            print(f"  [FAIL] No image data in response")
            if attempt < max_retries:
                time.sleep(5)

        except requests.exceptions.Timeout:
            print(f"  [FAIL] Timeout")
            if attempt < max_retries:
                time.sleep(5)
        except Exception as e:
            print(f"  [FAIL] Error: {e}")
            if attempt < max_retries:
                time.sleep(5)

    return False


def main():
    print(f"Gemini Image Generator - Retry Run")
    print(f"Model: {MODEL}")
    print(f"Images to generate: {len(IMAGES)}")
    print(f"Delay between calls: 5 seconds")

    success_count = 0
    fail_count = 0

    for i, img in enumerate(IMAGES):
        print(f"\n{'='*60}")
        print(f"[{i+1}/{len(IMAGES)}] Generating: {img['filename']}")

        # Check if already exists
        filepath = os.path.join(OUTPUT_DIR, img["filename"])
        if os.path.exists(filepath) and os.path.getsize(filepath) > 1000:
            print(f"  [SKIP] Already exists ({os.path.getsize(filepath)/1024:.1f} KB)")
            success_count += 1
            continue

        result = generate_image(img["prompt"], img["filename"])
        if result:
            success_count += 1
        else:
            fail_count += 1

        # Wait between calls
        if i < len(IMAGES) - 1:
            print(f"  Waiting 5 seconds...")
            time.sleep(5)

    print(f"\n{'='*60}")
    print(f"SUMMARY: {success_count} success, {fail_count} failed out of {len(IMAGES)}")

    return 0 if fail_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
