
[[toc]]

---

# Introduction

An introduction to Svelte reporposed from [here](https://svelte.dev/tutorial/svelte/welcome-to-svelte).


Svelte is a tool for building web applications. Like other user interface frameworks, it allows you to build your app _declaratively_ out of components that combine markup, styles and behaviours.

These components are _compiled_ into small, efficient JavaScript modules that eliminate overhead traditionally associated with UI frameworks.

## Your first component

In Svelte, an application is composed from one or more _components_. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file. The `App.svelte` file, open in the code editor to the right, is a simple component.

### Adding data

A component that just renders some static markup isn't very interesting. Let's add some data.

First, add a script tag to your component and declare a `name` variable:

```svelte
/// file: App.svelte
script>
  let name = 'Svelte';
</script>

<h1>Hello world!</h1>
```

Then, we can refer to `name` in the markup:

```svelte
/// file: App.svelte
<h1>Hello {name}!</h1>
```

Inside the curly braces, we can put any JavaScript we want. Try changing `name` to `name.toUpperCase()` for a shoutier greeting.

```svelte
/// file: App.svelte
<h1>Hello {name.toUpperCase()}!</h1>
```

## Dynamic attributes


Just like you can use curly braces to control text, you can use them to control element attributes.

Our image is missing a `src` — let's add one:

```svelte
/// file: App.svelte
<img src={src} />
```

That's better. But if you hover over the `<img>` in the editor, Svelte is giving us a warning:

```
`<img>` element should have an alt attribute
```

When building web apps, it's important to make sure that they're _accessible_ to the broadest possible userbase, including people with (for example) impaired vision or motion, or people without powerful hardware or good internet connections. Accessibility (shortened to a11y) isn't always easy to get right, but Svelte will help by warning you if you write inaccessible markup.

In this case, we're missing the `alt` attribute that describes the image for people using screenreaders, or people with slow or flaky internet connections that can't download the image. Let's add one:

```svelte
/// file: App.svelte
<img src={src} alt="A man dances." />
```

We can use curly braces _inside_ attributes. Try changing it to `"{name} dances."` — remember to declare a `name` variable in the `<script>` block.

### Shorthand attributes

It's not uncommon to have an attribute where the name and value are the same, like `src={src}`. Svelte gives us a convenient shorthand for these cases:

```svelte
/// file: App.svelte
<img {src} alt="{name} dances." />
```

## Styling

Just like in HTML, you can add a `<style>` tag to your component. Let's add some styles to the `<p>` element:

```svelte
/// file: App.svelte
<p>This is a paragraph.</p>

<style>
 p {
    color: goldenrod;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>
```

Importantly, these rules are _scoped to the component_. You won't accidentally change the style of `<p>` elements elsewhere in your app, as we'll see in the next step.

## Nested components

It would be impractical to put your entire app in a single component. Instead, we can import components from other files and include them in our markup.

Add a `<script>` tag to the top of `App.svelte` that imports `Nested.svelte`...

```svelte
/// file: App.svelte
<script>
  import Nested from './Nested.svelte';
</script>
```

...and include a `<Nested />` component:

```svelte
/// file: App.svelte
<p>This is a paragraph.</p>
<Nested />
```

Notice that even though `Nested.svelte` has a `<p>` element, the styles from `App.svelte` don't leak in.

> [!NOTE] Component names are capitalised, to distinguish them from HTML elements.

## HTML tags

Ordinarily, strings are inserted as plain text, meaning that characters like `<` and `>` have no special meaning.

But sometimes you need to render HTML directly into a component. For example, the words you're reading right now exist in a markdown file that gets included on this page as a blob of HTML.

In Svelte, you do this with the special `{@html ...}` tag:

```svelte
/// file: App.svelte
<p>{@html string}</p>
```

> [!NOTE] Important: Svelte doesn't perform any sanitization of the expression inside `{@html ...}` before it gets inserted into the DOM. This isn't an issue if the content is something you trust like an article you wrote yourself. However if it's some untrusted user content, e.g. a comment on an article, then it's critical that you manually escape it, otherwise you risk exposing your users to <a href="https://owasp.org/www-community/attacks/xss/" target="_blank">Cross-Site Scripting</a> (XSS) attacks.

# Reactivity

## State


At the heart of Svelte is a powerful system of _reactivity_ for keeping the DOM in sync with your application state — for example, in response to an event.

Make the `count` declaration reactive by wrapping the value with `$state(...)`:

```js
/// file: App.svelte
let count = $state(0);
```

This is called a _rune_, and it's how you tell Svelte that `count` isn't an ordinary variable. Runes look like functions, but they're not — when you use Svelte, they're part of the language itself.

All that's left is to implement `increment`:

```js
/// file: App.svelte
function increment() {
  count += 1;
}
```

## Deep state

As we saw in the previous exercise, state reacts to _reassignments_. But it also reacts to _mutations_ — we call this _deep reactivity_.

Make `numbers` a reactive array:

```js
/// file: App.svelte
let numbers = $state([1, 2, 3, 4]);
```

Now, when we change the array...

```js
/// file: App.svelte
function addNumber() {
  numbers[numbers.length] = numbers.length + 1;
}
```

...the component updates. Or better still, we can `push` to the array instead:

```js
/// file: App.svelte
function addNumber() {
  numbers.push(numbers.length + 1);
}
```

> [!NOTE] Deep reactivity is implemented using [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), and mutations to the proxy do not affect the original object.

## Derived state

Often, you will need to _derive_ state from other state. For this, we have the `$derived` rune:

```js
/// file: App.svelte
let numbers = $state([1, 2, 3, 4]);
let total = $derived(numbers.reduce((t, n) => t + n, 0));
```

We can now use this in our markup:

```svelte
/// file: App.svelte
<p>{numbers.join(' + ')} = {total}</p>
```

The expression inside the `$derived` declaration will be re-evaluated whenever its dependencies (in this case, just `numbers`) are updated. Unlike normal state, derived state is read-only.

## Inspecting state

It's often useful to be able to track the value of a piece of state as it changes over time.

Inside the `addNumber` function, we've added a `console.log` statement. But if you click the button and open the console drawer (using the button to the right of the URL bar), you'll see a warning, and a message saying the message could not be cloned.

That's because `numbers` is a reactive [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). There are a couple of things we can do. Firstly, we can create a non-reactive _snapshot_ of the state with `$state.snapshot(...)`:

```js
/// file: App.svelte
function addNumber() {
  numbers.push(numbers.length + 1);
  console.log($state.snapshot(numbers));
}
```

Alternatively, we can use the `$inspect` rune to automatically log a snapshot of the state whenever it changes. This code will automatically be stripped out of your production build:

```js
/// file: App.svelte
function addNumber() {
  numbers.push(numbers.length + 1);
  ---console.log($state.snapshot(numbers));---
}

$inspect(numbers);
```

You can customise how the information is displayed by using `$inspect(...).with(fn)` — for example, you can use `console.trace` to see where the state change originated from:

```js
/// file: App.svelte
$inspect(numbers).with(console.trace);
```

## Effects

So far we've talked about reactivity in terms of state. But that's only half of the equation — state is only reactive if something is _reacting_ to it, otherwise it's just a sparkling variable.

The thing that reacts is called an _effect_. You've already encountered effects — the ones that Svelte creates on your behalf to update the DOM in response to state changes — but you can also create your own with the `$effect` rune.

> [!NOTE] Most of the time, you shouldn't. `$effect` is best thought of as an escape hatch, rather than something to use frequently. If you can put your side effects in an [event handler](dom-events), for example, that's almost always preferable.

Let's say we want to use `setInterval` to keep track of how long the component has been mounted. Create the effect:

```svelte
/// file: App.svelte
<script>
  let elapsed = $state(0);
  let interval = $state(1000);

 $effect(() => {
    setInterval(() => {
      elapsed += 1;
    }, interval);
  });
</script>
```

Click the 'speed up' button a few times and notice that `elapsed` ticks up faster, because we're calling `setInterval` each time `interval` gets smaller.

If we then click the 'slow down' button... well, it doesn't work. That's because we're not clearing out the old intervals when the effect updates. We can fix that by returning a cleanup function:

```js
/// file: App.svelte
$effect(() => {
  const id = setInterval(() => {
    elapsed += 1;
  }, interval);

 return () => {
    clearInterval(id);
  };
});
```

The cleanup function is called immediately before the effect function re-runs when `interval` changes, and also when the component is destroyed.

If the effect function doesn't read any state when it runs, it will only run once, when the component mounts.

> [!NOTE] Effects do not run during server-side rendering.

## Universal reactivity

In the preceding exercises, we used runes to add reactivity inside components. But we can also use runes _outside_ components, for example to share some global state.

The `<Counter>` components in this exercise are all importing the `counter` object from `shared.js`. But it's a normal object, and as such nothing happens when you click the buttons. Wrap the object in `$state(...)`:

```js
/// file: shared.js
export const counter = $state({
  count: 0
});
```

This causes an error, because you can't use runes in normal `.js` files, only `.svelte.js` files. Let's fix that — rename the file to `shared.svelte.js`.

Then, update the import declaration in `Counter.svelte`:

```svelte
/// file: Counter.svelte
<script>
  import { counter } from './shared.svelte.js';
</script>
```

Now, when you click any button, all three update simultaneously.

> [!NOTE] You cannot export a `$state` declaration from a module if the declaration is reassigned (rather than just mutated), because the importers would have no way to know about it.

