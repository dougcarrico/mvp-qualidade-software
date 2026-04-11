from sklearn.metrics import accuracy_score
from model.predictor import Predictor

class Evaluator:
    
    def __init__(self):
        """Inicializa o avaliador"""
        pass

    def evaluate(self, model: Predictor, rescaled_X_test: any, y_test: any):
        """ Faz uma predição e avalia o modelo. Deve fornecer um rescaled_x_test  e um y_test referente
        """
        # Avalia o modelo
        score = model.score(rescaled_X_test, y_test)
        
        return score
                
