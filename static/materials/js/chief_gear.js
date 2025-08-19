const rankGroups = document.getElementById("rankGroups");
const resultDiv = document.getElementById("result");

const materialKeys = ["合金", "研磨剤", "設計図面", "月光琥珀"];

// HTMLからデータ属性を取得
const imageDataEl = document.getElementById("chief_gear_image_data");
const chief_gear_materialImages = {
    "合金": imageDataEl.dataset.alloyUrl,
    "研磨剤": imageDataEl.dataset.polishUrl,
    "設計図面": imageDataEl.dataset.blueprintUrl,
    "月光琥珀": imageDataEl.dataset.amberUrl
};

const setNames = ["帽子", "時計", "服", "ズボン", "指輪", "杖"];

const rankLabels = [
    "なし", "グッド", "グッド(☆１)", "レア", "レア(☆１)", "レア(☆２)", "レア(☆３)",
    "エピック", "エピック(☆１)", "エピック(☆２)", "エピック(☆３)",
    "エピックＴ１", "エピックＴ１(☆１)", "エピックＴ１(☆２)", "エピックＴ１(☆３)",
    "レジェンド", "レジェンド(☆１)", "レジェンド(☆２)", "レジェンド(☆３)",
    "レジェンドＴ１", "レジェンドＴ１(☆１)", "レジェンドＴ１(☆２)", "レジェンドＴ１(☆３)",
    "レジェンドＴ２", "レジェンドＴ２(☆１)", "レジェンドＴ２(☆２)", "レジェンドＴ２(☆３)",
    "神話", "神話(☆１)", "神話(☆２)", "神話(☆３)",
    "神話Ｔ１", "神話Ｔ１(☆１)", "神話Ｔ１(☆２)", "神話Ｔ１(☆３)",
    "神話Ｔ２", "神話Ｔ２(☆１)", "神話Ｔ２(☆２)", "神話Ｔ２(☆３)",
    "神話Ｔ３", "神話Ｔ３(☆１)", "神話Ｔ３(☆２)", "神話Ｔ３(☆３)"
];

// materialTable は前の定義のまま（0〜41）
const materialTable = {
    0: ["合金×1500", "研磨剤×15", "設計図面×0", "月光琥珀×0"],
    1: ["合金×3800", "研磨剤×40", "設計図面×0", "月光琥珀×0"],
    2: ["合金×7000", "研磨剤×70", "設計図面×0", "月光琥珀×0"],
    3: ["合金×9700", "研磨剤×95", "設計図面×0", "月光琥珀×0"],
    4: ["合金×0", "研磨剤×0", "設計図面×45", "月光琥珀×0"],
    5: ["合金×0", "研磨剤×0", "設計図面×50", "月光琥珀×0"],
    6: ["合金×0", "研磨剤×0", "設計図面×60", "月光琥珀×0"],
    7: ["合金×0", "研磨剤×0", "設計図面×70", "月光琥珀×0"],
    8: ["合金×6500", "研磨剤×65", "設計図面×40", "月光琥珀×0"],
    9: ["合金×8000", "研磨剤×80", "設計図面×50", "月光琥珀×0"],
    10: ["合金×10000", "研磨剤×95", "設計図面×60", "月光琥珀×0"],
    11: ["合金×11000", "研磨剤×110", "設計図面×70", "月光琥珀×0"],
    12: ["合金×13000", "研磨剤×130", "設計図面×85", "月光琥珀×0"],
    13: ["合金×15000", "研磨剤×160", "設計図面×100", "月光琥珀×0"],
    14: ["合金×22000", "研磨剤×220", "設計図面×40", "月光琥珀×0"],
    15: ["合金×23000", "研磨剤×230", "設計図面×40", "月光琥珀×0"],
    16: ["合金×25000", "研磨剤×250", "設計図面×45", "月光琥珀×0"],
    17: ["合金×26000", "研磨剤×260", "設計図面×45", "月光琥珀×0"],
    18: ["合金×28000", "研磨剤×280", "設計図面×45", "月光琥珀×0"],
    19: ["合金×30000", "研磨剤×300", "設計図面×55", "月光琥珀×0"],
    20: ["合金×32000", "研磨剤×320", "設計図面×55", "月光琥珀×0"],
    21: ["合金×35000", "研磨剤×340", "設計図面×55", "月光琥珀×0"],
    22: ["合金×38000", "研磨剤×360", "設計図面×55", "月光琥珀×0"],
    23: ["合金×43000", "研磨剤×430", "設計図面×75", "月光琥珀×0"],
    24: ["合金×45000", "研磨剤×460", "設計図面×80", "月光琥珀×0"],
    25: ["合金×48000", "研磨剤×500", "設計図面×85", "月光琥珀×0"],
    26: ["合金×50000", "研磨剤×530", "設計図面×85", "月光琥珀×10"],
    27: ["合金×52000", "研磨剤×560", "設計図面×90", "月光琥珀×10"],
    28: ["合金×54000", "研磨剤×590", "設計図面×95", "月光琥珀×10"],
    29: ["合金×56000", "研磨剤×620", "設計図面×100", "月光琥珀×10"],
    30: ["合金×59000", "研磨剤×670", "設計図面×110", "月光琥珀×15"],
    31: ["合金×61000", "研磨剤×700", "設計図面×115", "月光琥珀×15"],
    32: ["合金×63000", "研磨剤×730", "設計図面×120", "月光琥珀×15"],
    33: ["合金×65000", "研磨剤×760", "設計図面×125", "月光琥珀×15"],
    34: ["合金×68000", "研磨剤×810", "設計図面×135", "月光琥珀×20"],
    35: ["合金×70000", "研磨剤×840", "設計図面×140", "月光琥珀×20"],
    36: ["合金×72000", "研磨剤×870", "設計図面×145", "月光琥珀×20"],
    37: ["合金×74000", "研磨剤×900", "設計図面×150", "月光琥珀×20"],
    38: ["合金×77000", "研磨剤×950", "設計図面×160", "月光琥珀×25"],
    39: ["合金×80000", "研磨剤×990", "設計図面×165", "月光琥珀×25"],
    40: ["合金×83000", "研磨剤×1030", "設計図面×170", "月光琥珀×25"],
    41: ["合金×86000", "研磨剤×1070", "設計図面×180", "月光琥珀×25"]
};

