document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const slots = document.querySelectorAll(".slot");
    let currentSlot = null;

    // モーダルを開く
    slots.forEach(slot => {
        slot.addEventListener("click", () => {
            currentSlot = slot;
            modal.classList.remove("hidden");
            modal.classList.add("active");
            document.body.style.overflow = "hidden"; // 背面スクロール禁止
        });
    });

    // モーダルを閉じる関数
    function closeModalFunc() {
        modal.classList.remove("active");
        modal.classList.add("hidden");
        document.body.style.overflow = ""; // 背面スクロール解除
    }

    // モーダル外クリック / タップで閉じる
    ["click", "touchstart"].forEach(evt => {
        modal.addEventListener(evt, e => {
            if (e.target === modal) closeModalFunc();
        });
    });

    // キャラ選択
    document.querySelectorAll(".character-card").forEach(card => {
        card.addEventListener("click", () => {
            if (!currentSlot) return;
            const img = card.querySelector("img")?.src;
            const name = card.dataset.name || "";

            currentSlot.innerHTML = (name === "none" || !img)
                ? `<p>キャラなし</p>`
                : `<img src="${img}" alt="${name}">`;

            closeModalFunc();
        });
    });
});

const smith = {
    expedition_attack : 90.07,
    expedition_defense : 90.07,
    exploration1 : "ハンマーを振り回し、前方扇形範囲の敵に攻撃280%のダメージを与える。",
    exploration2 : "防具を強化して、被ダメージを30%低下させる。",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "スミスが鍛治への情熱を皆に伝え、都市内の鉄鉱工場生産量を25%上昇させる。",
    expedition2 : "鉄鉱と不思議な“親和関係”があるスミスを出征させると、鉄鉱採集速度が25%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const eugene = {
    expedition_attack : 90.07,
    expedition_defense : 90.07,
    exploration1 : "素早く振り回し、0.5秒毎に周囲の敵に攻撃110%のダメージを与える。3秒持続。",
    exploration2 : "斧を強化させ、与ダメージが30%上昇する。",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "ユージーンの優れた伐採技術により、都市内の伐採場生産量が25%上昇する。",
    expedition2 : "ユージーンは常に伐採作業に集中できる。出征時の木材採集速度が25%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const charlie = {
    expedition_attack : 90.07,
    expedition_defense : 90.07,
    exploration1 : "自家製爆弾を投げて、ターゲットとその周囲の敵に攻撃196%のダメージを与える。",
    exploration2 : "敵に投げた爆弾が20%の確率でターゲットを眩暈状態にする。1.5秒持続。",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "チャーリーの豊富な発破経験で精密起爆を実現！都市内の石炭工場生産量が25%上昇する。",
    expedition2 : "チャーリーは採掘のコツを熟知しており、出征時に石炭採集速度が25%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const cloris = {
    expedition_attack : 90.07,
    expedition_defense : 90.07,
    exploration1 : "雨のように矢を発して、攻撃252%のダメージを与える。",
    exploration2 : "ターゲットに狩人の印を付与し、今回の攻撃の与ダメージが30%上昇する。",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "クラリスは氷原で一番の狩人。彼女の狩猟技術により、都市内のハンターの家生産量が5%上昇する。",
    expedition2 : "氷原動物の習性に非常に詳しいクラリスを出征させると、生肉採集速度が5%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const sergey = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "重い盾を敵に投げつけて280%の範囲ダメージを与え、ノックバックさせる。",
    exploration2 : "セルゲイが仲間を率いて防衛ラインを築き、味方英雄全員の防御が15%上昇する。",
    exploration3 : "盾を強化し、自身の被ダメージが30%低下する。",
    exploration4 : "",
    expedition1 : "セルゲイが盾で味方隊員を守り、味方全部隊の被ダメージが20%減少する。",
    expedition2 : "セルゲイが敵全部隊の攻撃力を20%低下させる。",
    expedition3 : "",
    expedition4 : "",
}

const jessie = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "ガトリング砲で掃射し、0.5秒毎に扇形範囲内の敵に攻撃75%のダメージを与える。2秒持続。",
    exploration2 : "防具を改造し、防御力が70%上昇する。",
    exploration3 : "武器を改造し、攻撃力が24%上昇する。",
    exploration4 : "",
    expedition1 : "ジェシーが味方の武器を改良し、味方全部隊のダメージが25%上昇する。",
    expedition2 : "ジェシーが味方の防具を改良し、味方全部隊の被ダメージが20%減少する。",
    expedition3 : "",
    expedition4 : "",
}

