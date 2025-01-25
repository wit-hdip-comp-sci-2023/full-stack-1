# Svelte 

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
script>
  let name = 'Svelte';
</script>

<h1>Hello world!</h1>
```

Then, we can refer to `name` in the markup:

```svelte
<h1>Hello {name}!</h1>
```

Inside the curly braces, we can put any JavaScript we want. Try changing `name` to `name.toUpperCase()` for a shoutier greeting.

```svelte
<h1>Hello {name.toUpperCase()}!</h1>
```

## Dynamic attributes


Just like you can use curly braces to control text, you can use them to control element attributes.

Our image is missing a `src` — let's add one:

```svelte
<img src={src} />
```

That's better. But if you hover over the `<img>` in the editor, Svelte is giving us a warning:

```
`<img>` element should have an alt attribute
```

When building web apps, it's important to make sure that they're _accessible_ to the broadest possible userbase, including people with (for example) impaired vision or motion, or people without powerful hardware or good internet connections. Accessibility (shortened to a11y) isn't always easy to get right, but Svelte will help by warning you if you write inaccessible markup.

In this case, we're missing the `alt` attribute that describes the image for people using screenreaders, or people with slow or flaky internet connections that can't download the image. Let's add one:

```svelte
<img src={src} alt="A man dances." />
```

We can use curly braces _inside_ attributes. Try changing it to `"{name} dances."` — remember to declare a `name` variable in the `<script>` block.

### Shorthand attributes

It's not uncommon to have an attribute where the name and value are the same, like `src={src}`. Svelte gives us a convenient shorthand for these cases:

```svelte
<img {src} alt="{name} dances." />
```

## Styling

Just like in HTML, you can add a `<style>` tag to your component. Let's add some styles to the `<p>` element:

```svelte
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
<script>
  import Nested from './Nested.svelte';
</script>
```

...and include a `<Nested />` component:

```svelte
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
<p>{@html string}</p>
```

> [!NOTE] Important: Svelte doesn't perform any sanitization of the expression inside `{@html ...}` before it gets inserted into the DOM. This isn't an issue if the content is something you trust like an article you wrote yourself. However if it's some untrusted user content, e.g. a comment on an article, then it's critical that you manually escape it, otherwise you risk exposing your users to <a href="https://owasp.org/www-community/attacks/xss/" target="_blank">Cross-Site Scripting</a> (XSS) attacks.

# Reactivity

## State


At the heart of Svelte is a powerful system of _reactivity_ for keeping the DOM in sync with your application state — for example, in response to an event.

Make the `count` declaration reactive by wrapping the value with `$state(...)`:

```js
let count = $state(0);
```

This is called a _rune_, and it's how you tell Svelte that `count` isn't an ordinary variable. Runes look like functions, but they're not — when you use Svelte, they're part of the language itself.

All that's left is to implement `increment`:

```js
function increment() {
  count += 1;
}
```

## Deep state

As we saw in the previous exercise, state reacts to _reassignments_. But it also reacts to _mutations_ — we call this _deep reactivity_.

Make `numbers` a reactive array:

```js
let numbers = $state([1, 2, 3, 4]);
```

Now, when we change the array...

```js
function addNumber() {
  numbers[numbers.length] = numbers.length + 1;
}
```

...the component updates. Or better still, we can `push` to the array instead:

```js
function addNumber() {
  numbers.push(numbers.length + 1);
}
```

> [!NOTE] Deep reactivity is implemented using [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), and mutations to the proxy do not affect the original object.

## Derived state

Often, you will need to _derive_ state from other state. For this, we have the `$derived` rune:

```js
let numbers = $state([1, 2, 3, 4]);
let total = $derived(numbers.reduce((t, n) => t + n, 0));
```

We can now use this in our markup:

```svelte
<p>{numbers.join(' + ')} = {total}</p>
```

The expression inside the `$derived` declaration will be re-evaluated whenever its dependencies (in this case, just `numbers`) are updated. Unlike normal state, derived state is read-only.

## Inspecting state

It's often useful to be able to track the value of a piece of state as it changes over time.

Inside the `addNumber` function, we've added a `console.log` statement. But if you click the button and open the console drawer (using the button to the right of the URL bar), you'll see a warning, and a message saying the message could not be cloned.

That's because `numbers` is a reactive [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). There are a couple of things we can do. Firstly, we can create a non-reactive _snapshot_ of the state with `$state.snapshot(...)`:

```js
function addNumber() {
  numbers.push(numbers.length + 1);
  console.log($state.snapshot(numbers));
}
```

Alternatively, we can use the `$inspect` rune to automatically log a snapshot of the state whenever it changes. This code will automatically be stripped out of your production build:

```js
function addNumber() {
  numbers.push(numbers.length + 1);
  ---console.log($state.snapshot(numbers));---
}

