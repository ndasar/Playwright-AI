#!/bin/bash
# Quick Start Guide for Playwright Automation Framework

echo "🚀 Playwright Automation Framework - Quick Start"
echo "=================================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Configure environment: cp .env.example .env"
echo "  2. Update BASE_URL and API_URL in .env"
echo "  3. Run tests: npm test"
echo "  4. View report: npm run test:report"
echo ""
echo "🧪 Common commands:"
echo "  npm test              - Run all tests"
echo "  npm run test:ui       - Interactive UI mode"
echo "  npm run test:headed   - See browser while testing"
echo "  npm run test:debug    - Debug mode"
echo "  npm run test:report   - View HTML report"
echo ""
echo "📚 Documentation: See README.md for detailed information"
