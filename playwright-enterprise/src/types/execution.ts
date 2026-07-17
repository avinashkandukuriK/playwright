export type TestEnvironment = 'qa' | 'uat' | 'stage' | 'prod';

export type ExecutionStatus =
  | 'QUEUED'
  | 'STARTING'
  | 'RUNNING'
  | 'PASSED'
  | 'FAILED'
  | 'CANCELLED'
  | 'TIMED_OUT'
  | 'INFRASTRUCTURE_FAILED';

export type FailureCategory =
  | 'TEST_FAILURE'
  | 'APPLICATION_FAILURE'
  | 'ENVIRONMENT_FAILURE'
  | 'INFRASTRUCTURE_FAILURE'
  | 'CONFIGURATION_FAILURE'
  | 'UNKNOWN_FAILURE';

export type PortalEventType =
  | 'EXECUTION_STARTED'
  | 'TEST_STARTED'
  | 'TEST_FINISHED'
  | 'EXECUTION_FINISHED'
  | 'LOG'
  | 'ARTIFACT_CREATED';

export interface PortalReporterEvent {
  executionId: string;
  sequence: number;
  timestamp: string;
  type: PortalEventType;
  projectName?: string;
  testId?: string;
  title?: string;
  file?: string;
  status?: string;
  durationMs?: number;
  retry?: number;
  failureCategory?: FailureCategory;
  errorMessage?: string;
}
