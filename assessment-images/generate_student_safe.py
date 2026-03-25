"""
v5 학생용 평가 이미지 생성 — 정답 미포함 버전
"""
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.io as pio
import numpy as np

SCALE = 2
IMG_DIR = "/Users/greatsong/greatsong-project/ai-basic-2026/assessment-images"

# ─────────────────────────────────────────────
# 1. A-2: MSE 이상치 비교 (정답 MSE 값 제거, v5 데이터)
# ─────────────────────────────────────────────
def gen_mse_student():
    pred = [3, 5, 4]
    real_a = [2, 6, 4]
    real_b = [2, 6, 10]
    x_labels = ['데이터 1', '데이터 2', '데이터 3']

    fig = make_subplots(rows=1, cols=2, subplot_titles=[
        '<b>데이터 A (정상)</b>',
        '<b>데이터 B (이상치 포함)</b>'
    ], horizontal_spacing=0.15)

    # Data A
    fig.add_trace(go.Bar(x=x_labels, y=pred, name='예측', marker_color='#3B82F6', width=0.3), row=1, col=1)
    fig.add_trace(go.Bar(x=x_labels, y=real_a, name='실제', marker_color='#F59E0B', width=0.3), row=1, col=1)

    # Data B
    fig.add_trace(go.Bar(x=x_labels, y=pred, name='예측', marker_color='#3B82F6', width=0.3, showlegend=False), row=1, col=2)
    fig.add_trace(go.Bar(x=x_labels, y=real_b, name='실제', marker_color='#EF4444', width=0.3, showlegend=False), row=1, col=2)

    # 이상치 화살표 (정답 MSE 값은 표시하지 않음)
    fig.add_annotation(x='데이터 3', y=10.5, text='<b>이상치!</b>', showarrow=True,
                       arrowhead=2, arrowcolor='#EF4444', font=dict(color='#EF4444', size=14),
                       row=1, col=2, ay=-30)

    fig.update_layout(
        title=dict(text='<b>[A-2] 이상치가 MSE에 미치는 영향</b>', x=0.5, font=dict(size=18)),
        barmode='group',
        height=450, width=900,
        plot_bgcolor='white',
        legend=dict(x=0.42, y=1.08, orientation='h'),
        margin=dict(t=80, b=50)
    )
    for i in [1, 2]:
        fig.update_yaxes(range=[0, 12], gridcolor='#E5E7EB', row=1, col=i)

    fig.write_image(f"{IMG_DIR}/mse_outlier_student.png", scale=SCALE)
    print("✅ mse_outlier_student.png")


# ─────────────────────────────────────────────
# 2. A-11: 학습률 그래프 (lr 라벨 제거, A/B/C만 표시)
# ─────────────────────────────────────────────
def gen_gradient_descent_student():
    np.random.seed(42)
    epochs = np.arange(0, 100)

    # 학습률 작음: 매우 느리게 감소
    loss_a = 10 * np.exp(-0.005 * epochs) + np.random.normal(0, 0.15, 100)
    loss_a = np.maximum(loss_a, 0.5)

    # 학습률 적절: 빠르게 수렴
    loss_b = 10 * np.exp(-0.06 * epochs) + np.random.normal(0, 0.1, 100)
    loss_b = np.maximum(loss_b, 0.2)

    # 학습률 큼: 진동/발산 (y축 범위 안에 들어오도록 클램핑)
    loss_c = []
    val = 10
    for i in range(100):
        val = val + np.random.normal(0, 2.0) + 0.4 * np.sin(i * 0.5)
        val = np.clip(val, 1, 18)
        loss_c.append(val)
    loss_c = np.array(loss_c)

    fig = make_subplots(rows=1, cols=3, subplot_titles=[
        '<b>그래프 A</b>', '<b>그래프 B</b>', '<b>그래프 C</b>'
    ], horizontal_spacing=0.08)

    fig.add_trace(go.Scatter(x=epochs, y=loss_a, mode='lines', line=dict(color='#22C55E', width=2), showlegend=False), row=1, col=1)
    fig.add_trace(go.Scatter(x=epochs, y=loss_b, mode='lines', line=dict(color='#3B82F6', width=2), showlegend=False), row=1, col=2)
    fig.add_trace(go.Scatter(x=epochs, y=loss_c, mode='lines', line=dict(color='#EF4444', width=2), showlegend=False), row=1, col=3)

    fig.update_layout(
        title=dict(text='<b>[A-11] 세 가지 학습률의 손실(Loss) 변화</b>', x=0.5, font=dict(size=18)),
        height=350, width=1000,
        plot_bgcolor='white',
        margin=dict(t=80, b=50)
    )
    for i in [1, 2, 3]:
        fig.update_xaxes(title_text='Epoch', gridcolor='#E5E7EB', row=1, col=i)
        fig.update_yaxes(title_text='Loss' if i == 1 else '', gridcolor='#E5E7EB', row=1, col=i, range=[0, 20])

    fig.write_image(f"{IMG_DIR}/gradient_descent_student.png", scale=SCALE)
    print("✅ gradient_descent_student.png")


