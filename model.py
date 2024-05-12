from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pandas as pd
import pickle


data = pd.read_csv('fake_reviews_dataset.csv')

data['label'] = data['label'].apply(lambda x: 0 if x == 'CG' else 1)


X_train, X_test, y_train, y_test = train_test_split(data['text_'], data['label'], test_size=0.2, random_state=42)


vectorizer = CountVectorizer()
X_train = vectorizer.fit_transform(X_train)
X_test = vectorizer.transform(X_test)


model = LogisticRegression(solver='lbfgs', max_iter=1000)


model.fit(X_train, y_train)


with open('logistic_regression_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)


with open('count_vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)


y_pred = model.predict(X_test)


accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy*100:.2f}%')
