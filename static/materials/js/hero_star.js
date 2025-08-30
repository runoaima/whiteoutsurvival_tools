const PIECES_PER_STAR = 6; // 6欠片で1★
const rankGroups = document.getElementById("rankGroups");
const resultDiv = document.getElementById("result");

const materialKeys = ["英雄の欠片"];
const imageDataEl = document.getElementById("hero_star_image_data");
const hero_star_materialImages = {
    "英雄の欠片": imageDataEl.dataset.heroStarUrl
};

// Lvごとの欠片テーブル（例）
const materialTable = {
    1: ["英雄の欠片×1"],
    2: ["英雄の欠片×1"],
    3: ["英雄の欠片×2"],
    4: ["英雄の欠片×2"],
    5: ["英雄の欠片×2"],
    6: ["英雄の欠片×2"],
    7: ["英雄の欠片×5"],
    8: ["英雄の欠片×5"],
    9: ["英雄の欠片×5"],
    10: ["英雄の欠片×5"],
    11: ["英雄の欠片×5"],
    12: ["英雄の欠片×15"],
    13: ["英雄の欠片×15"],
    14: ["英雄の欠片×15"],
    15: ["英雄の欠片×15"],
    16: ["英雄の欠片×15"],
    17: ["英雄の欠片×15"],
    18: ["英雄の欠片×40"],
    19: ["英雄の欠片×40"],
    20: ["英雄の欠片×40"],
    21: ["英雄の欠片×40"],
    22: ["英雄の欠片×40"],
    23: ["英雄の欠片×40"],
    24: ["英雄の欠片×100"],
    25: ["英雄の欠片×100"],
    26: ["英雄の欠片×100"],
    27: ["英雄の欠片×100"],
    28: ["英雄の欠片×100"],
    29: ["英雄の欠片×100"],
    30: ["英雄の欠片×100"]
};

let count = 0;

function addOne() {
    count++;
    document.getElementById('counter').textContent = count;
    const currentCount = count; // count の値をキャプチャ

    const div = document.createElement("div");
    div.innerHTML = `
        <strong class="equipment-title">英雄${currentCount}</strong><br><br>

        <label>現在Lv: <span id="sval${currentCount}">0</span></label>
        <button type="button" class="level-button plus" data-target="start${currentCount}">+</button>
        <button type="button" class="level-button minus" data-target="start${currentCount}">-</button>
        <input type="range" id="start${currentCount}" min="0" max="30" value="0" step="1" class="slider blue">
        <div id="starsCurrent${currentCount}" class="stars-display"></div>

        <label>希望Lv: <span id="eval${currentCount}">30</span></label>
        <button type="button" class="level-button plus" data-target="end${currentCount}">+</button>
        <button type="button" class="level-button minus" data-target="end${currentCount}">-</button>
        <input type="range" id="end${currentCount}" min="0" max="30" value="30" step="1" class="slider red">
        <div id="starsTarget${currentCount}" class="stars-display"></div>
    `;
    rankGroups.appendChild(div);

    const startSlider = document.getElementById(`start${currentCount}`);
    const endSlider = document.getElementById(`end${currentCount}`);
    const starDivCurrent = document.getElementById(`starsCurrent${currentCount}`);
    const starDivTarget = document.getElementById(`starsTarget${currentCount}`);

    // スライダーのイベントリスナー
    startSlider.addEventListener("input", function () {
        document.getElementById(`sval${currentCount}`).textContent = this.value;
        if (parseInt(this.value) > parseInt(endSlider.value)) {
            endSlider.value = this.value;
            document.getElementById(`eval${currentCount}`).textContent = this.value;
        }
        updateStars(this.value, starDivCurrent);
        updateStars(endSlider.value, starDivTarget);
        updateTable();
    });

    endSlider.addEventListener("input", function () {
        document.getElementById(`eval${currentCount}`).textContent = this.value;
        if (parseInt(this.value) < parseInt(startSlider.value)) {
            startSlider.value = this.value;
            document.getElementById(`sval${currentCount}`).textContent = this.value;
        }
        updateStars(startSlider.value, starDivCurrent);
        updateStars(this.value, starDivTarget);
        updateTable();
    });

    // +/-ボタンのイベントリスナー
    div.querySelectorAll('.level-button').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.dataset.target;
            const slider = document.getElementById(targetId);
            if (slider) {
                if (this.classList.contains('plus')) {
                    if (parseInt(slider.value) < parseInt(slider.max)) {
                        slider.value = parseInt(slider.value) + 1;
                    }
                } else if (this.classList.contains('minus')) {
                    if (parseInt(slider.value) > parseInt(slider.min)) {
                        slider.value = parseInt(slider.value) - 1;
                    }
                }
                slider.dispatchEvent(new Event('input')); // 手動でイベントを発火させる
            }
        });
    });

    updateStars(startSlider.value, starDivCurrent);
    updateStars(endSlider.value, starDivTarget);
    updateTable();
}

