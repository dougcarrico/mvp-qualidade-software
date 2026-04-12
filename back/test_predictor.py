import pytest
from model import *
import numpy as np

# To run: pytest -v test_modelos.py

def test_score_modelo():
   
    # Carrega modelo
    model = Predictor()

    # Carrega scaler
    scaler = PreProcessor()
    
    # Carrega datasets de teste
    X_test = np.loadtxt("./data/X_test.csv", delimiter=',')
    y_test = np.loadtxt("./data/y_test.csv", delimiter=',')

    # Aplica o scaler nos dados de teste
    Rescaled_X_test = scaler.scaler(X_test)

    # Inicia avaliador
    evaluator = Evaluator()
    score = evaluator.evaluate(model, Rescaled_X_test, y_test)

    assert score >= 0.87


