const url = 'https://api.adviceslip.com/advice';
const adviceText = document.querySelector('.advice-box p');
const adviceID = document.querySelector('.advice-box h5');
const btn = document.querySelector('.btn');

generateRandomAdvice(url)

setInterval(()=>{
    generateRandomAdvice(url)
}, 5000)

function generateRandomAdvice(url){
    fetch(url)
        .then(res => res.json())
        .then(quotes => {
            adviceID.innerHTML = `ADVICE #${quotes.slip.id}`;
            adviceText.innerHTML = `"${quotes.slip.advice}"`;
        })
}

btn.addEventListener('click', function(){
    generateRandomAdvice(url);
})