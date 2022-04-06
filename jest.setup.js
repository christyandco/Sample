import '@testing-library/jest-dom';
import { loadEnvConfig } from '@next/env';
import { cache } from 'swr';

export default async () => {
  const projectDir = process.env.PWD;
  loadEnvConfig(projectDir);
};

beforeAll(() => {
  const projectDir = process.env.PWD;
  loadEnvConfig(projectDir);
});
beforeEach(() => {
  cache.clear();
});
