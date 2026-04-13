let toasts = [];

let dictionary = {
    age: 'Idade (Anos)',
    sex: 'Gênero biológico',
    chestPainType: 'Tipo de dor no peito',
    restingBP: 'Pressão arterial em repouso (mm Hg)',
    fastingBS: 'Glicemia de jejum acima de 120 mg/dl?',
    restingECG: 'Eletrocardiograma de repouso',
    maxHR: 'Frequência cardíaca máxima alcançada',
    exerciseAngina: 'Angina de esforço',
    oldpeak: 'Depressão do segmento ST',
    stSlope: 'Inclinação do segmento ST'
}

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
    /* Considera que estará validado, se encontrar algum erro vai ficar false */
    validated = true;

    /* Transforma dados do objeto form em array para iterar */
    keys = Object.entries(form);

    console.log('validando dados...');

    for (var i = 0; i < keys.length; i++){
        /* Define a propriedade a ser verificada */
        property = keys[i][0];

        /* Se a propriedade estiver vazia */
        if (!form[property]) {

        validated = false;

        /* Mostra toast */
        showToast('error', `Erro - O campo "${dictionary[property]}" precisa estar preenchido`);
        console.log(`Erro - O campo "${dictionary[property]}" precisa estar preenchido`);

        /* Limpa o conteúdo do resultado */
        reloadOutcome();

        break;
        }
    }

    return validated;
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
                showToast('error', `Erro no processamento dos dados`);
                console.log('Erro no processamento dos dados');
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

    /* Define div que será inserido o outcome */
    let outcomeDiv = document.getElementById("outcome");

    if (outcome == 1) {
        /* Adiciona texto no div */
        outcomeDiv.innerHTML = '<strong>Possui</strong> doença cardíaca';
    } else {
        /* Adiciona texto no div */
        outcomeDiv.innerHTML = '<strong>Não possui</strong> doença cardíaca';
    }
    
}

const reloadOutcome = () => {
    /* Define div que será inserido o outcome */
    let outcomeDiv = document.getElementById("outcome");

    outcomeDiv.textContent = 'Clique em avaliar para gerar um resultado';
}

