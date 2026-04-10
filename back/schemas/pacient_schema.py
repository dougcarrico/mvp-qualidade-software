from pydantic import BaseModel

class PacientSchema(BaseModel):
    """
    Define como um paciente a ser avaliado deve ser representado
    """
    age: int = 30
    sex: int = 0
    chestPainType: int = 0
    restingBP: int = 120
    cholesterol: int = 220
    fastingBS: int = 0
    restingECG: int = 0
    maxHR: int = 130
    exerciseAngina: int = 0
    oldpeak: float = 0.0
    stSlope: int = 0

class OutcomeViewSchema(BaseModel):
    """
    Define como um resultado será retornado
    """
    outcome: int = 0

    
