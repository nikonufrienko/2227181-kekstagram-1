function hasErrors(){
  const element = document.querySelector('.error_element_auto_checker');
  return element === null;
}

function removeAllErrors() {
  const elements = document.querySelectorAll('.error_element_auto_checker');
  elements.forEach((it) => it.remove());
}

class AutoChecker {
  constructor(inputElement, elementForBlocking, form) {
    this.elementForBlocking = null;
    if(elementForBlocking) {
      this.elementForBlocking = elementForBlocking;
    }
    this.eventQueue = [];
    this.inputElement = inputElement;
    this.inputElement.addEventListener(
      'input', () => {
        for (const event of this.eventQueue) {
          event();
        }
      }
    );
    this.form = null;
    if(form) {
      this.form = form;
      form.addEventListener('reset', removeAllErrors);
    }
  }

  errorIsShowed(error) {
    const element = this.inputElement.parentElement.querySelector('.error_element_auto_checker');
    return element !== null && element.textContent === error;
  }

  hideError() {
    const element = this.inputElement.parentElement.querySelector('.error_element_auto_checker');
    if (element) {
      if(!hasErrors() && this.elementForBlocking !== null && this.elementForBlocking.hasAttribute('disabled')) {
        this.elementForBlocking.toggleAttribute('disabled');
      }
      element.remove();
    }
  }

  showError(error) {
    if (this.errorIsShowed(error)) {
      this.hideError();
    }
    if(this.elementForBlocking !== null && !this.elementForBlocking.hasAttribute('disabled')) {
      this.elementForBlocking.toggleAttribute('disabled');
    }
    const element = document.createElement('p');
    // бот удалил коммитом мои стили CSS ----
    element.style.color = '#fc008c';
    element.style.height = '10px';
    element.style.lineHeight = '10px';
    element.style.fontWeight = 'bold';
    //-----
    element.classList.add('error_element_auto_checker');
    element.textContent = error;
    this.inputElement.parentElement.appendChild(element);
  }

  setAutoChecking(checkFuncion, error) {
    this.eventQueue.push(() => {
      if (!checkFuncion(this.inputElement)) {
        this.showError(error);
      } else {
        if (this.errorIsShowed(error)) {
          this.hideError();
        }
      }
    });
  }
}

export { AutoChecker };
