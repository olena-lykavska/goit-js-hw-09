const formData = {
  email: "",
  message: "",
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  saveToLocalStorage();
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";


    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}

function handleSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted formData:', formData);

  formData.email = "";
  formData.message = "";
  localStorage.removeItem(STORAGE_KEY);

  form.reset();
}

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

loadFromLocalStorage();

