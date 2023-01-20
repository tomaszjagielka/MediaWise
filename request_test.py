import requests


url = "https://sav6j6kg7nafnem4yg6fijorim0mmlnz.lambda-url.eu-west-2.on.aws"
end_point_name = "add_document/"
data = {
    "text": "some text"
}


response = requests.get(url)

print(response.json())