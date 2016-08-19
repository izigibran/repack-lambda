#!/usr/bin/env bash
npm run clean && \
npm run lint && \
npm run rollup && \
npm run test && \
npm run gulp && \
rm -rf tmp
