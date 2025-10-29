# Installation

This guide will help you install TechDocs Pro on your system. We support multiple installation methods to fit different use cases and preferences.

## Prerequisites

Before installing TechDocs Pro, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher) or **yarn** (version 1.22 or higher)
- **Git** (for version control)

:::info System Requirements

- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: At least 1GB free space
- **Network**: Internet connection for downloading dependencies

:::

## Installation Methods

### Method 1: npm (Recommended)

The easiest way to install TechDocs Pro is using npm:

```bash
npm install -g techdocs-pro
```

After installation, verify it's working:

```bash
techdocs --version
```

### Method 2: yarn

If you prefer yarn:

```bash
yarn global add techdocs-pro
```

### Method 3: npx (No Installation)

You can run TechDocs Pro without installing it globally:

```bash
npx techdocs-pro@latest init my-docs
```

### Method 4: Docker

For containerized environments:

```bash
docker run -it --rm -v $(pwd):/workspace techdocs-pro/techdocs-pro:latest init
```

## Project Initialization

Once installed, create a new documentation project:

```bash
techdocs init my-documentation
cd my-documentation
```

This command will:

- Create a new directory with the project structure
- Install all necessary dependencies
- Set up the basic configuration
- Create sample content to get you started

## Verify Installation

To ensure everything is working correctly:

1. **Check version**:
   ```bash
   techdocs --version
   ```

2. **Start development server**:
   ```bash
   techdocs start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

You should see the TechDocs Pro welcome page with sample documentation.

## Troubleshooting

### Common Issues

#### Node.js Version Issues

If you encounter Node.js version errors:

```bash
# Check your Node.js version
node --version

# If version is too old, update Node.js
# Visit https://nodejs.org for the latest version
```

#### Permission Issues

On Unix-based systems, you might need to use `sudo`:

```bash
sudo npm install -g techdocs-pro
```

#### Network Issues

If you're behind a corporate firewall:

```bash
npm config set registry https://registry.npmjs.org/
npm config set strict-ssl false
```

### Getting Help

If you're still having issues:

- 📖 Check our [Troubleshooting Guide](guides/troubleshooting)
- 💬 Join our [Discord Community](https://discordapp.com/invite/techdocs-pro)
- 🐛 [Report an Issue](https://github.com/techdocs-pro/sample-docs/issues)

## Next Steps

Now that you have TechDocs Pro installed:

1. 📖 [Quick Start Guide](quick-start) - Create your first documentation
2. ⚙️ [Configuration](configuration) - Customize your setup
3. 📚 [API Reference](api/overview) - Explore available features

---

:::tip Pro Tip

Keep TechDocs Pro updated to get the latest features and security updates:

```bash
npm update -g techdocs-pro
```

:::
