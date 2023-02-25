#!/bin/bash

# How to use: sh tsc_to_js.sh xxxx.tsc
# Prepare in advance: tsc and uglifyjs.

TS_FILE=$1
JS_FILE="${TS_FILE%.*}.js"
MIN_JS_FILE="${TS_FILE%.*}.min.js"
tsc $TS_FILE
uglifyjs $JS_FILE -o $MIN_JS_FILE -c -m
