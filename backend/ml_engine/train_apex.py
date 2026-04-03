import pandas as pd
import numpy as np
import xgboost as xgb
import shap
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

def engineer_features(df):
    df['pulse_pressure'] = df['systolic_bp'] - df['diastolic_bp']
    df['shock_index'] = df['heart_rate'] / (df['systolic_bp'] + 1e-5) # Prevent Div by Zero
    
    # Ordinal Encoding constraints mapping from prompt
    df['sex_encoded'] = df['sex'].map({'male': 1, 'female': 0})
    df['cc_encoded'] = LabelEncoder().fit_transform(df['chief_complaint'])
    df['moi_encoded'] = LabelEncoder().fit_transform(df['mechanism_of_injury'])
    
    return df

def train_apex():
    dir_path = os.path.dirname(__file__)
    csv_path = os.path.join(dir_path, 'training_data.csv')
    
    print(f"Loading data from {csv_path}...")
    df = pd.read_csv(csv_path)
    
    print("Engineering features...")
    df = engineer_features(df)
    
    features = [
        'age', 'sex_encoded', 'cc_encoded', 'moi_encoded', 
        'heart_rate', 'systolic_bp', 'diastolic_bp', 'spo2', 
        'respiratory_rate', 'temperature', 'gcs_score', 
        'pulse_pressure', 'shock_index'
    ]
    
    X = df[features]
    
    # 1. Train ICU Model
    print("Training ICU Classifier...")
    y_icu = df['needs_icu']
    X_train, X_test, y_train, y_test = train_test_split(X, y_icu, test_size=0.2)
    model_icu = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
    model_icu.fit(X_train, y_train)
    print(f"ICU Model Accuracy: {accuracy_score(y_test, model_icu.predict(X_test)):.2f}")
    
    # 2. Train Ventilator Model
    print("Training Ventilator Classifier...")
    y_vent = df['needs_ventilator']
    X_train, X_test, y_train, y_test = train_test_split(X, y_vent, test_size=0.2)
    model_vent = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
    model_vent.fit(X_train, y_train)
    print(f"Ventilator Model Accuracy: {accuracy_score(y_test, model_vent.predict(X_test)):.2f}")
    
    # 3. Train Specialist Model (Multi-Class)
    print("Training Specialist Classifier...")
    le_spec = LabelEncoder()
    y_spec = le_spec.fit_transform(df['specialist_required'])
    X_train, X_test, y_train, y_test = train_test_split(X, y_spec, test_size=0.2)
    model_spec = xgb.XGBClassifier(objective='multi:softprob', num_class=len(le_spec.classes_))
    model_spec.fit(X_train, y_train)
    print(f"Specialist Model Accuracy: {accuracy_score(y_test, model_spec.predict(X_test)):.2f}")

    # 4. Generate SHAP Explainer (Using ICU model as base for explanations)
    print("Computing SHAP TreeExplainer...")
    explainer = shap.TreeExplainer(model_icu)
    
    # Save all models & metadata
    models_dir = os.path.join(dir_path, 'models')
    os.makedirs(models_dir, exist_ok=True)
    
    print("Saving models to disk...")
    with open(os.path.join(models_dir, 'apex_icu.pkl'), 'wb') as f:
        pickle.dump(model_icu, f)
    with open(os.path.join(models_dir, 'apex_ventilator.pkl'), 'wb') as f:
        pickle.dump(model_vent, f)
    with open(os.path.join(models_dir, 'apex_specialist.pkl'), 'wb') as f:
        pickle.dump(model_spec, f)
    with open(os.path.join(models_dir, 'shap_explainer.pkl'), 'wb') as f:
        pickle.dump(explainer, f)
    with open(os.path.join(models_dir, 'label_encoders.pkl'), 'wb') as f:
        pickle.dump({
            'specialist': le_spec
        }, f)
        
    print("✅ Training complete. Models saved in /backend/ml_engine/models/")

if __name__ == '__main__':
    train_apex()
