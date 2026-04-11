import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const faqResponses: Record<string, string> = {
  "am": "AM (Amplitude Modulation) varies the carrier amplitude proportional to the message signal. The AM signal is φ(t) = [A + m(t)]cos(ωct). Modulation index μ = m_peak/A. Bandwidth = 2B.",
  "fm": "FM (Frequency Modulation) varies the carrier frequency. The FM signal has instantaneous frequency ωi = ωc + kf·m(t). Bandwidth ≈ 2(Δf + B) by Carson's rule. FM is more noise-resistant than AM.",
  "modulation": "Modulation shifts baseband signals to higher frequencies for efficient antenna radiation, allows FDM (frequency division multiplexing), and improves noise immunity. Types: AM, FM, PM.",
  "dsb": "DSB-SC (Double Sideband Suppressed Carrier) is φ(t) = m(t)cos(ωct). It has no carrier component, requires coherent demodulation, and has bandwidth = 2B.",
  "ssb": "SSB (Single Sideband) transmits only one sideband (USB or LSB), saving 50% bandwidth. BW = B. Generated using Hilbert transform or filter method.",
  "noise": "In communication, noise degrades signal quality. Thermal noise N = kTB. Noise figure F = SNR_in/SNR_out. FM has 3β²(β+1) SNR advantage over AM.",
  "pll": "PLL (Phase Locked Loop) locks the VCO to the input signal phase. Used for carrier recovery, FM demodulation, and frequency synthesis. Components: phase detector, loop filter, VCO.",
  "snr": "SNR (Signal-to-Noise Ratio) = Signal Power / Noise Power. For AM: SNR = μ²Pc/(2N₀B). FM advantage: SNR_FM/SNR_AM = 3β²(β+1).",
  "fourier": "The Fourier Transform decomposes signals into frequency components: X(ω) = ∫x(t)e^(-jωt)dt. Key properties: linearity, time shifting, convolution theorem, Parseval's theorem.",
  "bandwidth": "Bandwidth is the range of frequencies occupied by a signal. AM: BW = 2B. DSB-SC: BW = 2B. SSB: BW = B. FM: BW ≈ 2(Δf + B).",
  "envelope": "Envelope detector uses a diode + RC filter. Condition: 1/fc << RC << 1/(2πB). For tone modulation: RC ≤ √(1-μ²)/(μωm). Simplest AM demodulator.",
  "superheterodyne": "Superheterodyne receiver converts RF to a fixed IF frequency. Stages: RF amp → Mixer → IF amp → Demodulator. IF typically 455 kHz (AM) or 10.7 MHz (FM).",
  "help": "I can answer questions about: AM, FM, DSB-SC, SSB, Modulation, Noise, PLL, SNR, Fourier Transform, Bandwidth, Envelope Detector, Superheterodyne Receiver. Just type a keyword!",
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(faqResponses)) {
    if (lower.includes(key)) return value;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hi there! 👋 I'm your Analog Communication assistant. Ask me about AM, FM, DSB-SC, SSB, noise, PLL, or any topic covered in this course!";
  }
  if (lower.includes("thank")) {
    return "You're welcome! 🎉 Keep exploring and good luck with your studies!";
  }
  return "I'm not sure about that specific question, but I can help with: AM, FM, DSB-SC, SSB, Modulation, Noise, Fourier, PLL, SNR, Bandwidth, Envelope Detection, and Superheterodyne receivers. Try asking about one of these topics!";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm your Analog Communication assistant. Ask me anything about AM, FM, DSB, noise, or any topic in this course!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot "thinking" delay
    setTimeout(() => {
      const botResponse = findResponse(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        title="Chat with AI Assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <div>
              <p className="font-bold text-sm">ADC Study Bot</p>
              <p className="text-[10px] opacity-80">Analog Communication Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px] custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`px-3.5 py-2.5 rounded-xl text-sm leading-relaxed max-w-[260px] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about AM, FM, SSB..."
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-primary-foreground p-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
