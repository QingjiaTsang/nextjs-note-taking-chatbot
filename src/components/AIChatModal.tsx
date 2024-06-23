import React, { FC, useEffect, useRef } from "react";
import { Message, useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, Trash, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

type TProps = {
  open: boolean;
  onClose: () => void;
};

const AIChatModal: FC<TProps> = ({ open, onClose }) => {
  const {
    messages,
    setMessages,
    error,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-50 w-full max-w-[500px] lg:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <div className="flex">
        <button className="ms-auto p-1" onClick={onClose}>
          <XCircle size={30} />
        </button>
      </div>

      <div className="flex h-[500px] flex-col rounded border border-gray-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
        <div ref={scrollRef} className="flex-1 overflow-y-scroll scroll-smooth">
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              <ChatMessage message={m} />
            </div>
          ))}

          {isLoading && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Loading...",
              }}
            />
          )}

          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: `Error: ${error.message}. Please try again later.`,
              }}
            />
          )}

          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center gap-2 text-lg font-bold">
              <Image
                src="/images/bot.png"
                alt="NoteBot"
                width={50}
                height={50}
              />
              Ask NoteBot questions!
            </div>
          )}
        </div>

        <form className="m-3 flex gap-1" onSubmit={handleSubmit}>
          <Button
            type="button"
            variant={"destructive"}
            className="mx-1 h-10 w-10 shrink-0 p-1"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
};

const ChatMessage = ({
  message: { role, content },
}: {
  message: Omit<Message, "id">;
}) => {
  const { user } = useUser();
  const isUser = role === "user";

  return (
    <div
      className={`flex items-center ${isUser ? "justify-end" : "justify-start"} my-3`}
    >
      {!isUser && (
        <Image
          src="/images/robot-avatar.png"
          alt="NoteBot avatar"
          width={40}
          height={40}
          className="mr-2 shrink-0 rounded-full object-cover"
        />
      )}
      {/* {!isUser && <Bot className="mr-2 h-10 w-10 shrink-0 rounded-full" />} */}
      <div
        className={cn(
          "max-w-xs rounded-lg p-4 shadow-lg md:max-w-md lg:max-w-lg xl:max-w-xl",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground",
        )}
      >
        <p>{content}</p>
      </div>
      {isUser && (
        <Image
          src={user!.imageUrl}
          alt={user!.username! + "avatar"}
          width={40}
          height={40}
          className="ml-2 shrink-0 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default AIChatModal;
