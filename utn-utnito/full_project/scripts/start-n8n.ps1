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

function Import-DotEnv($Path) {
  if (-not (Test-Path $Path)) {
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
}

function Wait-ForHttp($Url, $Label) {
  $attempts = 20
  $delaySeconds = 2

  for ($i = 1; $i -le $attempts; $i++) {
    try {
      $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        Write-Info "$Label is reachable at $Url."
        return
      }
    } catch {
      Start-Sleep -Seconds $delaySeconds
    }
  }

  Write-WarnMessage "$Label did not become reachable at $Url after $($attempts * $delaySeconds) seconds."
}

if (-not (Test-Path $EnvFile)) {
  Copy-Item $EnvExampleFile $EnvFile
  Write-WarnMessage "Missing .env file. Created $EnvFile from .env.example."
}

Write-Info "Running diagnostics before startup (n8n mode)."
& (Join-Path $ScriptDir "doctor.ps1") -Mode n8n

Write-Info "Starting n8n service."
docker compose --env-file $EnvFile -f $ComposeFile up -d chat-n8n

Write-Info "Current container status:"
docker compose --env-file $EnvFile -f $ComposeFile ps

Import-DotEnv $EnvFile
$n8nPort = if ($env:N8N_PORT) { $env:N8N_PORT } else { "5690" }

Wait-ForHttp "http://localhost:$n8nPort" "chat-n8n"

Write-Info "utn-utnito n8n service is running."
