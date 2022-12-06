function hasErrors(){
  const element = document.querySelector('.error_element_auto_checker');
  return element === null;
}


class AutoChecker {
  constructor(inputElement, elementForBlocking) {
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
    const element = document.createElement('div');
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
