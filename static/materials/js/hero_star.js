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

function updateTable() {
    const totalsPerSet = Array(count).fill(0).map(() => ({ "英雄の欠片": 0 }));
    const totalAll = { "英雄の欠片": 0 };

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
                    totalsPerSet[i - 1][name] += n;
                    totalAll[name] += n;
                });
            }
        }
    }

    let html = `<table class="styled-table"><tr><th>セット</th>`;
    materialKeys.forEach(key => html += `<th>${key}</th>`);
    html += `</tr>`;

    for (let i = 0; i < count; i++) {
        html += `<tr><td>英雄${i + 1}</td>`;
        materialKeys.forEach(key => html += `<td>${totalsPerSet[i][key]}</td>`);
        html += `</tr>`;
    }

    html += `<tr class="total-row"><td>合計</td>`;
    materialKeys.forEach(key => html += `<td>${totalAll[key]}</td>`);
    html += `</tr></table>`;

    resultDiv.innerHTML = html;
}

// 初期表示
updateTable();