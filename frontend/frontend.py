import os


def lambda_handler(event, context):
    url = os.getenv('backend_url')
    print(url)

    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            /* center the elements */
            #container {{
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }}

            /* make the text field bigger */
            #input-field {{
                width: 400px;
                height: 50px;
                font-size: 20px;
            }}

            /* style the buttons */
            button {{
                padding: 10px 20px;
                margin-right: 10px;
                font-size: 20px;
            }}

            .inactive {{
                pointer-events: none;
                opacity: 0.5;
            }}

            .active {{
                background-color: blue;
                color: white;
                cursor: pointer;
            }}

        </style>
    </head>
    <body>
    <div id="container">
        <div>
            <button class="active" id="method1" onclick="changeMethod('method1')">Check Authors</button>
            <button class="inactive" id="method2" onclick="changeMethod('method2')">Check Article</button>

            <br>
            <input type="text" id="input-field" placeholder="Enter some data">
            <br>
            <button id="send-request" onclick="sendRequest()">Send Request</button>
            <br>
            <div id="response"></div>
        </div>
    </div>
    <script>
        function sendRequest() {{
            let inputValue = document.getElementById("input-field").value;

            document.getElementById("response").innerHTML = "Loading...";

            fetch('{url}', {{
                method: 'POST',
                headers: {{
                    'Content-Type': 'application/json'
                }},
                body: JSON.stringify({{
                    name: inputValue
                }})
            }})
                .then(response => response.text())
                .then(data => {{
                    document.getElementById("response").innerHTML = data;
                }})
                .catch(error => {{
                    document.getElementById("response").innerHTML = "Error: " + error;
                }});

        }}
    </script>
    </body>
    </html>

    """

    return html

