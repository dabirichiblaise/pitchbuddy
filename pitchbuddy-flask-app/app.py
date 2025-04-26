from flask import Flask, jsonify
from flask_cors import CORS
#from flask import url_for
import datetime
import random

app = Flask(__name__)
CORS(app)

# Mock data for matches and players
def generate_mock_matches(count=10):
    teams = [
        "Manchester United", "Liverpool", "Chelsea", "Arsenal",
        "Manchester City", "Tottenham Hotspur", "Leicester City", "West Ham United",
        "Everton", "Aston Villa", "Newcastle United", "Southampton",
        "Brighton & Hove Albion", "Crystal Palace", "Wolverhampton Wanderers",
        "Ipswich Town", "Brenford", "Fulham", "Bournemouth", "Nottingham Forest"
    ]

    leagues = ["Premier League"]

    matches = []
    now = datetime.datetime.now()
    #to ensure that the team are different / randomly selected
    for i in range(count):
        home_index = random.randint(0, len(teams) - 1)
        away_index = random.randint(0, len(teams) - 1)
        while away_index == home_index:
            away_index = random.randint(0, len(teams) - 1)


    #generate random match details
    match_date = now + datetime.timedelta(days=random.randint(1,14))

    #interesting factors definition (Will be handled by AI model later)
    form_rating = round(random.uniform(1, 10), 1)
    rivalry_rating = round(random.uniform(1, 10), 1)
    stakes_rating = round(random.uniform(1, 10), 1)
    game_interest_rating = round((form_rating + rivalry_rating + stakes_rating) / 3, 1)

    matches.append({
        "id": i + 1,
        "home_team": teams[home_index],
        "away_team": teams[away_index],
        "date": match_date.strftime("%Y-%m-%d"),
        "time": match_date.strftime("%H:%M"),
        "league": leagues,
        "venue": f"{teams[home_index]} Stadium",
        "interest_factors": {
            "form": form_rating,
            "rivalry": rivalry_rating,
            "stakes": stakes_rating,
            "game_interest": game_interest_rating
        }
    })

    #sort by interest level
    matches.sort(key=lambda x: x['interest_factors']['game_interest'], reverse=True)
    return matches


@app.route('/api/matches')
def match():
    matches = generate_mock_matches(12)
    return jsonify({
        "status": "success",
        "data": {
            "matches": matches
        }
    })

@app.route('/api/match/<int:match_id>')
def match_detail(match_id):
    matches = generate_mock_matches(20)  # Generate 20 matches for testing
    match = next((m for m in matches if m['id'] == match_id), None)

    if not match:
        return jsonify({"status": "error", "message": "Match not found"}), 404
    
    return jsonify({
        "status": "success",
        "data": {
            "match": match
        }
    })
    
@app.route('/api/players/<int:match_id>')
def match_players(match_id):
    #mock player data for a specific match
    if match_id < 0:
        return jsonify({"status": "error", "message": "Invalid match ID"}), 400
    
    players = []
    positions = ["GK", "DEF", "MID", "FWD"]
    
    for team_idx in range(2): #home and away teams
        team_name = f"Team {team_idx + 1}"

        for i in range(11): #11 players per team
            players.append({
                "id": team_idx * 11 + i + 1,
                "name": f"Player {team_idx * 11 + i + 1}",
                "team": team_name,
                "position": random.choice(positions),
                "rating": round(random.uniform(1.5, 10), 1),
                "form": ["Good", "Average", "Poor"][random.randint(1.5, 10) % 3],
                "injury_status": random.choice(["Fit", "Doubtful", "Injured", "Suspended"]),
            })

            return jsonify({
                "status": "success",
                "data": {
                    "match_id": match_id,
                    "players": players
                }
            })
    
if __name__ == '__main__':
    app.run(debug=True)