$inspect(numbers);
```

You can customise how the information is displayed by using `$inspect(...).with(fn)` — for example, you can use `console.trace` to see where the state change originated from:

```js
$inspect(numbers).with(console.trace);
```

## Effects

So far we've talked about reactivity in terms of state. But that's only half of the equation — state is only reactive if something is _reacting_ to it, otherwise it's just a sparkling variable.

The thing that reacts is called an _effect_. You've already encountered effects — the ones that Svelte creates on your behalf to update the DOM in response to state changes — but you can also create your own with the `$effect` rune.

> [!NOTE] Most of the time, you shouldn't. `$effect` is best thought of as an escape hatch, rather than something to use frequently. If you can put your side effects in an [event handler](dom-events), for example, that's almost always preferable.

Let's say we want to use `setInterval` to keep track of how long the component has been mounted. Create the effect:

```svelte
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
export const counter = $state({
  count: 0
});
```

This causes an error, because you can't use runes in normal `.js` files, only `.svelte.js` files. Let's fix that — rename the file to `shared.svelte.js`.

Then, update the import declaration in `Counter.svelte`:

```svelte
<script>
  import { counter } from './shared.svelte.js';
</script>
```

Now, when you click any button, all three update simultaneously.

> [!NOTE] You cannot export a `$state` declaration from a module if the declaration is reassigned (rather than just mutated), because the importers would have no way to know about it.

# Props

## Declaring props

So far, we've dealt exclusively with internal state — that is to say, the values are only accessible within a given component.

In any real application, you'll need to pass data from one component down to its children. To do that, we need to declare _properties_, generally shortened to 'props'. In Svelte, we do that with the `$props` rune. Edit the `Nested.svelte` component:

```svelte
<script>
  let { answer } = $props();
</script>
```

## Default values

We can easily specify default values for props in `Nested.svelte`:

```svelte
<script>
  let { answer = 'a mystery' } = $props();
</script>
```

If we now add a second component _without_ an `answer` prop, it will fall back to the default:

```svelte
<Nested answer={42}/>
<Nested />
```

## Spread props

In this exercise, in `App.svelte` we've forgotten to pass the `name` prop expected by `PackageInfo.svelte`, meaning the `<code>` element is empty and the npm link is broken.

We _could_ fix it by adding the prop...

```svelte
<PackageInfo
  name={pkg.name}
  version={pkg.version}
  description={pkg.description}
  website={pkg.website}
