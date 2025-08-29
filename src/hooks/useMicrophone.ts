import { useState, useEffect } from 'react';

export const useMicrophone = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const startMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsListening(true);
        
        // Stop the tracks when the component unmounts
        return () => {
          stream.getTracks().forEach(track => track.stop());
        };
      } catch {
        console.log('Microphone access denied or not available');
        setIsListening(false);
      }
    };

    startMicrophoneAccess();
  }, []);

  return { isListening };
};