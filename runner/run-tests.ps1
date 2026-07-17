param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$RunnerArgs
)

$ErrorActionPreference = "Stop"
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")

Push-Location $ProjectRoot
try {
  & node runner/run-tests.cjs @RunnerArgs
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
