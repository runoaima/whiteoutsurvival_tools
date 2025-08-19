
document.addEventListener('DOMContentLoaded', function () {

    const JST_OFFSET = 9 * 60 * 60 * 1000; // JSTはUTC+9時間

    function setArrivalTimeToMinutesLater(minutesToAdd) {
        const now = new Date();
        const futureTime = new Date(now.getTime() + minutesToAdd * 60 * 1000);
        const hours = futureTime.getUTCHours().toString().padStart(2, '0');
        const minutes = futureTime.getUTCMinutes().toString().padStart(2, '0');
        document.getElementById('arrival-time').value = `${hours}:${minutes}:00`;
        calculateStartTime();
    }

    function updateTime() {
        const now = new Date();
        const offset = parseFloat(document.getElementById('offset').value);
        const adjustedTime = new Date(now.getTime() + offset * 1000);

        // UTC表示
        const utcHours = adjustedTime.getUTCHours().toString().padStart(2, '0');
        const utcMinutes = adjustedTime.getUTCMinutes().toString().padStart(2, '0');
        const utcSeconds = adjustedTime.getUTCSeconds().toString().padStart(2, '0');
        const utcMilliseconds = adjustedTime.getUTCMilliseconds().toString().padStart(3, '0');
        const utcTimeString = `${utcHours}:${utcMinutes}:${utcSeconds}.<span class="milliseconds">${utcMilliseconds.slice(0, 1)}</span>`;

        document.getElementById('time-after').innerHTML = utcTimeString;

        // JST表示
        const jstTime = new Date(adjustedTime.getTime() + JST_OFFSET);
        const jstHours = jstTime.getUTCHours().toString().padStart(2, '0');
        const jstMinutes = jstTime.getUTCMinutes().toString().padStart(2, '0');
        const jstSeconds = jstTime.getUTCSeconds().toString().padStart(2, '0');
        document.getElementById('time-after-jst').textContent = `（JST）${jstHours}:${jstMinutes}:${jstSeconds}`;
    }

    function updateArrivalTimeJST() {
        const arrivalTimeStr = document.getElementById('arrival-time').value;
        const [arrivalHour, arrivalMinute, arrivalSecond] = arrivalTimeStr.split(':').map(Number);

        let arrivalTime = new Date();
        arrivalTime.setUTCHours(arrivalHour);
        arrivalTime.setUTCMinutes(arrivalMinute);
        arrivalTime.setUTCSeconds(arrivalSecond);
        arrivalTime.setUTCMilliseconds(0);

        const jstTime = new Date(arrivalTime.getTime() + JST_OFFSET);
        const jstHours = jstTime.getUTCHours().toString().padStart(2, '0');
        const jstMinutes = jstTime.getUTCMinutes().toString().padStart(2, '0');
        const jstSeconds = jstTime.getUTCSeconds().toString().padStart(2, '0');
        document.getElementById('arrival-time-jst').textContent = `（JST）${jstHours}:${jstMinutes}:${jstSeconds}`;
    }

    function calculateStartTime() {
        const arrivalTimeStr = document.getElementById('arrival-time').value;
        const [arrivalHour, arrivalMinute, arrivalSecond] = arrivalTimeStr.split(':').map(Number);

        let arrivalTime = new Date();
        arrivalTime.setUTCHours(arrivalHour);
        arrivalTime.setUTCMinutes(arrivalMinute);
        arrivalTime.setUTCSeconds(arrivalSecond);
        arrivalTime.setUTCMilliseconds(0);

        const now = new Date();
        const nowUtcMillis = now.getTime();

        if (arrivalTime.getTime() < nowUtcMillis) {
            arrivalTime.setDate(arrivalTime.getDate() + 1);
        }

        for (let i = 1; i <= 3; i++) {
            const gatheringTime = parseInt(document.querySelector(`input[name="gathering-time-${i}"]:checked`).value);
            const marchTime = parseInt(document.getElementById(`march-time-${i}`).value);

            const gatheringTimeMillis = gatheringTime * 60 * 1000;
            const marchTimeMillis = marchTime * 1000;

            const startTimeMillis = arrivalTime.getTime() - gatheringTimeMillis - marchTimeMillis;
            const startTime = new Date(startTimeMillis);

            const startHour = startTime.getUTCHours().toString().padStart(2, '0');
            const startMinute = startTime.getUTCMinutes().toString().padStart(2, '0');
            const startSecond = startTime.getUTCSeconds().toString().padStart(2, '0');

            document.getElementById(`start-time-${i}`).textContent = `${startHour}:${startMinute}:${startSecond}`;
        }

        updateCountdown();
        updateArrivalTimeJST();
    }

    function updateCountdown() {
        const arrivalTimeStr = document.getElementById('arrival-time').value;
        const [arrivalHour, arrivalMinute, arrivalSecond] = arrivalTimeStr.split(':').map(Number);

        let arrivalTime = new Date();
        arrivalTime.setUTCHours(arrivalHour);
        arrivalTime.setUTCMinutes(arrivalMinute);
        arrivalTime.setUTCSeconds(arrivalSecond);
        arrivalTime.setUTCMilliseconds(0);

        const offset = parseFloat(document.getElementById('offset').value);
        const now = new Date(Date.now() + offset * 1000);

        for (let i = 1; i <= 3; i++) {
            const gatheringTime = parseInt(document.querySelector(`input[name="gathering-time-${i}"]:checked`).value);
            const marchTime = parseInt(document.getElementById(`march-time-${i}`).value);

            const gatheringTimeMillis = gatheringTime * 60 * 1000;
            const marchTimeMillis = marchTime * 1000;

            const startTimeMillis = arrivalTime.getTime() - gatheringTimeMillis - marchTimeMillis;
            const startTime = new Date(startTimeMillis);

            const diffMillis = startTime.getTime() - now.getTime();

            const countdownElement = document.getElementById(`countdown-${i}`);

            if (diffMillis < 0) {
                countdownElement.textContent = "Go!!";
                startGatheringCountdown(i);
                window[`countdownWentGo${i}`] = true;
                window[`gatheringCountdownActive${i}`] = true;
            } else {
                const diffSeconds = diffMillis / 1000;
                const hours = Math.floor(diffSeconds / 3600);
                const minutes = Math.floor((diffSeconds % 3600) / 60);
                const seconds = Math.floor(diffSeconds % 60);

                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${(seconds + 1).toString().padStart(2, '0')}`;
                const currentCountdownText = formattedTime;
                countdownElement.textContent = currentCountdownText;

                if (window[`countdownWentGo${i}`] && currentCountdownText !== "Go!!") {
                    resetGatheringCountdown(i);
                    window[`countdownWentGo${i}`] = false;
                    window[`gatheringCountdownActive${i}`] = false;
                }
            }

        }
    }

    function resetGatheringCountdown(index) {
        if (window[`gatheringCountdownInterval${index}`]) {
            clearInterval(window[`gatheringCountdownInterval${index}`]);
            window[`gatheringCountdownInterval${index}`] = null;
        }
        const gatheringCountdownElement = document.getElementById(`gathering-countdown-${index}`);
        if (gatheringCountdownElement) {
            gatheringCountdownElement.textContent = "";
        }
        window[`gatheringCountdownStarted${index}`] = false;
        window[`countdownWentGo${index}`] = false;
        resetMarchCountdown(index);
    }

    function resetMarchCountdown(index) {
        if (window[`marchCountdownInterval${index}`]) {
            clearInterval(window[`marchCountdownInterval${index}`]);
            window[`marchCountdownInterval${index}`] = null;
        }
        const marchCountdownElement = document.getElementById(`march-countdown-${index}`);
        if (marchCountdownElement) {
            marchCountdownElement.textContent = "";
        }
        window[`marchCountdownStarted${index}`] = false;
    }

    let gatheringCountdownInterval1, gatheringCountdownInterval2, gatheringCountdownInterval3;
    let gatheringCountdownStarted1 = false,
        gatheringCountdownStarted2 = false,
        gatheringCountdownStarted3 = false;
    let countdownWentGo1 = false,
        countdownWentGo2 = false,
        countdownWentGo3 = false;
    let marchCountdownInterval1, marchCountdownInterval2, marchCountdownInterval3;
    let marchCountdownStarted1 = false,
        marchCountdownStarted2 = false,
        marchCountdownStarted3 = false;
    let gatheringCountdownActive1 = false,
        gatheringCountdownActive2 = false,
        gatheringCountdownActive3 = false;

    function startGatheringCountdown(index) {
        // 集結時間と要素のindexに応じた処理
        const gatheringTime = parseInt(document.querySelector(`input[name="gathering-time-${index}"]:checked`).value);
        const gatheringCountdownElement = document.getElementById(`gathering-countdown-${index}`);
        let gatheringCountdownInterval = window[`gatheringCountdownInterval${index}`];
        let gatheringCountdownStarted = window[`gatheringCountdownStarted${index}`];
        let countdownWentGo = window[`countdownWentGo${index}`];

        if (gatheringCountdownStarted || countdownWentGo) return;

        if (!gatheringCountdownElement) return;

        if (gatheringTime === 0) {
            gatheringCountdownElement.textContent = "行軍開始！";
            startMarchCountdown(index);
            return;
        }

        let remainingSeconds = gatheringTime * 60 - 1;

        window[`gatheringCountdownStarted${index}`] = true;

        if (gatheringCountdownInterval) {
            clearInterval(gatheringCountdownInterval);
        }

        window[`gatheringCountdownInterval${index}`] = setInterval(() => {
            if (remainingSeconds > 0) {
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = remainingSeconds % 60;
                gatheringCountdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                remainingSeconds--;
            } else {
                clearInterval(window[`gatheringCountdownInterval${index}`]);
                window[`gatheringCountdownInterval${index}`] = null;
                window[`gatheringCountdownStarted${index}`] = false;

                setTimeout(() => {
                    gatheringCountdownElement.textContent = "行軍開始！";

                    clearInterval(window[`gatheringCountdownInterval${index}`]);
                    window[`gatheringCountdownInterval${index}`] = null;
                    window[`gatheringCountdownStarted${index}`] = false;
                    startMarchCountdown(index);
                }, 0);
            }
        }, 1000);
    }

    function startMarchCountdown(index) {
        // 行軍時間と要素のindexに応じた処理
        const marchCountdownElement = document.getElementById(`march-countdown-${index}`);
        const marchTime = parseInt(document.getElementById(`march-time-${index}`).value);
        let marchCountdownInterval = window[`marchCountdownInterval${index}`];
        let marchCountdownStarted = window[`marchCountdownStarted${index}`];
        let remainingSeconds = marchTime - 1;

        if (marchCountdownStarted) return;
        if (!marchCountdownElement) return;

        window[`marchCountdownStarted${index}`] = true;

        if (marchCountdownInterval) {
            clearInterval(marchCountdownInterval);
        }

        window[`marchCountdownInterval${index}`] = setInterval(() => {
            if (remainingSeconds > 0) {
                marchCountdownElement.textContent = `${remainingSeconds.toString().padStart(2, '0')}`;
                remainingSeconds--;
            } else if (remainingSeconds === 0) {
                clearInterval(window[`marchCountdownInterval${index}`]);
                marchCountdownElement.textContent = "到着！";
                window[`marchCountdownInterval${index}`] = null;
                window[`marchCountdownStarted${index}`] = false;

                clearInterval(window[`gatheringCountdownInterval${index}`]);
                window[`gatheringCountdownInterval${index}`] = null;
                window[`gatheringCountdownStarted${index}`] = false;
                document.getElementById(`gathering-countdown-${index}`).textContent = "";
            }
        }, 1000);
    }


    // 初期化とイベントリスナーの設定
    setArrivalTimeToMinutesLater(10);
    document.getElementById('arrival-time').addEventListener('change', function () {
        calculateStartTime();
        for (let i = 1; i <= 3; i++) {
            resetGatheringCountdown(i);
        }
    });

    document.getElementById('arrival-time').addEventListener('input', calculateStartTime);
    for (let i = 1; i <= 3; i++) {
        document.querySelector(`input[name="gathering-time-${i}"]`).addEventListener('change', calculateStartTime);
        document.getElementById(`march-time-${i}`).addEventListener('change', calculateStartTime);
    }

    calculateStartTime();
    updateTime();
    setInterval(updateCountdown, 100);
    setInterval(updateTime, 100);

    document.getElementById('offset').addEventListener('input', updateTime);
    document.getElementById('set-5959').addEventListener('click', function () {
        let currentTime = document.getElementById('arrival-time').value; // 現在の時刻を取得
        let currentHour = currentTime.slice(0, 2); // 時を取得
        document.getElementById('arrival-time').value = currentHour + ':59:59'; // 時を維持してMM:SSを59:59に設定
        calculateStartTime();
    });

    document.getElementById('set-now-plus-5').addEventListener('click', function () {
        setArrivalTimeToMinutesLater(5);
    });

    document.getElementById('set-now-plus-10').addEventListener('click', function () {
        setArrivalTimeToMinutesLater(10);
    });
    document.getElementById('set-plus-1').addEventListener('click', function () {
        adjustArrivalTime(1);
    });

    document.getElementById('set-minus-1').addEventListener('click', function () {
        adjustArrivalTime(-1);
    });

    function adjustArrivalTime(offsetMinutes) {
        let arrivalTimeStr = document.getElementById('arrival-time').value;
        let [hours, minutes, seconds] = arrivalTimeStr.split(':').map(Number);

        let arrivalTime = new Date();
        arrivalTime.setUTCHours(hours);
        arrivalTime.setUTCMinutes(minutes);
        arrivalTime.setUTCSeconds(seconds);
        arrivalTime.setUTCMilliseconds(0);

        arrivalTime.setMinutes(arrivalTime.getMinutes() + offsetMinutes); // 分を加減

        const updatedHours = arrivalTime.getUTCHours().toString().padStart(2, '0');
        const updatedMinutes = arrivalTime.getUTCMinutes().toString().padStart(2, '0');
        document.getElementById('arrival-time').value = `${updatedHours}:${updatedMinutes}:00`;
        calculateStartTime();
    }


    function adjustMarchTime(inputId, offsetSeconds) {
        let marchTime = parseInt(document.getElementById(inputId).value);
        marchTime += offsetSeconds;

        // 行軍時間の最小値、最大値を設定 (例: 1秒～300秒)
        marchTime = Math.max(1, Math.min(300, marchTime));

        document.getElementById(inputId).value = marchTime;
        calculateStartTime();
    }

    document.getElementById('offset-plus-01').addEventListener('click', function () {
        adjustOffset(0.1);
    });

    document.getElementById('offset-minus-01').addEventListener('click', function () {
        adjustOffset(-0.1);
    });

    function adjustOffset(offsetSeconds) {
        let offset = parseFloat(document.getElementById('offset').value);
        offset += offsetSeconds;
        document.getElementById('offset').value = offset.toFixed(1); // 小数点1桁で表示
        updateTime();
    }

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`march-plus-1-${i}`).addEventListener('click', function () {
            adjustMarchTime(`march-time-${i}`, 1);
        });

        document.getElementById(`march-minus-1-${i}`).addEventListener('click', function () {
            adjustMarchTime(`march-time-${i}`, -1);
        });
    }

});