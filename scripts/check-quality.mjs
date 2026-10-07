import { spawnSync } from 'node:child_process';

const floor = 95;

function report(command, args) {
  const result = spawnSync(command, args, { encoding: 'utf8', timeout: 120_000 });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(`${command} failed:\n${result.stdout}\n${result.stderr}`);
  return JSON.parse(result.stdout);
}

const slop = report('./node_modules/.bin/aislop', ['scan', '--json']);
if (!slop.scoreable || typeof slop.score !== 'number' || slop.score < floor) {
  throw new Error(`aislop must score at least ${floor}; received ${slop.score}.`);
}
if (Object.values(slop.engines).some((engine) => engine.skipped)) {
  throw new Error('aislop skipped an engine. Complete the checks before publishing.');
}

const doctor = report('./node_modules/.bin/react-doctor', ['.', '--yes', '--json']);
if (
  !doctor.ok ||
  doctor.projects.some((project) => !project.complete || project.skippedChecks.length > 0)
) {
  throw new Error('React Doctor did not complete every check.');
}
if (typeof doctor.summary.score !== 'number' || doctor.summary.score < floor) {
  throw new Error(`React Doctor must score at least ${floor}; received ${doctor.summary.score}.`);
}

process.stdout.write(`aislop: ${slop.score}/100\nReact Doctor: ${doctor.summary.score}/100\n`);
