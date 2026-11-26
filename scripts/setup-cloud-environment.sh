#!/usr/bin/env bash
# setup-cloud-environment.sh — Aikido Safe Chain bootstrap for Codespaces, Cursor Cloud Agents,
# Claude Code on the web, and Codex cloud.
#
# Safe Chain shims the npm and Python package managers. This script installs it, then runs the
# frozen install of every tracked lockfile: pnpm-lock.yaml, uv.lock, and poetry.lock. A root
# with only requirements files gets the shims and no install.
#
# Fail closed: never install dependencies unless Safe Chain shims are on PATH.
# Copied into the target repo as scripts/setup-cloud-environment.sh.

set -euo pipefail

export SAFE_CHAIN_VERSION="1.5.15"
SAFE_CHAIN_INSTALLER_SHA256="de0565e3d6346407a604e84e639e95fea8758748063da2216bbfdca5feda5dd2"
SAFE_CHAIN_INSTALLER_URL="https://github.com/AikidoSec/safe-chain/releases/download/${SAFE_CHAIN_VERSION}/install-safe-chain.sh"
SAFE_CHAIN_SHIMS="${HOME}/.safe-chain/shims"
SAFE_CHAIN_BIN="${HOME}/.safe-chain/bin"

persist_shim_path() {
  local rc="$1"
  local line="export PATH=\"${SAFE_CHAIN_SHIMS}:${SAFE_CHAIN_BIN}:\$PATH\""
  if [[ -f "$rc" ]] && grep -Fqx -- "$line" "$rc"; then
    return 0
  fi
  mkdir -p "$(dirname "$rc")"
  printf '\n# Aikido Safe Chain shims\n%s\n' "$line" >> "$rc"
}

# Claude Code starts each Bash command from a shell snapshot taken at launch, not the rc files,
# and runs CLAUDE_ENV_FILE before every command instead. A failed SessionStart hook does not stop
# the session, so the shims go on its PATH before anything here can fail, holding stubs that
# refuse to run until Safe Chain's setup-ci replaces them.
if [[ -n "${CLAUDE_ENV_FILE:-}" ]]; then
  mkdir -p "$SAFE_CHAIN_SHIMS"
  for cmd in npm npx pnpm pnpx pip pip3 pipx uv uvx poetry pdm; do
    if [[ ! -e "${SAFE_CHAIN_SHIMS}/${cmd}" ]]; then
      printf '#!/bin/sh\necho "error: Safe Chain is not set up, so %s is blocked; run bash ./scripts/setup-cloud-environment.sh" >&2\nexit 1\n' \
        "$cmd" > "${SAFE_CHAIN_SHIMS}/${cmd}"
      chmod +x "${SAFE_CHAIN_SHIMS}/${cmd}"
    fi
  done
  # `python -m pip` never reaches the pip stub, so python and python3 get one that runs Python
  # but refuses a package manager run as a module.
  python_stub=$(cat <<'STUB'
#!/usr/bin/env bash
shims="__SHIMS__"
blocked() {
  echo "error: Safe Chain is not set up, so __CMD__ -m $1 is blocked; run bash ./scripts/setup-cloud-environment.sh" >&2
  exit 1
}
prev=""
for arg in "$@"; do
  case "$prev" in
    -m)
      case "${arg%%.*}" in pip | pipx | uv | poetry | pdm) blocked "$arg" ;; esac
      break
      ;;
    -W | -X)
      prev=""
      continue
      ;;
  esac
  case "$arg" in
    -m?*)
      module="${arg#-m}"
      case "${module%%.*}" in pip | pipx | uv | poetry | pdm) blocked "$module" ;; esac
      break
      ;;
    -m | -[!-]*m) prev="-m" ;;
    -W | -X) prev="$arg" ;;
    -c | --) break ;;
    -*) prev="" ;;
    *) break ;;
  esac
done
real=$(PATH="${PATH//"$shims":/}"; command -v __CMD__)
if [[ -z "$real" || "$real" == "$shims/__CMD__" ]]; then
  echo "error: could not find __CMD__ outside the Safe Chain shims" >&2
  exit 1
