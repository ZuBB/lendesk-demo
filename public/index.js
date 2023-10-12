(() => {
  let screenContainers, registerForm, loginForm;
  let toastWidgetOk, toastWidgetBad, toastBodyOk, toastBodyBad;

  const showRequiredContainer = (selector) => {
    screenContainers.forEach(container => {
      container.classList.add('d-none');

      if (container.classList.contains(selector)) {
        container.classList.remove('d-none');
      }
    });
  }

  const showApp = (data) => {
    const h1 = document.querySelector('#app-h1');

    showRequiredContainer('app');

    if (h1) {
      h1.innerText = `¡Hola ${data.username}!`;
    }
  };

  const showLoginForm = () => {
    loginForm.reset();
    showRequiredContainer('login');
  };

  const showRegisterForm = () => {
    registerForm.reset();
    showRequiredContainer('register');
  };

  const showOkToast = (message) => {
    toastBodyOk.innerText = message;
    toastWidgetOk.show();
  };

  const showBadToast = (message) => {
    toastBodyBad.innerText = message;
    toastWidgetBad.show();
  };

  const getFetchOptions = (formEl) => {
    const data = {};
    const formData = new FormData(formEl);

    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    return {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  const loginHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/login', getFetchOptions(loginForm));
      const data = await response.json();

      if (response.ok) {
        showApp(data);
      } else {
        showBadToast(data.errorMessage);
      }
    } catch (error) {
      showBadToast(error.message);
    }
  }

  const registerHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/register', getFetchOptions(registerForm));
      const data = await response.json();

      if (response.ok) {
        showOkToast(data.statusMessage);
        showLoginForm();
      } else {
        showBadToast(data.errorMessage);
      }
    } catch (error) {
      showBadToast(error.message);
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch('/logout', { method: 'DELETE' });
      const data = await response.json();

      if (response.ok) {
        showOkToast(data.statusMessage);
        showLoginForm();
      } else {
        main();
      }
    } catch (error) {
      main();
    }
  };

  const attachListeners = () => {
    registerForm = document.querySelector('.register form');
    loginForm = document.querySelector('.login form');
    const showRegisterContainerButton = loginForm.querySelector('[type="button"]');
    const showLoginContainerButton = registerForm.querySelector('[type="button"]');
    const logoutButton = document.querySelector('.app [type="button"]');

    registerForm.addEventListener('submit', registerHandler);
    loginForm.addEventListener('submit', loginHandler);
    showRegisterContainerButton.addEventListener('click', showRegisterForm);
    showLoginContainerButton.addEventListener('click', showLoginForm);
    logoutButton.addEventListener('click', logoutHandler);
  };

  const createToastWidgets = () => {
    const toastEl1 = document.querySelector('.toast-ok');
    toastBodyOk = toastEl1.querySelector('.toast-body');
    const toastEl2 = document.querySelector('.toast-bad');
    toastBodyBad = toastEl2.querySelector('.toast-body');

    toastWidgetOk = new bootstrap.Toast(toastEl1);
    toastWidgetBad = new bootstrap.Toast(toastEl2);
  }

  const main = async () => {
    try {
      const response = await fetch('/protected');
      const data = await response.json();

      if (response.ok) {
        showApp(data);
      } else {
        showLoginForm();
      }
    } catch (error) {
      showBadToast(error.message);
    }
  };

  window.addEventListener('load', () => {
    screenContainers = Array.from(document.querySelectorAll('.root > div'));

    attachListeners();
    createToastWidgets();
    main();
  });
})();