
LodScrolJS Documentation
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


## React (TypeScript)
 
```ts
import React, { useEffect, useState } from 'react';
import LodScrolJS from 'lodscroljs';

const MyComponent: React.FC = () => {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const lodscrol = new LodScrolJS({
      container: window,
      loadMore: async (done) => {
        try {
          const newData = await fetchFakeData(page);
          setData((prevData) => [...prevData, ...newData]);
          setPage((prevPage) => prevPage + 1);
          done();
        } catch (error) {
          console.error('Error loading data', error);
          done();
        }
      },
      threshold: 100,
    });

    return () => lodscrol.destroy();
  }, [page]);

  const fetchFakeData = async (page: number): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`);
        resolve(newData);
      }, 1000);
    });
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export default MyComponent;

```

## Angular

```ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import LodScrolJS from 'lodscroljs';

@Component({
  selector: 'app-my-component',
  template: `
    <div *ngFor="let item of data">{{ item }}</div>
  `,
})
export class MyComponent implements OnInit, OnDestroy {
  private lodscrol: any;
  public data: string[] = [];
  private page: number = 1;

  ngOnInit() {
    this.lodscrol = new LodScrolJS({
      container: window,
      loadMore: async (done) => {
        try {
          const newData = await this.fetchFakeData(this.page);
          this.data = [...this.data, ...newData];
          this.page += 1;
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

  private fetchFakeData(page: number): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`);
        resolve(newData);
      }, 1000);
    });
  }
}

```

## Vue

```html
<template>
  <div>
    <div v-for="(item, index) in data" :key="index">{{ item }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import LodScrolJS from 'lodscroljs';

export default defineComponent({
  name: 'MyComponent',
  setup() {
    const data = ref<string[]>([]);
    let page = ref<number>(1);
    let lodscrol: LodScrolJS;

    onMounted(() => {
      lodscrol = new LodScrolJS({
        container: window,
        loadMore: async (done) => {
          try {
            const newData = await fetchFakeData(page.value);
            data.value = [...data.value, ...newData];
            page.value += 1;
            done();
          } catch (error) {
            console.error('Error loading data', error);
            done();
          }
        },
        threshold: 100,
      });
    });

    onBeforeUnmount(() => {
      lodscrol.destroy();
    });

    const fetchFakeData = async (page: number): Promise<string[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newData = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`);
          resolve(newData);
        }, 1000);
      });
    };

    return {
      data,
    };
  },
});
</script>
 


```

## Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LodScrolJS Demo</title>
</head>
<body>
  <div id="content"></div>
  <script type="module">
    import LodScrolJS from 'lodscroljs';

    document.addEventListener('DOMContentLoaded', () => {
      let page = 1;

      const lodscrol = new LodScrolJS({
        container: window,
        loadMore: async (done) => {
          try {
            const newData = await fetchFakeData(page);
            const content = document.getElementById('content');
            newData.forEach(item => {
              const div = document.createElement('div');
              div.textContent = item;
              content.appendChild(div);
            });
            page += 1;
            done();
          } catch (error) {
            console.error('Error loading data', error);
            done();
          }
        },
        threshold: 100,
      });

      async function fetchFakeData(page) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const newData = Array.from({ length: 10 }, (_, i) => `Item ${i + 1 + (page - 1) * 10}`);
            resolve(newData);
          }, 1000);
        });
      }
    });
  </script>
</body>
</html>


```
## License
MIT License

## © 2024 Ismail MOUYAHADA
This professional version of lodscroljs is designed to load any type of content from APIs efficiently and securely. The documentation provides clear usage instructions for various frameworks, ensuring ease of integration, and includes the license with the creator's name, Ismail MOUYAHADA.
