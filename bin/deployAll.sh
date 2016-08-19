#!/usr/bin/env bash
for file in $(ls ./src/lambdas); do
  export APP=$(echo "$file" | sed 's/.js$//g')
  npm run clean && \
  npm run webpack && \
  npm run gulp && \
  rm -rf tmp
done
