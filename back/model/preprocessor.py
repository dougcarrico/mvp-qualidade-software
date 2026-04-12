import pickle
import numpy as np

class  PreProcessor:

    def __init__(self):
        """Inicializa o preprocessador"""
        pass

    def prepare_form(self, form):
        """ Prepara os dados recebidos do front para serem, usados no modelo"""

        X_input = np.array([
            form.age,
            form.sex,
            form.chestPainType,
            form.restingBP,
            form.fastingBS,
            form.restingECG,
            form.maxHR,
            form.exerciseAngina,
            form.oldpeak,
            form.stSlope])
        # Faremos o reshape para não dar erro pois só temos um sample
        X_input = X_input.reshape(1, -1)

        return X_input
    
    def scaler(self, x):
        """ Normaliza os dados. """

        scaler = pickle.load(open('./data/scaler.pkl', 'rb'))
        rescaled_x = scaler.transform(x)
        return rescaled_x