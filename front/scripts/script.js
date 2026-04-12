let toasts = [];

let form = {
age: 1,
sex: 0,
chestPainType: 0,
restingBP: 0,
fastingBS: 0,
restingECG: 0,
maxHR: 0,
exerciseAngina: 0,
oldpeak: 0.0,
stSlope: 0
};

/*
-------------------------------------------------------------------- 
Pega dados do formulário
--------------------------------------------------------------------
*/
const getForm = () => {
    form.age = document.getElementById('age-input').value;
    form.sex = document.getElementById('sex-input').value;
    form.chestPainType = document.getElementById('chestPainType-input').value;
    form.restingBP = document.getElementById('restingBP-input').value;
    form.fastingBS = document.getElementById('fastingBS-input').value;
    form.restingECG = document.getElementById('restingECG-input').value;
    form.maxHR = document.getElementById('maxHR-input').value;
    form.exerciseAngina = document.getElementById('exerciseAngina-input').value;
    form.oldpeak = document.getElementById('oldpeak-input').value;
    form.stSlope = document.getElementById('stSlope-input').value
}

/*
-------------------------------------------------------------------- 
(TODO) Corrigir depois, é só uma validação de exemplo, só está verificando se idade está preenchida
--------------------------------------------------------------------
*/
const validateForm = () => {
    console.log('validando dados...');
    if (!form.age) {
        return false;
    } else {
        return true;
    }
}

const createFormData = () => {
    console.log('criando formulário de envio...')
    const formData = new FormData();

    for ( let data in form) {
        formData.append(data, form[data]);
    }
    return formData
}

const postForm = (formData) => {
    
    let url = 'http://127.0.0.1:5000/avaliation';

    let responseData;
    let responseStatus;
    let responseOk;

    fetch(url, {
        method: 'post',
        body: formData
    })
       .then((response) => {
        responseData = response.json();
        responseStatus = response.status;
        responseOk = response.ok;

        return responseData;
    })
        .then((data) => {
            if (responseOk) {
                showToast('success', `Dados recebidos`);
                showOutcome(data.outcome);
            }
            else {
                showToast('error', `Erro ao enviar formulário`);
                console.log('Erro ao enviar formulário');
            }    
        })
        .catch((error) => {
            console.error('Error:', error);});

    

}

const sendForm = () => {
    
    const formData = createFormData();
    
    console.log('enviando formulário...');
    postForm(formData);

}



/*
-------------------------------------------------------------------- 
Processamento dos dados para enviar para o backend
--------------------------------------------------------------------
*/
const analise = () => {
    getForm();
    
    if (validateForm()) {
        sendForm();
    } else {
        showToast('error', 'Erro de validação');
        console.log('erro de validação');
    }
}


/*
-------------------------------------------------------------------- 
Função para exibir toast
--------------------------------------------------------------------
*/
const showToast = (status, message, timeout = 5000) => {

    /* Adiciona o toast na lista de toasts ativos */
    let toastID = toasts.length;
    toasts.push({toastID, message});

    /* Define atributos do toast e seu conteúdo */
    let toastDiv = document.createElement('div');
    toastDiv.id = `toast${toastID}`;
    toastDiv.className = `toast-${status}`;
    let toastContent = `<span>${message}</span>`;

    /* Adiciona toast no local con os atributos e conteúdo definidos */
    parent = document.getElementById("toast-wrapper");
    parent.appendChild(toastDiv);
    toastDiv.innerHTML = toastContent;

    setTimeout(closeToast, timeout, toastID);
    
}

/*
-------------------------------------------------------------------- 
Função para fechar toast
--------------------------------------------------------------------
*/
const closeToast = (toastID) => {
    /* Seleciona o toast*/
    toast = document.getElementById(`toast${toastID}`);

    /* Remove o toast se ele existir*/
    if (toast) {
        toast.remove();
    }

}

/*
-------------------------------------------------------------------- 
Função para exibir resultado
--------------------------------------------------------------------
*/
const showOutcome = (outcome) => {

    /* Define atributos do toast e seu conteúdo */
    let outcomeDiv = document.getElementById("outcome");

    /* Adiciona classe sucesso no div */
    outcomeDiv.classList.add('success');
    
    if (outcome == 1) {
        outcomeDiv.textContent = 'Possui doença cardíaca';
    } else {
        outcomeDiv.textContent = 'Não possui doença cardíaca';
    }


    
}