#!/usr/bin/env bash
npm run clean

for file in $(ls ./src/lambdas); do
  export APP=$(echo "$file" | sed 's/.js$//g')
  npm run rollup && \
  npm run gulp && \
  rm -rf tmp
done
