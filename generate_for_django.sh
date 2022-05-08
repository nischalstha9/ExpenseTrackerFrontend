#!/bin/sh

set -e

export MAIN_CSS=`basename $(ls build/static/css/main.*.css)`
export MAIN_JS=`basename $(ls build/static/js/main.*.js)`
export RUNTIME_CHUNK=`basename $(ls build/static/js/*.chunk.js)`


cat << EOF | envsubst > ./index.html
{% load static %}
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="https://raw.githubusercontent.com/nischalstha9/ExpenseTracker/master/media/favicon.png"/>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Expense Tracker by Nischal!"
    />
    <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/nischalstha9/ExpenseTracker/master/media/favicon.png"/>
    <link rel="manifest" href="/manifest.json" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;1,400;1,500&display=swap"
      rel="stylesheet"
    />
    <title>Aakogako | Expense Tracker</title>
    <script defer="defer" src="{% static './js/$MAIN_JS' %}"></script>
    <link href="{% static './css/$MAIN_CSS' %}" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF