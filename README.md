colocodo
========

Syntax highlight for command, html, javascript,css

## Usage
```html
<!-- colocodo default theme -->
<link rel="stylesheet" href="colocodo.css">
<!-- colocodo js module exports global namespace of Colo -->
<script src="colocodo.js"></script>
```

#### Auto Render
```html
<body>
    <script type="text/colo">
        body {margin: 0;}
    </script>
    <script type="text/colo-css">
        body {color:white;}
    </script>
</body>
```

#### Rendering API
```javascript
Colo.render([command | js | css | html], code);
// or
Colo.render(code) // auto detect syntax, but currently only support html and css detection.
```