fi
exec "$real" "$@"
STUB
  )
  python_stub=${python_stub//__SHIMS__/$SAFE_CHAIN_SHIMS}
  for cmd in python python3; do
    if [[ ! -e "${SAFE_CHAIN_SHIMS}/${cmd}" ]]; then
      printf '%s\n' "${python_stub//__CMD__/$cmd}" > "${SAFE_CHAIN_SHIMS}/${cmd}"
      chmod +x "${SAFE_CHAIN_SHIMS}/${cmd}"
    fi
  done
  persist_shim_path "$CLAUDE_ENV_FILE"
fi

if git_root=$(git rev-parse --show-toplevel 2>/dev/null); then
  cd "$git_root"
fi

# Tracked files with these names at any depth; outside a git checkout, the current directory only.
find_files() {
  local name file
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    for name in "$@"; do
      git ls-files -- ":(glob)**/${name}"
    done
  else
    for name in "$@"; do
      for file in $name; do
        if [[ -e "$file" ]]; then
          printf '%s\n' "$file"
        fi
      done
    done
  fi
}

lockfiles=()
while IFS= read -r lockfile; do
  lockfiles+=("$lockfile")
done < <(find_files pnpm-lock.yaml uv.lock poetry.lock)
requirements=$(find_files 'requirements*.txt' 'requirements*.in')

if [[ ${#lockfiles[@]} -eq 0 && -z "$requirements" ]]; then
  echo "error: no pnpm-lock.yaml, uv.lock, poetry.lock, or requirements file found; refusing to install without a frozen lockfile" >&2
  exit 1
fi

# Print the first lockfile with this name; fail when there is none.
first_lock() {
  local lockfile
  for lockfile in ${lockfiles[@]+"${lockfiles[@]}"}; do
    if [[ "${lockfile##*/}" == "$1" ]]; then
      printf '%s\n' "$lockfile"
      return 0
    fi
  done
  return 1
}

# True when the tool is on PATH outside the Safe Chain shims.
real_tool() {
  PATH="${PATH//${SAFE_CHAIN_SHIMS}:/}" command -v "$1" >/dev/null
}

if pnpm_lock=$(first_lock pnpm-lock.yaml); then
  pnpm_manifest="$(dirname "$pnpm_lock")/package.json"
  if ! real_tool pnpm \
    && [[ -f "$pnpm_manifest" ]] \
    && grep -q '"packageManager"' "$pnpm_manifest" \
    && command -v corepack >/dev/null; then
    mkdir -p "$SAFE_CHAIN_BIN"
    corepack enable --install-directory "$SAFE_CHAIN_BIN" pnpm
    export PATH="${SAFE_CHAIN_BIN}:${PATH}"
  fi

  if ! real_tool pnpm; then
    echo "error: pnpm is required on PATH before Safe Chain can wrap it" >&2
    exit 1
  fi
fi

installer=$(mktemp)
trap 'rm -f "$installer"' EXIT

curl -fsSL "$SAFE_CHAIN_INSTALLER_URL" -o "$installer"
echo "${SAFE_CHAIN_INSTALLER_SHA256}  ${installer}" | sha256sum -c -

# NVM auto-selects from the current directory when sourced. Run outside the
# repository so .nvmrc cannot break the installer's optional legacy scan.
(
  cd /
  sh "$installer" --ci
)

export PATH="${SAFE_CHAIN_SHIMS}:${SAFE_CHAIN_BIN}:${PATH}"

persist_shim_path "${HOME}/.profile"
persist_shim_path "${HOME}/.bashrc"
persist_shim_path "${HOME}/.zshrc"

if [[ -n "${GITHUB_PATH:-}" ]]; then
  printf '%s\n' "$SAFE_CHAIN_SHIMS" >> "$GITHUB_PATH"
  printf '%s\n' "$SAFE_CHAIN_BIN" >> "$GITHUB_PATH"
fi

# uv and Poetry can come from pipx once the shims are in place, so that install is protected too.
for tool in uv poetry; do
  if ! lockfile=$(first_lock "${tool}.lock"); then
    continue
  fi
  if ! real_tool "$tool" && real_tool pipx; then
    mkdir -p "$SAFE_CHAIN_BIN"
    PIPX_BIN_DIR="$SAFE_CHAIN_BIN" pipx install "$tool"
  fi
  if ! real_tool "$tool"; then
    echo "error: ${tool} is required on PATH to install from ${lockfile}" >&2
    exit 1
  fi
done

if [[ ${#lockfiles[@]} -eq 0 ]]; then
  pip safe-chain-verify
fi

for lockfile in ${lockfiles[@]+"${lockfiles[@]}"}; do
  root=$(dirname "$lockfile")
  case "${lockfile##*/}" in
    pnpm-lock.yaml)
      pnpm safe-chain-verify
      (cd "$root" && pnpm install --frozen-lockfile)
      ;;
    uv.lock)
      uv safe-chain-verify
      (cd "$root" && uv sync --locked)
      ;;
    poetry.lock)
      poetry safe-chain-verify
      (cd "$root" && poetry sync)
      ;;
  esac
done
