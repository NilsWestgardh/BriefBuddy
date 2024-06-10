"use client";

// Hooks
import React, { 
  useState, 
  useEffect 
} from "react";
import { useFormContext } from "react-hook-form";
// Components
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
// Icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const loadingMessages = [
  "Sipping whiskey...",
  "Playing ping pong...",
  "Taking a long shower...",
  "Scribbling on a napkin...",
  "Thinking big...",
  "Considering my life choices...",
  "Dreaming of Cannes...",
  "Opening a fresh Moleskine...",
  "Listening to jazz...",
  "Staring out the window...",
  "Having a eureka moment...",
  "Crying in the breakroom...",
  "Making the logo bigger...",
  "Battling the blank page blues...",
  "Polishing a diamond in the rough...",
  "Waiting for the muse to show up...",
  "Drinking more coffee...",
];

type SubmitButtonProps = {
  cta: string;
  feedback: string;
  isGuest?: boolean;
};

export default function SubmitButton({ 
  cta,
  feedback,
  isGuest,
 }: SubmitButtonProps) {
  const {
    formState: { 
      isSubmitting, 
      isSubmitted, 
      isValid 
    },
  } = useFormContext();

  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setCurrentMessage((prevMessage) => {
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  return (
    <Button
      type="submit"
      variant="outlined"
      size="large"
      disabled={
        !isValid || 
        isSubmitting || 
        isGuest
      }
      color={isValid ? "primary" : "secondary"}
      endIcon={
        !isSubmitting ? <ArrowForwardIcon /> 
        : <CircularProgress
            color="primary"
            size={24}
          />
      }
      className="
        w-full
        hover:cursor-pointer
        justify-between
      "
    >
      {isSubmitting ? currentMessage : isSubmitted ? feedback : cta}
    </Button>
  );
};