/>
```

...but since the properties of `pkg` correspond to the component's expected props, we can 'spread' them onto the component instead:

```svelte
<PackageInfo {...pkg} />
```

> [!NOTE] Conversely, in `PackageInfo.svelte` you can get an object containing all the props that were passed into a component using a rest property...
>
> ```js
> let { name, ...stuff } = $props();
> ```
>
> ...or by skipping [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) altogether:
>
> ```js
> let stuff = $props();
> ```
>
> ...in which case you can access the properties by their object paths:
>
> ```js
> console.log(stuff.name, stuff.version, stuff.description, stuff.website);
> ```

# Logic

## If blocks


HTML doesn't have a way of expressing _logic_, like conditionals and loops. Svelte does.

To conditionally render some markup, we wrap it in an `if` block. Let's add some text that appears when `count` is greater than `10`:

```svelte
<button onclick={increment}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
  <p>{count} is greater than 10</p>
{/if}
```


## Else blocks

Just like in JavaScript, an `if` block can have an `else` block:

```svelte
{#if count > 10}
  <p>{count} is greater than 10</p>
{:else}
  <p>{count} is between 0 and 10</p>
{/if}
```

`{#...}` opens a block. `{/...}` closes a block. `{:...}` _continues_ a block. Congratulations — you've already learned almost all the syntax Svelte adds to HTML.


## Else-if blocks

Multiple conditions can be 'chained' together with `else if`:

```svelte

{#if count > 10}
  <p>{count} is greater than 10</p>
{:else if count < 5}
  <p>{count} is less than 5</p>
{:else}
  <p>{count} is between 5 and 10</p>
{/if}
```

## Each blocks

When building user interfaces you'll often find yourself working with lists of data. In this exercise, we've repeated the `<button>` markup multiple times — changing the colour each time — but there's still more to add.

Instead of laboriously copying, pasting and editing, we can get rid of all but the first button, then use an `each` block:

```svelte
<div>
  {#each colors as color}
    <button
      style="background: red"
      aria-label="red"
      aria-current={selected === 'red'}
      onclick={() => selected = 'red'}
    ></button>
  {/each}
</div>
```

> [!NOTE] The expression (`colors`, in this case) can be any iterable or array-like object — in other words, anything that works with [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

Now we need to use the `color` variable in place of `"red"`:

```svelte
<div>
  {#each colors as color}
    <button
      style="background: {color}"
      aria-label={color}
      aria-current={selected === color}
      onclick={() => selected = color}
    ></button>
  {/each}
</div>
```

You can get the current _index_ as a second argument, like so:

```svelte
<div>
  {#each colors as color, i}
    <button
      style="background: {color}"
      aria-label={color}
      aria-current={selected === color}
      onclick={() => selected = color}
    >{i + 1}</button>
  {/each}
</div>
```

## Keyed each blocks

By default, when you modify the value of an `each` block, it will add and remove DOM nodes at the _end_ of the block, and update any values that have changed. That might not be what you want.

It's easier to show why than to explain. Inside `Thing.svelte`, `name` is a dynamic prop but `emoji` is a constant.

Click the 'Remove first thing' button a few times, and notice what happens:

1. It removes the last component.
2. It then updates the `name` value in the remaining DOM nodes, but not the emoji.

> [!NOTE] If you're coming from React, this might seem strange, because you're used to the entire component re-rendering when state changes. Svelte works differently: the component 'runs' once, and subsequent updates are 'fine-grained'. This makes things faster and gives you more control.

One way to fix it would be to make `emoji` a [`$derived`](derived-state) value. But it makes more sense to remove the first `<Thing>` component altogether rather than remove the _last_ one and update all the others.

To do that, we specify a unique _key_ for each iteration of the `each` block:

```svelte
{#each things as thing (thing.id)}
  <Thing name={thing.name}/>
{/each}
```

> [!NOTE] You can use any object as the key, as Svelte uses a `Map` internally — in other words you could do `(thing)` instead of `(thing.id)`. Using a string or number is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.

## Await blocks

Most web applications have to deal with asynchronous data at some point. Svelte makes it easy to _await_ the value of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) directly in your markup:

```svelte
{#await promise}
  <p>...rolling</p>
{:then number}
  <p>you rolled a {number}!</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
```

> [!NOTE] Only the most recent `promise` is considered, meaning you don't need to worry about race conditions.

If you know that your promise can't reject, you can omit the `catch` block. You can also omit the first block if you don't want to show anything until the promise resolves:

```svelte
{#await promise then number}
  <p>you rolled a {number}!</p>
{/await}
```

# Events

## DOM events

As we've briefly seen already, you can listen to any DOM event on an element (such as click or [pointermove](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event)) with an `on<name>` function:

```svelte
<div onpointermove={onpointermove}>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>
```

Like with any other property where the name matches the value, we can use the short form:

```svelte
<div {onpointermove}>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>
```

## Inline handlers

You can also declare event handlers inline:

```svelte

<script>
  let m = $state({ x: 0, y: 0 });

  ---function onpointermove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }---
</script>

<div
  onpointermove={(event) => {
    m.x = event.clientX;
    m.y = event.clientY;
  }}
>
  The pointer is at {m.x} x {m.y}
</div>
```

## Capturing

Normally, event handlers run during the [_bubbling_](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling) phase. Notice what happens if you type something into the `<input>` in this example — the inner handler runs first, as the event 'bubbles' from the target up to the document, followed by the outer handler.

Sometimes, you want handlers to run during the _capture_ phase instead. Add `capture` to the end of the event name:

```svelte
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
  <input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>
```

Now, the relative order is reversed. If both capturing and non-capturing handlers exist for a given event, the capturing handlers will run first.

## Component events

You can pass event handlers to components like any other prop. In `Stepper.svelte`, add `increment` and `decrement` props...

```svelte
<script>
  let { increment, decrement } = $props();
</script>
```

...and wire them up:

```svelte
<button onclick={decrement}>-1</button>
<button onclick={increment}>+1</button>
```

In `App.svelte`, define the handlers:

```svelte
<Stepper
  increment={() => value += 1}
  decrement={() => value -= 1}
/>
```

## Spreading events

We can also [spread](spread-props) event handlers directly onto elements. Here, we've defined an `onclick` handler in `App.svelte` — all we need to do is pass the props to the `<button>` in `BigRedButton.svelte`:

```svelte
<button +++{...props}+++>
  Push
</button>
```


