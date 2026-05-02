* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  min-height: 100%;
  background: #02070b;
  font-family: Georgia, "Times New Roman", serif;
}

/* Main background screen */
.vindex-screen {
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-image: url("vindex-bg.png");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;

  display: flex;
  align-items: flex-end;
  justify-content: center;

  padding: 24px;
  overflow: hidden;
}

/* Slight dark layer so buttons stay readable */
.dark-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
  pointer-events: none;
}

/* Button area */
.entry-panel {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  margin-bottom: 34px;
}

/* Main button */
.primary-btn,
.secondary-btn {
  width: 100%;
  padding: 16px 18px;

  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;

  cursor: pointer;
}

/* Gold button */
.primary-btn {
  border: 1px solid #f1d28a;
  background: linear-gradient(135deg, #d8b76d, #9b7436);
  color: #071016;

  box-shadow:
    0 0 18px rgba(216, 183, 109, 0.35),
    inset 0 0 8px rgba(255, 255, 255, 0.18);
}

/* Dark outline button */
.secondary-btn {
  border: 1px solid #b9924e;
  background: rgba(0, 0, 0, 0.55);
  color: #d8b76d;

  box-shadow:
    0 0 12px rgba(0, 0, 0, 0.45),
    inset 0 0 8px rgba(216, 183, 109, 0.08);
}

.primary-btn:active,
.secondary-btn:active {
  transform: scale(0.98);
}

/* Small phone adjustment */
@media (max-width: 420px) {
  .entry-panel {
    margin-bottom: 26px;
  }

  .primary-btn,
  .secondary-btn {
    font-size: 14px;
    padding: 15px;
  }
    }
