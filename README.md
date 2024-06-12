# LodScrolJS

# LodScrolJS Documentation

LodScrolJS is a lightweight, fast, and secure JavaScript library designed to load any type of content from APIs on scroll, helping to avoid loading too much data at once. It works seamlessly with various JavaScript frameworks, including React, Angular, Vue.js, and plain JavaScript.

[![Buy me a coffee](https://img.buymeacoffee.com/button-api/?text=Buy+me+a+coffee&emoji=☕&slug=ismailmouyahada&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff)](https://www.buymeacoffee.com/ismailmouyahada)

 

## Installation

```sh
npm install lodscroljs
```
### Options
- `container`: The scroll container (default: `window`)
- `loadMore`: An async function to load more content from APIs. It receives a `done` callback to call when loading is complete.
- `threshold`: The distance from the bottom of the container to trigger loading more content (default: `100`)


## React
 
```js
import React, { useEffect } from 'react';
import LodScrolJS from 'lodscroljs';

const MyComponent = () => {
  useEffect(() => {
    const lodscrol = new LodScrolJS({
      container: window,
      loadMore: async (done) => {
        try {
          const response = await fetch('https://api.example.com/data');
          const data = await response.json();
          // Append data to your content
          done();
        } catch (error) {
          console.error('Error loading data', error);
          done();
        }
      },
      threshold: 100,
    });

    return () => lodscrol.destroy();
  }, []);

  return (
    <div>
      {/* Your content */}
    </div>
  );
};

export default MyComponent;
```

## Angular

```js

import { Component, OnInit, OnDestroy } from '@angular/core';
import LodScrolJS from 'lodscroljs';

@Component({
  selector: 'app-my-component',
  template: '<div><!-- Your content --></div>',
})
export class MyComponent implements OnInit, OnDestroy {
  private lodscrol: any;

  ngOnInit() {
    this.lodscrol = new LodScrolJS({
      container: window,
      loadMore: async (done) => {
        try {
          const response = await fetch('https://api.example.com/data');
          const data = await response.json();
          // Append data to your content
          done();
        } catch (error) {
          console.error('Error loading data', error);
          done();
        }
      },
      threshold: 100,
    });
  }

  ngOnDestroy() {
    this.lodscrol.destroy();
  }
}
```

## Vue

```js

<template>
  <div><!-- Your content --></div>
</template>

<script>
import LodScrolJS from 'lodscroljs';

export default {
  mounted() {
    this.lodscrol = new LodScrolJS({
      container: window,
      loadMore: async (done) => {
        try {
          const response = await fetch('https://api.example.com/data');
          const data = await response.json();
          // Append data to your content
          done();
        } catch (error) {
          console.error('Error loading data', error);
          done();
        }
      },
      threshold: 100,
    });
  },
  beforeDestroy() {
    this.lodscrol.destroy();
  }
};
</script>


```

## Vanilla JavaScript

```js
import LodScrolJS from 'lodscroljs';

document.addEventListener('DOMContentLoaded', () => {
  const lodscrol = new LodScrolJS({
    container: window,
    loadMore: async (done) => {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        // Append data to your content
        done();
      } catch (error) {
        console.error('Error loading data', error);
        done();
      }
    },
    threshold: 100,
  });
});

```
## License
MIT License

## © 2024 Ismail MOUYAHADA
This professional version of lodscroljs is designed to load any type of content from APIs efficiently and securely. The documentation provides clear usage instructions for various frameworks, ensuring ease of integration, and includes the license with the creator's name, Ismail MOUYAHADA.