// 入力欄を生成
for (let i = 0; i < 6; i++) {
    const div = document.createElement("div");
    div.innerHTML = `
    <strong>${setNames[i]}</strong><br>
    <label>現在のレベル：
      <select id="start${i}">
        ${rankLabels.slice(0, 42).map((label, idx) => `<option value="${idx}">${label}</option>`).join('')}
      </select>
    </label><br>
    <label>　希望レベル：
      <select id="end${i}">
        ${rankLabels.slice(0, 42).map((label, idx) => `<option value="${idx}">${label}</option>`).join('')}
      </select>
    </label>
    <hr>
  `;
    rankGroups.appendChild(div);

    document.getElementById(`start${i}`).addEventListener("change", updateTable);
    document.getElementById(`end${i}`).addEventListener("change", updateTable);
}

// 表描画
function updateTable() {
    const totalsPerSet = Array(6).fill(null).map(() => {
        return { "合金": 0, "研磨剤": 0, "設計図面": 0, "月光琥珀": 0 };
    });
    const totalAll = { "合金": 0, "研磨剤": 0, "設計図面": 0, "月光琥珀": 0 };

    for (let i = 0; i < 6; i++) {
        const start = parseInt(document.getElementById(`start${i}`).value);
        const end = parseInt(document.getElementById(`end${i}`).value);
        const from = start;
        const to = end;

        if (from != to && from < to) {
            for (let lv = from; lv < to; lv++) {
                if (!materialTable[lv]) continue;
                materialTable[lv].forEach(entry => {
                    const [name, val] = entry.split("×");
                    const n = parseInt(val);
                    totalsPerSet[i][name] += n;
                    totalAll[name] += n;
                });
            }
        }

    }

    let html = `<table class="styled-table"><tr><th>セット</th>`;
    materialKeys.forEach(key => {
        html += `<th><img src="${chief_gear_materialImages[key]}" width="32"><br>${key}</th>`;
    });
    html += `</tr>`;

    for (let i = 0; i < 6; i++) {
        html += `<tr><td>${setNames[i]}</td>`;
        materialKeys.forEach(key => {
            html += `<td>${totalsPerSet[i][key]}</td>`;
        });
        html += `</tr>`;
    }

    html += `<tr><td><strong>合計</strong></td>`;
    materialKeys.forEach(key => {
        html += `<td><strong>${totalAll[key]}</strong></td>`;
    });
    html += `</tr></table>`;
    resultDiv.innerHTML = html;
}

// 初期表示
updateTable();