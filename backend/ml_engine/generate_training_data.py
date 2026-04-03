import pandas as pd
import numpy as np
import random
import os

def generate_training_data(num_samples=10000):
    np.random.seed(42)
    random.seed(42)
    
    data = []
    
    chief_complaints = ['chest pain', 'head injury', 'trauma', 'burns', 'shortness of breath', 'abdominal pain']
    genders = ['male', 'female']
    mechanisms = ['fall', 'motor vehicle accident', 'assault', 'burns', 'medical', 'unknown']
    
    for _ in range(num_samples):
        age = np.random.randint(18, 90)
        sex = random.choice(genders)
        chief_complaint = random.choice(chief_complaints)
        mechanism = random.choice(mechanisms)
        
        # Base vitals with realistic noise
        hr = int(np.random.normal(85, 20))
        sys_bp = int(np.random.normal(120, 20))
        dia_bp = int(sys_bp * 0.6 + np.random.normal(0, 5))
        spo2 = round(np.random.normal(96, 3), 1)
        rr = int(np.random.normal(16, 4))
        temp = round(np.random.normal(37.0, 0.5), 1)
        gcs = np.random.randint(3, 16)
        
        # Target variables
        needs_icu = 0
        needs_ventilator = 0
        specialist_required = 'none'
        
        # Apply clinical logic rules to override vitals based on complaints & formulate targets
        
        if chief_complaint == 'head injury':
            mechanism = 'fall' if random.random() > 0.5 else 'motor vehicle accident'
            if random.random() > 0.6:
                gcs = np.random.randint(3, 12)
            if gcs < 12:
                specialist_required = 'neurosurgeon'
                needs_icu = 1
            if gcs < 9:
                needs_ventilator = 1
                
        elif chief_complaint == 'chest pain':
            mechanism = 'medical'
            if sex == 'male' and age > 50 and random.random() > 0.3:
                specialist_required = 'cardiologist'
                hr = int(np.random.normal(110, 20))
            if random.random() > 0.8:
                sys_bp = int(np.random.normal(80, 10))
                needs_icu = 1
                specialist_required = 'cardiologist'
                
        elif chief_complaint == 'trauma':
            if random.random() > 0.5:
                sys_bp = int(np.random.normal(85, 15))
            if sys_bp < 90:
                specialist_required = 'trauma_surgeon'
                needs_icu = 1
                hr = int(np.random.normal(130, 15))
                
        elif chief_complaint == 'burns':
            mechanism = 'burns'
            specialist_required = 'burn_specialist'
            if random.random() > 0.7:
                needs_icu = 1
                
        elif chief_complaint == 'shortness of breath':
            mechanism = 'medical'
            spo2 = round(np.random.normal(88, 5), 1)
            rr = int(np.random.normal(28, 5))
            if spo2 < 90:
                needs_ventilator = 1
                needs_icu = 1
                
        # Universal overrides based on extreme vitals
        if sys_bp < 80 or hr > 140 or hr < 40 or gcs < 9:
            needs_icu = 1
        if spo2 < 90 or gcs < 9:
            needs_ventilator = 1
            
        # Ensure logical caps
        hr = max(30, min(hr, 200))
        sys_bp = max(50, min(sys_bp, 220))
        dia_bp = max(30, min(dia_bp, 130))
        spo2 = max(50.0, min(spo2, 100.0))
        rr = max(6, min(rr, 45))
        gcs = max(3, min(gcs, 15))
        
        data.append({
            'age': age,
            'sex': sex,
            'chief_complaint': chief_complaint,
            'mechanism_of_injury': mechanism,
            'heart_rate': hr,
            'systolic_bp': sys_bp,
            'diastolic_bp': dia_bp,
            'spo2': spo2,
            'respiratory_rate': rr,
            'temperature': temp,
            'gcs_score': gcs,
            'needs_icu': needs_icu,
            'needs_ventilator': needs_ventilator,
            'specialist_required': specialist_required
        })
        
    df = pd.DataFrame(data)
    
    # Save dataset
    file_path = os.path.join(os.path.dirname(__file__), 'training_data.csv')
    df.to_csv(file_path, index=False)
    print(f"✅ Generated 10,000 rows of synthetic patient training data at: {file_path}")

if __name__ == '__main__':
    generate_training_data()
