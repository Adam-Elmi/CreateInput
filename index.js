function createInput({
  type = 'text',
  id = null,
  className = null,
  placeholder = '',
  name = '',
  value = '',
  required = false,
  parent = document.body,
  width = '320px',
  height = '40px',
  theme = 'default',
  responsive = true,
  style = {},
  attributes = {},
  customAttributes = {},
  ariaLabel = '',
  mask = null,
  events = {}
}) {
  const themes = {
    default: {
      background: '#ffffff',
      color: '#333333',
      border: '1px solid #cccccc',
      placeholderColor: '#999999'
    },
    dark: {
      background: '#333333',
      color: '#ffffff',
      border: '1px solid #555555',
      placeholderColor: '#aaaaaa'
    },
    blue: {
      background: '#e3f2fd',
      color: '#1565c0',
      border: '1px solid #2196f3',
      placeholderColor: '#64b5f6'
    },
    green: {
      background: '#e8f5e9',
      color: '#2e7d32',
      border: '1px solid #4caf50',
      placeholderColor: '#81c784'
    },
    purple: {
      background: '#f3e5f5',
      color: '#6a1b9a',
      border: '1px solid #9c27b0',
      placeholderColor: '#ba68c8'
    },
    orange: {
      background: '#fff3e0',
      color: '#e65100',
      border: '1px solid #ff9800',
      placeholderColor: '#ffb74d'
    },
    teal: {
      background: '#e0f2f1',
      color: '#00695c',
      border: '1px solid #009688',
      placeholderColor: '#4db6ac'
    },
    pink: {
      background: '#fce4ec',
      color: '#c2185b',
      border: '1px solid #e91e63',
      placeholderColor: '#f06292'
    },
    gray: {
      background: '#f5f5f5',
      color: '#424242',
      border: '1px solid #9e9e9e',
      placeholderColor: '#bdbdbd'
    },
    indigo: {
      background: '#e8eaf6',
      color: '#283593',
      border: '1px solid #3f51b5',
      placeholderColor: '#7986cb'
    },
    sunsetGradient: {
      background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
      color: '#ffffff',
      border: '2px solid #ff7e5f',
      placeholderColor: 'rgba(255, 255, 255, 0.7)'
    },
    oceanGradient: {
      background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
      color: '#ffffff',
      border: '2px solid #2193b0',
      placeholderColor: 'rgba(255, 255, 255, 0.7)'
    },
    forestGradient: {
      background: 'linear-gradient(to right, #11998e, #38ef7d)',
      color: '#ffffff',
      border: '2px solid #11998e',
      placeholderColor: 'rgba(255, 255, 255, 0.7)'
    },
    lavenderGradient: {
      background: 'linear-gradient(to right, #834d9b, #d04ed6)',
      color: '#ffffff',
      border: '2px solid #834d9b',
      placeholderColor: 'rgba(255, 255, 255, 0.7)'
    },
    sunriseGradient: {
      background: 'linear-gradient(to right, #f857a6, #ff5858)',
      color: '#ffffff',
      border: '2px solid #f857a6',
      placeholderColor: 'rgba(255, 255, 255, 0.7)'
    }
  };

  const inputElement = document.createElement('input');
  
  // Set standard properties
  inputElement.type = type;
  if (id) inputElement.id = id;
  if (className) inputElement.className = className;
  inputElement.placeholder = placeholder;
  inputElement.name = name;
  inputElement.value = value;
  inputElement.required = required;
  
  // Accessibility
  if (ariaLabel) {
    inputElement.setAttribute('aria-label', ariaLabel);
  }
  
  // Apply theme styles
  const themeStyle = themes[theme] || themes.default;
  
  // Apply modern default styles
  const defaultStyle = {
    width,
    height,
    background: themeStyle.background,
    color: themeStyle.color,
    border: themeStyle.border,
    borderRadius: '4px',
    padding: '0 12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };
  
  // Merge default styles with custom styles
  Object.assign(inputElement.style, defaultStyle, style);
  
  // Set placeholder color
  inputElement.style.setProperty('--placeholder-color', themeStyle.placeholderColor);
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    #${id}::placeholder {
      color: var(--placeholder-color);
    }
    #${id}:focus {
      box-shadow: 0 0 0 3px ${themeStyle.border.split(' ')[2]}40;
      border-color: ${themeStyle.border.split(' ')[2]};
    }
  `;
  
  // Add responsive styles if enabled
  if (responsive) {
    styleElement.textContent += `
      @media (max-width: 768px) {
        #${id} {
          width: 100% !important;
          font-size: clamp(14px, 2.5vw, 16px);
          height: clamp(30px, 5vw, 40px);
          padding: clamp(5px, 1vw, 12px);
        }
      }
    `;
  }
  
  document.head.appendChild(styleElement);
  
  // Input masking
  if (mask) {
    inputElement.addEventListener('input', (e) => {
      e.target.value = mask(e.target.value);
    });
  }
  
  // Event handling
  for (const [eventName, handler] of Object.entries(events)) {
    inputElement.addEventListener(eventName, handler);
  }
  
  // Set additional standard attributes
  for (const [key, value] of Object.entries(attributes)) {
    inputElement[key] = value;
  }
  
  // Set custom attributes
  for (const [key, value] of Object.entries(customAttributes)) {
    inputElement.setAttribute(key, value);
  }
  
  // Add data-custom-input attribute
  inputElement.setAttribute('data-custom-input', '');
  
  parent.appendChild(inputElement);
  
  // Return an object with the element and its properties
  return {
    element: inputElement,
    id,
    className,
    type,
    name,
    value,
    required,
    setTheme: (newTheme) => {
      const newThemeStyle = themes[newTheme] || themes.default;
      inputElement.style.background = newThemeStyle.background;
      inputElement.style.color = newThemeStyle.color;
      inputElement.style.border = newThemeStyle.border;
      inputElement.style.setProperty('--placeholder-color', newThemeStyle.placeholderColor);
      styleElement.textContent = styleElement.textContent.replace(
        /box-shadow: 0 0 0 3px .*?;/,
        `box-shadow: 0 0 0 3px ${newThemeStyle.border.split(' ')[2]}40;`
      );
      styleElement.textContent = styleElement.textContent.replace(
        /border-color: .*?;/,
        `border-color: ${newThemeStyle.border.split(' ')[2]};`
      );
    },
    setValue: (newValue) => {
      inputElement.value = newValue;
    }
  };
}
