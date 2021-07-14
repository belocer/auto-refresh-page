let idSetTimeout;

// Обновление страницы
function reloadWindow() {
  window.location.reload();
}

// Получаем сообщение из popup.js
chrome.runtime.onMessage.addListener(function (req, sender, response) {
  if (req.action > 0) {
    idSetTimeout = setTimeout(() => {
      reloadWindow();
    }, req.action * 1000);

    console.log(idSetTimeout);
    setTimeInterval("aprkey", req.action);
  }

  // Останавливаем циклическое обновление, очищая LocalStorage
  if (req.btnstop) {
    removeStorage("aprkey");
  }
});

getTimeInterval();

// После загрузки страницы, проверяем наличие записи в LocalStorage
function getTimeInterval() {
  let dataInterval = localStorage.getItem("aprkey");
  if (dataInterval > 0) {
    setTimeout(() => reloadWindow(), dataInterval * 1000);
  }
}

// Записываем в LocalStorage
function setTimeInterval(key, value) {
  localStorage.setItem(key, value);
}

// Очищаем LocalStorage
function removeStorage(key) {
  clearTimeout(idSetTimeout);
  localStorage.removeItem(key);
  reloadWindow();
}
