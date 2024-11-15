---
title: Prev/next navigation issue in SPA
description: how to handle route history in SPA
date: 2022-12-18T16:00:00.000+08:00
schedule:
hidden: false
tags:
  - route
  - query
  - vue
  - history
  - url
  - en-version
---


## Introduction

In this era of widespread single-page applications (SPA), the old server-side rendering (SSR) model has almost lost its ground (except for government websites that remain steadfast). However, there is one feature that I find very useful and frequently use: "previous/next page" navigation. I often use the mouse shortcuts for previous/next page to navigate between web pages. However, most front-end applications don't handle these browser-triggered routing events, which often leads to frustration. Sometimes, they don't even keep any record, so every time I try to go back ...

![](https://media.tenor.com/NDH0YheBZroAAAAd/pulp-fiction-huh.gif)

While working on projects, I searched for discussions on this issue, but couldn't find a solution. So I had to roll up my sleeves and build a solution myself.

## Discussion

In the past, web pages would fetch page information, including all the hash and query parameters, from the server based on the current URL. There was no issue of handling or not handling events. However, the drawback was that the entire page had to re-render every time, resulting in flickering. That's why single-page applications (SPA) came into existence, improving the rendering process by using virtual routing and adding smooth transition animations. But with these benefits came more challenges. Front-end developers often deal with "user interface interactions," such as onClick, onScroll, and common framework events like onMounted and onUnmounted. Only when necessary, they handle routing events. There are countless ways to handle this, including keeping specific pages alive, but deciding when to kill an instance is another challenge.

Let's take an example of a table list page with filter queries.

1. click page 3 => @click="fetchList({ ..., page: 3 })"
2. check filter: rate = 4 => @click="fetchList({ ..., rate: 4 })"
3. click page: 2 => @click="fetchList({ ..., page: 2 })"

Based on the mentioned operations, the expected history should be as follows:

1. `https://shop.com/products?page=3`
2. `https://shop.com/products?page=3&rate=4`
3. `https://shop.com/products?page=2&rate=4`

When I click on the previous page in step three, the page should display the content with `?page=3&rate=4`. However, since this change is initiated through routing, it doesn't trigger the click event. The user sees that the URL has gone back to the previous state, but the page remains the same. Only when the user refreshes the page at this point (assuming the front-end considers landing with query), they will see the content matching the URL. Similarly, if the user goes back to step one using the previous page or proceeds to step three using the next page, they will encounter the same issue.

In practical scenarios, some operations are triggered by mouse macro keys. Pay attention to URL changes.

<iframe src="https://drive.google.com/file/d/11Q4J_-fF6HeNxYRAZ0EGF477FoJkJg1m/preview" width="100%" height="480" allow="autoplay"></iframe>
<br>
<iframe src="https://drive.google.com/file/d/1UEEyOTqS0pUYE-cgCGsFj6bfJ2jDqrjq/preview" width="100%" height="480" allow="autoplay"></iframe>


## Implementation

Since it's a routing change, I redesigned all actions to start with routing. Therefore, all fetch requests are no longer directly triggered by onClick. Instead, they are handled by listening to URL changes and providing the corresponding feedback. The original onClick is used to drive URL changes. Let's take Vue as an example (just to quickly illustrate the concept; please ignore the details).

```vue
// before
<template>
  <!-- ... -->
  <button @click="fetchList({ ..., page: 3 })">3</button>
  <!-- ... -->
</tempalte>

<script setup>
function fetchList (payload) {
  return fetch('/list', payload)
}
</script>
```

```vue {4,17-27}
<template>
  <!-- ... -->
  <button @click="setQuery({ page: 3 })">3</button>
  <!-- ... -->
</tempalte>

<script setup>
function fetchList (payload) {
  return fetch('/list', payload)
}

function setQuery (payload) {
  // update url
}

const unwatch = watch(
  () => route.query,
  (val) => {
    //  整理 api payload
    const payload = url.query
    fetchList(payload)
  },
  {
    immediately: true // landing 時也要觸發
  }
)

onBeforeUnmount(() => {
  unwatch()
})
</script>
```

After the modification, all requests converge on route changes. If there are any changes to the information on the page, it is first updated in the route query. Then, the corresponding handling is done through watching. In Vue 3, this can be further encapsulated as a composable.

```ts
import { watch, computed, unref } from 'vue'
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'

function removeEmpty(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value != null && value !== '')
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
}

export function useRouteQuery(cb, options = {}) {
  const router = useRouter()
  const route = useRoute()
  const { immediate = false } = options

  const setQuery = payload => {
    const query = {
      ...router.currentRoute.value.query,
      ...payload
    }

    router.push({
      query: removeEmpty(query)
    })
  }

  const query = computed(() => route.query || {})
  const getQuery = key => {
    const unrefQuery = unref(query)
    return key ? unrefQuery[key] : unrefQuery
  }

  if (cb) {
    let unwatch = null
    unwatch = watch(
      () => route.query,
      (to, from) => {
        const routeQuery = getQuery()
        cb(routeQuery)
      },
      {
        immediate
      }
    )

    onBeforeRouteLeave(() => unwatch())
  }

  return {
    setQuery,
    getQuery
  }
}
```

here's how to use it in SFC

```vue
<script setup>
import { useRouteQuery } from '@/composables/routeQuery'

function fetchList (payload) {
  return fetch('/list', payload)
}

const { setQuery, getQuery } = useRouteQuery(fetchData, { immediate: true })
</script>
```

This way, whether it's through page number clicks, filter selection, or previous/next page events, you can avoid the issue of the page not synchronizing. Just remember that after the change, the current state needs to be filled back into the page (getQuery), such as highlighting the page number or the selected filter checkboxes.

## Reflection

However, this approach also has a few drawbacks:

1. Adding new conditions requires some mental effort to transform the code.
2. If a single page has multiple similar requests, handling them can become messy.
3. Usually, when users repeatedly click on a filter button, they expect the page to refresh or update as feedback. But in this approach, since the query doesn't change, the page won't respond, making it seem as if the behavior is broken from a user experience standpoint.
4. ~~There might be more drawbacks, but I can't think of them right now. I'll add them later...~~

If there are other custom conditions, such as websites that use specific queries for tab categorization, and different tabs should not share the query, you can add an additional filter in the watch function. Moreover, in the current project, there's a requirement to hide the query from the users. Therefore, I added base62 encoding/decoding at the composable level.

Overall, I'm quite satisfied with this feature, but the steps involved are a bit complex. If there's a better approach, I'll definitely give it a try. Previously, even during physical seminars, I couldn't get a clear answer by directly asking the speakers. I'm not sure if everyone subconsciously overlooks this feature or if no one really uses previous/next page functionality (?!).

By the way, I was pleasantly surprised to find that the [Government Open Data Platform](https://data.gov.tw/datasets/search?ct=249) implemented this feature (using Nuxt as their technology stack). Although the state restoration part is not perfect, they have achieved the desired page reproduction. I'm really curious about the approach they used.

> for zhTw version: <a href="/thoughts/route-query">在 SPA 中不被重視的上/下頁</a>