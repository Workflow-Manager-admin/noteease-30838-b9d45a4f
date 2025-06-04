#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-30838-b9d45a4f/noteease_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

