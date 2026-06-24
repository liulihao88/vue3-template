---
name: aionui-cowork-desktop
description: Use OpenClaw from a desktop Cowork UI with remote rescue capabilities and multi-agent hub. Use when user wants to access OpenClaw through a visual desktop interface, fix OpenClaw remotely when it's down, run multiple agents in one app, or access OpenClaw from multiple channels (Telegram, WebUI, Lark, DingTalk).
---

# OpenClaw as Desktop Cowork (AionUi) — Remote Rescue & Multi-Agent Hub

Run OpenClaw through a visual desktop UI with remote rescue capabilities and multi-agent management.

## Why OpenClaw + AionUi

| If you want…                          | AionUi gives you…                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Visual interface for OpenClaw**     | Cowork workspace showing file operations, terminal commands, and web browsing in real-time |
| **Remote rescue when OpenClaw fails** | Access via Telegram or WebUI to run diagnostics, fix config, and restart gateway remotely  |
| **Multi-agent hub**                   | Run OpenClaw alongside Claude Code, Codex, Qwen Code, and 12+ other agents in one app      |
| **Unified configuration**             | Configure MCP servers once and sync to all agents automatically                            |
| **Multi-channel access**              | Use WebUI, Telegram, Lark, or DingTalk to reach your OpenClaw instance from anywhere       |

## Key Features

- **OpenClaw as Cowork agent**: Visual interface for OpenClaw with file-aware workspace
- **Remote rescue capabilities**: Diagnose and fix OpenClaw issues from anywhere using built-in deployment expert
- **Multi-agent management**: Run multiple AI agents in parallel with shared configuration
- **Cross-channel access**: Access from desktop UI, web interface, or messaging apps
- **Automation scheduling**: 24/7 task execution via AionUi cron system
- **Built-in diagnostics**: Run `openclaw doctor` and troubleshoot configuration issues

## Required Skills & Tools

- **OpenClaw** (latest version recommended)
- **AionUi** desktop application (free, open-source)
- API keys or authentication for desired models
- Optional: Daemon setup for 24/7 operation

## Setup Instructions

### 1. Install AionUi

Download from [AionUi Releases](https://github.com/iOfficeAI/AionUi/releases) (macOS / Windows / Linux)

### 2. Install or Update OpenClaw

```bash
npm install -g openclaw@latest
# Optional: Install as daemon for 24/7 operation
openclaw onboard --install-daemon
```

### 3. Configure AionUi

1. Open AionUi - it will auto-detect your OpenClaw installation
2. If not detected, use the in-app **OpenClaw Setup** assistant
3. Create a Cowork session and select OpenClaw as your agent
4. Configure remote access channels (Telegram, WebUI, etc.) in AionUi settings

### 4. Remote Rescue Setup

For remote troubleshooting capabilities:

1. Enable Telegram or WebUI access in AionUi settings
2. Configure notification preferences for system status alerts
3. Test remote access by connecting from another device

## Usage Examples

- **Visual workflow**: "Start a Cowork session with OpenClaw and build a web app"
- **Remote rescue**: "My OpenClaw instance is unresponsive. Use AionUi to run diagnostics and fix it"
- **Multi-agent task**: "Run OpenClaw for research and Claude Code for writing in parallel sessions"
- **Scheduled automation**: "Set up a daily cron job to run my data analysis workflow in OpenClaw"

## Related Links

- [AionUi GitHub](https://github.com/iOfficeAI/AionUi)
- [AionUi Website](https://www.aionui.com)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Docs](https://docs.openclaw.ai)
