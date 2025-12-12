
import urllib.request
import urllib.error
import json

API_URL = "http://localhost:8000/api/v1"

def seed_score():
    print("Recherche de la ville de Nador...")
    try:
        # 1. Get Nador ID
        url = f"{API_URL}/cities/slug/nador"
        try:
            with urllib.request.urlopen(url) as response:
                if response.getcode() != 200:
                    print(f"Erreur recherche ville: {response.getcode()}")
                    return
                data = json.loads(response.read().decode())
                city_id = data["id"]
                print(f"Ville trouvee: {data['name_fr']} ({city_id})")
        except urllib.error.HTTPError as e:
            print(f"HTTP Error fetching city: {e.code} {e.reason}")
            print(e.read().decode())
            return
        
        # 2. Post Score
        payload = {
            "city_id": city_id,
            "player_name": "Test User (Seed)",
            "score": 95,
            "answers": []
        }
        
        req = urllib.request.Request(
            f"{API_URL}/quiz/attempt",
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        print("Envoi du score...")
        try:
            with urllib.request.urlopen(req) as response:
                if response.getcode() == 201:
                    print("✅ Score ajoute avec succes!")
                    print(json.loads(response.read().decode()))
                else:
                    print(f"Response code: {response.getcode()}")
        except urllib.error.HTTPError as e:
             print(f"HTTP Error posting score: {e.code} {e.reason}")
             print(e.read().decode())

    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    seed_score()
