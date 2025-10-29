# Troubleshooting

Common issues and solutions when working with TechDocs Pro.

## Common Issues

### Build Errors

#### "Module not found" errors
- Check that all dependencies are installed
- Verify import paths are correct
- Clear node_modules and reinstall

#### "Invalid sidebar file" errors
- Ensure all referenced documents exist
- Check sidebar configuration syntax
- Verify document IDs match file names

### Development Server Issues

#### Server won't start
- Check for port conflicts
- Verify Node.js version compatibility
- Clear Docusaurus cache: `npm run clear`

#### Hot reload not working
- Check file permissions
- Verify file watching is enabled
- Restart the development server

### Deployment Issues

#### Build fails in production
- Check for environment-specific code
- Verify all assets are included
- Test build locally first

#### 404 errors after deployment
- Check baseUrl configuration
- Verify file paths are correct
- Check server configuration

## Getting Help

- 📖 [Documentation](intro) - Complete documentation
- 💬 [Discord Community](https://discord.gg/techdocs-pro)
- 🐛 [Report Issues](https://github.com/techdocs-pro/sample-docs/issues)
