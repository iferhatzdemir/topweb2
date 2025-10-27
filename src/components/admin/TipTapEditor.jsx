"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./TipTapEditor.module.css";

const COMMANDS = [
  { id: "bold", label: "Kalın", icon: "B", command: "bold" },
  { id: "italic", label: "İtalik", icon: "I", command: "italic" },
  { id: "underline", label: "Altı Çizili", icon: "U", command: "underline" },
  { id: "strike", label: "Üstü Çizili", icon: "S", command: "strikeThrough" },
  { id: "heading", label: "Başlık", icon: "H2", command: "formatBlock", value: "h2" },
  { id: "quote", label: "Alıntı", icon: "❝", command: "formatBlock", value: "blockquote" },
  { id: "ol", label: "Sıralı", icon: "1.", command: "insertOrderedList" },
  { id: "ul", label: "Sırasız", icon: "•", command: "insertUnorderedList" },
];

const TipTapEditor = ({ value = "", onChange, placeholder = "İçeriğinizi yazmaya başlayın..." }) => {
  const editorRef = useRef(null);
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (editor.innerHTML !== internalValue) {
      editor.innerHTML = internalValue || "";
    }
  }, [internalValue]);

  const exec = (command, commandValue) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, commandValue);
    const nextValue = editor.innerHTML;
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleInput = () => {
    const nextValue = editorRef.current?.innerHTML ?? "";
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const handleClear = () => {
    setInternalValue("");
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      editorRef.current.focus();
    }
    onChange?.("");
  };

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.toolbar} role="toolbar" aria-label="Metin biçimlendirme araç çubuğu">
        {COMMANDS.map((item) => (
          <Button
            key={item.id}
            variant="neutral"
            tone="ghost"
            size="sm"
            onClick={() => exec(item.command, item.value)}
          >
            {item.icon}
          </Button>
        ))}
        <Button variant="neutral" tone="ghost" size="sm" onClick={handleClear}>
          Temizle
        </Button>
      </div>
      <div
        ref={editorRef}
        className={styles.editor}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Zengin metin düzenleyici"
        data-placeholder={placeholder}
      />
      {!internalValue && !isFocused ? (
        <span className={styles.placeholder}>{placeholder}</span>
      ) : null}
    </div>
  );
};

export default TipTapEditor;
