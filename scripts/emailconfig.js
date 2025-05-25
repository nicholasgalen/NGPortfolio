(function() {
  emailjs.init(CONFIG.EMAILJS_CONFIG.USER_ID);

  const contactBox = document.querySelector('.contact-box');
  const btnSend = contactBox.querySelector('button');
  const inputs = contactBox.querySelectorAll('input');

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  btnSend.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const [nameInput, emailInput, messageInput] = inputs;
    const templateParams = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };

    if (!templateParams.name || !templateParams.email || !templateParams.message) {
      return showAlert('Fill all please!', 'error');
    }

    if (!isValidEmail(templateParams.email)) {
      return showAlert('Invalid e-mail!', 'error');
    }

    btnSend.innerHTML = 'Sending... <i class="bx bx-loader bx-spin"></i>';
    btnSend.disabled = true;

    try {
        await emailjs.send(
        CONFIG.EMAILJS_CONFIG.SERVICE_ID,
        CONFIG.EMAILJS_CONFIG.TEMPLATE_ID,
        {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
            to_email: 'galennicholas@proton.me'
        }
    );
      
      showAlert('Message sent! 🚀', 'success');
      inputs.forEach(input => input.value = '');
    } catch (error) {
      showAlert(`Erro: ${error.text} ❌`, 'error');
    } finally {
      btnSend.innerHTML = 'Send Message <i class="bx bx-mail-send"></i>';
      btnSend.disabled = false;
    }
  });

  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 8px;
      color: white;
      background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slideOut {
      from { transform: translateX(0); }
      to { transform: translateX(100%); }
    }
  `;
  document.head.appendChild(style);
})();