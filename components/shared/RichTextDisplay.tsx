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

/**
 * Safely parse content for display - handles both plain text and JSON.
 */
function parseDisplayContent(content?: string | null) {
  if (!content || content.trim() === "") {
    return "";
  }

  try {
    const parsed = JSON.parse(content);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
  } catch (e) {
    // Plain text - convert to Tiptap JSON
    const paragraphs = content.split("\n\n").filter((p) => p.trim());
    return {
      type: "doc",
      content:
        paragraphs.length > 0
          ? paragraphs.map((para) => ({
              type: "paragraph",
              content: [{ type: "text", text: para.trim() }],
            }))
          : [{ type: "paragraph" }],
    };
  }

  return content;
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
    content: parseDisplayContent(content),
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
