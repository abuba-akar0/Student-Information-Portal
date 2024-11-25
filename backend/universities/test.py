import requests

url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=university-database&q=Pakistan&rows=1000'
response = requests.get(url)

if response.status_code == 200:
    universities = response.json()
    print(universities)  # Check if data is returned correctly
else:
    print(f"Error: {response.status_code}")
