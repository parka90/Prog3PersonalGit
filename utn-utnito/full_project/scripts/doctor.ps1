$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path (Join-Path $ScriptDir "..")
$DockerDir = Join-Path $ProjectDir "chat-docker"
$ComposeFile = Join-Path $DockerDir "docker-compose.yml"
$EnvFile = Join-Path $DockerDir ".env"
$EnvExampleFile = Join-Path $DockerDir ".env.example"

function Write-Info($Message) {
  Write-Host "[INFO] $Message"
}

function Write-WarnMessage($Message) {
  Write-Host "[WARN] $Message"
}

function Write-ErrorMessage($Message) {
  Write-Host "[ERROR] $Message"
}

function Check-Command($CommandName) {
  if (Get-Command $CommandName -ErrorAction SilentlyContinue) {
    Write-Info "Found $CommandName."
    return $true
  }

  Write-ErrorMessage "Missing required command: $CommandName"
  return $false
}

function Check-DockerCompose {
  try {
    docker compose version | Out-Null
    Write-Info "Docker Compose v2 is available."
    return $true
  } catch {
    Write-ErrorMessage "Docker Compose v2 is not available (docker compose)."
    return $false
  }
}

function Import-DotEnv($Path) {
  if (-not (Test-Path $Path)) {
    Write-WarnMessage "Environment file not found: $Path"
    return
  }

  Get-Content $Path | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq "" -or $line.StartsWith("#")) {
      return
    }

    if ($line -match '^([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
      $key = $matches[1]
      $value = $matches[2].Trim('"').Trim("'")
      [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
  }

  Write-Info "Loaded environment values from $Path."
}

function Test-PortAvailable($Port) {
  try {
    $existing = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    return ($null -eq $existing)
  } catch {
    Write-WarnMessage "Could not test port $Port on this host. Skipping."
    return $true
  }
}

function Validate-Compose($ComposeEnvFile) {
  try {
    docker compose --env-file $ComposeEnvFile -f $ComposeFile config -q
    Write-Info "docker-compose.yml is valid."
    return $true
  } catch {
    Write-ErrorMessage "docker-compose.yml validation failed."
    return $false
  }
}

Write-Info "Running utn-ai doctor."

$statusOk = $true
$statusOk = (Check-Command git) -and $statusOk
$statusOk = (Check-Command node) -and $statusOk
$statusOk = (Check-Command npm) -and $statusOk
$statusOk = (Check-Command docker) -and $statusOk
$statusOk = (Check-DockerCompose) -and $statusOk

if (-not $statusOk) {
  exit 1
}

if (Test-Path $EnvFile) {
  Import-DotEnv $EnvFile
  $ComposeEnvFile = $EnvFile
} else {
  Import-DotEnv $EnvExampleFile
  $ComposeEnvFile = $EnvExampleFile
}

Write-Info ("node version: " + (node -v))
Write-Info ("npm version: " + (npm -v))
Write-Info ("docker version: " + (docker --version))
Write-Info ("docker compose version: " + (docker compose version))
Write-Info ("git version: " + (git --version))

if (-not (Validate-Compose $ComposeEnvFile)) {
  exit 1
}

$frontendPort = if ($env:FRONTEND_PORT) { [int]$env:FRONTEND_PORT } else { 4300 }
$coreServicePort = if ($env:CORE_SERVICE_PORT) { [int]$env:CORE_SERVICE_PORT } else { 4012 }
$postgresPort = if ($env:POSTGRES_PORT) { [int]$env:POSTGRES_PORT } else { 5454 }
$n8nPort = if ($env:N8N_PORT) { [int]$env:N8N_PORT } else { 5690 }

$ports = @($frontendPort, $coreServicePort, $postgresPort, $n8nPort)
$collisions = 0

foreach ($port in $ports) {
  if (Test-PortAvailable $port) {
    Write-Info "Port $port is available."
  } else {
    Write-ErrorMessage "Port $port is already in use."
    $collisions++
  }
}

if ($collisions -gt 0) {
  Write-ErrorMessage "Detected $collisions port collision(s). Update chat-docker/.env before startup."
  exit 1
}

Write-Info "Doctor finished successfully."
