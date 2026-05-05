export default function ChatBubble({ text, type = 'bot' }) {
  return (
    <div className={`flex ${type === 'bot' ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-xl rounded-3xl px-5 py-4 text-sm shadow-sm ${type === 'bot' ? 'bg-white text-slate-700' : 'bg-indigo-600 text-white'}`}>
        {text}
      </div>
    </div>
  );
}
