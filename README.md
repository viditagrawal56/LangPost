# LangPost 🌐

LangPost is a powerful multilingual blogging platform that automatically translates your content into multiple Indian languages using advanced translation APIs and provides quality comparisons between different translation services.

## ✨ Features

### 🔤 Multilingual Support

- Automatic translation to multiple Indian languages:
  - Hindi (हिंदी)
  - Tamil (தமிழ்)
  - Kannada (ಕನ್ನಡ)
  - Bengali (বাংলা)
  - Marathi (मराठी)
  - Malayalam (മലയാളം)
  - Punjabi (ਪੰਜਾਬੀ)
  - Odia (ଓଡ଼ିଆ)
  - Hungarian (Magyar)

### 🎯 Key Features

- **Dual Translation Engine**: Utilizes both Google Translate and Reverie's translation APIs
- **Quality Comparison**: BLEU score calculation to compare translation quality
- **Rich Content Support**:
  - Text posts
  - Video transcription and translation

### 👥 Social Features

- User profiles with bio and website
- Follow other users
- Tag-based content organization
- Comments and replies
- Save posts for later

## 🛠️ Technical Stack

- **Frontend**: Next.js with TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT-based auth system
- **APIs**:
  - Google Translate API
  - Reverie Translation API
  - Video Transcription Service

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/langpost.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
DATABASE_URL="your_mongodb_url"
JWT_SECRET="your_jwt_secret"
```

4. Run the development server:

```bash
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
