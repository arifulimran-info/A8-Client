"use client";

export default function ConfirmModal({ open, title, message, confirmLabel, busy, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <dialog className="modal modal-open" role="alertdialog">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-3 opacity-80">{message}</p>
        <div className="modal-action">
          <button className="btn" onClick={onCancel} disabled={busy}>Cancel</button>
          <button className="btn btn-error" onClick={onConfirm} disabled={busy}>
            {busy && <span className="loading loading-spinner loading-xs" />}{confirmLabel}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={busy ? undefined : onCancel} />
    </dialog>
  );
}
