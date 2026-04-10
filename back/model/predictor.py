import pickle

class Predictor:
    
    def __init__(self):
        """Inicializa o modelo"""
        self.model = None
    
    def load_model(self, path):
        """Dependendo se o final for .pkl ou .joblib, carregamos de uma forma ou de outra
        """
        self.model = pickle.load(open(path, 'rb'))

        return self.model
    
    def preditor(self, X_input):
        """Realiza a predição de um paciente com base no modelo treinado
        """
        if self.model is None:
            raise Exception('Modelo não foi carregado. Use load_model() primeiro.')
        diagnosis = self.model.predict(X_input)
        return diagnosis