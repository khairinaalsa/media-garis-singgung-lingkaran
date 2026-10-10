import { useCallback, useState } from 'react';

/** Penjelasan suara sederhana (Web Speech API, id-ID). */
export function useSpeak() {
  const [speaking, setSpeaking] = useState(false);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'id-ID';
      u.rate = 0.95;
      const v = window.speechSynthesis.getVoices().find((vo) => vo.lang.toLowerCase().startsWith('id'));
      if (v) u.voice = v;
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      setSpeaking(true);
      window.speechSynthesis.speak(u);
    },
    [supported],
  );

  return { supported, speaking, speak, stop };
}
