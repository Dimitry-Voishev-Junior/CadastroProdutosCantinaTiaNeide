const scriptURL = 'https://script.google.com/macros/s/AKfycbzcVyVgj-IQwvoBxmA3qt06X8pTdRKD1M-VpyZzmLm8nTjnQjtoOLX1KcqmzIojkWip/exec';
const form = document.forms['cadastrar-produto'];
const feedbackDiv = document.getElementById('feedback');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(result => {
            if (result.result === 'success') {
                showFeedback("Produto cadastrado com sucesso!", 'success');
                form.reset();
            } else {
                showFeedback(`Erro: ${result.error}`, 'error');
            }
        })
        .catch(error => {
            showFeedback('Erro ao cadastrar produto: ' + error.message, 'error');
            console.error('Error!', error.message);
        });
});

function showFeedback(message, type) {
    feedbackDiv.innerText = message;
    feedbackDiv.className = type;
    feedbackDiv.style.display = 'flex';

    setTimeout(() => {
        feedbackDiv.style.display = 'none';
    }, 5000);
}