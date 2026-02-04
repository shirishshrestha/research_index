"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { cn } from "@/lib/utils";

// Import styles for proper rendering
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

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
      StarterKit.configure({
        horizontalRule: false,
      }),
      HorizontalRule,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
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