const patrick = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "大量の豪華な食事で、味方全体のHPをパトリックの攻撃力280%分回復する。さらに味方全体の攻撃力が7%上昇する。4秒持続",
    exploration2 : "料理人の肉厚脂肪により、自身の被ダメージが30%低下する。",
    exploration3 : "いつもおやつを持っている。5秒ごとに攻撃70%分のHPを回復する。",
    exploration4 : "",
    expedition1 : "パトリックは美味しい料理で味方を励ます。味方全部隊のHPが25%上昇する。",
    expedition2 : "美食が戦意と潜在能力を刺激し、味方全部隊の攻撃力を25%上昇させる。",
    expedition3 : "",
    expedition4 : "",
}

const lumak_bokan = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "山々が揺るがすほどの雄叫びを発して敵を威圧する。敵全体の攻撃力5%低下させる。2秒持続。",
    exploration2 : "雄叫びは敵を威嚇するだけでなく、仲間を鼓舞する。「群山咆哮」を発動すると、自身と自信周辺の味方の攻撃力が35%上昇する。2秒持続。",
    exploration3 : "ジャングルと山岳地帯での長年の戦闘経験により、ヴァリス・ボーガンは俊敏な動きを身につけた。攻撃速度が30%上昇する。",
    exploration4 : "",
    expedition1 : "ヴァリス・ボーガンは巧妙なゲリラ戦術で敵を欺く。敵全体の攻撃力を20%低下させる。",
    expedition2 : "ヴァリス・ボーガンは島民の狩猟技術を兵士たちに伝授する。モンスター討伐部隊の出征速度が100%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const ling_xue = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "長槍の刃を高速で力強く刺し、前方直線範囲内の敵に攻撃*420%のダメージ与える。",
    exploration2 : "整然とした軍容で、高らかに歌いながら猛進する。HPが50%以上の時、攻撃力が48%上昇する。",
    exploration3 : "百戦錬磨の優れた武将は逆境に屈することはない！HPが50%以下の時、防御力が150%上昇する。",
    exploration4 : "",
    expedition1 : "一撃必殺の攻勢で敵の意志を砕き、敵部隊全体の攻撃力を20%低下させる。",
    expedition2 : "兵士に代々伝わる武芸を伝授する。訓練速度が20%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const gina = {
    expedition_attack : 110.08,
    expedition_defense : 110.08,
    exploration1 : "敵1体に爆裂の矢を発し、攻撃290%のダメージを与える。さらにターゲット周りの小範囲の敵に攻撃98%のダメージを与える。",
    exploration2 : "ジーナが狙撃クロスボウを改良し、攻撃速度が30%上昇する。",
    exploration3 : "敵の弱点を鋭く捉え、クリティカル率が20%上昇する。",
    exploration4 : "",
    expedition1 : "ジーナが領主に体力訓練を行い、領主の体力消費が20%減少する。",
    expedition2 : "ジーナが疾風の如く迅速に行動、攻撃出征速度が100%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const bahiti = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "大量の豪華な食事で、味方全体のHPをパトリックの攻撃力280%分回復する。さらに味方全体の攻撃力が7%上昇する。4秒持続",
    exploration2 : "料理人の肉厚脂肪により、自身の被ダメージが30%低下する。",
    exploration3 : "いつもおやつを持っている。5秒ごとに攻撃70%分のHPを回復する。",
    exploration4 : "",
    expedition1 : "パトリックは美味しい料理で味方を励ます。味方全部隊のHPが25%上昇する。",
    expedition2 : "美食が戦意と潜在能力を刺激し、味方全部隊の攻撃力を25%上昇させる。",
    expedition3 : "",
    expedition4 : "",
}

