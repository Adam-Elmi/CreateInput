# createInput - Easy Custom Input Creator

Part of nobleTools, `createInput` is a simple way to make fancy input fields for your website.

## What it does

- Makes input boxes with cool styles
- Works on phones and computers
- Easy to change colors and looks
- Helps make your forms more accessible

## Syntax

```javascript
const inputElement = createInput(options);
```

## Parameters

The `options` object can include:

- `type`: String - Input type (e.g., 'text', 'email', 'password')
- `id`: String - Unique identifier for the input
- `placeholder`: String - Hint text inside the box
- `theme`: String - Color style (e.g., 'blue', 'dark', 'sunsetGradient')
- `required`: Boolean - Set to `true` if input is mandatory
- `width`: String - Width of the input box (e.g., '200px', '100%')
- `height`: String - Height of the input box (e.g., '40px')

## How to use it

```javascript
const emailBox = createInput({
  type: 'email',
  id: 'email-box',
  placeholder: 'Your email here',
  theme: 'blue'
});

// Change the look anytime
emailBox.setTheme('green');
```

## Cool features

- Lots of ready-made color themes
- Makes inputs look good on all devices
- Easy to add special behaviors (like password masking)
- Helps make your forms easier to use for everyone

## Example

```javascript
const passwordBox = createInput({
  type: 'password',
  id: 'password-box',
  placeholder: 'Enter password',
  theme: 'dark',
  required: true
});

// Add it to your form
document.getElementById('my-form').appendChild(passwordBox.element);
```

This tool is part of nobleTools - a collection of handy tools to make web development easier!
