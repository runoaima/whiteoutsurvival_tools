const rankGroups = document.getElementById("rankGroups");
const resultDiv = document.getElementById("result");

const materialKeys = ["追加ステータス", "ハンドブック", "宝石図面", "宝石秘典"];

const imageDataEl = document.getElementById("hero_gear_image_data");
const hero_gear_materialImages = {
    "追加ステータス": imageDataEl.dataset.statueUrl,
    "ハンドブック": imageDataEl.dataset.handbookUrl,
    "宝石図面": imageDataEl.dataset.mithicDesignUrl,
    "宝石秘典": imageDataEl.dataset.mithicTomeUrl,
};

// 現在/希望レベル用の素材テーブル
const materialTable = {
    1: ["追加ステータス×9", "ハンドブック×5", "宝石図面×5", "宝石秘典×0"],
    2: ["追加ステータス×3", "ハンドブック×40", "宝石図面×15", "宝石秘典×0"],
    3: ["追加ステータス×4", "ハンドブック×60", "宝石図面×40", "宝石秘典×0"],
    4: ["追加ステータス×3", "ハンドブック×80", "宝石図面×100", "宝石秘典×0"],
    5: ["追加ステータス×6", "ハンドブック×100", "宝石図面×200", "宝石秘典×0"],
    6: ["追加ステータス×5", "ハンドブック×120", "宝石図面×300", "宝石秘典×0"],
    7: ["追加ステータス×5", "ハンドブック×140", "宝石図面×400", "宝石秘典×0"],
    8: ["追加ステータス×5", "ハンドブック×200", "宝石図面×400", "宝石秘典×0"],
    9: ["追加ステータス×5", "ハンドブック×300", "宝石図面×400", "宝石秘典×0"],
    10: ["追加ステータス×5", "ハンドブック×420", "宝石図面×420", "宝石秘典×0"],
    11: ["追加ステータス×5", "ハンドブック×560", "宝石図面×420", "宝石秘典×0"],
    12: ["追加ステータス×9", "ハンドブック×580", "宝石図面×450", "宝石秘典×15"],
    13: ["追加ステータス×9", "ハンドブック×580", "宝石図面×450", "宝石秘典×30"],
    14: ["追加ステータス×9", "ハンドブック×600", "宝石図面×500", "宝石秘典×45"],
    15: ["追加ステータス×9", "ハンドブック×600", "宝石図面×500", "宝石秘典×70"],
    16: ["追加ステータス×9", "ハンドブック×650", "宝石図面×550", "宝石秘典×100"],
};


let count = 0;

function addOne() {
    count += 1;
    document.getElementById('counter').textContent = count;

    const div = document.createElement("div");
    // IDには`count`変数を使用
    div.innerHTML = `
        <strong class="equipment-title">宝石${count}</strong><br><br>

        <label class="slider-label-container">現在Lv:
            <span id="sval${count}" class="slider-label">0</span>
        </label>
        <button type="button" class="level-button plus" data-target="start${count}">+</button>
        <button type="button" class="level-button minus" data-target="start${count}">-</button>
        <input type="range" id="start${count}" min="0" max="16" value="0" step="1" class="slider blue">

        <br><br>

        <label class="slider-label-container">希望Lv:
            <span id="eval${count}" class="slider-label">16</span>
        </label>
        <button type="button" class="level-button plus" data-target="end${count}">+</button>
        <button type="button" class="level-button minus" data-target="end${count}">-</button>
        <input type="range" id="end${count}" min="0" max="16" value="16" step="1" class="slider red">
    `;
    rankGroups.appendChild(div);

    const startSlider = document.getElementById(`start${count}`);
    const endSlider = document.getElementById(`end${count}`);
    let currentCount = count;

    startSlider.addEventListener("input", function () {
        updateLabel(this.value, `sval${currentCount}`);
        if (parseInt(this.value) > parseInt(endSlider.value)) {
            endSlider.value = this.value;
            updateLabel(this.value, `eval${currentCount}`);
        }
        updateTable();
    });

    endSlider.addEventListener("input", function () {
        updateLabel(this.value, `eval${currentCount}`);
        if (parseInt(this.value) < parseInt(startSlider.value)) {
            startSlider.value = this.value;
            updateLabel(this.value, `sval${currentCount}`);
        }
        updateTable();
    });

    // ここから追加分
    const minusButtons = div.querySelectorAll('.level-button.minus');
    const plusButtons = div.querySelectorAll('.level-button.plus');

    minusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const slider = document.getElementById(targetId);
            if (slider && parseInt(slider.value) > parseInt(slider.min)) {
                slider.value = parseInt(slider.value) - 1;
                slider.dispatchEvent(new Event('input')); // スライダーの値を更新してinputイベントを発火
            }
        });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const slider = document.getElementById(targetId);
            if (slider && parseInt(slider.value) < parseInt(slider.max)) {
                slider.value = parseInt(slider.value) + 1;
                slider.dispatchEvent(new Event('input')); // スライダーの値を更新してinputイベントを発火
            }
        });
    });

    updateTable();
}

