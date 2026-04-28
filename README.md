# 📡 Analog Communication Explorer

An interactive, high-fidelity web application designed to help students and enthusiasts explore the fundamentals of Analog Communication through realistic simulations and professional circuit diagrams.

**🚀 [Live Demo on Vercel](https://analog-explorer-main.vercel.app)**

---

## ✨ Key Features

- **Realistic Circuit Schematics**: High-fidelity, component-level circuit diagrams for all major modulation techniques (AM, FM, PM, DSB-SC, SSB, etc.).
- **Interactive Simulations**: Real-time signal processing simulations that account for component values, noise, and SNR analysis.
- **Comprehensive Labs**: Integrated lab experiments with aims, apparatus descriptions, procedures, and observation tables.
- **Mathematical Accuracy**: Dynamic rendering of formulas and mathematical derivations using KaTeX.
- **Responsive Design**: Fully responsive interface with a professional dark/light mode UI.

---

## 🛠️ Tech Stack & Tools

- **Frontend Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons & Visuals**: [Lucide React](https://lucide.dev/) & Custom SVG Circuits
- **Data Visualization**: [Recharts](https://recharts.org/) for real-time signal plotting
- **Mathematics**: [KaTeX](https://katex.org/) for high-quality formula rendering
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📂 Project Structure

- `src/components/diagrams`: Contains high-fidelity SVG circuit components.
- `src/components/tabs`: Modular interface for Theory, Simulation, and Lab Experiments.
- `src/data/topics.ts`: Central knowledge base for all communication topics and formulas.
- `src/utils/simulations`: Core logic for signal processing and noise calculations.

---

## 🚀 Local Development

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saibashita/Analog-Explorer.git
   cd Analog-Explorer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```


- Vercel: [Analog Explorer](https://analog-explorer-main.vercel.app)

*Made with ❤️ for Analog Communication enthusiasts.*
