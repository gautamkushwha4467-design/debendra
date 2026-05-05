@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
  font-family: 'Inter', sans-serif;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #f8fafc;
}

::selection {
  background: rgba(79, 70, 229, 0.2);
}

html {
  scroll-behavior: smooth;
}

button,
input,
textarea {
  font: inherit;
}

.bg-glow {
  background: radial-gradient(circle at top, rgba(79, 70, 229, 0.18), transparent 28%);
}
