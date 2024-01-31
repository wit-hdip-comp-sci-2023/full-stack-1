# AirBnB Style Guide I

Naming conventions, comments, whitespace, command & semicolons. 

[[toc]]

# Naming Conventions

  - Avoid single letter names. Be descriptive with your naming. eslint: [`id-length`](https://eslint.org/docs/rules/id-length)

~~~javascript
    // bad
    function q() {
      // ...
    }

    // good
    function query() {
      // ...
    }
~~~

  - Use camelCase when naming objects, functions, and instances. eslint: [`camelcase`](https://eslint.org/docs/rules/camelcase.html)

~~~javascript
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}

    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
~~~

  - Use PascalCase only when naming constructors or classes. eslint: [`new-cap`](https://eslint.org/docs/rules/new-cap.html)

~~~javascript
    // bad
    function user(options) {
      this.name = options.name;
    }

    const bad = new user({
      name: "nope",
    });

    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }

    const good = new User({
      name: "yup",
    });
~~~

  - Do not use trailing or leading underscores. eslint: [`no-underscore-dangle`](https://eslint.org/docs/rules/no-underscore-dangle.html)

    > Why? JavaScript does not have the concept of privacy in terms of properties or methods. Although a leading underscore is a common convention to mean “private”, in fact, these properties are fully public, and as such, are part of your public API contract. This convention might lead developers to wrongly think that a change won’t count as breaking, or that tests aren’t needed. tl;dr: if you want something to be “private”, it must not be observably present.

~~~javascript
    // bad
    this.__firstName__ = "Panda";
    this.firstName_ = "Panda";
    this._firstName = "Panda";

    // good
    this.firstName = "Panda";

    // good, in environments where WeakMaps are available
    // see https://kangax.github.io/compat-table/es6/#test-WeakMap
    const firstNames = new WeakMap();
    firstNames.set(this, "Panda");
~~~

  - Don’t save references to `this`. Use arrow functions or [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

~~~javascript
    // bad
    function foo() {
      const self = this;
      return function () {
        console.log(self);
      };
    }

    // bad
    function foo() {
      const that = this;
      return function () {
        console.log(that);
      };
    }

    // good
    function foo() {
      return () => {
        console.log(this);
      };
    }
~~~

  - A base filename should exactly match the name of its default export.

~~~javascript
    // file 1 contents
    class CheckBox {
      // ...
    }
    export default CheckBox;

    // file 2 contents
    export default function fortyTwo() { return 42; }

    // file 3 contents
    export default function insideDirectory() {}

    // in some other file
    // bad
    import CheckBox from "./checkBox"; // PascalCase import/export, camelCase filename
    import FortyTwo from "./FortyTwo"; // PascalCase import/filename, camelCase export
    import InsideDirectory from "./InsideDirectory"; // PascalCase import/filename, camelCase export

    // bad
    import CheckBox from "./check_box"; // PascalCase import/export, snake_case filename
    import forty_two from "./forty_two"; // snake_case import/filename, camelCase export
    import inside_directory from "./inside_directory"; // snake_case import, camelCase export
    import index from "./inside_directory/index"; // requiring the index file explicitly
    import insideDirectory from "./insideDirectory/index"; // requiring the index file explicitly

    // good
    import CheckBox from "./CheckBox"; // PascalCase export/import/filename
    import fortyTwo from "./fortyTwo"; // camelCase export/import/filename
    import insideDirectory from "./insideDirectory"; // camelCase export/import/directory name/implicit "index"
    // ^ supports both insideDirectory.js and insideDirectory/index.js
~~~

  - Use camelCase when you export-default a function. Your filename should be identical to your function’s name.

~~~javascript
    function makeStyleGuide() {
      // ...
    }

    export default makeStyleGuide;
~~~

  - Use PascalCase when you export a constructor / class / singleton / function library / bare object.

~~~javascript
    const AirbnbStyleGuide = {
      es6: {
      },
    };

    export default AirbnbStyleGuide;
~~~

  - Acronyms and initialisms should always be all uppercased, or all lowercased.

    > Why? Names are for readability, not to appease a computer algorithm.


~~~javascript
    // bad
    import SmsContainer from "./containers/SmsContainer";

    // bad
    const HttpRequests = [
      // ...
    ];

    // good
    import SMSContainer from "./containers/SMSContainer";

    // good
    const HTTPRequests = [
      // ...
    ];

    // also good
    const httpRequests = [
      // ...
    ];

    // best
    import TextMessageContainer from "./containers/TextMessageContainer";

    // best
    const requests = [
      // ...
    ];
~~~

  - You may optionally uppercase a constant only if it (1) is exported, (2) is a `const` (it can not be reassigned), and (3) the programmer can trust it (and its nested properties) to never change.

    > Why? This is an additional tool to assist in situations where the programmer would be unsure if a variable might ever change. UPPERCASE_VARIABLES are letting the programmer know that they can trust the variable (and its properties) not to change.
    - What about all `const` variables? - This is unnecessary, so uppercasing should not be used for constants within a file. It should be used for exported constants however.
    - What about exported objects? - Uppercase at the top level of export (e.g. `EXPORTED_OBJECT.key`) and maintain that all nested properties do not change.

~~~javascript
    // bad
    const PRIVATE_VARIABLE = "should not be unnecessarily uppercased within a file";
    
    // bad
    export const THING_TO_BE_CHANGED = "should obviously not be uppercased";
    
    // bad
    export let REASSIGNABLE_VARIABLE = "do not use let with uppercase variables";
    
    // ---
    
    // allowed but does not supply semantic value
    export const apiKey = "SOMEKEY";
    
    // better in most cases
    export const API_KEY = "SOMEKEY";
    
    // ---
    
    // bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
      KEY: "value"
    };
    
    // good
    export const MAPPING = {
      key: "value"
    };
~~~

    
# Whitespace

  - Use soft tabs (space character) set to 2 spaces. eslint: [`indent`](https://eslint.org/docs/rules/indent.html)

~~~javascript
    // bad
    function foo() {
    ∙∙∙∙let name;
    }

    // bad
    function bar() {
    ∙let name;
    }

    // good
    function baz() {
    ∙∙let name;
    }
~~~

  - Place 1 space before the leading brace. eslint: [`space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks.html)

~~~javascript
    // bad
    function test(){
      console.log("test");
    }

    // good
    function test() {
      console.log("test");
    }

    // bad
    dog.set("attr",{
      age: "1 year",
      breed: "Bernese Mountain Dog",
    });

    // good
    dog.set("attr", {
      age: "1 year",
      breed: "Bernese Mountain Dog",
    });
~~~

  -  Place 1 space before the opening parenthesis in control statements (`if`, `while` etc.). Place no space between the argument list and the function name in function calls and declarations. eslint: [`keyword-spacing`](https://eslint.org/docs/rules/keyword-spacing.html)

~~~javascript
    // bad
    if(isJedi) {
      fight ();
    }

    // good
    if (isJedi) {
      fight();
    }

    // bad
    function fight () {
      console.log ("Swooosh!");
    }

    // good
    function fight() {
      console.log("Swooosh!");
    }
~~~

 


  - Set off operators with spaces. eslint: [`space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops.html)

~~~javascript
    // bad
    const x=y+5;

    // good
    const x = y + 5;
~~~

  -  End files with a single newline character. eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

~~~javascript
    // bad
    import { es6 } from "./AirbnbStyleGuide";
      // ...
    export default es6;
~~~

--- 

~~~javascript
    // bad
    import { es6 } from "./AirbnbStyleGuide";
      // ...
    export default es6;
    
~~~
 
---

~~~javascript
    // good
    import { es6 } from "./AirbnbStyleGuide";
      // ...
    export default es6;
~~~

  - Use indentation when making long method chains (more than 2 method chains). Use a leading dot, which
    emphasizes that the line is a method call, not a new statement. eslint: [`newline-per-chained-call`](https://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](https://eslint.org/docs/rules/no-whitespace-before-property)

~~~javascript
    // bad
    $("#items").find(".selected").highlight().end().find(".open").updateCount();
    
    // bad
    $("#items").
      find(".selected").
        highlight().
        end().
      find(".open").
        updateCount();
    
    // good
    $("#items")
      .find(".selected")
        .highlight()
        .end()
      .find(".open")
        .updateCount();
    
    // bad
    const leds = stage.selectAll(".led").data(data).enter().append("svg:svg").classed("led", true)
        .attr("width", (radius + margin) * 2).append("svg:g")
        .attr("transform", `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);
    
    // good
    const leds = stage.selectAll(".led")
        .data(data)
      .enter().append("svg:svg")
        .classed("led", true)
        .attr("width", (radius + margin) * 2)
      .append("svg:g")
        .attr("transform", `translate(${radius + margin},${radius + margin})`)
        .call(tron.led);
    
    // good
    const leds = stage.selectAll(".led").data(data);
    const svg = leds.enter().append("svg:svg");
    svg.classed("led", true).attr("width", (radius + margin) * 2);
    const g = svg.append("svg:g");
    g.attr("transform", `translate(${radius + margin},${radius + margin})`).call(tron.led);
~~~


  -  Leave a blank line after blocks and before the next statement.

~~~javascript
    // bad
    if (foo) {
      return bar;
    }
    return baz;

    // good
    if (foo) {
      return bar;
    }

    return baz;

    // bad
    const obj = {
      foo() {
      },
      bar() {
      },
    };
    return obj;

    // good
    const obj = {
      foo() {
      },

      bar() {
      },
    };

    return obj;

    // bad
    const arr = [
      function foo() {
      },
      function bar() {
      },
    ];
    return arr;

    // good
    const arr = [
      function foo() {
      },

      function bar() {
      },
    ];

    return arr;
~~~

  - Do not pad your blocks with blank lines. eslint: [`padded-blocks`](https://eslint.org/docs/rules/padded-blocks.html)

~~~javascript
    // bad
    function bar() {

      console.log(foo);

    }

    // bad
    if (baz) {

      console.log(qux);
    } else {
      console.log(foo);

    }

    // bad
    class Foo {

      constructor(bar) {
        this.bar = bar;
      }
    }

    // good
    function bar() {
      console.log(foo);
    }

    // good
    if (baz) {
      console.log(qux);
    } else {
      console.log(foo);
    }
~~~

  -  Do not use multiple blank lines to pad your code. eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)

~~~javascript
    // good
    class Person {
      constructor(fullName, email, birthday) {
        this.fullName = fullName;
        this.email = email;


        this.setAge(birthday);
      }


      setAge(birthday) {
        const today = new Date();


        const age = getAge(today, birthday);
        this.age = age;
      }


      getAge(today, birthday) {
        // ..
      }
    }
    
    // good
    class Person {
      constructor(fullName, email, birthday) {
        this.fullName = fullName;
        this.email = email;
        this.setAge(birthday);
      }
    
      setAge(birthday) {
        const today = new Date();
        const age = getAge(today, birthday);
        this.age = age;
      }
    
      getAge(today, birthday) {
        // ..
      }
    }
~~~

  - Do not add spaces inside parentheses. eslint: [`space-in-parens`](https://eslint.org/docs/rules/space-in-parens.html)

~~~javascript
    // bad
    function bar( foo ) {
      return foo;
    }

    // good
    function bar(foo) {
      return foo;
    }

    // bad
    if ( foo ) {
      console.log(foo);
    }

    // good
    if (foo) {
      console.log(foo);
    }
~~~

  -  Do not add spaces inside brackets. eslint: [`array-bracket-spacing`](https://eslint.org/docs/rules/array-bracket-spacing.html)

~~~javascript
    // bad
    const foo = [ 1, 2, 3 ];
    console.log(foo[ 0 ]);

    // good
    const foo = [1, 2, 3];
    console.log(foo[0]);
~~~

  - Add spaces inside curly braces. eslint: [`object-curly-spacing`](https://eslint.org/docs/rules/object-curly-spacing.html)

~~~javascript
    // bad
    const foo = {clark: "kent"};

    // good
    const foo = { clark: "kent" };
~~~

  -  Avoid having lines of code that are longer than 100 characters (including whitespace). Note: per [above](#strings--line-length), long strings are exempt from this rule, and should not be broken up. eslint: [max-len](https://eslint.org/docs/rules/max-len.html)

Why? This ensures readability and maintainability.

~~~javascript
    // bad
    const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz ... // continues

    // bad
    $.ajax({ method: "POST", url: "https://airbnb.com/", data: { name: "John" } })  .... // continues

    // good
    const foo = jsonData
      && jsonData.foo
      && jsonData.foo.bar
      && jsonData.foo.bar.baz
      && jsonData.foo.bar.baz.quux
      && jsonData.foo.bar.baz.quux.xyzzy;

    // good
    $.ajax({
      method: "POST",
      url: "https://airbnb.com/",
      data: { name: "John" },
    })
      .done(() => console.log("Congratulations!"))
      .fail(() => console.log("You have failed this city."));
~~~

  - Require consistent spacing inside an open block token and the next token on the same line. This rule also enforces consistent spacing inside a close block token and previous token on the same line. eslint: [`block-spacing`](https://eslint.org/docs/rules/block-spacing)

~~~javascript
    // bad
    function foo() {return true;}
    if (foo) { bar = 0;}

    // good
    function foo() { return true; }
    if (foo) { bar = 0; }
~~~

  - Avoid spaces before commas and require a space after commas. eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

~~~javascript
    // bad
    var foo = 1,bar = 2;
    var arr = [1 , 2];

    // good
    var foo = 1, bar = 2;
    var arr = [1, 2];
~~~

  - Enforce spacing inside of computed property brackets. eslint: [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing)

~~~javascript
    // bad
    obj[foo ]
    obj[ "foo"]
    var x = {[ b ]: a}
    obj[foo[ bar ]]

    // good
    obj[foo]
    obj["foo"]
    var x = { [b]: a }
    obj[foo[bar]]
~~~

  -  Avoid spaces between functions and their invocations. eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

~~~javascript
    // bad
    func ();

    func
    ();

    // good
    func();
~~~

  -  Enforce spacing between keys and values in object literal properties. eslint: [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

~~~javascript
    // bad
    var obj = { foo : 42 };
    var obj2 = { foo:42 };

    // good
    var obj = { foo: 42 };
~~~

  - Avoid trailing spaces at the end of lines. eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

  -  Avoid multiple empty lines, only allow one newline at the end of files, and avoid a newline at the beginning of files. eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)


~~~javascript
    // bad - multiple empty lines
    var x = 1;


    var y = 2;
    
    // bad - 2+ newlines at end of file
    var x = 1;
    var y = 2;


    // bad - 1+ newline(s) at beginning of file
    
    var x = 1;
    var y = 2;
    
    // good
    var x = 1;
    var y = 2;
    
~~~


# Commas

  - Leading commas: **Nope.** eslint: [`comma-style`](https://eslint.org/docs/rules/comma-style.html)

~~~javascript
    // bad
    const story = [
        once
      , upon
      , aTime
    ];

    // good
    const story = [
      once,
      upon,
      aTime,
    ];

    // bad
    const hero = {
        firstName: "Ada"
      , lastName: "Lovelace"
      , birthYear: 1815
      , superPower: "computers"
    };

    // good
    const hero = {
      firstName: "Ada",
      lastName: "Lovelace",
      birthYear: 1815,
      superPower: "computers",
    };
~~~

  - Additional trailing comma: **Yup.** eslint: [`comma-dangle`](https://eslint.org/docs/rules/comma-dangle.html)

    > Why? This leads to cleaner git diffs. Also, transpilers like Babel will remove the additional trailing comma in the transpiled code which means you don’t have to worry about the [trailing comma problem](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas) in legacy browsers.

~~~diff
    // bad - git diff without trailing comma
    const hero = {
         firstName: "Florence",
    -    lastName: "Nightingale"
    +    lastName: "Nightingale",
    +    inventorOf: ["coxcomb chart", "modern nursing"]
    };
    
    // good - git diff with trailing comma
    const hero = {
         firstName: "Florence",
         lastName: "Nightingale",
    +    inventorOf: ["coxcomb chart", "modern nursing"],
    };
~~~

---

~~~javascript
    // bad
    const hero = {
      firstName: "Dana",
      lastName: "Scully"
    };
    
    const heroes = [
      "Batman",
      "Superman"
    ];
    
    // good
    const hero = {
      firstName: "Dana",
      lastName: "Scully",
    };
    
    const heroes = [
      "Batman",
      "Superman",
    ];
    
    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }
    
    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }
    
    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }
    
    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );
    
    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );
    
    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    );
~~~


# Semicolons

  - **Yup.** eslint: [`semi`](https://eslint.org/docs/rules/semi.html)

    > Why? When JavaScript encounters a line break without a semicolon, it uses a set of rules called [Automatic Semicolon Insertion](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion) to determine whether it should regard that line break as the end of a statement, and (as the name implies) place a semicolon into your code before the line break if it thinks so. ASI contains a few eccentric behaviors, though, and your code will break if JavaScript misinterprets your line break. These rules will become more complicated as new features become a part of JavaScript. Explicitly terminating your statements and configuring your linter to catch missing semicolons will help prevent you from encountering issues.

~~~javascript
    // bad - raises exception
    const luke = {}
    const leia = {}
    [luke, leia].forEach((jedi) => jedi.father = "vader")
    
    // bad - raises exception
    const reaction = "No! That’s impossible!"
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }())
    
    // bad - returns `undefined` instead of the value on the next line - 
    // always happens when `return` is on a line by itself because of ASI!
    function foo() {
      return
        "search your feelings, you know it to be foo"
    }
    
    // good
    const luke = {};
    const leia = {};
    [luke, leia].forEach((jedi) => {
      jedi.father = "vader";
    });
    
    // good
    const reaction = "No! That’s impossible!";
    (async function meanwhileOnTheFalcon() {
      // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
      // ...
    }());
    
    // good
    function foo() {
      return "search your feelings, you know it to be foo";
    }
~~~
