import fs from 'node:fs';
import path from 'node:path';
import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import { env } from '../config/env';
import type { FailureCategory, PortalReporterEvent } from '../types/execution';

class PortalReporter implements Reporter {
  private sequence = 0;
  private outputFile = path.resolve(process.cwd(), env.artifacts.portalEventsFile);

  onBegin(_config: FullConfig, suite: Suite): void {
    this.ensureOutputFolder();
    this.publish({
      type: 'EXECUTION_STARTED',
      title: suite.title,
      status: 'RUNNING'
    });
  }

  onTestBegin(test: TestCase): void {
    this.publish({
      type: 'TEST_STARTED',
      testId: test.id,
      title: test.title,
      file: test.location.file,
      projectName: test.parent.project()?.name,
      status: 'RUNNING'
    });
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.publish({
      type: 'TEST_FINISHED',
      testId: test.id,
      title: test.title,
      file: test.location.file,
      projectName: test.parent.project()?.name,
      status: result.status.toUpperCase(),
      durationMs: result.duration,
      retry: result.retry,
      failureCategory: this.classifyFailure(result),
      errorMessage: result.error?.message
    });
  }

  onEnd(result: FullResult): void {
    this.publish({
      type: 'EXECUTION_FINISHED',
      status: result.status.toUpperCase()
    });
  }

  private classifyFailure(result: TestResult): FailureCategory | undefined {
    if (result.status === 'passed' || result.status === 'skipped') {
      return undefined;
    }

    const message = result.error?.message || '';

    if (/timeout|navigation|net::|ECONN|ENOTFOUND|browser has been closed/i.test(message)) {
      return 'INFRASTRUCTURE_FAILURE';
    }

    if (/401|403|credential|secret|env/i.test(message)) {
      return 'CONFIGURATION_FAILURE';
    }

    if (/5\d\d|service unavailable|gateway/i.test(message)) {
      return 'ENVIRONMENT_FAILURE';
    }

    if (/expect|locator|toHave|toBe|assert/i.test(message)) {
      return 'TEST_FAILURE';
    }

    return 'UNKNOWN_FAILURE';
  }

  private publish(event: Omit<PortalReporterEvent, 'executionId' | 'sequence' | 'timestamp'>): void {
    const payload: PortalReporterEvent = {
      executionId: env.execution.executionId,
      sequence: ++this.sequence,
      timestamp: new Date().toISOString(),
      ...event
    };

    fs.appendFileSync(this.outputFile, `${JSON.stringify(payload)}\n`, 'utf-8');
  }

  private ensureOutputFolder(): void {
    fs.mkdirSync(path.dirname(this.outputFile), { recursive: true });
  }
}

export default PortalReporter;
