import pickle

class Predictor:
    
    def __init__(self):
        """Inicializa o modelo"""
        self.model = pickle.load(open('./data/model.pkl', 'rb'))
    
    def predict(self, X_input):
        """Realiza a predição de um paciente com base no modelo treinado
        """
        diagnosis = self.model.predict(X_input)

        return diagnosis
    
    def score(self, x, y):
        score = self.model.score(x, y)
        
        return score