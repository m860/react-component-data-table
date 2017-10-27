#!/usr/bin/env bash
./node_modules/.bin/babel --presets=es2015,stage-0,react ./src/components -d ./components

cp -r ./src/assets/img ./assets
./node_modules/node-sass/bin/node-sass ./src/assets/sass/ -o ./assets/css/

documentation readme ./src/components/ --section 'API'