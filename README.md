# Eslint rules for FSD (feature sliced design)

### 1. install the dependency

```bash
npm i -D @alisher_ari/eslint-pugin-fsd-rules
```

### 2. Add it to `plugins` section in your .eslintrc config file

```javascript
module.exports = {
    ...
    plugins: ['@alisher_ari/fsd-rules']
    ...
}
```

### 3. Add rules

```javascript
module.exports = {
    ...
    plugins: ['@alisher_ari/fsd-rules']
    ...
    rules: {
        ...
        '@alisher_ari/fsd-rules/layer-imports': 'error',
        '@alisher_ari/fsd-rules/public-api-imports': 'error',
        ...
    }
}
```

### It's done 🥳! Use it

> New rules will be added soon 🕥