function updateLabel(val, spanId) {
    const num = parseInt(val);
    const label = document.getElementById(spanId);
    if (num <= 100) {
        label.textContent = num;
    } else {
        label.textContent = '+' + (num - 100);
    }
}

function subOne() {
    if (count > 0) {
        const lastChild = rankGroups.lastElementChild;
        if (lastChild) {
            rankGroups.removeChild(lastChild);
        }
        count -= 1;
        document.getElementById('counter').textContent = count;
        updateTable();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // URLから復元データを読み込むロジック
    const urlParams = new URLSearchParams(window.location.search);
    const restoreData = urlParams.get('data');

    if (restoreData) {
        try {
            const inputData = JSON.parse(decodeURIComponent(restoreData));
            // 復元ロジックは addOne() 関数を呼び出す必要があります
            // ... (この部分は後述します)
        } catch (e) {
            console.error('復元データの解析に失敗しました:', e);
        }
    }

    // 保存ボタンのイベントリスナー
    const saveButton = document.getElementById('saveButton');
    const resultDiv = document.getElementById('result');
    const rankGroups = document.getElementById('rankGroups');

    if (saveButton) {
        saveButton.addEventListener('click', function () {
            const resultTitle = "領主宝石計算結果";
            const resultHtml = resultDiv.innerHTML;

            const inputData = [];
            // スライダーからデータを取得する
            const sliderElements = rankGroups.querySelectorAll('input[type="range"]');
            sliderElements.forEach(slider => {
                inputData.push({
                    id: slider.id,
                    value: slider.value
                });
            });

            fetch('/accounts/save_calculation_result/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({
                    title: resultTitle,
                    result_html: resultHtml,
                    input_data: inputData
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('計算結果がプロフィールに保存されました！');
                    } else {
                        alert('保存に失敗しました: ' + data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('通信エラーが発生しました。');
                });
        });
    }

    // クリアボタンのイベントリスナー (★修正箇所)
    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            // スライダーの数をリセット
            while (count > 0) {
                subOne();
            }
            // ページロード時に一つだけ要素を追加
            addOne();
        });
    }

    // CSRFトークンを取得するヘルパー関数
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // ページの初期化
    if (!restoreData) {
        addOne(); // 復元データがない場合、最初に1つ追加
    }
});

function updateTable() {
    const totalsPerSet = Array(count).fill(null).map(() => {
        return { "追加ステータス": 0, "ハンドブック": 0, "宝石図面": 0, "宝石秘典": 0 };
    });
    const totalAll = { "追加ステータス": 0, "ハンドブック": 0, "宝石図面": 0, "宝石秘典": 0 };
    let hasCalculatedMaterials = false; // ★このフラグをここに追加

    for (let i = 1; i <= count; i++) {
        const startEl = document.getElementById(`start${i}`);
        const endEl = document.getElementById(`end${i}`);

        if (!startEl || !endEl) {
            continue;
        }

        const from = parseInt(startEl.value);
        const to = parseInt(endEl.value);

        if (from != to && from < to) {
            hasCalculatedMaterials = true; // ★計算が行われたらtrueに設定
            for (let lv = from; lv < to; lv++) {
                if (!materialTable[lv + 1]) continue;
                materialTable[lv + 1].forEach(entry => {
                    const [name, val] = entry.split("×");
                    const n = parseInt(val);
                    totalsPerSet[i - 1][name] += n;
                    totalAll[name] += n;
                });
            }
        }
    }

    let html = `<table class="styled-table"><tr><th>セット</th>`;
    materialKeys.forEach(key => {
        html += `<th><img src="${hero_gear_materialImages[key]}" width="32"><br>${key}</th>`;
    });
    html += `</tr>`;

    for (let i = 0; i < count; i++) {
        html += `<tr><td>装備${i + 1}</td>`;
        materialKeys.forEach(key => {
            html += `<td>${totalsPerSet[i][key]}</td>`;
        });
        html += `</tr>`;
    }

    html += `<tr class="total-row"><td><strong>合計</strong></td>`;
    materialKeys.forEach(key => {
        html += `<td><strong>${totalAll[key]}</strong></td>`;
    });
    html += `</tr></table>`;
    resultDiv.innerHTML = html;

    // ボタンの表示・非表示ロジックはこれで正常に動作します
    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        if (hasCalculatedMaterials) {
            saveButton.style.display = 'block';
        } else {
            saveButton.style.display = 'none';
        }
    }
}