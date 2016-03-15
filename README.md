初始化项目的一些东东

ngrok -config ngrok.cfg -subdomain huayeta 80

sudo supervisor -w configs,app,app.js -i public,views  --harmony app

gulp webpack-w
