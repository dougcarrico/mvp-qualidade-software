from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from urllib.parse import unquote

from model import *
from schemas import *
from flask_cors import CORS

info = Info(title="API - Predição de Insuficiência Cardiaca", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# Definindo tags
home_tag = Tag(name="Documentação", description="Seleção de documentação: Swagger, Redoc ou RapiDoc")
avaliation_tag = Tag(name="Avaliação", description="Avaliação de dados de paciente para predição")

@app.get('/', tags=[home_tag])
def home():
    """
    Redireciona para /openapi, tela que permite a escolha do estilo de documentação.
    """
    return redirect('/openapi')

# Rota de predição com valores de paciente

@app.post(
    "/avaliation",
    tags=[avaliation_tag],
    responses={
       "200": OutcomeViewSchema,
       "400": ErrorSchema,
    },
) 
def predict(form: PacientSchema):

    #dados do formulario
    age = form.age
    sex = form.sex
    chestPainType = form.chestPainType
    restingBP = form.restingBP
    cholesterol = form.cholesterol
    fastingBS = form.fastingBS
    restingECG = form.restingECG
    maxHR = form.maxHR
    exerciseAngina = form.exerciseAngina
    oldpeak = form.oldpeak
    stSlope = form.stSlope

    try:

        if (age > 30):
            outcome = 1
        else:
            outcome = 0

    except Exception as e:
        error_msg = "Não foi possível salvar novo item :/"
        return {"message": error_msg}, 400
    
    return {'outcome': outcome}, 200

if __name__ == "__main__":
    app.run(debug=True)
