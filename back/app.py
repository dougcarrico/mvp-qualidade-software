from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect
from flask_cors import CORS
from urllib.parse import unquote

from model.evaluator import Evaluator
from model.pacient import Pacient
from model.predictor import Predictor
from model.preprocessor import PreProcessor
from schemas.pacient_schema import PacientSchema, OutcomeViewSchema
from schemas.error_schema import ErrorSchema


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

    try:
        #preparando os dados para o modelo
        preprocessor = PreProcessor()
        x = preprocessor.prepare_form(form)
        rescaled_x = preprocessor.scaler(x)

        #Carrega o modelo
        predictor = Predictor()
        predictor.load_model()

        #Faz a predição
        prediction = predictor.predict(rescaled_x)

        #converte o dado de array para inteiro para retornar ao front
        outcome = int(prediction[0])

    except Exception as e:
        error_msg = f'Erro - {e}'
        return {"message": error_msg}, 400
    
    return {'outcome': outcome}, 200

if __name__ == "__main__":
    app.run(debug=True)
