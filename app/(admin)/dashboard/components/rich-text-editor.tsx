"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Heading2 } from "lucide-react";

interface Props {
    value: string;
    onChange: (val: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const btnClass = (active: boolean) =>
        `p-2 rounded transition-colors ${active ? 'bg-brand-primary/10 text-brand-primary' : 'text-brand-neutrals-60 hover:bg-gray-100'}`;

    return (
        <div className="flex items-center gap-1 p-2 border-b border-brand-neutrals-20 bg-brand-neutrals-5/30">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={btnClass(editor.isActive("bold"))}
            >
                <Bold className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={btnClass(editor.isActive("italic"))}
            >
                <Italic className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={btnClass(editor.isActive("heading", { level: 2 }))}
            >
                <Heading2 className="size-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={btnClass(editor.isActive("bulletList"))}
            >
                <List className="size-4" />
            </button>
        </div>
    );
};

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose prose-sm focus:outline-none min-h-[200px] p-4 max-w-none font-ui text-brand-neutrals-80",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return <div className="w-full border border-brand-neutrals-20 h-[250px] bg-gray-50 animate-pulse" />;
    }

    return (
        <div className="w-full border border-brand-neutrals-20 rounded-sm overflow-hidden bg-white focus-within:border-brand-primary transition-colors">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}