let btnStopBool = false; // Для остановки интервала обновлений
let qtysec = false; // Количество секунд для интервала

window.addEventListener("load", () => {
  // Получаю кнопки с data
  let item_btn = document.querySelectorAll(".e-window__item");

  // Навешиваю обработчики событий на каждый
  for (const item of item_btn) {
    item.addEventListener("click", setEventTimeInterval);
  }

  // Вешаю обработчик событий на Остановить
  let e_window__stop = document.querySelector(".e-window__stop");
  e_window__stop.addEventListener("click", stopRefresh);
});

function setEventTimeInterval(e) {
  setClassDOMElement();
  e.target.classList.add("active");
  qtysec = e.target.dataset.time;
  sendMessageInContentJS(qtysec, btnStopBool);
  setTimeout(() => {
    window.close();
  }, 500);
}

// Отправляю сообщение в content.js - Остановить
function stopRefresh() {
  btnStopBool = true;
  sendMessageInContentJS(qtysec, btnStopBool);
  setTimeout(() => {
    window.close();
  }, 500);
}

// Убираем цвет active с кнопок
function setClassDOMElement() {
  let item_btn = document.querySelectorAll(".e-window__item");
  for (const item of item_btn) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
}

// Отправляю сообщение в content.js
function sendMessageInContentJS(action_val, btnstop_val) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: action_val,
      btnstop: btnstop_val,
    });
  });
}
