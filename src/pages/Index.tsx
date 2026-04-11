import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopicContent } from "@/components/TopicContent";
import { Dashboard } from "@/components/Dashboard";
import { Chatbot } from "@/components/Chatbot";
import { topics } from "@/data/topics";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [dark, setDark] = useState(true);

  // Initialize Dark Mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const topic = selectedTopicId ? topics.find((t) => t.id === selectedTopicId) : null;

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id || null); // empty string → null → show Dashboard
  };

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen flex w-full relative bg-background text-foreground overflow-hidden">
      <AppSidebar selectedTopicId={selectedTopicId || ""} onSelectTopic={handleSelectTopic} />
      
      <main className="flex-1 min-w-0 z-10 flex flex-col h-screen overflow-y-auto">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-background border-b border-border shadow-sm">
          <h2 className="text-lg font-bold text-foreground tracking-tight">Analog Explorer</h2>
          <button
            onClick={toggleDark}
            className="p-2 rounded-xl bg-card border border-border hover:border-primary/50 text-foreground transition-all group"
            title="Toggle dark mode"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>
        </header>

        <div className="px-4 md:px-8 pb-12 w-full max-w-6xl mx-auto flex-1 mt-6">
          {topic ? (
            <div className="max-w-5xl mx-auto">
              <TopicContent topic={topic} />
            </div>
          ) : (
            <Dashboard onSelectTopic={handleSelectTopic} />
          )}
        </div>
      </main>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
