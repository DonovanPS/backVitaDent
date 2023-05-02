#!/bin/bash

dockerize -wait tcp://mysql:3306 -timeout 100s

echo "Start Wait Mysql"
