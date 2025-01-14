# 🧬 LifeFormsAnalyzer

> An AI-powered application for analyzing and identifying life forms through image processing using Google's Gemini AI technology.

## 📋 Overview

LifeFormsAnalyzer is a modern web application that leverages the power of Gemini AI to analyze images and detect various forms of life, providing detailed information about the species, characteristics, and other relevant biological data.

## 🚀 Features

- 📸 Image upload and processing
- 🤖 AI-powered life form detection
- 📊 Detailed analysis results
- 🔍 Species identification
- 📱 Responsive design

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AnalysisResult.tsx
│   └── ImageUpload.tsx
├── services/
│   ├── geminiService.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
└── vite-env.d.ts
```

## 🛠️ Technology Stack

- React + TypeScript
- Vite
- Google Gemini AI API
- Modern CSS/SCSS
- RESTful API integration

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/LifeFormsAnalyzer.git
```

2. Install dependencies:

```bash
cd LifeFormsAnalyzer
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Add your Gemini AI API key to the `.env` file:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## 🔑 API Configuration

To use the Gemini AI services, you'll need to:

1. Obtain an API key from Google Cloud Console
2. Enable the Gemini AI API
3. Configure the API key in your environment variables

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Google Gemini AI team for providing the image analysis capabilities
- The open-source community for their invaluable tools and libraries
- All contributors who help improve this project

---

⭐ Don't forget to give the project a star if you found it helpful!