const jasser = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "精密ロックオンをした後、連続で球を3発発射する。それぞれ攻撃力100%、175%、210%のダメージを与える。3発目は範囲ダメージとなる。",
    exploration2 : "巧みな銃撃と強力な火力で敵を抑え込む。ターゲットに攻撃力140%のダメージを与え、相手の攻撃速度を50%低下させる。2秒持続。",
    exploration3 : "達人の域の射撃技術は既にジャセルの本能と一体化している。ジャセルの攻撃力が24%上昇する。",
    exploration4 : "",
    expedition1 : "ジャセルは勇気と知恵を兼ね備えている。その優れた戦術と指揮能力により、味方全部隊の攻撃力が25%上昇する。",
    expedition2 : "ジャセルの博識が町に恩恵をもたらす。科学研究の速度が15%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const seo_yoon = {
    expedition_attack : 140.11,
    expedition_defense : 140.11,
    exploration1 : "太鼓で人々を奮い立たせ、戦意を高める。味方全体の英雄と護衛が3.5%、攻撃速度が4.5%上昇する。4秒持続。",
    exploration2 : "ターゲットの弱点を狙い、全力で太鼓のばちを投げつける。相手に攻撃力の210%のダメージを与える。",
    exploration3 : "風のようなステップを踏み、攻勢をますます激しくさせる。通常攻撃を3回行う度、自身の攻撃速度が5%上昇する。戦闘終了まで持続。",
    exploration4 : "",
    expedition1 : "出征が近づくと、ソユンは士気を高めるために太鼓を叩く。味方全部隊の攻撃力が25%上昇する。",
    expedition2 : "古来の伝統的な医学で負傷兵を治療する。軍医所の治療速度が50%上昇する。",
    expedition3 : "",
    expedition4 : "",
}

const natalia = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "白熊が立ち上がって地面を叩き、攻撃160%/176%/192%/208%/224%の範囲ダメージを与える。さらに範囲内の敵を撃退して眩暈状態にする。1秒持続。",
    exploration2 : "鞭を振り回し、ターゲットに攻撃150%/165%/180%/195%/210%のダメージを与える。",
    exploration3 : "白熊と彼の相棒は手強い。ダメージを受けた際、ナタリアは10%の確率で攻撃力が4%/6%/8%/10%/12%上昇する。3秒持続(5回まで重ね掛け可能)。",
    exploration4 : "ナタリアと白熊が心を一つにする。与ダメージが10%/15%/20%/25%/30%上昇する。",
    expedition1 : "白熊の咆哮は伝令のよう。味方全部隊が攻撃する際、4%/8%/12%/16%/20%の確率で敵軍を眩暈状態にする。1ターン持続。",
    expedition2 : "ナタリアが味方を励ます。味方全部隊の攻撃力が5%/10%/15%/20%/25%上昇する。",
    expedition3 : "ナタリアが獣の群れを召喚して戦いに協力させる。味方全部隊のダメージが5%/10%/15%/20%/25%上昇する。",
    expedition4 : "ナタリアが獣の群れを召喚する。集結部隊の殺傷力が5%/7.5%/10%/12.5%/15%上昇する。",
}

const jeronimo = {
    expedition_attack : 260.20,
    expedition_defense : 260.20,
    exploration1 : "一定範囲内の敵を高くカチ上げ、攻撃160%/176%/192%/208%/224%のダメージを与える斬撃を3回行う。",
    exploration2 : "通常攻撃で剣気を放ち、前方直線範囲内の敵に攻撃15%/17%/19%/21%/23%のダメージを与える。",
    exploration3 : "高飛車なジェロニモは、戦況が順調な時は無双する。HPが50%以上の時、攻撃力が16%/24%/32%/40%/48%上昇する。",
    exploration4 : "攻撃時に、剣気が盾となってジェロニモを守り、自身の被ダメージを10%/15%/20%/25%/30%低下させる。",
    expedition1 : "ジェロニモはバトル開始前に演説を行い、味方全部隊の与ダメージを5%/10%/15%/20%/25%上昇させる。",
    expedition2 : "剣術の奥義を授け、味方全部隊の攻撃力を5%/10%/15%/20%/25%上昇させる。",
    expedition3 : "ジェロニモが伝授した剣術は、味方全部隊が攻撃する際、4%/8%/12%/16%/20%の確率で敵軍を眩暈状態にする。1ターン持続。",
    expedition4 : "剣陣を組んで攻撃を仕掛け、集結部隊の攻撃力を5%/7.5%/10%/12.5%/15%上昇させる。",
}

