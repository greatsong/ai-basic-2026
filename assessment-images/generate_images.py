#!/usr/bin/env python3
"""Generate educational images using Gemini API for AI assessment."""

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

IMAGES = [
    {
        "filename": "alan_turing.jpg",
        "prompt": "A clean, realistic portrait-style educational illustration of Alan Turing, the British mathematician who proposed the Turing Test in 1950. Show him in a 1940s-50s setting, perhaps at a desk with early computing equipment. Professional textbook quality, respectful portrait."
    },
    {
        "filename": "rosenblatt.jpg",
        "prompt": "A clean educational illustration of Frank Rosenblatt standing next to his Mark I Perceptron machine (1958). Show the large early computer with cables and lights. Historical, documentary style, textbook quality."
    },
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
        "prompt": "Educational illustration showing word vector analogy. Show the classic example: King - Man + Woman = Queen, with each word as a point in 2D space, connected by arrows showing the relationship. The arrows for Man→King and Woman→Queen should be parallel. Clean vector diagram style."
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


def generate_image(prompt, filename):
    """Call Gemini API to generate an image and save it."""
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["TEXT", "IMAGE"]}
    }

    headers = {"Content-Type": "application/json"}

    try:
        print(f"\n{'='*60}")
        print(f"Generating: {filename}")
        print(f"Prompt: {prompt[:80]}...")

        response = requests.post(ENDPOINT, headers=headers, json=payload, timeout=120)

        if response.status_code != 200:
            print(f"  [FAIL] HTTP {response.status_code}: {response.text[:200]}")
            return False

        data = response.json()

        # Extract image data from response
        candidates = data.get("candidates", [])
        if not candidates:
            print(f"  [FAIL] No candidates in response")
            return False

        parts = candidates[0].get("content", {}).get("parts", [])
        image_saved = False

        for part in parts:
            if "inlineData" in part:
                inline_data = part["inlineData"]
                mime_type = inline_data.get("mimeType", "image/png")
                b64_data = inline_data.get("data", "")

                if not b64_data:
                    print(f"  [FAIL] Empty image data")
                    continue

                # Decode and save
                image_bytes = base64.b64decode(b64_data)
                filepath = os.path.join(OUTPUT_DIR, filename)

                with open(filepath, "wb") as f:
                    f.write(image_bytes)

                size_kb = len(image_bytes) / 1024
                print(f"  [SUCCESS] Saved {filepath} ({size_kb:.1f} KB, {mime_type})")
                image_saved = True
                break

            elif "text" in part:
                print(f"  Text response: {part['text'][:100]}")

        if not image_saved:
            print(f"  [FAIL] No image data found in response parts")
            return False

        return True

    except requests.exceptions.Timeout:
        print(f"  [FAIL] Request timed out")
        return False
    except Exception as e:
        print(f"  [FAIL] Error: {e}")
        return False


def main():
    print(f"Gemini Image Generator for AI Assessment")
    print(f"Model: {MODEL}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Images to generate: {len(IMAGES)}")

    success_count = 0
    fail_count = 0

    for i, img in enumerate(IMAGES):
        result = generate_image(img["prompt"], img["filename"])
        if result:
            success_count += 1
        else:
            fail_count += 1

        # Wait between calls to avoid rate limits (except after the last one)
        if i < len(IMAGES) - 1:
            print(f"  Waiting 3 seconds before next request...")
            time.sleep(3)

    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"  Total: {len(IMAGES)}")
    print(f"  Success: {success_count}")
    print(f"  Failed: {fail_count}")

    # List generated files
    print(f"\nFiles in {OUTPUT_DIR}:")
    for f in sorted(os.listdir(OUTPUT_DIR)):
        if f.endswith(('.jpg', '.png', '.webp')):
            fpath = os.path.join(OUTPUT_DIR, f)
            size_kb = os.path.getsize(fpath) / 1024
            print(f"  {f} ({size_kb:.1f} KB)")

    return 0 if fail_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