function subOne() {
    if (count > 0) {
        const lastChild = rankGroups.lastElementChild;
        if (lastChild) rankGroups.removeChild(lastChild);
        count--;
        document.getElementById('counter').textContent = count;
        updateTable();
    }
}

function updateStars(level, starDiv) {
    const totalPieces = parseInt(level);
    const fullStars = Math.floor(totalPieces / PIECES_PER_STAR);
    const remainingPieces = totalPieces % PIECES_PER_STAR;

    let html = '';
    for (let i = 0; i < fullStars; i++) html += '<span class="star"></span>';
    for (let i = 0; i < remainingPieces; i++) html += '<span class="piece"></span>';

    starDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const restoreData = urlParams.get('data');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton');

    if (restoreData) {
        try {
            const inputData = JSON.parse(decodeURIComponent(restoreData));
            const sliderCounts = inputData.length / 2;
            for (let i = 0; i < sliderCounts; i++) {
                addOne();
            }
            inputData.forEach(item => {
                const slider = document.getElementById(item.id);
                if (slider) {
                    slider.value = item.value;
                    if (item.id.startsWith('start')) {
                        document.getElementById(item.id.replace('start', 'sval')).textContent = item.value;
                    } else if (item.id.startsWith('end')) {
                        document.getElementById(item.id.replace('end', 'eval')).textContent = item.value;
                    }
                }
            });
            updateTable();
        } catch (e) {
            console.error('復元データの解析に失敗しました:', e);
            addOne();
        }
    } else {
        addOne();
    }

    if (saveButton) {
        saveButton.addEventListener('click', function () {
            const resultTitle = "英雄の星レベル計算結果";
            const resultHtml = resultDiv.innerHTML;
            const inputData = [];
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

    if (clearButton) {
        clearButton.addEventListener('click', function () {
            while (count > 0) {
                subOne();
            }
            addOne();
            updateTable();
        });
    }

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
});

function updateTable() {
    const totalsPerSet = Array(count).fill(0).map(() => ({ "英雄の欠片": 0 }));
    const totalAll = { "英雄の欠片": 0 };
    let hasCalculatedMaterials = false;

    for (let i = 1; i <= count; i++) {
        const startEl = document.getElementById(`start${i}`);
        const endEl = document.getElementById(`end${i}`);

        if (!startEl || !endEl) {
            continue;
        }

        const from = parseInt(startEl.value);
        const to = parseInt(endEl.value);

        if (from < to) {
            for (let lv = from; lv < to; lv++) {
                if (!materialTable[lv + 1]) continue;
                materialTable[lv + 1].forEach(entry => {
                    const [name, val] = entry.split("×");
                    const n = parseInt(val);
                    if (totalsPerSet[i - 1]) {
                        totalsPerSet[i - 1][name] += n;
                    }
                    totalAll[name] += n;
                    if (n > 0) hasCalculatedMaterials = true;
                });
            }
        }
    }

    let html = `<h3>合計必要素材</h3><table class="styled-table"><tr><th>セット</th>`;
    materialKeys.forEach(key => html += `<th><img src="${hero_star_materialImages[key]}" width="32"><br>${key}</th>`);
    html += `</tr>`;

    for (let i = 0; i < count; i++) {
        html += `<tr><td>英雄${i + 1}</td>`;
        materialKeys.forEach(key => {
            const value = totalsPerSet[i] ? totalsPerSet[i][key] : 0;
            html += `<td>${value}</td>`;
        });
        html += `</tr>`;
    }

    html += `<tr class="total-row"><td><strong>合計</strong></td>`;
    materialKeys.forEach(key => html += `<td><strong>${totalAll[key]}</strong></td>`);
    html += `</tr></table>`;
    resultDiv.innerHTML = html;

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        if (hasCalculatedMaterials) {
            saveButton.style.display = 'block';
        } else {
            saveButton.style.display = 'none';
        }
    }
}