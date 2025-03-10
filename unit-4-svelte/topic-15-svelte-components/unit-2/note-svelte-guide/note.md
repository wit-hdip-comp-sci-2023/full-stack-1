---
icon:
  type: vscode-icons:file-type-svelteconfig
---

# Svelte 

The Svelte Tutorial as a single note

[[toc]]

---

# Components

An introduction to Svelte reporposed from [here](https://svelte.dev/tutorial/svelte/welcome-to-svelte).


Svelte is a tool for building web applications. Like other user interface frameworks, it allows you to build your app _declaratively_ out of components that combine markup, styles and behaviours.

These components are _compiled_ into small, efficient JavaScript modules that eliminate overhead traditionally associated with UI frameworks.

## Your first component

In Svelte, an application is composed from one or more _components_. A component is a reusable self-contained block of code that encapsulates HTML, CSS and JavaScript that belong together, written into a `.svelte` file. The `App.svelte` file, open in the code editor to the right, is a simple component.

### Adding data

A component that just renders some static markup isn't very interesting. Let's add some data.

First, add a script tag to your component and declare a `name` variable:

#### App.svelte

~~~svelte
<script>
  let name = 'Svelte';
</script>

<h1>Hello world!</h1>
~~~

Then, we can refer to `name` in the markup:

~~~svelte
<h1>Hello {name}!</h1>
~~~

Inside the curly braces, we can put any JavaScript we want. Try changing `name` to `name.toUpperCase()` for a shoutier greeting.

~~~svelte
<h1>Hello {name.toUpperCase()}!</h1>
~~~

#### App.svelte

~~~svelte
<script>
	let name = 'Svelte';
</script>

<h1>Hello {name.toUpperCase()}!</h1>
~~~


## Dynamic attributes


Just like you can use curly braces to control text, you can use them to control element attributes.

Our image is missing a `src` — let's add one:

~~~svelte
<img src={src} />
~~~

That's better. But if you hover over the `<img>` in the editor, Svelte is giving us a warning:

~~~
`<img>` element should have an alt attribute
~~~

When building web apps, it's important to make sure that they're _accessible_ to the broadest possible userbase, including people with (for example) impaired vision or motion, or people without powerful hardware or good internet connections. Accessibility (shortened to a11y) isn't always easy to get right, but Svelte will help by warning you if you write inaccessible markup.

In this case, we're missing the `alt` attribute that describes the image for people using screenreaders, or people with slow or flaky internet connections that can't download the image. Let's add one:

~~~svelte
<img src={src} alt="A man dances." />
~~~

We can use curly braces _inside_ attributes. Try changing it to `"{name} dances."` — remember to declare a `name` variable in the `<script>` block.

### Shorthand attributes

It's not uncommon to have an attribute where the name and value are the same, like `src={src}`. Svelte gives us a convenient shorthand for these cases:

~~~svelte
<img {src} alt="{name} dances." />
~~~

#### App.svelte

~~~svelte
<script>
  let src = '/tutorial/image.gif';
  let name = 'Rick Astley';
</script>

<img {src} alt="{name} dances." />
~~~

## Styling

Just like in HTML, you can add a `<style>` tag to your component. Let's add some styles to the `<p>` element:

~~~svelte
<p>This is a paragraph.</p>

<style>
 p {
    color: goldenrod;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>
~~~

Importantly, these rules are _scoped to the component_. You won't accidentally change the style of `<p>` elements elsewhere in your app, as we'll see in the next step.

#### App.svelte

~~~svelte
<p>This is a paragraph.</p>

<style>
  p {
    color: goldenrod;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>
~~~

![](img/00.png)

## Nested components

It would be impractical to put your entire app in a single component. Instead, we can import components from other files and include them in our markup.

Add a `<script>` tag to the top of `App.svelte` that imports `Nested.svelte`...

~~~svelte
<script>
  import Nested from './Nested.svelte';
</script>
~~~

...and include a `<Nested />` component:

~~~svelte
<p>This is a paragraph.</p>
<Nested />
~~~

Notice that even though `Nested.svelte` has a `<p>` element, the styles from `App.svelte` don't leak in.

> [!NOTE] Component names are capitalised, to distinguish them from HTML elements.

#### Nested.svelte

~~~svelte
<p>This is another paragraph.</p>
~~~

#### App.svelte

~~~svelte
<script>
  import Nested from './Nested.svelte';
</script>

<p>This is a paragraph.</p>
<Nested />

<style>
  p {
    color: goldenrod;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>
~~~

![](img/01.png)


## HTML tags

Ordinarily, strings are inserted as plain text, meaning that characters like `<` and `>` have no special meaning.

But sometimes you need to render HTML directly into a component. For example, the words you're reading right now exist in a markdown file that gets included on this page as a blob of HTML.

In Svelte, you do this with the special `{@html ...}` tag:

~~~svelte
<p>{@html string}</p>
~~~

> [!NOTE] Important: Svelte doesn't perform any sanitization of the expression inside `{@html ...}` before it gets inserted into the DOM. This isn't an issue if the content is something you trust like an article you wrote yourself. However if it's some untrusted user content, e.g. a comment on an article, then it's critical that you manually escape it, otherwise you risk exposing your users to <a href="https://owasp.org/www-community/attacks/xss/" target="_blank">Cross-Site Scripting</a> (XSS) attacks.


#### App.svelte

~~~svelte
<script>
  let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
~~~

![](img/02.png)

# Reactivity

## State

At the heart of Svelte is a powerful system of _reactivity_ for keeping the DOM in sync with your application state — for example, in response to an event.

Make the `count` declaration reactive by wrapping the value with `$state(...)`:

~~~js
let count = $state(0);
~~~

This is called a _rune_, and it's how you tell Svelte that `count` isn't an ordinary variable. Runes look like functions, but they're not — when you use Svelte, they're part of the language itself.

All that's left is to implement `increment`:

~~~js
function increment() {
  count += 1;
}
~~~

#### App.svelte

~~~svelte
<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>
~~~

![](img/03.png)

## Deep state

As we saw in the previous exercise, state reacts to _reassignments_. But it also reacts to _mutations_ — we call this _deep reactivity_.

Make `numbers` a reactive array:

~~~js
let numbers = $state([1, 2, 3, 4]);
~~~

Now, when we change the array...

~~~js
function addNumber() {
  numbers[numbers.length] = numbers.length + 1;
}
~~~

...the component updates. Or better still, we can `push` to the array instead:

~~~js
function addNumber() {
  numbers.push(numbers.length + 1);
}
~~~

> [!NOTE] Deep reactivity is implemented using [proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), and mutations to the proxy do not affect the original object.


#### App.svelte
~~~svelte
<script>
  let numbers = $state([1, 2, 3, 4]);

  function addNumber() {
    numbers.push(numbers.length + 1);
  }
</script>

<p>{numbers.join(' + ')} = ...</p>

<button onclick={addNumber}>
  Add a number
</button>
~~~

![](img/04.png)

## Derived state

Often, you will need to _derive_ state from other state. For this, we have the `$derived` rune:

~~~js
let numbers = $state([1, 2, 3, 4]);
let total = $derived(numbers.reduce((t, n) => t + n, 0));
~~~

We can now use this in our markup:

~~~svelte
<p>{numbers.join(' + ')} = {total}</p>
~~~

The expression inside the `$derived` declaration will be re-evaluated whenever its dependencies (in this case, just `numbers`) are updated. Unlike normal state, derived state is read-only.

### App.svelte

~~~svelte
<script>
  let numbers = $state([1, 2, 3, 4]);
  let total = $derived(numbers.reduce((t, n) => t + n, 0));

  function addNumber() {
    numbers.push(numbers.length + 1);
  }
</script>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick={addNumber}>
  Add a number
</button>
~~~


## Inspecting state

It's often useful to be able to track the value of a piece of state as it changes over time.

Inside the `addNumber` function, we've added a `console.log` statement. But if you click the button and open the console drawer (using the button to the right of the URL bar), you'll see a warning, and a message saying the message could not be cloned.

That's because `numbers` is a reactive [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). There are a couple of things we can do. Firstly, we can create a non-reactive _snapshot_ of the state with `$state.snapshot(...)`:

~~~js
function addNumber() {
  numbers.push(numbers.length + 1);
  console.log($state.snapshot(numbers));
}
~~~

Alternatively, we can use the `$inspect` rune to automatically log a snapshot of the state whenever it changes. This code will automatically be stripped out of your production build:

~~~js
function addNumber() {
  numbers.push(numbers.length + 1);
  ---console.log($state.snapshot(numbers));---
}

$inspect(numbers);
~~~

You can customise how the information is displayed by using `$inspect(...).with(fn)` — for example, you can use `console.trace` to see where the state change originated from:

~~~js
$inspect(numbers).with(console.trace);
~~~

#### App.svelte
~~~svelte
<script>
  let numbers = $state([1, 2, 3, 4]);
  let total = $derived(numbers.reduce((t, n) => t + n, 0));

  function addNumber() {
    numbers.push(numbers.length + 1);
  }

  $inspect(numbers).with(console.trace);
</script>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick={addNumber}>
  Add a number
</button>
~~~

![](img/05.png)

#### Developer Console

![](img/06.png)

## Effects

So far we've talked about reactivity in terms of state. But that's only half of the equation — state is only reactive if something is _reacting_ to it, otherwise it's just a sparkling variable.

The thing that reacts is called an _effect_. You've already encountered effects — the ones that Svelte creates on your behalf to update the DOM in response to state changes — but you can also create your own with the `$effect` rune.

> [!NOTE] Most of the time, you shouldn't. `$effect` is best thought of as an escape hatch, rather than something to use frequently. If you can put your side effects in an [event handler](dom-events), for example, that's almost always preferable.

Let's say we want to use `setInterval` to keep track of how long the component has been mounted. Create the effect:

~~~svelte
<script>
  let elapsed = $state(0);
  let interval = $state(1000);

 $effect(() => {
    setInterval(() => {
      elapsed += 1;
    }, interval);
  });
</script>
~~~

Click the 'speed up' button a few times and notice that `elapsed` ticks up faster, because we're calling `setInterval` each time `interval` gets smaller.

If we then click the 'slow down' button... well, it doesn't work. That's because we're not clearing out the old intervals when the effect updates. We can fix that by returning a cleanup function:

~~~js
$effect(() => {
  const id = setInterval(() => {
    elapsed += 1;
  }, interval);

 return () => {
    clearInterval(id);
  };
});
~~~

The cleanup function is called immediately before the effect function re-runs when `interval` changes, and also when the component is destroyed.

If the effect function doesn't read any state when it runs, it will only run once, when the component mounts.

> [!NOTE] Effects do not run during server-side rendering.

### App.svelte

~~~svelte
<script>
  let elapsed = $state(0);
  let interval = $state(1000);

  $effect(() => {
    const id = setInterval(() => {
      elapsed += 1;
    }, interval);

    return () => {
      clearInterval(id);
    };
  });
</script>

<button onclick={() => interval /= 2}>speed up</button>
<button onclick={() => interval *= 2}>slow down</button>

<p>elapsed: {elapsed}</p>
~~~

![](img/07.png)

## Universal reactivity

In the preceding exercises, we used runes to add reactivity inside components. But we can also use runes _outside_ components, for example to share some global state.

The `<Counter>` components in this exercise are all importing the `counter` object from `shared.js`. But it's a normal object, and as such nothing happens when you click the buttons. Wrap the object in `$state(...)`:

~~~js
export const counter = $state({
  count: 0
});
~~~

This causes an error, because you can't use runes in normal `.js` files, only `.svelte.js` files. Let's fix that — rename the file to `shared.svelte.js`.

Then, update the import declaration in `Counter.svelte`:

~~~svelte
<script>
  import { counter } from './shared.svelte.js';
</script>
~~~

Now, when you click any button, all three update simultaneously.

> [!NOTE] You cannot export a `$state` declaration from a module if the declaration is reassigned (rather than just mutated), because the importers would have no way to know about it.


#### shared.svelte.ts

~~~javascript
export const counter = $state({
  count: 0
});
~~~

#### Counter.svelte

~~~svelte
<script>
  import { counter } from './shared.svelte.js';
</script>

<button onclick={() => counter.count += 1}>
  clicks: {counter.count}
</button>
~~~

#### App.svelte

~~~svelte
<script>
  import Counter from './Counter.svelte';
</script>

<Counter />
<Counter />
<Counter />
~~~

![](img/08.png)

# Props

## Declaring props

So far, we've dealt exclusively with internal state — that is to say, the values are only accessible within a given component.

In any real application, you'll need to pass data from one component down to its children. To do that, we need to declare _properties_, generally shortened to 'props'. In Svelte, we do that with the `$props` rune. Edit the `Nested.svelte` component:

~~~svelte
<script>
  let { answer } = $props();
</script>
~~~

#### Nested.svelte

~~~svelte
<script>
  let { answer } = $props();
</script>

<p>The answer is {answer}</p>
~~~

#### App.svelte

~~~svelte
<script>
  import Nested from './Nested.svelte';
</script>

<Nested answer={42} />
~~~

![](img/09.png)

## Default values

We can easily specify default values for props in `Nested.svelte`:

~~~svelte
<script>
  let { answer = 'a mystery' } = $props();
</script>
~~~

If we now add a second component _without_ an `answer` prop, it will fall back to the default:

~~~svelte
<Nested answer={42}/>
<Nested />
~~~


#### Nested.svelte

~~~svelte
<script>
  let { answer = 'a mystery' } = $props();
</script>

<p>The answer is {answer}</p>
~~~

#### App.svelte

~~~svelte
<script>
  import Nested from './Nested.svelte';
</script>

<Nested answer={42} />
<Nested />
~~~

![](img/10.png)



## Spread props

In this exercise, in `App.svelte` we've forgotten to pass the `name` prop expected by `PackageInfo.svelte`, meaning the `<code>` element is empty and the npm link is broken.

We _could_ fix it by adding the prop...

~~~svelte
<PackageInfo
  name={pkg.name}
  version={pkg.version}
  description={pkg.description}
  website={pkg.website}
/>
~~~

...but since the properties of `pkg` correspond to the component's expected props, we can 'spread' them onto the component instead:

~~~svelte
<PackageInfo {...pkg} />
~~~

> [!NOTE] Conversely, in `PackageInfo.svelte` you can get an object containing all the props that were passed into a component using a rest property...
>
> ~~~js
> let { name, ...stuff } = $props();
> ~~~
>
> ...or by skipping [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) altogether:
>
> ~~~js
> let stuff = $props();
> ~~~
>
> ...in which case you can access the properties by their object paths:
>
> ~~~js
> console.log(stuff.name, stuff.version, stuff.description, stuff.website);
> ~~~

#### Packageinfo.svelte

~~~svelte
<script>
  let { name, version, description, website } = $props();
</script>

<p>
  The <code>{name}</code> package is {description}. Download version {version} from
  <a href="https://www.npmjs.com/package/{name}">npm</a> and <a href={website}>learn more here</a>
</p>
~~~

#### App.svelte

~~~svelte
<script>
  import PackageInfo from './PackageInfo.svelte';

  const pkg = {
    name: 'svelte',
    version: 5,
    description: 'blazing fast',
    website: 'https://svelte.dev'
  };
</script>

<PackageInfo {...pkg} />
~~~

![](img/11.png)

# Logic

## If blocks


HTML doesn't have a way of expressing _logic_, like conditionals and loops. Svelte does.

To conditionally render some markup, we wrap it in an `if` block. Let's add some text that appears when `count` is greater than `10`:

~~~svelte
<button onclick={increment}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
  <p>{count} is greater than 10</p>
{/if}
~~~

#### App.svelte

~~~svelte
<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
  <p>{count} is greater than 10</p>
{/if}
~~~

![](img/12.png)


![](img/13.png)

## Else blocks

Just like in JavaScript, an `if` block can have an `else` block:

~~~svelte
{#if count > 10}
  <p>{count} is greater than 10</p>
{:else}
  <p>{count} is between 0 and 10</p>
{/if}
~~~

`{#...}` opens a block. `{/...}` closes a block. `{:...}` _continues_ a block. Congratulations — you've already learned almost all the syntax Svelte adds to HTML.

#### App.svelte

~~~svelte
<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
  <p>{count} is greater than 10</p>
{:else}
  <p>{count} is between 0 and 10</p>
{/if}
~~~

![](img/14.png)

## Else-if blocks

Multiple conditions can be 'chained' together with `else if`:

~~~svelte

{#if count > 10}
  <p>{count} is greater than 10</p>
{:else if count < 5}
  <p>{count} is less than 5</p>
{:else}
  <p>{count} is between 5 and 10</p>
{/if}
~~~

~~~svelte
<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  Clicked {count}
  {count === 1 ? 'time' : 'times'}
</button>

{#if count > 10}
  <p>{count} is greater than 10</p>
{:else if count < 5}
  <p>{count} is less than 5</p>
{:else}
  <p>{count} is between 5 and 10</p>
{/if}
~~~

![](img/16.png)

## Each blocks

When building user interfaces you'll often find yourself working with lists of data. In this exercise, we've repeated the `<button>` markup multiple times — changing the colour each time — but there's still more to add.

Instead of laboriously copying, pasting and editing, we can get rid of all but the first button, then use an `each` block:

~~~svelte
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
~~~

> [!NOTE] The expression (`colors`, in this case) can be any iterable or array-like object — in other words, anything that works with [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

Now we need to use the `color` variable in place of `"red"`:

~~~svelte
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
~~~

You can get the current _index_ as a second argument, like so:

~~~svelte
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
~~~

### App.svelte

~~~svelte
<script>
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  let selected = $state(colors[0]);
</script>

<h1 style="color: {selected}">Pick a colour</h1>

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

<style>
  h1 {
    transition: color 0.2s;
    font-size: 2rem;
    font-weight: 700;
  }

  div {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
    max-width: 400px;
  }

  button {
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--color, #fff);
    transform: translate(-2px,-2px);
    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
    transition: all 0.1s;
    color: black;
    font-weight: 700;
    font-size: 2rem;
  }

  button[aria-current="true"] {
    transform: none;
    filter: none;
    box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
  }
</style>
~~~

![](img/17.png)

## Keyed each blocks

By default, when you modify the value of an `each` block, it will add and remove DOM nodes at the _end_ of the block, and update any values that have changed. That might not be what you want.

It's easier to show why than to explain. Inside `Thing.svelte`, `name` is a dynamic prop but `emoji` is a constant.

Click the 'Remove first thing' button a few times, and notice what happens:

1. It removes the last component.
2. It then updates the `name` value in the remaining DOM nodes, but not the emoji.

> [!NOTE] If you're coming from React, this might seem strange, because you're used to the entire component re-rendering when state changes. Svelte works differently: the component 'runs' once, and subsequent updates are 'fine-grained'. This makes things faster and gives you more control.

One way to fix it would be to make `emoji` a [`$derived`](derived-state) value. But it makes more sense to remove the first `<Thing>` component altogether rather than remove the _last_ one and update all the others.

To do that, we specify a unique _key_ for each iteration of the `each` block:

~~~svelte
{#each things as thing (thing.id)}
  <Thing name={thing.name}/>
{/each}
~~~

> [!NOTE] You can use any object as the key, as Svelte uses a `Map` internally — in other words you could do `(thing)` instead of `(thing.id)`. Using a string or number is generally safer, however, since it means identity persists without referential equality, for example when updating with fresh data from an API server.

#### Thing.svelte

~~~svelte
<script>
  const emojis = {
    apple: '🍎',
    banana: '🍌',
    carrot: '🥕',
    doughnut: '🍩',
    egg: '🥚'
  };

  // `name` is updated whenever the prop value changes...
  let { name } = $props();

  // ...but `emoji` is fixed upon initialisation
  const emoji = emojis[name];
</script>

<p>{emoji} = {name}</p>
~~~

#### App.svelte

~~~svelte
<script>
  import Thing from './Thing.svelte';

  let things = $state([
    { id: 1, name: 'apple' },
    { id: 2, name: 'banana' },
    { id: 3, name: 'carrot' },
    { id: 4, name: 'doughnut' },
    { id: 5, name: 'egg' }
  ]);
</script>

<button onclick={() => things.shift()}>
  Remove first thing
</button>

{#each things as thing (thing.id)}
  <Thing name={thing.name} />
{/each}
~~~

![](img/18.png)

## Await blocks

Most web applications have to deal with asynchronous data at some point. Svelte makes it easy to _await_ the value of [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) directly in your markup:

~~~svelte
{#await promise}
  <p>...rolling</p>
{:then number}
  <p>you rolled a {number}!</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
~~~

> [!NOTE] Only the most recent `promise` is considered, meaning you don't need to worry about race conditions.

If you know that your promise can't reject, you can omit the `catch` block. You can also omit the first block if you don't want to show anything until the promise resolves:

~~~svelte
{#await promise then number}
  <p>you rolled a {number}!</p>
{/await}
~~~


#### utils.js

~~~javascript
export async function roll() {
  // Fetch a random number from 1 to 6
  // (with a delay, so that we can see it)
  return new Promise((fulfil, reject) => {
    setTimeout(() => {
      // simulate a flaky network
      if (Math.random() < 0.3) {
        reject(new Error('Request failed'));
        return;
      }

      fulfil(Math.ceil(Math.random() * 6));
    }, 1000);
  });
}
~~~

#### App.svelte

~~~svelte
<script>
  import { roll } from './utils.js';

  let promise = $state(roll());
</script>

<button onclick={() => promise = roll()}>
  roll the dice
</button>

{#await promise}
  <p>...rolling</p>
{:then number}
  <p>you rolled a {number}!</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
~~~

![](img/19.png)

# Events

## DOM events

As we've briefly seen already, you can listen to any DOM event on an element (such as click or [pointermove](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event)) with an `on<name>` function:

~~~svelte
<div onpointermove={onpointermove}>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>
~~~

Like with any other property where the name matches the value, we can use the short form:

~~~svelte
<div {onpointermove}>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>
~~~

#### App.svelte

~~~svelte
<script>
  let m = $state({ x: 0, y: 0 });

  function onpointermove(event) {
    m.x = event.clientX;
    m.y = event.clientY;
  }
</script>

<div {onpointermove}>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<style>
  div {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
</style>
~~~

![](img/20.png)

## Inline handlers

You can also declare event handlers inline:

#### App.svelte

~~~svelte
<script>
  let m = $state({ x: 0, y: 0 });
</script>

<div
  onpointermove={(event) => {
    m.x = event.clientX;
    m.y = event.clientY;
  }}
>
  The pointer is at {Math.round(m.x)} x {Math.round(m.y)}
</div>

<style>
  div {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 1rem;
  }
</style>
~~~



## Capturing

Normally, event handlers run during the [_bubbling_](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling) phase. Notice what happens if you type something into the `<input>` in this example — the inner handler runs first, as the event 'bubbles' from the target up to the document, followed by the outer handler.

Sometimes, you want handlers to run during the _capture_ phase instead. Add `capture` to the end of the event name:

~~~svelte
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
  <input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>
~~~

Now, the relative order is reversed. If both capturing and non-capturing handlers exist for a given event, the capturing handlers will run first.

### App.svelte

~~~svelte
<div onkeydowncapture={(e) => alert(`<div> ${e.key}`)} role="presentation">
  <input onkeydowncapture={(e) => alert(`<input> ${e.key}`)} />
</div>
~~~

![](img/21.png)

## Component events

You can pass event handlers to components like any other prop. In `Stepper.svelte`, add `increment` and `decrement` props...

~~~svelte
<script>
  let { increment, decrement } = $props();
</script>
~~~

...and wire them up:

~~~svelte
<button onclick={decrement}>-1</button>
<button onclick={increment}>+1</button>
~~~

In `App.svelte`, define the handlers:

~~~svelte
<Stepper
  increment={() => value += 1}
  decrement={() => value -= 1}
/>
~~~

#### Stepper.svelte

~~~svelte
<script>
  let { increment, decrement } = $props();
</script>

<button onclick={decrement}>-1</button>
<button onclick={increment}>+1</button>
~~~

#### App.svelte

~~~svelte
<script>
  import Stepper from './Stepper.svelte';

  let value = $state(0);
</script>

<p>The current value is {value}</p>

<Stepper
  increment={() => value += 1}
  decrement={() => value -= 1}
/>
~~~

![](img/22.png)

## Spreading events

We can also [spread](spread-props) event handlers directly onto elements. Here, we've defined an `onclick` handler in `App.svelte` — all we need to do is pass the props to the `<button>` in `BigRedButton.svelte`:

~~~svelte
<button {...props}>
  Push
</button>
~~~

#### BigRedButton.svelte

~~~svelte
<script>
  let props = $props();
</script>

<button {...props}>
  Push
</button>

<style>
  button {
    font-size: 1.4em;
    width: 6em;
    height: 6em;
    border-radius: 50%;
    background: radial-gradient(circle at 25% 25%, hsl(0, 100%, 50%) 0, hsl(0, 100%, 40%) 100%);
    box-shadow: 0 8px 0 hsl(0, 100%, 30%), 2px 12px 10px rgba(0,0,0,.35);
    color: hsl(0, 100%, 30%);
    text-shadow: -1px -1px 2px rgba(0,0,0,0.3), 1px 1px 2px rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transform: translate(0, -8px);
    transition: all 0.2s;
  }

  button:active {
    transform: translate(0, -2px);
    box-shadow: 0 2px 0 hsl(0, 100%, 30%), 2px 6px 10px rgba(0,0,0,.35);
  }
</style>
~~~


#### App.svelte

~~~svelte
<script>
  import BigRedButton from './BigRedButton.svelte';
  import horn from './horn.mp3';

  const audio = new Audio();
  audio.src = horn;

  function honk() {
    audio.load();
    audio.play();
  }
</script>

<BigRedButton onclick={honk} />
~~~

![](img/23.png)

# Bindings

## Text inputs

As a general rule, data flow in Svelte is _top down_ — a parent component can set props on a child component, and a component can set attributes on an element, but not the other way around.

Sometimes it's useful to break that rule. Take the case of the `<input>` element in this component — we _could_ add an `oninput` event handler that sets the value of `name` to `event.target.value`, but it's a bit... boilerplatey. It gets even worse with other form elements, as we'll see.

Instead, we can use the `bind:value` directive:

~~~svelte
<input bind:value={name}>
~~~

This means that not only will changes to the value of `name` update the input value, but changes to the input value will update `name`.

#### App.svelte

~~~svelte
<script>
  let name = $state('world');
</script>

<input bind:value={name} />

<h1>Hello {name}!</h1>
~~~

![](img/24.png)

## Numeric inputs

In the DOM, every input value is a string. That's unhelpful when you're dealing with numeric inputs — `type="number"` and `type="range"` — as it means you have to remember to coerce `input.value` before using it.

With `bind:value`, Svelte takes care of it for you:

~~~svelte
<label>
  <input type="number" bind:value={a} min="0" max="10" />
  <input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
  <input type="number" bind:value={b} min="0" max="10" />
  <input type="range" bind:value={b} min="0" max="10" />
</label>
~~~


#### App.svelte

~~~svelte
<script>
  let a = $state(1);
  let b = $state(2);
</script>

<label>
  <input type="number" bind:value={a} min="0" max="10" />
  <input type="range" bind:value={a} min="0" max="10" />
</label>

<label>
  <input type="number" bind:value={b} min="0" max="10" />
  <input type="range" bind:value={b} min="0" max="10" />
</label>

<p>{a} + {b} = {a + b}</p>
~~~

![](img/25.png)

## Checkbox inputs

Checkboxes are used for toggling between states. Instead of binding to `input.value`, we bind to `input.checked`:

~~~svelte
<input type="checkbox" bind:checked={yes}>
~~~


#### App.svelte

~~~svelte
<script>
  let yes = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked={yes} />
  Yes! Send me regular email spam
</label>

{#if yes}
  <p>
    Thank you. We will bombard your inbox and sell
    your personal details.
  </p>
{:else}
  <p>
    You must opt in to continue. If you're not
    paying, you're the product.
  </p>
{/if}

<button disabled={!yes}>Subscribe</button>
~~~

![](img/26.png)

## Select bindings

We can also use `bind:value` with `<select>` elements:

~~~svelte
<select
    bind:value={selected}
    onchange={() => answer = ''}
>
~~~

Note that the `<option>` values are objects rather than strings. Svelte doesn't mind.

> [!NOTE] Because we haven't set an initial value of `selected`, the binding will set it to the default value (the first in the list) automatically. Be careful though — until the binding is initialised, `selected` remains undefined, so we can't blindly reference e.g. `selected.id` in the template.

#### App.svelte

~~~svelte
<script>
  let questions = $state([
    {
      id: 1,
      text: `Where did you go to school?`
    },
    {
      id: 2,
      text: `What is your mother's name?`
    },
    {
      id: 3,
      text: `What is another personal fact that an attacker could easily find with Google?`
    }
  ]);

  let selected = $state();

  let answer = $state('');

  function handleSubmit(e) {
    e.preventDefault();

    alert(
      `answered question ${selected.id} (${selected.text}) with "${answer}"`
    );
  }
</script>

<h2>Insecurity questions</h2>

<form onsubmit={handleSubmit}>
  <select
    bind:value={selected}
    onchange={() => (answer = '')}
  >
    {#each questions as question}
      <option value={question}>
        {question.text}
      </option>
    {/each}
  </select>

  <input bind:value={answer} />

  <button disabled={!answer} type="submit">
    Submit
  </button>
</form>

<p>
  selected question {selected
    ? selected.id
    : '[waiting...]'}
</p>
~~~

![](img/27.png)
![](img/28.png)

## Group inputs

If you have multiple `type="radio"` or `type="checkbox"` inputs relating to the same value, you can use `bind:group` along with the `value` attribute. Radio inputs in the same group are mutually exclusive; checkbox inputs in the same group form an array of selected values.

Add `bind:group={scoops}` to the radio inputs...

~~~svelte
<input
  type="radio"
  name="scoops"
  value={number}
  bind:group={scoops}
/>
~~~

...and `bind:group={flavours}` to the checkbox inputs:

~~~svelte
<input
  type="checkbox"
  name="flavours"
  value={flavour}
  bind:group={flavours}
/>
~~~

#### App.svelte

~~~svelte
<script>
  let scoops = $state(1);
  let flavours = $state([]);

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
  <label>
    <input
      type="radio"
      name="scoops"
      value={number}
      bind:group={scoops}
    />

    {number} {number === 1 ? 'scoop' : 'scoops'}
  </label>
{/each}

<h2>Flavours</h2>

{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
  <label>
    <input
      type="checkbox"
      name="flavours"
      value={flavour}
      bind:group={flavours}
    />

    {flavour}
  </label>
{/each}

{#if flavours.length === 0}
  <p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
  <p>Can't order more flavours than scoops!</p>
{:else}
  <p>
    You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
    of {formatter.format(flavours)}
  </p>
{/if}
~~~

![](img/29.png)

## Select multiple

A `<select>` element can have a `multiple` attribute, in which case it will populate an array rather than selecting a single value.

Replace the checkboxes with a `<select multiple>`:

~~~svelte
<h2>Flavours</h2>

<select multiple bind:value={flavours}>
  {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
   <option>{flavour}</option>
  {/each}
</select>
~~~

Note that we're able to omit the `value` attribute on the `<option>`, since the value is identical to the element's contents.

> [!NOTE] Press and hold the `control` key (or the `command` key on MacOS) to select multiple options.


#### App.svelte

~~~svelte
<script>
  let scoops = $state(1);
  let flavours = $state([]);

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<h2>Size</h2>

{#each [1, 2, 3] as number}
  <label>
    <input
      type="radio"
      name="scoops"
      value={number}
      bind:group={scoops}
    />

    {number} {number === 1 ? 'scoop' : 'scoops'}
  </label>
{/each}

<h2>Flavours</h2>

<select multiple bind:value={flavours}>
  {#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
    <option>{flavour}</option>
  {/each}
</select>

{#if flavours.length === 0}
  <p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
  <p>Can't order more flavours than scoops!</p>
{:else}
  <p>
    You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
    of {formatter.format(flavours)}
  </p>
{/if}
~~~

![](img/30.png)

## Textarea inputs

The `<textarea>` element behaves similarly to a text input in Svelte — use `bind:value`:

~~~svelte
<textarea bind:value={value}></textarea>
~~~

In cases like these, where the names match, we can also use a shorthand form:

~~~svelte
<textarea bind:value></textarea>
~~~

This applies to all bindings, not just `<textarea>` bindings.

#### App.svelte

~~~svelte
<script>
  import { marked } from 'marked';

  let value = $state(`Some words are *italic*, some are **bold**\n\n- lists\n- are\n- cool`);
</script>

<div class="grid">
  input
  <textarea bind:value></textarea>

  output
  <div>{@html marked(value)}</div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 5em 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1em;
    height: 100%;
  }

  textarea {
    flex: 1;
    resize: none;
  }
</style>
~~~

![](img/31.png)

# Classes & Styles

## The class attribute

Like any other attribute, you can specify classes with a JavaScript attribute. Here, we could add a `flipped` class to the card:

~~~svelte
<button
  class="card {flipped ? 'flipped' : ''}"
  onclick={() => flipped = !flipped}
>
~~~

This works as expected — if you click on the card now, it'll flip.

We can make it nicer though. Adding or removing a class based on some condition is such a common pattern in UI development that Svelte allows you to pass an object or array that is converted to a string by [clsx](https://github.com/lukeed/clsx).

~~~svelte
<button
  class={["card", { flipped }]}
  onclick={() => flipped = !flipped}
>
~~~

This means 'always add the `card` class, and add the `flipped` class whenever `flipped` is truthy'.

#### App.svelte

~~~svelte
<script>
  let flipped = $state(false);
</script>

<div class="container">
  Flip the card
  <button
    class={["card", { flipped }]}
    onclick={() => flipped = !flipped}
  >
    <div class="front">
      <span class="symbol">♠</span>
    </div>
    <div class="back">
      <div class="pattern"></div>
    </div>
  </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
    align-items: center;
    justify-content: center;
    perspective: 100vh;
  }

  .card {
    position: relative;
    aspect-ratio: 2.5 / 3.5;
    font-size: min(1vh, 0.25rem);
    height: 80em;
    background: var(--bg-1);
    border-radius: 2em;
    transform: rotateY(180deg);
    transition: transform 0.4s;
    transform-style: preserve-3d;
    padding: 0;
    user-select: none;
    cursor: pointer;
  }

  .card.flipped {
    transform: rotateY(0);
  }

  .front, .back {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    backface-visibility: hidden;
    border-radius: 2em;
    border: 1px solid var(--fg-2);
    box-sizing: border-box;
    padding: 2em;
  }

  .front {
    background: url(./svelte-logo.svg) no-repeat 5em 5em, url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
    background-size: 8em 8em, 8em 8em;
  }

  .back {
    transform: rotateY(180deg);
  }

  .symbol {
    font-size: 30em;
    color: var(--fg-1);
  }

  .pattern {
    width: 100%;
    height: 100%;
    background-color: var(--bg-2);
    /* pattern from https://projects.verou.me/css3patterns/#marrakesh */
    background-image:
    radial-gradient(var(--bg-3) 0.9em, transparent 1em),
    repeating-radial-gradient(var(--bg-3) 0, var(--bg-3) 0.4em, transparent 0.5em, transparent 2em, var(--bg-3) 2.1em, var(--bg-3) 2.5em, transparent 2.6em, transparent 5em);
    background-size: 3em 3em, 9em 9em;
    background-position: 0 0;
    border-radius: 1em;
  }
</style>
~~~

![](img/32.png)

![](img/33.png)

## The style directive

As with `class`, you can write your inline `style` attributes literally, because Svelte is really just HTML with fancy bits:

~~~svelte
<button
  class="card"
  style="transform: {flipped ? 'rotateY(0)' : ''}; --bg-1: palegoldenrod; --bg-2: black; --bg-3: goldenrod"
  onclick={() => flipped = !flipped}
>
~~~

When you have a lot of styles, it can start to look a bit wacky. We can tidy things up by using the `style:` directive:

~~~svelte
<button
  class="card"
 style:transform={flipped ? 'rotateY(0)' : ''}
  style:--bg-1="palegoldenrod"
  style:--bg-2="black"
  style:--bg-3="goldenrod"
  onclick={() => flipped = !flipped}
>
~~~

#### App.svelte

~~~svelte
<script>
  let flipped = $state(false);
</script>

<div class="container">
  Flip the card
  <button
    class="card"
    style:transform={flipped ? 'rotateY(0)' : ''}
    style:--bg-1="palegoldenrod"
    style:--bg-2="black"
    style:--bg-3="goldenrod"
    onclick={() => flipped = !flipped}
  >
    <div class="front">
      <span class="symbol">♠</span>
    </div>
    <div class="back">
      <div class="pattern"></div>
    </div>
  </button>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
    align-items: center;
    justify-content: center;
    perspective: 100vh;
  }

  .card {
    position: relative;
    aspect-ratio: 2.5 / 3.5;
    font-size: min(1vh, 0.25rem);
    height: 80em;
    background: var(--bg-1);
    border-radius: 2em;
    transform: rotateY(180deg);
    transition: transform 0.4s;
    transform-style: preserve-3d;
    padding: 0;
    user-select: none;
    cursor: pointer;
  }

  .front, .back {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    backface-visibility: hidden;
    border-radius: 2em;
    border: 1px solid var(--fg-2);
    box-sizing: border-box;
    padding: 2em;
  }

  .front {
    background: url(./svelte-logo.svg) no-repeat 5em 5em, url(./svelte-logo.svg) no-repeat calc(100% - 5em) calc(100% - 5em);
    background-size: 8em 8em, 8em 8em;
  }

  .back {
    transform: rotateY(180deg);
  }

  .symbol {
    font-size: 30em;
    color: var(--fg-1);
  }

  .pattern {
    width: 100%;
    height: 100%;
    background-color: var(--bg-2);
    /* pattern from https://projects.verou.me/css3patterns/#marrakesh */
    background-image:
    radial-gradient(var(--bg-3) 0.9em, transparent 1em),
    repeating-radial-gradient(var(--bg-3) 0, var(--bg-3) 0.4em, transparent 0.5em, transparent 2em, var(--bg-3) 2.1em, var(--bg-3) 2.5em, transparent 2.6em, transparent 5em);
    background-size: 3em 3em, 9em 9em;
    background-position: 0 0;
    border-radius: 1em;
  }
</style>
~~~

![](img/34.png)

![](img/35.png)

## Component styles

Often, you need to influence the styles inside a child component. Perhaps we want to make these boxes red, green and blue.

One way to do this is with the `:global` CSS modifier, which allows you to indiscriminately target elements inside other components:

~~~svelte
<style>
  .boxes :global(.box:nth-child(1)) {
    background-color: red;
  }

  .boxes :global(.box:nth-child(2)) {
    background-color: green;
  }

  .boxes :global(.box:nth-child(3)) {
    background-color: blue;
  }
</style>
~~~

But there are lots of reasons _not_ to do that. For one thing, it's extremely verbose. For another, it's brittle — any changes to the implementation details of `Box.svelte` could break the selector.

Most of all though, it's rude. Components should be able to decide for themselves which styles can be controlled from 'outside', in the same way they decide which variables are exposed as props. `:global` should be used as an escape hatch — a last resort.

Inside `Box.svelte`, change `background-color` so that it is determined by a [CSS custom property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*):

~~~svelte
<style>
  .box {
    width: 5em;
    height: 5em;
    border-radius: 0.5em;
    margin: 0 0 1em 0;
    background-color: var(--color, #ddd);
  }
</style>
~~~

Any parent element (such as `<div class="boxes">`) can set the value of `--color`, but we can also set it on individual components:

~~~svelte
<div class="boxes">
  <Box --color="red" />
  <Box --color="green" />
  <Box --color="blue" />
</div>
~~~

The values can be dynamic, like any other attribute.

> [!NOTE] This feature works by wrapping each component in an element with `display: contents`, where needed, and applying the custom properties to it. If you inspect the elements, you'll see markup like this:
>
> ~~~svelte
> <svelte-css-wrapper style="display: contents; --color: red;">
>   <!-- contents -->
> </svelte-css-wrapper>
> ~~~
>
> Because of `display: contents` this won't affect your layout, but the extra element _can_ affect selectors like `.parent > .child`.

### Box.svelte

~~~svelte
<div class="box"></div>

<style>
  .box {
    width: 5em;
    height: 5em;
    border-radius: 0.5em;
    margin: 0 0 1em 0;
    background-color: var(--color, #ddd);
  }
</style>
~~~

#### App.svelte

~~~svelte
<script>
  import Box from './Box.svelte';
</script>

<div class="boxes">
  <Box --color="red" />
  <Box --color="green" />
  <Box --color="blue" />
</div>
~~~

![](img/36.png)

# Actions

## The use directive

Actions are essentially element-level lifecycle functions. They're useful for things like:

- interfacing with third-party libraries
- lazy-loaded images
- tooltips
- adding custom event handlers

In this app, you can scribble on the `<canvas>`, and change colours and brush size via the menu. But if you open the menu and cycle through the options with the Tab key, you'll soon find that the focus isn't _trapped_ inside the modal.

We can fix that with an action. Import `trapFocus` from `actions.svelte.js`...

~~~svelte
<script>
  import Canvas from './Canvas.svelte';
  import { trapFocus } from './actions.svelte.js';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

  let selected = $state(colors[0]);
  let size = $state(10);
  let showMenu = $state(true);
</script>
~~~

...then add it to the menu with the `use:` directive:

~~~svelte
<div class="menu" use:trapFocus>
~~~

Let's take a look at the `trapFocus` function in `actions.svelte.js`. An action function is called with a `node` — the `<div class="menu">` in our case — when the node is mounted to the DOM. Inside the action, we have an [effect](effects).

First, we need to add an event listener that intercepts Tab key presses:

~~~js
$effect(() => {
  focusable()[0]?.focus();
  node.addEventListener('keydown', handleKeydown);
});
~~~

Second, we need to do some cleanup when the node is unmounted — removing the event listener, and restoring focus to where it was before the element mounted:

~~~js
$effect(() => {
  focusable()[0]?.focus();
  node.addEventListener('keydown', handleKeydown);

 return () => {
    node.removeEventListener('keydown', handleKeydown);
    previous?.focus();
  };
});
~~~

Now, when you open the menu, you can cycle through the options with the Tab key.


### actions.svelte.js

~~~javascript
export function trapFocus(node) {
  const previous = document.activeElement;

  function focusable() {
    return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }

  function handleKeydown(event) {
    if (event.key !== 'Tab') return;

    const current = document.activeElement;

    const elements = focusable();
    const first = elements.at(0);
    const last = elements.at(-1)

    if (event.shiftKey && current === first) {
      last.focus();
      event.preventDefault();
    }

    if (!event.shiftKey && current === last) {
      first.focus();
      event.preventDefault();
    }
  }

  $effect(() => {
    focusable()[0]?.focus();
    node.addEventListener('keydown', handleKeydown);

    return () => {
      node.removeEventListener('keydown', handleKeydown);
      previous?.focus();
    };
  });
}
~~~

#### Canvas.svelte

~~~svelte
<script>
  let { color, size } = $props();

  let canvas = $state();
  let context = $state();
  let coords = $state();

  $effect(() => {
    context = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas
  bind:this={canvas}
  onpointerdown={(e) => {
    coords = { x: e.offsetX, y: e.offsetY };

    context.fillStyle = color;
    context.beginPath();
    context.arc(coords.x, coords.y, size / 2, 0, 2 * Math.PI);
    context.fill();
  }}
  onpointerleave={() => {
    coords = null;
  }}
  onpointermove={(e) => {
    const previous = coords;

    coords = { x: e.offsetX, y: e.offsetY };

    if (e.buttons === 1) {
      e.preventDefault();

      context.strokeStyle = color;
      context.lineWidth = size;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(coords.x, coords.y);
      context.stroke();
    }
  }}
></canvas>

{#if coords}
  <div
    class="preview"
    style="--color: {color}; --size: {size}px; --x: {coords.x}px; --y: {coords.y}px"
  ></div>
{/if}

<style>
  canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .preview {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--size);
    height: var(--size);
    transform: translate(-50%, -50%);
    background: var(--color);
    border-radius: 50%;
    opacity: 0.5;
    pointer-events: none;
  }
</style>
~~~

#### App.svelte

~~~svelte
<script>
  import Canvas from './Canvas.svelte';
  import { trapFocus } from './actions.svelte.js';

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black'];

  let selected = $state(colors[0]);
  let size = $state(10);
  let showMenu = $state(true);
</script>

<div class="container">
  <Canvas color={selected} size={size} />

  {#if showMenu}
    <div
      role="presentation"
      class="modal-background"
      onclick={(event) => {
        if (event.target === event.currentTarget) {
          showMenu = false;
        }
      }}
      onkeydown={(e) => {
        if (e.key === 'Escape') {
          showMenu = false;
        }
      }}
    >
      <div class="menu" use:trapFocus>
        <div class="colors">
          {#each colors as color}
            <button
              class="color"
              aria-label={color}
              aria-current={selected === color}
              style="--color: {color}"
              onclick={() => {
                selected = color;
              }}
            ></button>
          {/each}
        </div>

        <label>
          small
          <input type="range" bind:value={size} min="1" max="50" />
          large
        </label>
      </div>
    </div>
  {/if}

  <div class="controls">
    <button class="show-menu" onclick={() => showMenu = !showMenu}>
      {showMenu ? 'close' : 'menu'}
    </button>
  </div>
</div>

<style>
  .container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .controls {
    position: absolute;
    left: 0;
    top: 0;
    padding: 1em;
  }

  .show-menu {
    width: 5em;
  }

  .modal-background {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(20px);
  }

  .menu {
    position: relative;
    background: var(--bg-2);
    width: calc(100% - 2em);
    max-width: 28em;
    padding: 1em 1em 0.5em 1em;
    border-radius: 1em;
    box-sizing: border-box;
    user-select: none;
  }

  .colors {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(9, 1fr);
    grid-gap: 0.5em;
  }

  .color {
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--color, #fff);
    transform: none;
    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.2));
    transition: all 0.1s;
  }

  .color[aria-current="true"] {
    transform: translate(1px, 1px);
    filter: none;
    box-shadow: inset 3px 3px 4px rgba(0,0,0,0.2);
  }

  .menu label {
    display: flex;
    width: 100%;
    margin: 1em 0 0 0;
  }

  .menu input {
    flex: 1;
  }
</style>
~~~

![](img/37.png)

## Adding parameters

Like transitions and animations, an action can take an argument, which the action function will be called with alongside the element it belongs to.

In this exercise, we want to add a tooltip to the `<button>` using the [`Tippy.js`](https://atomiks.github.io/tippyjs/) library. The action is already wired up with `use:tooltip`, but if you hover over the button (or focus it with the keyboard) the tooltip contains no content.

First, the action needs to accept a function that returns some options to pass to Tippy:

~~~js
function tooltip(node, fn) {
  $effect(() => {
    const tooltip = tippy(node, fn());

    return tooltip.destroy;
  });
}
~~~

> [!NOTE] We're passing in a function, rather than the options themselves, because the `tooltip` function does not re-run when the options change.

Then, we need to pass the options into the action:

~~~svelte
<button use:tooltip={() => ({ content })}>
  Hover me
</button>
~~~

> [!NOTE] In Svelte 4, actions returned an object with `update` and `destroy` methods. This still works but we recommend using `$effect` instead, as it provides more flexibility and granularity.

#### App.svelte

~~~svelte
<script>
  import tippy from 'tippy.js';

  let content = $state('Hello!');

  function tooltip(node, fn) {
    $effect(() => {
      const tooltip = tippy(node, fn());

      return tooltip.destroy;
    });
  }
</script>

<input bind:value={content} />

<button use:tooltip={() => ({ content })}>
  Hover me
</button>

<style>
  :global {
    [data-tippy-root] {
      --bg: #666;
      background-color: var(--bg);
      color: white;
      border-radius: 0.2rem;
      padding: 0.2rem 0.6rem;
      filter: drop-shadow(1px 1px 3px rgb(0 0 0 / 0.1));

      * {
        transition: none;
      }
    }

    [data-tippy-root]::before {
      --size: 0.4rem;
      content: '';
      position: absolute;
      left: calc(50% - var(--size));
      top: calc(-2 * var(--size) + 1px);
      border: var(--size) solid transparent;
      border-bottom-color: var(--bg);
    }
  }
</style>
~~~

![](img/38.png)

# Transitions

## The transition directive


We can make more appealing user interfaces by gracefully transitioning elements into and out of the DOM. Svelte makes this very easy with the `transition` directive.

First, import the `fade` function from `svelte/transition`...

~~~svelte
<script>
  import { fade } from 'svelte/transition';

  let visible = $state(true);
</script>
~~~

...then add it to the `<p>` element:

~~~svelte
<p transition:fade>
  Fades in and out
</p>
~~~


#### App.svelte

~~~svelte
<script>
  import { fade } from 'svelte/transition';

  let visible = $state(true);
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <p transition:fade>
    Fades in and out
  </p>
{/if}
~~~

![](img/39.png)

## Adding parameters

Transition functions can accept parameters. Replace the `fade` transition with `fly`...

~~~svelte
<script>
  import { fly } from 'svelte/transition';

  let visible = $state(true);
</script>
~~~

...and apply it to the `<p>` along with some options:

~~~svelte
<p transition:fly={{ y: 200, duration: 2000 }}>
  Flies in and out
</p>
~~~

Note that the transition is _reversible_ — if you toggle the checkbox while the transition is ongoing, it transitions from the current point, rather than the beginning or the end.

#### App.svelte

~~~svelte
<script>
  import { fly } from 'svelte/transition';

  let visible = $state(true);
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <p transition:fly={{ y: 200, duration: 2000 }}>
    Flies in and out
  </p>
{/if}
~~~

![](img/40.png)

## In and out

Instead of the `transition` directive, an element can have an `in` or an `out` directive, or both together. Import `fade` alongside `fly`...

~~~js
import { fade, fly } from 'svelte/transition';
~~~

...then replace the `transition` directive with separate `in` and `out` directives:

~~~svelte
<p in:fly={{ y: 200, duration: 2000 }} out:fade>
  Flies in, fades out
</p>
~~~

In this case, the transitions are _not_ reversed.

#### App.svelte

~~~svelte
<script>
  import { fade, fly } from 'svelte/transition';

  let visible = $state(true);
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <p in:fly={{ y: 200, duration: 2000 }} out:fade>
    Flies in, fades out
  </p>
{/if}
~~~

[](img/40.png)

## Custom CSS transitions

The `svelte/transition` module has a handful of built-in transitions, but it's very easy to create your own. By way of example, this is the source of the `fade` transition:

~~~js
function fade(node, { delay = 0, duration = 400 }) {
  const o = +getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: (t) => `opacity: ${t * o}`
  };
}
~~~

The function takes two arguments — the node to which the transition is applied, and any parameters that were passed in — and returns a transition object which can have the following properties:

- `delay` — milliseconds before the transition begins
- `duration` — length of the transition in milliseconds
- `easing` — a `p => t` easing function (see the chapter on [tweening](/tutorial/svelte/tweens))
- `css` — a `(t, u) => css` function, where `u === 1 - t`
- `tick` — a `(t, u) => {...}` function that has some effect on the node

The `t` value is `0` at the beginning of an intro or the end of an outro, and `1` at the end of an intro or beginning of an outro.

Most of the time you should return the `css` property and _not_ the `tick` property, as CSS animations run off the main thread to prevent jank where possible. Svelte 'simulates' the transition and constructs a CSS animation, then lets it run.

For example, the `fade` transition generates a CSS animation somewhat like this:

<!-- prettier-ignore-start -->
~~~css
0% { opacity: 0 }
10% { opacity: 0.1 }
20% { opacity: 0.2 }
/* ... */
100% { opacity: 1 }
~~~
<!-- prettier-ignore-end -->

We can get a lot more creative though. Let's make something truly gratuitous:

~~~svelte
<script>
  import { fade } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  let visible = $state(true);

  function spin(node, { duration }) {
    return {
      duration,
      css: (t, u) => {
        const eased = elasticOut(t);

        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: hsl(
            ${Math.trunc(t * 360)},
            ${Math.min(100, 1000 * u)}%,
            ${Math.min(50, 500 * u)}%
          );`
      }
    };
  }
</script>
~~~

Remember: with great power comes great responsibility.

#### App.svelte

~~~svelte
<script>
  import { fade } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  let visible = $state(true);

  function spin(node, { duration }) {
    return {
      duration,
      css: (t, u) => {
        const eased = elasticOut(t);

        return `
          transform: scale(${eased}) rotate(${eased * 1080}deg);
          color: hsl(
            ${Math.trunc(t * 360)},
            ${Math.min(100, 1000 * u)}%,
            ${Math.min(50, 500 * u)}%
          );`;
      }
    };
  }
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <div
    class="centered"
    in:spin={{ duration: 8000 }}
    out:fade
  >
    <span>transitions!</span>
  </div>
{/if}

<style>
  .centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  span {
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 4em;
  }
</style>
~~~

![](img/42.png)

## Custom JS transitions

While you should generally use CSS for transitions as much as possible, there are some effects that can't be achieved without JavaScript, such as a typewriter effect:

~~~js
function typewriter(node, { speed = 1 }) {
  const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(`This transition only works on elements with a single text node child`);
  }

  const text = node.textContent;
  const duration = text.length / (speed * 0.01);

  return {
    duration,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}
~~~


#### App.svelte

~~~svelte
<script>
  let visible = $state(false);

  function typewriter(node, { speed = 1 }) {
    const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

    if (!valid) {
      throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent;
    const duration = text.length / (speed * 0.01);

    return {
      duration,
      tick: (t) => {
        const i = Math.trunc(text.length * t);
        node.textContent = text.slice(0, i);
      }
    };
  }
</script>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <p transition:typewriter>
    The quick brown fox jumps over the lazy dog
  </p>
{/if}
~~~

![](img/43.png)

## Transition events

It can be useful to know when transitions are beginning and ending. Svelte dispatches events that you can listen to like any other DOM event:

~~~svelte
<p
  transition:fly={{ y: 200, duration: 2000 }}
 onintrostart={() => status = 'intro started'}
  onoutrostart={() => status = 'outro started'}
  onintroend={() => status = 'intro ended'}
  onoutroend={() => status = 'outro ended'}
>
  Flies in and out
</p>
~~~

#### App.svelte

~~~svelte
<script>
  import { fly } from 'svelte/transition';

  let visible = $state(true);
  let status = $state('waiting...');
</script>

<p>status: {status}</p>

<label>
  <input type="checkbox" bind:checked={visible} />
  visible
</label>

{#if visible}
  <p
    transition:fly={{ y: 200, duration: 2000 }}
    onintrostart={() => status = 'intro started'}
    onoutrostart={() => status = 'outro started'}
    onintroend={() => status = 'intro ended'}
    onoutroend={() => status = 'outro ended'}
  >
    Flies in and out
  </p>
{/if}
~~~

![](img/44.png)

## Global transitions

Ordinarily, transitions will only play on elements when their direct containing block is added or destroyed. In the example here, toggling the visibility of the entire list does not apply transitions to individual list elements.

Instead, we'd like transitions to not only play when individual items are added and removed with the slider but also when we toggle the checkbox.

We can achieve this with a _global_ transition, which plays when _any_ block containing the transitions is added or removed:

~~~svelte
<div transition:slide|global>
  {item}
</div>
~~~

#### App.svelte

~~~svelte
<script>
  import { slide } from 'svelte/transition';

  let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

  let showItems = $state(true);
  let i = $state(5);
</script>

<label>
  <input type="checkbox" bind:checked={showItems} />
  show list
</label>

<label>
  <input type="range" bind:value={i} max="10" />
</label>

{#if showItems}
  {#each items.slice(0, i) as item}
    <div transition:slide|global>
      {item}
    </div>
  {/each}
{/if}

<style>
  div {
    padding: 0.5em 0;
    border-top: 1px solid #eee;
  }
</style>
~~~

![](img/45.png)

> [!NOTE] In Svelte 3, transitions were global by default and you had to use the `|local` modifier to make them local.

## Key blocks

Key blocks destroy and recreate their contents when the value of an expression changes. This is useful if you want an element to play its transition whenever a value changes instead of only when the element enters or leaves the DOM.

Here, for example, we'd like to play the `typewriter` transition from `transition.js` whenever the loading message, i.e. `i` changes. Wrap the `<p>` element in a key block:

~~~svelte
{#key i}
  <p in:typewriter={{ speed: 10 }}>
    {messages[i] || ''}
  </p>
{/key}
~~~


#### loading-messages.js

~~~javascript
// thanks to https://gist.github.com/meain/6440b706a97d2dd71574769517e7ed32
export const messages = [
  "reticulating splines...",
  "generating witty dialog...",
  "swapping time and space...",
  "640K ought to be enough for anybody",
  "checking the gravitational constant in your locale...",
  "keep calm and npm install",
  "counting backwards from Infinity",
  "I'm sorry Dave, I can't do that.",
  "adjusting flux capacitor...",
  "constructing additional pylons...",
  "rm -rf /",
];
~~~

#### transition.js

~~~javascript
export function typewriter(node, { speed = 1 }) {
  const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(`This transition only works on elements with a single text node child`);
  }

  const text = node.textContent;
  const duration = text.length / (speed * 0.01);

  return {
    duration,
    tick: (t) => {
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}
~~~

#### App.svelte

~~~svelte
<script>
  import { typewriter } from './transition.js';
  import { messages } from './loading-messages.js';

  let i = $state(-1);

  $effect(() => {
    const interval = setInterval(() => {
      i += 1;
      i %= messages.length;
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<h1>loading...</h1>

{#key i}
  <p in:typewriter={{ speed: 10 }}>
    {messages[i] || ''}
  </p>
{/key}
~~~

![](img/46.png)