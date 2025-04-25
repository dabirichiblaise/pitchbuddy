from flask import Flask
from flask_cors import CORS
from flask import url_for

app = Flask(__name__)
CORS(app)

@app.route('/')
def welcome():
    return 'Welcome to PitchBuddy!'

@app.route('/match/<matchname>')
def match(matchname): #what will matchname be? A URL that will link to matches in the database?
    return f'Matches: {matchname} is not implemented yet.'
    
@app.route('/players/<matchname>')
def players(matchname, players=None):
    return f'{players} for fixture: {matchname} is not implemented yet.'

with app.test_request_context():
    print(url_for('welcome'))
    print(url_for('match', matchname='example_match'))
    print(url_for('players', matchname='example_match'))

if __name__ == '__main__':
    app.run(debug=True)