# ─────────────────────────────────────────────
# 3. A-7: 벡터 공간 (정답 위치 제거, 서울/한국/일본만)
# ─────────────────────────────────────────────
def gen_word_vectors_student():
    fig = go.Figure()

    # 한국, 일본, 서울만 표시 (정답 '도쿄' 위치 숨김)
    words = {'한국': (2, 0), '일본': (2, 1), '서울': (3, 1)}
    colors = {'한국': '#3B82F6', '일본': '#22C55E', '서울': '#EF4444'}

    for name, (x, y) in words.items():
        fig.add_trace(go.Scatter(
            x=[x], y=[y], mode='markers+text', text=[name],
            textposition='top center', textfont=dict(size=14, color=colors[name]),
            marker=dict(size=14, color=colors[name]),
            showlegend=False
        ))

    # "한국→서울" 관계 화살표
    fig.add_annotation(x=3, y=1, ax=2, ay=0, arrowhead=2, arrowwidth=1.5,
                       arrowcolor='#9CA3AF', opacity=0.5)
    fig.add_annotation(x=2.5, y=0.4, text='"수도" 관계', showarrow=False,
                       font=dict(size=11, color='#6B7280'))

    # "한국→일본" 관계 화살표
    fig.add_annotation(x=2, y=1, ax=2, ay=0, arrowhead=2, arrowwidth=1.5,
                       arrowcolor='#9CA3AF', opacity=0.5)

    # 물음표 위치 (정답 좌표 노출 없이)
    fig.add_trace(go.Scatter(
        x=[3], y=[2], mode='markers+text', text=['<b>?</b>'],
        textposition='top center', textfont=dict(size=20, color='#8B5CF6'),
        marker=dict(size=16, color='#8B5CF6', symbol='diamond'),
        showlegend=False
    ))

    fig.update_layout(
        title=dict(text='<b>[A-7] 워드벡터 공간 — "서울 − 한국 + 일본 = ?"</b>', x=0.5, font=dict(size=16)),
        xaxis=dict(title='차원 1', range=[1, 4], gridcolor='#E5E7EB', dtick=1),
        yaxis=dict(title='차원 2', range=[-0.5, 3], gridcolor='#E5E7EB', dtick=1),
        height=450, width=500,
        plot_bgcolor='white',
        margin=dict(t=70)
    )

    fig.write_image(f"{IMG_DIR}/word_vectors_student.png", scale=SCALE)
    print("✅ word_vectors_student.png")


# ─────────────────────────────────────────────
# 4. A-13/A-4: 선형 합성 (최종 공식 제거)
# ─────────────────────────────────────────────
def gen_linear_composition_student():
    x = np.linspace(-2, 3, 100)
    y1 = 2 * x + 1        # 1층
    y2 = 3 * x + 4        # 2층 (y 입력 기준이지만 시각적으로)

    # 합성 결과 (공식 숨김)
    y3 = 6 * x + 7

    fig = make_subplots(rows=1, cols=3, subplot_titles=[
        '<b>1층: y = 2x + 1</b>',
        '<b>2층: z = 3y + 4</b>',
        '<b>합성: z = ?</b>'
    ], horizontal_spacing=0.1)

    fig.add_trace(go.Scatter(x=x, y=y1, mode='lines', line=dict(color='#3B82F6', width=3), showlegend=False), row=1, col=1)
    fig.add_trace(go.Scatter(x=x, y=y2, mode='lines', line=dict(color='#22C55E', width=3), showlegend=False), row=1, col=2)
    fig.add_trace(go.Scatter(x=x, y=y3, mode='lines', line=dict(color='#EF4444', width=3), showlegend=False), row=1, col=3)

    # 질문 박스
    fig.add_annotation(
        x=1.5, y=5, text='활성화함수 없이 층을 쌓으면<br>결과는 어떤 형태일까?',
        showarrow=False, font=dict(size=11, color='#6B7280'),
        bgcolor='#FEF3C7', bordercolor='#F59E0B', borderwidth=1,
        row=1, col=3
    )

    fig.update_layout(
        title=dict(text='<b>[A-13] 선형 합성: 층을 쌓아도 여전히…?</b>', x=0.5, font=dict(size=16)),
        height=300, width=900,
        plot_bgcolor='white',
        margin=dict(t=70, b=40)
    )
    for i in [1, 2, 3]:
        fig.update_xaxes(gridcolor='#E5E7EB', row=1, col=i)
        fig.update_yaxes(gridcolor='#E5E7EB', row=1, col=i)

    fig.write_image(f"{IMG_DIR}/linear_composition_student.png", scale=SCALE)
    print("✅ linear_composition_student.png")


