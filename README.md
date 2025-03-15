# Cat Breeds Explorer

A modern Next.js application that showcases different cat breeds using The Cat API. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

![Cat Breeds Explorer](https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&h=400&q=80)

## Features

- 🐱 Displays detailed information about various cat breeds
- 📱 Fully responsive design
- 🎨 Modern UI with shadcn/ui components
- ⚡ Fast and efficient with Next.js
- 🔍 Error handling and loading states
- 🔒 Type-safe with TypeScript

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cat-breeds-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Cat API key:
```
NEXT_PUBLIC_CAT_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

This project uses [The Cat API](https://thecatapi.com/) to fetch cat breed information. To use the API:

1. Sign up at [https://thecatapi.com/](https://thecatapi.com/)
2. Get your API key from the dashboard
3. Replace the `DEMO-API-KEY` in the code with your actual API key

## Project Structure

```
├── app/
│   └── page.tsx        # Main page component
├── components/
│   └── ui/            # UI components from shadcn/ui
├── public/            # Static assets
└── README.md         # Project documentation
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [The Cat API](https://thecatapi.com/) - Cat breeds data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [The Cat API](https://thecatapi.com/) for providing the cat breeds data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Unsplash](https://unsplash.com/) for the header image
