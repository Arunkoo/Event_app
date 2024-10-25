import { useState, useEffect } from "react";

const Typewriter = () => {
  const texts = ["Cultural", "Non-Tech", "Tech"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let timer;

    const fullText = texts[currentTextIndex];

    // Smooth typing effect with random typing speed for more natural effect
    if (!isDeleting && displayedText !== fullText) {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(Math.random() * (200 - 100) + 100);
      }, typingSpeed);
    }
    // Smooth deleting effect
    else if (isDeleting && displayedText !== "") {
      timer = setTimeout(() => {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }
    // When text is fully typed
    else if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1000);
    }
    // When text is fully deleted, move to the next text
    else if (isDeleting && displayedText === "") {
      setOpacity(0);
      setTimeout(() => {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setOpacity(1);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, typingSpeed, currentTextIndex, texts]);

  return (
    <div className="font-semibold font-[poppins] opacity-100 transition-opacity duration-300 ease-in-out inline-block leading-[32px] text-2xl md:text-6xl">
      <span
        style={{
          backgroundColor: "#d6f5d6", // Lighter green background for text
          padding: "2px 0", // Make the background match the line height
          display: "inline-block",
        }}
      >
        {displayedText}
      </span>
      <span
        style={{
          color: "green", // Green cursor (bar)
          backgroundColor: "transparent",
          fontWeight: "300",

          lineHeight: "2rem", // Ensure cursor height matches the text
        }}
      >
        |
      </span>
    </div>
  );
};

export default Typewriter;
