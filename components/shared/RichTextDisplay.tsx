"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cn } from "@/lib/utils";

interface RichTextDisplayProps {
  content: string | null | undefined;
  className?: string;
}

export function RichTextDisplay({ content, className }: RichTextDisplayProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image,
    ],
    content: content ? JSON.parse(content) : "",
    editable: false,
    immediatelyRender: false,
  });

  if (!content) return null;

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "prose prose-sm max-w-none [&_.ProseMirror]:outline-none",
        className,
      )}
    />
  );
}
