const question = document.querySelectorAll('.question');

question.forEach(function(question){
    question.addEventListener('click', function(){
        question.classList.toggle('open')
    })
})