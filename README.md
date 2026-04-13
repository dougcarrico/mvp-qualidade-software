# MVP - Qualidade de Software, Segurança e Sistemas Inteligentes

Este é  projeto de MVP para a Sprint de "Qualidade de Software, Segurança e Sistemas Inteligentes" da pós graduação em Engenharia de Software da PUC-Rio.

O projeto é uma aplicação que faz a classificação de um paciente em "Possui doença cardíaca" ou "Não possui doença cardiaca" baseado nos dados fornecidos do paciente.

Este repositório contém tanto o front-end quanto o back-end, que utiliza um modelo de machine learning embarcado.

A documentação com os estudos e passo a passo da criação do modelo de machine learning está em: https://github.com/dougcarrico/mvp-qualidade-software/blob/main/Collab_Modelo_MVP.ipynb

## Rodando o Back-end

Clonar ou baixar o repositório em sua máquina.

**OBS:** Recomendado criar um ambiente virtual do tipo [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) com a versão 3.13.7 do python. Caso tenha problemas com execução de scripts Windows para a criação do ambiente virtual, ver sobre [Execution Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5)

Acessar o diretório pai do diretório raiz do projeto. Executar o comando abaixo para criar o ambiente virtual.
```
python3.13 -m venv env
```

Utilizar o comando abaixo para ativar o ambiente virtual.
```
.\env\Scripts\Activate
```

Acessar o diretório "back" pelo terminal.

Utilizar o comando abaixo para instalar as libs Python descritas no arquivo 'requirements.txt'.
```
pip install -r requirements.txt
```

Utilizar o comando abaixo para Executar a API.
```
flask run --host 0.0.0.0 --port 5000
```

Em modo desenvolvimento, é recomendado executar o parâmetro "reload", que irá reiniciar o servidor automaticamente após cada alteração no código. Como no exemplo abaixo.
```
flask run --host 0.0.0.0 --port 5000 --reload
```

Abrir a URL abaixo no navegador.
```
http://127.0.0.1:5000/
```

## Rodando o Front-end

Clonar ou baixar o repositório em sua máquina.
Acessar o diretório "front" e clicar duas vezes no arquivo index.html.