# Dhaki (ذكي)

An AI-powered search engine that helps you find information and answers questions in both Arabic and English.

## Overview

Dhaki (ذكي) is a web application inspired by [Perplexity](https://www.perplexity.ai/) that offers intelligent search capabilities and question answering in both Arabic and English languages.

## Features

- Full Arabic language support
- User-friendly interface
- Multi-source smart search
- YouTube search support
- Fast response to queries
- Mobile-responsive UI
- Supports both RTL and LTR directions

## Technology Stack

- **Frontend**: Next.js 14.1.0, React 18.2.0, TailwindCSS 3.4.1
- **Backend**: Node.js 20.11.1, Next.js API Routes
- **AI Models**: xAI's Grok, Groq, Claude 3.5 Sonnet
- **Search API**: Tavily, Exa, YouTube
- **UI Components**: Shadcn/UI
- **Package Manager**: pnpm 8.15.3

## Standard Installation (Without Docker)

### Prerequisites

- Node.js 20.11.1 or higher
- pnpm 8.15.3 or higher

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/alanqoudif/dhaki-p.git
cd dhaki-p
```

2. Install dependencies:
```bash
pnpm install
```

3. Create an environment file:
```bash
cp .env.example .env.local
```

4. Edit the `.env.local` file with your API keys:
```
XAI_API_KEY=your-xai-key
GROQ_API_KEY=your-groq-key
TAVILY_API_KEY=your-tavily-key
EXA_API_KEY=your-exa-key
YT_ENDPOINT=your-youtube-endpoint
# ... other environment variables
```

5. Build the application:
```bash
pnpm build
```

6. Start the production server:
```bash
pnpm start
```

The application will be available at `http://localhost:3000`.

### Development Mode

To run the application in development mode:
```bash
pnpm dev
```

## Docker Installation

### Method 1: Using Pre-built Docker Image

```bash
# Pull the image from Docker Hub
docker pull faisalanqoudi/dhaki:latest

# Run the application
docker run -d -p 3000:3000 --name dhaki-app faisalanqoudi/dhaki:latest
```

### Method 2: Using Docker Compose

1. Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  dhaki:
    image: faisalanqoudi/dhaki:latest
    ports:
      - "3000:3000"
    restart: unless-stopped
```

2. Run the application using Docker Compose:

```bash
docker-compose up -d
```

## VPS Installation

### Quick Method (Automated Script)

Execute the following script on your VPS:

```bash
curl -sSL https://raw.githubusercontent.com/alanqoudif/dhaki-p/main/setup-vps.sh | bash
```

This script will automatically:
1. Install Docker if not present
2. Install Docker Compose if not present
3. Pull the Dhaki application image from Docker Hub
4. Run the application on port 3000

### Manual Installation on VPS

#### 1. Install Docker
```bash
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

#### 2. Install Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 3. Run Dhaki Application
```bash
docker pull faisalanqoudi/dhaki:latest
docker run -d -p 3000:3000 --name dhaki-app --restart unless-stopped faisalanqoudi/dhaki:latest
```

## Additional Documentation

For more detailed information, check out:
- `README-DOCKER-AR.md` - Quick guide in Arabic
- `DOCKER-README.md` - Detailed guide in Arabic
- `docker-commands.txt` - Useful Docker commands
- `setup-vps.sh` - Automated installation script

## License

All rights reserved © 2024
