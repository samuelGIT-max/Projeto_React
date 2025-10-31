import type { ReactNode } from "react";
import React from "react";


type Props = {
    open: boolean;
    title?: string;
    children?: ReactNode;
    onClose(): void;
    onConfirm?(): void;
    confirmText?: string;
};

export default function Modal({
    open, title = "Confirmação", children,
    onClose, onConfirm, confirmText = "Confirmar",

}: Props) {
    if (!open) return null;
    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,.4)",
            display: "grid", placeItems: "center", zIndex: 50
        }}>
        <div style={{ background: "var(--card-bg,#fff)", color: "inherit", padding: 16, borderRadius: 12, minWidth: 320 }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <div style={{ margin: "12px 0" }}>{children}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose}>Cancelar</button>
          {onConfirm && <button onClick={onConfirm}>{confirmText}</button>}
        </div>
      </div>
    </div>
  );
}