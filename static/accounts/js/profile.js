document.addEventListener('DOMContentLoaded', function() {
    // 全ての復元ボタンを取得
    const restoreButtons = document.querySelectorAll('.btn-restore');

    restoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            // data-input-data属性からJSON文字列を取得し、パースする
            const inputData = JSON.parse(this.dataset.inputData);

            // ★data-tool-url属性からURLを取得
            const toolUrl = this.dataset.toolUrl;

            // 計算ツールページにリダイレクト
            window.location.href = `${toolUrl}?data=${encodeURIComponent(JSON.stringify(inputData))}`;
        });
    });
});