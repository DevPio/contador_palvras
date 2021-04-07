$(function(){
    const frase = $('.frase');
    const firtLi = $('#tamanho-frase');
    const inputPalavras = $("#contPalvras");
    const resultadoFinal = $("#feedback");
    const seconds = $('#seconds');
    const buttonRestart = $("#restart");
    const bodyTable = $('#sectionTable').find('tbody');
    let nameUser = 'Luccas';
    let max = 10;
    let min = 30;
    let timer = (Math.floor(Math.random() * (max - min) + 1) + min)
    let countTimer = timer;
    let countInit = false;
    let timerCount;
    seconds.text(timer);
    
    firtLi.text(frase.text().split(' ').length) 
    
    function gameOver(){
        if(inputPalavras.val().length < frase.text().length){
            alert('Voce perdeu')
        }else{
            alert('Parabens voce ganhou')
        }
    }
    function removeElement(){
        console.log(this)
    }
    function addPLacar(){
        let placarCount = inputPalavras.val().split(' ').length;

        let element = newLine({
            nameUser,
            placarCount
        })

        element.click(function(){
            let currentElement = $(this);

            currentElement.remove()
        })
       
        bodyTable.append(element)
       
        $('.btn-remove').click(function(){
           $(this).parent().remove();
        })

    }

    function newLine({nameUser,placarCount}){
        // let btRemove = '<td class="btn-remove"><i  class="material-icons c">delete</i></tr>'

        let line = $('<tr>');
        let tdName = $('<td>');
        let tdPlacar = $('<td>');
        let btRemove = $('<td>');
        let iconButton = $('<i>');
        iconButton.text('delete')
        iconButton.addClass('material-icons c')

        tdName.text(nameUser);
        tdPlacar.text(placarCount);
        line.append(tdName);
        line.append(tdPlacar);
        line.append(btRemove);
        btRemove.append(iconButton);
        line.append(btRemove)


        // let totaLine = placar.map(({nameUser,placarCount})=> 
        //     '<tr>' + 
        //     '<td>' + nameUser + '</td>' +
        //     '<td>' + placarCount + '</td>' +
        //     btRemove+ 
        //     '</tr>'
            
        //     ).join()  


        return line;
    }
    function countWord(){
         timerCount = setInterval(function(){
    
            let textMoment = seconds;
    
            let decremento = Number(textMoment.text()) 
            
            if(countTimer <= 0){
                clearInterval(timerCount);
                finallyGame();
                
                return;
                
            }
            
            decremento--;
            textMoment.text(decremento);
            countTimer--;
        },1000)
        countInit = true;
    }
    function validate(){
        if(!countInit){
            countWord();
        }
    }
    function finallyGame(){
        resultadoFinal.text((inputPalavras.val().split(/\S+/).length - 1))
        countInit = false;
        inputPalavras.attr('disabled',true)
        inputPalavras.addClass('changeIntColor')
        gameOver()
        addPLacar()
    }

    function restartGame(){
        timer = (Math.floor(Math.random() * (max - min) + 1) + min);
        inputPalavras.val('')
        countTimer = timer;
        countInit = false;
        inputPalavras.removeClass('changeIntColor')
        clearInterval(timerCount)
        seconds.text(timer);
       
        inputPalavras.removeClass('error')
        inputPalavras.removeClass('writeField')
        inputPalavras.attr('disabled',false);
    }
    function validateInput(){
        console.log(frase.text().includes(inputPalavras.val()))
        if(frase.text().includes(inputPalavras.val())){
            inputPalavras.removeClass('error')
            inputPalavras.addClass('writeField') 
        }else{
            inputPalavras.removeClass('writeField') 
            inputPalavras.addClass('error')
        }
       
         
        
    }
    
    function updateDom(){
        let $input = this;
        let value = (inputPalavras.val().split(/\S+/).length - 1)
        resultadoFinal.text( value > 1 ? value + ' palavras' : value + ' palavra')
        validateInput()
        $("#countCaracterMoment").text($input.value.length > 1  ?  $input.value.length + ' caracteres' : $input.value.length + ' caracter');
    }
    
    inputPalavras.on('focus',validate)
    buttonRestart.click(restartGame);
    inputPalavras.on('input',updateDom)


    function initGame(){
        resultadoFinal.text("0 palavras")
        $("#countCaracterMoment").text("0 caracteres");
    }

    initGame()
})