# ─────────────────────────────────────────────
# 5. A-16: 다음 토큰 예측 개념도 (v5 데이터 매칭)
# ─────────────────────────────────────────────
def gen_next_token_student():
    tokens = ['좋다', '맑다', '춥다', '덥다', '나쁘다']
    probs = [0.40, 0.25, 0.15, 0.10, 0.10]  # 춥다=0.15가 정답이므로 숨김
    colors = ['#3B82F6', '#60A5FA', '#9CA3AF', '#F59E0B', '#EF4444']

    fig = go.Figure()

    # 부채꼴 차트 (확률값 숨김, 라벨만)
    fig.add_trace(go.Pie(
        labels=tokens,
        values=probs,
        textinfo='label',  # 확률값 숨김!
        marker=dict(colors=colors),
        hole=0.3,
        sort=False
    ))

    fig.update_layout(
        title=dict(text='<b>[A-16] "오늘 날씨가 정말" 다음 토큰 후보</b>', x=0.5, font=dict(size=16)),
        height=400, width=500,
        margin=dict(t=60, b=20),
        showlegend=True,
        legend=dict(x=0.8, y=0.5)
    )

    fig.write_image(f"{IMG_DIR}/next_token_student.png", scale=SCALE)
    print("✅ next_token_student.png")


# ─────────────────────────────────────────────
# 6. A-12: XOR 좌표 (v5 스타일: ○/● 표기)
# ─────────────────────────────────────────────
def gen_xor_student():
    fig = go.Figure()

    # ○ 그룹 (0,0), (1,1)
    fig.add_trace(go.Scatter(
        x=[0, 1], y=[0, 1], mode='markers+text',
        marker=dict(size=22, color='white', line=dict(color='#3B82F6', width=3)),
        text=['○', '○'], textposition='top center',
        textfont=dict(size=16, color='#3B82F6'),
        name='○ 그룹', showlegend=True
    ))

    # ● 그룹 (0,1), (1,0)
    fig.add_trace(go.Scatter(
        x=[0, 1], y=[1, 0], mode='markers+text',
        marker=dict(size=22, color='#EF4444'),
        text=['●', '●'], textposition='top center',
        textfont=dict(size=16, color='#EF4444'),
        name='● 그룹', showlegend=True
    ))

    # 좌표 라벨
    coords = [(0, 0), (0, 1), (1, 0), (1, 1)]
    for cx, cy in coords:
        fig.add_annotation(x=cx, y=cy, text=f'({cx},{cy})', showarrow=False,
                          font=dict(size=11, color='#6B7280'), yshift=-25)

    fig.add_annotation(
        x=0.5, y=-0.25, text='직선 하나로 ○과 ●를 분리할 수 있는가?',
        showarrow=False, font=dict(size=13, color='#374151')
    )

    fig.update_layout(
        title=dict(text='<b>[A-12] XOR 데이터</b>', x=0.5, font=dict(size=16)),
        xaxis=dict(title='x₁', range=[-0.3, 1.3], dtick=1, gridcolor='#E5E7EB'),
        yaxis=dict(title='x₂', range=[-0.5, 1.5], dtick=1, gridcolor='#E5E7EB'),
        height=450, width=450,
        plot_bgcolor='white',
        margin=dict(t=60, b=70),
        legend=dict(x=0.7, y=1.1, orientation='h')
    )

    fig.write_image(f"{IMG_DIR}/xor_student.png", scale=SCALE)
    print("✅ xor_student.png")


if __name__ == '__main__':
    gen_mse_student()
    gen_gradient_descent_student()
    gen_word_vectors_student()
    gen_linear_composition_student()
    gen_next_token_student()
    gen_xor_student()
    print("\n🎉 학생용 이미지 6개 생성 완료!")
