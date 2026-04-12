class Pacient():
    
    def __init__(self, 
                 age: int,
                 sex: int,
                 chestPainType: int,
                 restingBP: int,
                 fastingBS: int,
                 restingECG: int,
                 maxHR: int,
                 exerciseAngina: int,
                 oldpeak: float,
                 stSlope: int):
        """
        Cria um Paciente

        Arguments:
            age: Idade (Anos)
            sex: Gênero biológico
            chestPainType: Tipo de dor no peito
            restingBP: Pressão arterial em repouso (mm Hg)
            cholesterol: Colesterol (mm/dl)
            fastingBS: Glicemia de jejum acima de 120 mg/dl?
            restingECG: Eletrocardiograma de repouso
            maxHR: Frequência cardíaca máxima alcançada
            exerciseAngina: Angina de esforço
            oldpeak: Depressão do segmento ST induzida por esforço em relação ao repouso
            stSlope: Inclinação do segmento ST no pico do esforço
        """
        self.age = age
        self.sex = sex
        self.chestPainType = chestPainType
        self.restingBP = restingBP
        self.fastingBS = fastingBS
        self.restingECG = restingECG
        self.maxHR = maxHR
        self.exerciseAngina = exerciseAngina
        self.oldpeak = oldpeak
        self.stSlope = stSlope