const molly = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "巨大な雪玉を発射し、円形範囲内のターゲットに攻撃力の180%/198%/216%/234%/252%相当のダメージを与える。さらに凍結状態にする。1.5秒持続。",
    exploration2 : "雪上に隠れて奇襲を仕掛け、ターゲットに攻撃150%/165%/180%/195%/210%のダメージを与える。",
    exploration3 : "逆境により、ジャスミンの底知れぬ潜在能力が発揮される。HPが50%以下の時、攻撃速度が20%/30%/40%/50%/60%上昇する。",
    exploration4 : "雪玉発射機を改良し、自身の与ダメージを10%/15%/20%/25%/30%上昇させる。",
    expedition1 : "ジャスミンが仲間を引き連れ雪崩のような攻撃を行う。味方全部隊が攻撃する際、4%/8%/12%/16%/20%の確率で敵軍を眩暈状態にする。1ターン持続。",
    expedition2 : "雪上はジャスミンの主戦場に他ならない。味方全部隊の攻撃時、50%の確率で今回の攻撃によるダメージが10%/20%/30%/40%/50%上昇する。",
    expedition3 : "ジャスミンの怒りは全員の戦意を鼓舞する。味方全部隊の与ダメージが5%/10%/15%/20%/25%上昇する。",
    expedition4 : "雪の庇護により、防衛部隊の殺傷力を5%/7.5%/10%/12.5%/15%上昇させる。",
}

const zinman = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "ターゲットに複数の釘を連打し、毎回攻撃55%/60%/65%/70%/75%のダメージを与える。さらに眩暈状態にする。2秒持続。",
    exploration2 : "HPが50%を下回った際、すばやく簡易防御工事を行う。自身の防御が50%/75%/100%/125%/150%上昇する。",
    exploration3 : "ヤル気満々！攻撃速度が10%/15%/20%/25%/30%上昇する。",
    exploration4 : "圧力釘銃が過負荷モードに移行し、攻撃を8%/12%/16%/20%/24%上昇させる。",
    expedition1 : "ジンマンが築いた防衛線は堅固で信頼できる。味方全部隊の防衛力が2%/4%/6%/8%/10%、HPが2%/4%/6%/8%/10%上昇する。",
    expedition2 : "ジンマンは施工プロセスを合理的にコントロールする。建設に必要な基本資源（生肉、木材、石炭、鉄鋼）の消費を3%/6%/9%/12%/15%削減し、建築のLvUP速度が3%/6%/9%/12%/15%上昇する。",
    expedition3 : "ジンマンは実戦において味方に有利な地形を構築できる。味方全部隊の殺傷力が5%/10%/15%/20%/25%上昇する。",
    expedition4 : "攻撃型櫓を築き上げ、防衛部隊の攻撃力を5%/7.5%/10%/12.5%/15%上昇させる。",
}

const flint = {
    expedition_attack : 240.19,
    expedition_defense : 240.19,
    exploration1 : "激しく渦巻く烈火を噴射し敵を焼き尽くす。0.5秒毎に攻撃力60%/66%/72%/78%/84%のダメージを与え、ターゲットの被ダメージを10%/15%/20%/25%/30%上昇させる。2秒持続。",
    exploration2 : "傷の痛みがフリントの潜在能力を解き放つ。HPが50%を下回った際、即座に自分のHP上限の20%/25%/30%/35%/40%を回復する。1回の戦闘で1度しか発動しない。",
    exploration3 : "焔は我々と共に作戦を行う友の寒さを打ち消してくれる。自軍全体の英雄の攻撃速度が3%/4%/5%/6%/7%上昇する。",
    exploration4 : "",
    expedition1 : "燃え上がる野火。味方全部隊が攻撃する際、20%の確率で焼灼効果を付与する。敵は毎ターン8%のダメージを受ける。3ターン持続。",
    expedition2 : "炎は寒さを打ち消し、戦意を高揚させる。味方全部隊の攻撃力が5%上昇する。",
    expedition3 : "復讐の火はすべての敵を飲み込む。味方全部隊が攻撃する際、50%の確率で敵軍の被ダメージを10%上昇させる。",
    expedition4 : "",
}

const philly = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const alonso = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const logan = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const mia = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const greg = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const ahmose = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const reina = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const lynn = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const hector = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const norah = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const gwen = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const wu_ming = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const renee = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const wayne = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const edith = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const gordon = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const bradley = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const gatot = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const sonya = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const hendrik = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const magnus = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const fred = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const xura = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const gregory = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const freya = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const blanchette = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const eleonora = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const lloyd = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const rufus = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const hervor = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const karol = {
    
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const ligeia = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const gisela = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const flora = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}

const vulcanus = {
    expedition_attack : 200.16,
    expedition_defense : 200.16,
    exploration1 : "",
    exploration2 : "",
    exploration3 : "",
    exploration4 : "",
    expedition1 : "",
    expedition2 : "",
    expedition3 : "",
    expedition4 : "",
}